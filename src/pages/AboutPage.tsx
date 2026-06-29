import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Layers, Sparkles } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { PINS, PROMESA } from '../data/experiences';

export function AboutPage() {
  return (
    <div className="about-page">
      <motion.div
        className="about-page__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/" className="about-page__back">
          <ArrowLeft size={18} />
          Volver a la maqueta
        </Link>

        <Logo variant="about" />
        <p className="about-page__tagline">{PROMESA}</p>

        <div className="about-page__meta">
          <div className="about-page__meta-item">
            <Clock size={20} />
            <div>
              <strong>Duración</strong>
              <span>25 – 30 minutos</span>
            </div>
          </div>
          <div className="about-page__meta-item">
            <Layers size={20} />
            <div>
              <strong>Formato</strong>
              <span>Instalación inmersiva · Maqueta + Proyección + AR</span>
            </div>
          </div>
          <div className="about-page__meta-item">
            <Sparkles size={20} />
            <div>
              <strong>Experiencia</strong>
              <span>5 recorridos + cierre final</span>
            </div>
          </div>
        </div>

        <section className="about-page__section">
          <h2>Arquitectura</h2>
          <p>
            La experiencia comienza en una habitación oscura, con humo bajo y un ruido
            vibracional grave. En el medio hay una estructura de tul con una maqueta de
            ciudad y una pantalla táctil. Detrás de cada tul, un proyector.
          </p>
          <p>
            Los participantes navegan libremente por la maqueta y activan pines sobre
            edificios emblemáticos. Cada pin despliega una experiencia audiovisual
            independiente con mapping y sonido 360°.
          </p>
        </section>

        <section className="about-page__section">
          <h2>Espacios</h2>
          <div className="about-page__spaces">
            {PINS.map((pin) => (
              <div
                key={pin.id}
                className="about-page__space"
                style={{ borderColor: pin.glowColor }}
              >
                <h3>{pin.label}</h3>
                <span>{pin.building}</span>
                <p>{pin.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}