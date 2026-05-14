export interface Gym {
  id: string;
  title: string;
  location: string;
  img: string;
  tagline: string;
  description: string[];
  features: string[];
  address: string;
  hours: string;
  instagram: string;
  instagramHandle: string;
  phone?: string;
  headCoach: string;
  instructors: string[];
  lat: number;
  lng: number;
  focus: string[];
}

export const gyms: Gym[] = [
  {
    id: "01",
    title: "TEAM MAS Buenos Aires",
    location: "Buenos Aires",
    img: "/images/sede-buenosaires.jpg",
    tagline: "La sede principal. Donde todo comenzó.",
    description: [
      "Ubicada en el corazón de Buenos Aires, esta es la sede principal de Team MAS BJJ. Bajo la dirección del Profesor Danilo Kiev, ofrecemos clases para todos los niveles, desde principiantes hasta competidores de élite.",
      "Nuestras instalaciones cuentan con más de 200m² de tatami de alta calidad, área de pesas, vestuarios completos y un ambiente familiar que caracteriza a Team MAS.",
    ],
    features: [
      "Más de 200m² de tatami profesional",
      "Clases todos los días de la semana",
      "Programas: Fundamentos, Avanzados, No-Gi, Competición",
      "Judo para BJJ integrado",
      "Open Mat los sábados",
      "Área de conditioning y pesas",
    ],
    address: "Av. Congreso 2752, Buenos Aires 1428",
    hours: "Lunes a Sábados",
    instagram: "https://www.instagram.com/team_mas_buenosaires/",
    instagramHandle: "@team_mas_buenosaires",
    phone: "+54 9 11 0000-0000",
    headCoach: "Prof. Danilo Kiev",
    instructors: ["Prof. Danilo Kiev", "Fede Martinez"],
    lat: -34.6037,
    lng: -58.3816,
    focus: ["Fundamentos", "Avanzados", "No-Gi", "Competición", "Judo para BJJ"],
  },
  {
    id: "02",
    title: "TEAM MAS Olivos",
    location: "Olivos",
    img: "/images/sede-olivos.jpg",
    tagline: "Entrenamiento inteligente en la zona norte.",
    description: [
      "Team MAS Olivos lleva la metodología Team MAS a la zona norte del Gran Buenos Aires. Dirigida por el Profesor Danilo Kiev con el instructor Marcelo Lang, esta sede se enfoca en fundamentos sólidos y entrenamiento inteligente.",
      "Ofrecemos clases para adultos de todos los niveles, con especial atención en la técnica y el desarrollo personal de cada alumno.",
    ],
    features: [
      "Tatami profesional de alta calidad",
      "Clases de Fundamentos y No-Gi",
      "Defensa Personal",
      "Ambiente familiar y acogedor",
      "Horarios flexibles",
      "Instructores certificados",
    ],
    address: "Olivos, Buenos Aires",
    hours: "Consultar horarios",
    instagram: "https://www.instagram.com/team_mas_olivos/",
    instagramHandle: "@team_mas_olivos",
    headCoach: "Prof. Danilo Kiev",
    instructors: ["Marcelo Lang"],
    lat: -34.5071,
    lng: -58.4908,
    focus: ["Fundamentos", "No-Gi", "Defensa Personal"],
  },
  {
    id: "03",
    title: "TEAM MAS Villa Urquiza",
    location: "Villa Urquiza",
    img: "/images/sede-urquiza.jpg",
    tagline: "Disciplina y técnica en Villa Urquiza.",
    description: [
      "La sede Villa Urquiza representa el espíritu de superación de Team MAS. Con el Profesor Danilo Kiev como Head Coach y el instructor Guido como referente local, esta academia combina tradición e innovación.",
      "Instalaciones modernas dentro del Instituto Potencia, con acceso a equipamiento completo y un equipo de instructores dedicados.",
    ],
    features: [
      "Instalaciones en Instituto Potencia",
      "Clases de Fundamentos y Avanzados",
      "Programa No-Gi",
      "Entrenamiento físico integrado",
      "Ambiente de equipo y camaradería",
      "Acceso a seminarios y eventos",
    ],
    address: "Av. de los Constituyentes 4584, Buenos Aires",
    hours: "Consultar horarios",
    instagram: "https://www.instagram.com/team_mas_urquiza/",
    instagramHandle: "@team_mas_urquiza",
    headCoach: "Prof. Danilo Kiev",
    instructors: ["Guido (@_lavidaesunespejo_)"],
    lat: -34.5735,
    lng: -58.4783,
    focus: ["Fundamentos", "Avanzados", "No-Gi"],
  },
  {
    id: "04",
    title: "TEAM MAS Rosario",
    location: "Rosario",
    img: "/images/sede-rosario.jpg",
    tagline: "Más de 25 años de experiencia en Rosario.",
    description: [
      "Team MAS Rosario es nuestra sede con más trayectoria, con más de 25 años formando practicantes en la ciudad. Ofreciendo clases para kids y adultos, con fundamentos sólidos y entrenamiento inteligente.",
      "El equipo de Rosario ha producido numerosos campeones regionales y nacionales, manteniendo siempre el enfoque en la técnica y los valores del Jiu-Jitsu.",
    ],
    features: [
      "Más de 25 años de trayectoria",
      "Clases Kids y Adultos",
      "Programa de competición",
      "Fundamentos sólidos garantizados",
      "Entrenamiento inteligente",
      "Equipo de instructores experimentados",
    ],
    address: "Colón 1751, Rosario 2000",
    hours: "Lunes a Sábados",
    instagram: "https://www.instagram.com/team_mas_bjj/",
    instagramHandle: "@team_mas_bjj",
    headCoach: "Prof. Danilo Kiev",
    instructors: ["Instructor Rosario"],
    lat: -32.9442,
    lng: -60.6505,
    focus: ["Kids", "Adultos", "Fundamentos", "Competición"],
  },
];
