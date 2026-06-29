import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { EXPERIENCES } from '../../data/experiences';
import { useExperience } from '../../context/ExperienceContext';
import { MEDIA_PATHS } from '../../data/media';
import { AudioPlayer } from '../ui/AudioPlayer';
import { NarrationText } from '../ui/NarrationText';
import { DrawingCanvas } from '../ui/DrawingCanvas';
import { DialoguePanel } from '../ui/DialoguePanel';
import { LoopVideo } from '../ui/LoopVideo';
import { ExperienceVisuals } from './ExperienceVisuals';
import type { PinId } from '../../data/types';

interface ExperiencePlayerProps {
  experienceId: PinId;
}

export function ExperiencePlayer({ experienceId }: ExperiencePlayerProps) {
  const data = EXPERIENCES[experienceId];
  const { closeExperience, setInLoop } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDrawing, setShowDrawing] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);

  const media = MEDIA_PATHS[experienceId];

  const allTexts = [
    ...data.intro,
    ...data.narrations.map((n) => n.text),
    ...(data.finalText ? [data.finalText] : []),
  ];

  const isDialogue = !!data.dialogue?.length;

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' },
    );
  }, []);

  useEffect(() => {
    if (isDialogue) return;

    if (phase >= allTexts.length) {
      setIsLoop(true);
      setInLoop(true);
      return;
    }

    setCurrentText(allTexts[phase]);

    if (experienceId === 'museo' && phase === 2) {
      setShowDrawing(true);
    }

    const narration = data.narrations[phase - data.intro.length];
    const delay = (narration?.delay ?? 4) * 1000;

    const timer = setTimeout(() => setPhase((p) => p + 1), delay);
    return () => clearTimeout(timer);
  }, [phase, allTexts.length, data, experienceId, isDialogue, setInLoop]);

  useEffect(() => {
    if (!isDialogue || !data.dialogue) return;

    if (dialogueIndex >= data.dialogue.length) {
      if (data.finalText) {
        setShowFinalText(true);
        setCurrentText(data.finalText);
        const timer = setTimeout(() => {
          setIsLoop(true);
          setInLoop(true);
        }, 6000);
        return () => clearTimeout(timer);
      }
      setIsLoop(true);
      setInLoop(true);
      return;
    }

    const line = data.dialogue[dialogueIndex];
    setCurrentText(`${line.speaker}: ${line.text}`);

    const delay = (line.delay ?? 2.5) * 1000;
    const timer = setTimeout(() => setDialogueIndex((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [dialogueIndex, data, isDialogue, setInLoop]);

  const handleRegresar = useCallback(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: closeExperience,
    });
  }, [closeExperience]);

  const progress = isDialogue
    ? dialogueIndex / (data.dialogue?.length ?? 1)
    : phase / allTexts.length;

  return (
    <motion.div
      ref={containerRef}
      className={`experience-player experience-player--${experienceId}`}
      style={{
        '--light-1': data.lights[0],
        '--light-2': data.lights[1],
      } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="experience-player__lights">
        <div className="experience-light experience-light--left" />
        <div className="experience-light experience-light--right" />
      </div>

      <ExperienceVisuals
        experienceId={experienceId}
        phase={isDialogue ? dialogueIndex : phase}
        isLoop={isLoop}
      />

      <header className="experience-player__header">
        <button className="experience-player__back" onClick={handleRegresar}>
          <ArrowLeft size={20} />
          <span>Regresar</span>
        </button>
        <div className="experience-player__meta">
          <h2>{data.title}</h2>
          <span>{data.subtitle}</span>
        </div>
      </header>

      {media.youtubeId && (
        <div className="experience-player__music-bar">
          <AudioPlayer
            variant="bar"
            track={data.music}
            ambient={data.ambientSound}
            audioSrc={media.audio}
            ambientSrc={media.ambient}
            youtubeId={media.youtubeId}
            youtubeUrl={media.youtubeUrl}
          />
        </div>
      )}

      <LoopVideo src={media.video} visible={isLoop} />

      <main
        className={`experience-player__content ${
          isDialogue ? 'experience-player__content--dialogue' : ''
        }`}
      >
        {isDialogue && data.dialogue ? (
          <DialoguePanel
            lines={data.dialogue}
            activeIndex={dialogueIndex}
            finalText={data.finalText}
            showFinal={showFinalText}
          />
        ) : (
          <NarrationText text={currentText} size="xl" />
        )}

        {showDrawing && experienceId === 'museo' && <DrawingCanvas />}

        {experienceId === 'cierre' && phase >= 1 && (
          <motion.div
            className="cierre-participant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="cierre-participant__camera">
              <div className="cierre-participant__feed">
                <span>Tu silueta, alterada, forma parte de la obra</span>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="experience-player__footer">
        <div className="experience-player__progress">
          <motion.div
            className="experience-player__progress-bar"
            animate={{ width: `${progress * 100}%` }}
          />
        </div>

        {isLoop && (
          <motion.div
            className="experience-player__loop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RotateCcw size={16} />
            <span>{data.loopDescription}</span>
            <button className="btn-regresar" onClick={handleRegresar}>
              Regresar a la maqueta
            </button>
          </motion.div>
        )}
      </footer>

      <div className="experience-player__fog" />
    </motion.div>
  );
}