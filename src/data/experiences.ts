import { BRAND } from './brand';
import type { ExperienceData, PinConfig } from './types';

export const PROMESA =
  'Vas a entender lo que significa formar parte de algo más grande que vos.';

export const INTRO_NARRATION = [
  'Nada existe completamente solo.',
  'A veces, hace falta ver el panorama completo para darnos cuenta de eso,',
  'y entender que somos parte de algo mucho más grande que nosotros mismos.',
];

export const PINS: PinConfig[] = [
  {
    id: 'faro',
    label: 'Faro',
    building: 'Faro',
    position: [-4.5, 2.2, -3],
    color: BRAND.teal,
    glowColor: BRAND.teal,
    icon: 'lighthouse',
    summary:
      'La inmensidad del océano permite tomar distancia de lo cotidiano y comprender que existimos dentro de sistemas mucho más amplios.',
    music: 'Vivo — Cerati',
    lights: [BRAND.teal, BRAND.cream],
  },
  {
    id: 'museo',
    label: 'Museo',
    building: 'Museo',
    position: [4, 2, -2],
    color: BRAND.burgundy,
    glowColor: BRAND.orange,
    icon: 'landmark',
    summary:
      'Las expresiones artísticas muestran cómo ciertos impulsos humanos atraviesan miles de años y conectan personas separadas por enormes distancias temporales.',
    music: 'Time — Pink Floyd',
    lights: [BRAND.burgundy, BRAND.amber],
  },
  {
    id: 'pareja',
    label: 'Pareja',
    building: 'Estatua de enamorados',
    position: [-2, 2.4, 3.5],
    color: BRAND.amber,
    glowColor: BRAND.orange,
    icon: 'heart',
    summary:
      'El amor aparece representado a través de situaciones cotidianas que revelan cómo emociones aparentemente personales son, en realidad, universales.',
    music: 'Zona de Promesas — Soda Stereo',
    lights: [BRAND.amber, BRAND.cream],
  },
  {
    id: 'obelisco',
    label: 'Obelisco',
    building: 'Obelisco',
    position: [0, 3.5, 0],
    color: BRAND.gray,
    glowColor: BRAND.cream,
    icon: 'monument',
    summary:
      'La ciudad cobra vida gracias a la presencia de las personas que la habitan, demostrando que los espacios adquieren significado a través de quienes los comparten.',
    music: 'En La Ciudad De La Furia — Soda Stereo',
    lights: [BRAND.gray, BRAND.cream],
  },
  {
    id: 'observatorio',
    label: 'Observatorio',
    building: 'Observatorio',
    position: [4.5, 2.5, 2.5],
    color: BRAND.burgundy,
    glowColor: BRAND.teal,
    icon: 'telescope',
    summary:
      'La experiencia amplía la escala hasta mostrar que nuestra existencia también está conectada con procesos cósmicos que hicieron posible nuestra presencia.',
    music: 'Dreams For Plans — Shakira',
    lights: [BRAND.burgundy, BRAND.teal],
  },
  {
    id: 'cierre',
    label: 'Cierre',
    building: 'Escuela Da Vinci',
    position: [-3.5, 2.8, 0.5],
    color: BRAND.amber,
    glowColor: BRAND.orange,
    icon: 'graduation-cap',
    summary:
      'Luego de recorrer todos los espacios, los propios participantes pasan a formar parte de la obra.',
    music: 'Heroes — Bowie',
    lights: [BRAND.amber, BRAND.orange],
  },
];

