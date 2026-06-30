import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepControlsProps {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function StepControls({ canPrev, canNext, onPrev, onNext }: StepControlsProps) {
  return (
    <div className="step-controls">
      <button
        type="button"
        className="step-controls__btn"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Línea anterior"
      >
        <ChevronLeft size={18} />
        <span>Anterior</span>
      </button>
      <button
        type="button"
        className="step-controls__btn"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Siguiente línea"
      >
        <span>Siguiente</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}