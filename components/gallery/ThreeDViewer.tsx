'use client';

export default function ThreeDViewer() {
  return (
    <div>
      <div className="max-w-4xl mx-auto rounded-card overflow-hidden bg-bg-secondary relative" style={{ height: '600px' }}>
        <iframe
          src="/api/3d-viewer"
          className="w-full h-full border-none"
          style={{ borderRadius: '12px' }}
          allowFullScreen
          title="Interactive 3D Trailer Tour"
        />
      </div>
      <p className="text-text-muted text-sm text-center mt-2">
        Drag to rotate &bull; Scroll to zoom
      </p>
    </div>
  );
}