export const EXPERIENCES: Record<string, ExperienceData> = {
  faro: {
    id: 'faro',
    title: 'El Faro',
    subtitle: 'La inmensidad del océano',
    music: 'Vivo — Gustavo Cerati',
    ambientSound: 'Tormenta cuadrafónica · Guitarra acústica · Agua',
    lights: [BRAND.teal, BRAND.cream],
    intro: [
      'A veces, tenés que sentirte minúsculo para darte cuenta de todo lo que sos.',
      'Hace un tiempo, alguien lo entendía muy bien.',
      'Y creía que el fin del mar, es sentirse más vivo',
    ],
    narrations: [
      {
        text: 'Porque hay algo raro que pasa cuando te enfrentás a algo tan inmenso.',
        visual: 'Sumergido en el mar, apuntando hacia arriba',
      },
      {
        text: 'Cuando te das cuenta que flotás en el mismo agua que existió hace millones de años.',
        visual: 'Inmensidad del vacío del mar',
      },
      {
        text: 'Y que va a quedarse ahí por mucho tiempo más.',
        delay: 1.5,
      },
      {
        text: 'De golpe, todo lo demás parece mucho más chico.',
        visual: 'Un barco flotando en el medio del océano',
      },
      {
        text: 'Pero también, es cuando entendés que formás parte de algo mucho más grande que vos.',
        delay: 2,
      },
    ],
    loopDescription:
      'Pequeños peces nadando por las pantallas. Los peces se alejan si te acercás. Loop hasta regresar.',
  },

  museo: {
    id: 'museo',
    title: 'El Museo',
    subtitle: 'Dejá tu marca',
    music: 'Música primitiva → Time — Pink Floyd',
    ambientSound: 'Chasquido de piedras · Fuego crujiendo · Viento',
    lights: [BRAND.burgundy, BRAND.amber],
    intro: [
      'Hace miles de años, alguien mezcló minerales y apoyó su mano sobre una pared.',
      'Caló huecos en un hueso, lo sopló, y encontró un ritmo.',
      'Se movió. Sincronizó sus movimientos con los sonidos.',
    ],
    narrations: [
      {
        text: 'Se sintió tan bien, que nunca dejamos de hacerlo.',
        visual: 'Marcas de manos en la pared de roca',
      },
      {
        text: 'Quizás ese fue el momento que nos volvimos humanos.',
        visual: 'El fuego se apaga — las pantallas se oscurecen',
      },
      {
        text: 'Dejando una marca en algún lado demostrando que estuvimos acá, dibujandote como un caballero noble de chico o como un dragón.',
        visual: 'Mesa/pizarrón con dibujos cayendo',
      },
      {
        text: 'Inmortalizando en una pared a la persona que te gusta.',
      },
      {
        text: 'Bailando con los demás. Girando, y pisando sin querer.',
        visual: 'Figuras humanas estilizadas cantando y bailando',
      },
      {
        text: 'Pisando también para marcar un tempo. Golpeandote el pecho. Cantando.',
      },
      {
        text: 'De tanto repetirlo, mejoramos un poquito (aunque a veces cueste, y tengamos que seguir practicando).',
        visual: 'Un niño practicando un instrumento',
      },
      {
        text: 'Dicen que el arte es eso, cuestión de práctica.',
      },
      {
        text: 'Por suerte, empezamos hace rato.',
        visual: 'Agujero negro absorbe todos los dibujos',
      },
    ],
    loopDescription:
      'Fuego dentro de la cueva. La cámara gira mostrando dibujos rupestres. Loop hasta regresar.',
  },

  pareja: {
    id: 'pareja',
    title: 'Pareja',
    subtitle: 'El amor en lo cotidiano',
    music: 'Zona de Promesas — Soda Stereo (Modificada)',
    ambientSound: 'Ambiente íntimo · Transición Ámbar y Rosa viejo',
    lights: [BRAND.amber, BRAND.orange],
    intro: [
      'Seguramente hayas escuchado que el amor llega cuando menos te lo esperás.',
    ],
    narrations: [
      {
        text: 'O que nos tenemos que preparar para él, ir perfumados a la primera cita y no dividir la cuenta.',
        visual: 'Hombre en restaurante tomando vino',
      },
      {
        text: 'Que la persona indicada nos va a ir a buscar corriendo al aeropuerto dramáticamente.',
        visual: 'Hombre corriendo por aeropuerto → abraza a mujer con valija',
      },
      {
        text: 'Y aunque todo eso puede pasar, la verdad es que el amor está también en cosas mucho menos espectaculares.',
        visual: 'Perro jugando en el parque · Persona se sienta con el hombre solo',
      },
      {
        text: 'Una tarde cualquiera, te pegan los rayos del sol en la cara y aparece.',
        visual: 'Niño agarrado de la mano de su papá',
      },
      {
        text: 'Aparece cuando un olor te devuelve a la casa de tus abuelos.',
        visual: 'Niños en bicicleta · Anciana alimentando palomas',
      },
      {
        text: 'En una canción que te recuerda a alguien.',
        visual: 'Abuelos jugando ajedrez · Madre atando corbata',
      },
      {
        text: 'En un abrazo, en un reencuentro.',
        visual: 'Pareja bailando en cocina · Compartiendo auriculares',
      },
      {
        text: 'Cuando un perro corre a saludarte como si hubieras vuelto después de años.',
        visual: 'Amigos en un bar · Empujando un auto',
      },
      {
        text: 'Cuando tu mamá te escuchó reír por primera vez.',
        visual: 'Perro y chico con rama · Gatos durmiendo',
      },
      {
        text: 'Aunque el amor se vea de manera distinta, todos lo compartimos, lo buscamos, lo lloramos y lo extrañamos.',
        visual: 'Cumpleaños familiar · Hilos blancos uniendo imágenes',
      },
      {
        text: 'Y cuando creés que te hace falta, rara vez va a aparecer como te lo imaginás. Quizás es mejor así. Si estuviera reservado para momentos extraordinarios, lo encontrarías muy pocas veces.',
      },
      {
        text: 'Por suerte, si sabés reconocerlo, es de lo más común que hay.',
        visual: 'Hilos y ventanas forman la figura de la estatua',
      },
    ],
    loopDescription:
      'Tres edificios emergen. Luces de departamentos encendiéndose con escenarios cotidianos. Loop hasta regresar.',
  },

  obelisco: {
    id: 'obelisco',
    title: 'El Obelisco',
    subtitle: 'La ciudad de la furia',
    music: 'En La Ciudad De La Furia — Soda Stereo',
    ambientSound: 'Loop instrumental · Voces urbanas · Sonido de ciudad',
    lights: [BRAND.gray, BRAND.cream],
    intro: [
      'No las vemos así todos los días, pero estas son las calles de Buenos Aires vacías.',
      'Repleta de edificios grises de cemento, altos, imponentes.',
    ],
    narrations: [
      {
        text: 'Pero esas calles se convierten en una carcasa vacía si no tiene las voces que ocupan el espacio, las risas que se escapan de los bares, los aplausos que hacen vibrar sus teatros.',
        visual: 'Buenos Aires inmóvil — semáforos en amarillo, calles vacías',
      },
      {
        text: 'Porque el verdadero alma de la ciudad está en su gente, en el mozo que saluda al cliente de siempre, los amigos que estiran una charla hasta la madrugada, el músico que toca en la H para los estudiantes que van a Facultad de Derecho, los tacheros que manejan a las chapas, la gente que cambia billetes en Florida.',
        visual: 'Micrófono iluminado · Papel con texto',
      },
      {
        text: 'Por más que a veces todos estos escenarios nos parezcan abrumadores, sin ellos, Buenos Aires no se llamaría la ciudad de la furia.',
        visual: 'La ciudad responde a las voces — luces encendiéndose',
      },
    ],
    loopDescription:
      'Cancha de fútbol llena · Bar con comensales · Buenos Aires completamente activa. Loop hasta regresar.',
  },

  observatorio: {
    id: 'observatorio',
    title: 'El Observatorio',
    subtitle: 'Mirando el pasado',
    music: 'Dreams For Plans — Shakira',
    ambientSound: 'Ambiente del observatorio · Silencio del espacio',
    lights: [BRAND.burgundy, BRAND.teal],
    intro: [
      'Para esta parte de la experiencia, por favor ponete los lentes y los auriculares a tu disposición.',
    ],
    narrations: [],
    dialogue: [
      { speaker: 'A', text: '¿Cansado?' },
      { speaker: 'B', text: 'Si, bastante. Pero vale la pena.' },
      { speaker: 'A', text: '¿Por qué?' },
      { speaker: 'B', text: 'Por esto.' },
      { speaker: 'A', text: 'Pero, ¿no es lo mismo que ves todas las noches?' },
      { speaker: 'B', text: 'No. Cada vez que mirás para arriba estás viendo algo que ya pasó.' },
      { speaker: 'A', text: '¿Entonces por qué las vemos?' },
      { speaker: 'B', text: 'Porque la luz todavía sigue viajando.' },
      { speaker: 'A', text: 'O sea que estamos mirando el pasado.' },
      { speaker: 'B', text: 'Todo el tiempo.' },
      { speaker: 'B', text: 'Qué loco, ¿no?', delay: 1.5 },
      { speaker: 'A', text: 'Loquísimo.', delay: 1 },
      { speaker: 'A', text: 'A veces me gusta pensar que hay alguien más mirando la luna al mismo tiempo que yo.', delay: 2 },
      { speaker: 'B', text: 'Si, seguramente muchas personas. Y piensan lo mismo.' },
      { speaker: 'A', text: 'Es mucha coincidencia.' },
      { speaker: 'B', text: '¿Qué cosa? ¿Que haya dos personas viendo lo mismo?' },
      { speaker: 'A', text: 'No, todo. Que estemos acá, que haya explotado todo y de esas partículas minúsculas salieron todos los planetas, los soles, la Tierra, vos, yo. O sea, estamos arriba de una piedra que flota en el espacio.' },
      { speaker: 'B', text: 'Sí, es verdad. Es re loco. Era más probable que no pasara nada de eso.' },
      { speaker: 'B', text: 'Qué bueno, ¿no? Que estemos, digo.', delay: 1.5 },
      { speaker: 'A', text: '¿Flotando en una piedra?' },
      { speaker: 'B', text: 'No, boludo, en estas reposeras. Sí, que estemos acá y podamos ver todo esto.' },
      { speaker: 'A', text: 'Te quiero, amigo.' },
      { speaker: 'B', text: 'Yo también.' },
    ],
    finalText:
      'Después de todo este tiempo, una parte del universo encontró la forma de observarse a sí misma gracias a vos.',
    loopDescription:
      'Explosiones solares, la vía láctea, los planetas del sistema solar. Loop hasta regresar.',
  },

  cierre: {
    id: 'cierre',
    title: 'Cierre',
    subtitle: 'Escuela Da Vinci',
    music: 'Heroes — David Bowie',
    ambientSound: 'Voz en off · Fundido desde negro',
    lights: [BRAND.amber, BRAND.orange],
    intro: [
      'Nada existe completamente solo.',
      'Ni siquiera vos.',
      'Porque todas las cosas que viste tienen algo en común.',
      'Y es que vos también formás parte de ellas.',
    ],
    narrations: [],
    loopDescription:
      'Formas de los participantes captadas en tiempo real, alteradas de manera abstracta. Vos formás parte de la obra.',
  },
};