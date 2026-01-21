// Google Maps utilities for distance calculation

import { PRICING } from './pricing';

// Business location (Fresno, CA 93704)
const BUSINESS_LOCATION = {
  lat: parseFloat(process.env.BUSINESS_LOCATION_LAT || '36.7378'),
  lng: parseFloat(process.env.BUSINESS_LOCATION_LNG || '-119.7871'),
};

export interface DistanceResult {
  distanceMiles: number;
  durationMinutes: number;
  deliveryFee: number;
  isWithinServiceArea: boolean;
  errorMessage?: string;
}

export interface PlaceDetails {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  lat: number;
  lng: number;
  placeId: string;
}

/**
 * Calculate distance from business location to destination using Google Distance Matrix API
 * This runs on the server side
 */
export async function calculateDistance(
  destinationLat: number,
  destinationLng: number
): Promise<DistanceResult> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return {
      distanceMiles: 0,
      durationMinutes: 0,
      deliveryFee: 0,
      isWithinServiceArea: false,
      errorMessage: 'Google Maps API key not configured',
    };
  }

  try {
    const origin = `${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`;
    const destination = `${destinationLat},${destinationLng}`;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=imperial&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return {
        distanceMiles: 0,
        durationMinutes: 0,
        deliveryFee: 0,
        isWithinServiceArea: false,
        errorMessage: `Distance Matrix API error: ${data.status}`,
      };
    }

    const element = data.rows[0]?.elements[0];

    if (!element || element.status !== 'OK') {
      return {
        distanceMiles: 0,
        durationMinutes: 0,
        deliveryFee: 0,
        isWithinServiceArea: false,
        errorMessage: 'Could not calculate distance to this location',
      };
    }

    // Distance is returned in meters, convert to miles
    const distanceMeters = element.distance.value;
    const distanceMiles = Math.round(distanceMeters / 1609.34);

    // Duration is in seconds, convert to minutes
    const durationSeconds = element.duration.value;
    const durationMinutes = Math.round(durationSeconds / 60);

    // Check if within service area
    const isWithinServiceArea = distanceMiles <= PRICING.MAX_DELIVERY_MILES;

    // Calculate delivery fee
    let deliveryFee = 0;
    if (isWithinServiceArea && distanceMiles > PRICING.FREE_DELIVERY_MILES) {
      const chargeableMiles = distanceMiles - PRICING.FREE_DELIVERY_MILES;
      deliveryFee = chargeableMiles * PRICING.DELIVERY_RATE_PER_MILE;
    }

    return {
      distanceMiles,
      durationMinutes,
      deliveryFee,
      isWithinServiceArea,
      errorMessage: isWithinServiceArea
        ? undefined
        : `Location is ${distanceMiles} miles away, outside our ${PRICING.MAX_DELIVERY_MILES}-mile service area`,
    };
  } catch (error) {
    console.error('Distance calculation error:', error);
    return {
      distanceMiles: 0,
      durationMinutes: 0,
      deliveryFee: 0,
      isWithinServiceArea: false,
      errorMessage: 'Failed to calculate distance',
    };
  }
}

/**
 * Parse address components from Google Places result
 */
export function parseAddressComponents(
  addressComponents: google.maps.GeocoderAddressComponent[]
): { city?: string; state?: string; zip?: string } {
  let city: string | undefined;
  let state: string | undefined;
  let zip: string | undefined;

  for (const component of addressComponents) {
    const types = component.types;

    if (types.includes('locality')) {
      city = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      state = component.short_name;
    } else if (types.includes('postal_code')) {
      zip = component.long_name;
    }
  }

  return { city, state, zip };
}
