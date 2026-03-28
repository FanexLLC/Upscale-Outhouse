export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  slug: string;
  items: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    name: 'General',
    slug: 'general',
    items: [
      {
        question: 'What is a luxury restroom trailer?',
        answer:
          'A luxury restroom trailer is a fully self-contained mobile restroom unit that looks and feels like a high-end indoor bathroom. Our trailer features flushing porcelain toilets, running hot and cold water, climate control (heating and air conditioning), LED-lit vanity mirrors, a Bluetooth sound system, hardwood-style flooring, and elegant interior finishes. It\'s a world apart from a standard portable toilet — your guests will feel like they never left the venue.',
      },
      {
        question: 'How is this different from a porta potty?',
        answer:
          'The difference is night and day. A porta potty is a single plastic stall with a chemical holding tank and no running water. Our luxury restroom trailer has separate men\'s and women\'s entrances, individual private stalls with flushing toilets, sinks with running water and soap dispensers, air conditioning and heating, interior lighting, vanity mirrors, and a premium Bluetooth sound system. It\'s designed to blend seamlessly into upscale events like weddings and corporate gatherings.',
      },
      {
        question: 'Is Upscale Outhouse veteran-owned?',
        answer:
          'Yes! Upscale Outhouse is a proud veteran-owned and operated business based in Fresno, California. We bring the same commitment to excellence, reliability, and attention to detail that we learned in military service to every event we serve.',
      },
      {
        question: 'What areas do you serve?',
        answer:
          'We serve events within a 150-mile radius of Fresno, California. This covers the entire Central Valley, parts of the Bay Area, the Sierra Nevada foothills, and the Central Coast. Delivery is free for events within 50 miles of Fresno — beyond that, a modest delivery fee applies based on distance. Use our online quote calculator to get an instant price for your location.',
      },
    ],
  },
  {
    name: 'Booking & Pricing',
    slug: 'booking-pricing',
    items: [
      {
        question: 'How far in advance should I book?',
        answer:
          'We recommend booking at least 2–4 weeks in advance, especially for peak season (April through October) and weekends. Wedding dates during summer months can fill up quickly, so the earlier you book, the better your chances of securing your preferred date. That said, we do our best to accommodate last-minute requests when availability allows.',
      },
      {
        question: 'What is included in the rental price?',
        answer:
          'Your rental price includes the luxury restroom trailer itself with all amenities (climate control, sound system, lighting, supplies), professional delivery to your event site, full setup and leveling, a pre-event walkthrough to ensure everything is perfect, fresh water and waste tank servicing, and pickup after your event. We provide toilet paper, hand soap, paper towels, and air freshener. Basically, everything you need for a seamless experience is included.',
      },
      {
        question: 'What is the cancellation policy?',
        answer:
          'We understand plans can change. If you need to cancel, please contact us as soon as possible. Cancellations made more than 14 days before your event date will receive a full deposit refund. Cancellations within 14 days of the event may forfeit the deposit, depending on the circumstances. We\'re reasonable people — reach out and we\'ll work with you.',
      },
      {
        question: 'Is the $100 deposit refundable?',
        answer:
          'Yes, the $100 deposit is fully refundable if you cancel more than 14 days before your event. The deposit secures your date on our calendar and is applied toward your total rental cost — it\'s not an additional fee. The remaining balance is due upon delivery.',
      },
      {
        question: 'Do you offer multi-day discounts?',
        answer:
          'Absolutely! We offer automatic discounts for multi-day rentals. The longer your event, the more you save. Our quote calculator applies these discounts automatically, so you can see your exact pricing instantly. Multi-day rentals are popular for festivals, multi-day weddings, and corporate retreats.',
      },
    ],
  },
  {
    name: 'Delivery & Setup',
    slug: 'delivery-setup',
    items: [
      {
        question: 'Do I need a water hookup?',
        answer:
          'No, a water hookup is not required. Our luxury restroom trailer comes with onboard freshwater tanks that provide running water for the duration of your event. However, if your venue does have an accessible water hookup (standard garden hose connection), we can connect to it for continuous water supply, which is ideal for larger or longer events.',
      },
      {
        question: 'Do I need a power source?',
        answer:
          'Our trailer has onboard power capabilities. For most events, no external power source is needed. If your event is multi-day or in extreme temperatures where the climate control system will run continuously, having access to a standard 110V outlet nearby is helpful but not mandatory. We\'ll discuss power needs during your booking confirmation.',
      },
      {
        question: 'How much space is needed?',
        answer:
          'The trailer requires a relatively flat area approximately 30 feet long by 10 feet wide, with adequate clearance for delivery. We need a clear path at least 10 feet wide for the tow vehicle. The surface can be pavement, gravel, or firm grass. During booking, we\'ll confirm that your site can accommodate the trailer and discuss the best placement.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Setup typically takes about 30–45 minutes. We arrive well before your event to position and level the trailer, connect any utilities, stock supplies, and do a final quality check. We recommend having us arrive at least 1–2 hours before your first guests to ensure everything is perfect.',
      },
      {
        question: 'Is delivery really free within 50 miles?',
        answer:
          'Yes, delivery, setup, and pickup are completely free for events within 50 miles of Fresno, California. For events beyond 50 miles (up to our 150-mile service radius), a delivery fee is calculated based on distance. You can see your exact delivery cost instantly using our online quote calculator — just enter your event address and we\'ll handle the rest.',
      },
    ],
  },
  {
    name: 'The Trailer',
    slug: 'the-trailer',
    items: [
      {
        question: 'How many guests can it accommodate?',
        answer:
          'Our luxury restroom trailer comfortably serves events with up to 200+ guests. It features multiple stalls with separate men\'s and women\'s entrances, so throughput is excellent and wait times stay short. For very large events (300+ guests or festivals), we recommend discussing your needs with us so we can ensure adequate capacity.',
      },
      {
        question: 'Is it climate controlled?',
        answer:
          'Yes! The trailer is fully climate controlled with both air conditioning and heating. Whether your event is in the heat of a Central Valley summer or a cool fall evening, your guests will be comfortable. The climate system runs automatically to maintain a pleasant temperature inside.',
      },
      {
        question: 'Does it have running water?',
        answer:
          'Absolutely. The trailer has full running water at every sink — hot and cold. Guests can wash their hands with real soap at proper vanity sinks, just like they would at home or in a fine restaurant. The flushing toilets also use real water, not chemicals.',
      },
      {
        question: 'Is there a sound system?',
        answer:
          'Yes, the trailer includes a built-in Bluetooth sound system. You can connect your phone or device to play background music inside the restroom, adding an extra touch of ambiance to the guest experience. Many of our clients love this feature for weddings and upscale events.',
      },
      {
        question: 'Are there separate men\'s and women\'s sections?',
        answer:
          'Yes, the trailer features completely separate men\'s and women\'s entrances and restroom areas. Each side has its own private stalls, sinks, mirrors, and lighting. This provides privacy and comfort for all guests and keeps traffic flowing smoothly.',
      },
    ],
  },
  {
    name: 'Events',
    slug: 'events',
    items: [
      {
        question: 'Is the trailer suitable for weddings?',
        answer:
          'Our luxury restroom trailer is one of the most popular choices for weddings in the Central Valley. The elegant interior with LED vanity mirrors, hardwood-style floors, and climate control creates a restroom experience that matches the beauty of your celebration. Many brides and grooms tell us their guests were genuinely impressed. It\'s especially perfect for outdoor and barn weddings where indoor facilities are limited.',
      },
      {
        question: 'Can it handle corporate events?',
        answer:
          'Absolutely. Our trailer is an excellent choice for corporate events, company picnics, product launches, and outdoor meetings. It projects a professional image and ensures your employees, clients, and partners have a comfortable, dignified restroom experience. The clean, modern design fits right in with any corporate setting.',
      },
      {
        question: 'Do you serve festivals and large events?',
        answer:
          'Yes, we serve festivals, fairs, and large-scale events throughout our service area. For very large events, we can discuss capacity planning to ensure adequate restroom coverage. Our trailer provides a premium restroom option that event organizers and VIP guests appreciate, even at large outdoor gatherings.',
      },
      {
        question: 'Can the trailer be placed on grass or dirt?',
        answer:
          'Yes, the trailer can be placed on grass, dirt, gravel, or paved surfaces. We bring leveling equipment to ensure the trailer sits stable and level on uneven terrain. The only requirements are that the ground is reasonably firm (not muddy) and that there\'s a clear path for delivery. We\'ll discuss placement details during your booking confirmation to make sure everything goes smoothly.',
      },
    ],
  },
];
