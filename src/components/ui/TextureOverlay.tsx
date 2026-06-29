export function TextureOverlay() {
  return (
    <div className="texture-overlay" aria-hidden="true">
      <div className="texture-overlay__gradient" />
      <div className="texture-overlay__halftone" />
      <div className="texture-overlay__noise" />
      <div className="texture-overlay__scan" />
    </div>
  );
}