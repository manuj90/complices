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
import { StepControls } from '../ui/StepControls';
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
  const [faroSplitOpen, setFaroSplitOpen] = useState(false);

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
    if (experienceId !== 'faro') {
      setFaroSplitOpen(false);
      return;
    }
    setFaroSplitOpen(false);
    const timer = setTimeout(() => setFaroSplitOpen(true), 1600);
    return () => clearTimeout(timer);
  }, [experienceId]);

  useEffect(() => {
    if (isDialogue) return;

    if (phase >= allTexts.length) {
      setIsLoop(true);
      setInLoop(true);
      return;
    }

    setCurrentText(allTexts[phase]);
    setShowDrawing(experienceId === 'museo' && phase >= 2);

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

    setShowFinalText(false);
    const line = data.dialogue[dialogueIndex];
    setCurrentText(`${line.speaker}: ${line.text}`);

    const delay = (line.delay ?? 2.5) * 1000;
    const timer = setTimeout(() => setDialogueIndex((i) => i + 1), delay);
    return () => clearTimeout(timer);
  }, [dialogueIndex, data, isDialogue, setInLoop]);

  const exitLoop = useCallback(() => {
    setIsLoop(false);
    setInLoop(false);
  }, [setInLoop]);

  const handlePrev = useCallback(() => {
    exitLoop();

    if (isDialogue && data.dialogue) {
      if (showFinalText) {
        setShowFinalText(false);
        setDialogueIndex(data.dialogue.length - 1);
        return;
      }
      setDialogueIndex((i) => Math.max(0, i - 1));
      return;
    }

    setPhase((p) => Math.max(0, p - 1));
  }, [data.dialogue, exitLoop, isDialogue, showFinalText]);

  const handleNext = useCallback(() => {
    exitLoop();

    if (isDialogue && data.dialogue) {
      if (showFinalText) {
        setIsLoop(true);
        setInLoop(true);
        return;
      }

      if (dialogueIndex >= data.dialogue.length - 1) {
        if (data.finalText) {
          setShowFinalText(true);
        } else {
          setDialogueIndex(data.dialogue.length);
        }
        return;
      }

      setDialogueIndex((i) => i + 1);
      return;
    }

    if (phase >= allTexts.length - 1) {
      setPhase(allTexts.length);
      return;
    }

    setPhase((p) => p + 1);
  }, [
    allTexts.length,
    data.dialogue,
    data.finalText,
    dialogueIndex,
    exitLoop,
    isDialogue,
    phase,
    setInLoop,
    showFinalText,
  ]);

  const handleRegresar = useCallback(() => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      onComplete: closeExperience,
    });
  }, [closeExperience]);

  const canPrev = isDialogue
    ? dialogueIndex > 0 || showFinalText
    : phase > 0;

  const canNext = isDialogue
    ? showFinalText || dialogueIndex < data.dialogue!.length
    : phase < allTexts.length;

  const progress = isDialogue
    ? showFinalText
      ? 1
      : dialogueIndex / (data.dialogue?.length ?? 1)
    : Math.min(phase / allTexts.length, 1);

  const isFaroSplitOpen = experienceId === 'faro' && (faroSplitOpen || isLoop);

  return (
    <motion.div
      ref={containerRef}
      className={`experience-player experience-player--${experienceId}${
        isFaroSplitOpen ? ' experience-player--faro-open' : ''
      }`}
      style={
        {
          '--light-1': data.lights[0],
          '--light-2': data.lights[1],
        } as React.CSSProperties
      }
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
        splitOpen={isFaroSplitOpen}
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
        {(media.youtubeId || media.audio) && (
          <div className="experience-player__music-control">
            <AudioPlayer
              track={data.music}
              audioSrc={media.audio}
              ambientSrc={media.ambient}
              youtubeId={media.youtubeId}
            />
          </div>
        )}
      </header>

      <main
        className={`experience-player__content${
          isDialogue ? ' experience-player__content--dialogue' : ''
        }${experienceId === 'cierre' ? ' experience-player__content--cierre' : ''}${
          experienceId === 'pareja' ? ' experience-player__content--pareja' : ''
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
          <div
            className={`experience-player__narration-slot${
              experienceId === 'cierre' ? ' experience-player__narration-slot--cierre' : ''
            }`}
          >
            <NarrationText text={currentText} size="xl" />
          </div>
        )}

        {showDrawing && experienceId === 'museo' && <DrawingCanvas />}

        {experienceId === 'cierre' && phase >= 1 && (
          <div className="cierre-participant">
            <div className="cierre-participant__camera">
              <div className="cierre-participant__feed">
                <span>Tu silueta, alterada, forma parte de la obra</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="experience-player__footer">
        {!isLoop && (
          <StepControls
            canPrev={canPrev}
            canNext={canNext}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

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