import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

const destinations = [
  {
    name: 'Tarabuco',
    province: 'Yamparáez',
    region: 'Valles',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=-19.180353482863758%2C-64.91591734079644',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=-19.180353482863758%2C-64.91591734079644&z=14&output=embed',
    category: 'Cultura viva',
    image:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Paisaje andino de valles y montañas',
    intro:
      'Un encuentro con la cultura Yampara, sus textiles llenos de historias y la energía de sus celebraciones.',
    highlights: ['Pujllay y Ayarichi', 'Mercado dominical', 'Textiles y tejidos Yampara'],
    detail:
      'A unos 65 km de Sucre, Tarabuco reúne cultura viva, música, danza, vestimenta y comercio tradicional. El Pujllay y el Ayarichi de la cultura Yampara forman parte del Patrimonio Cultural Inmaterial de la Humanidad.',
    flavor: 'Lawa uchu, phisara de quinua y wathia',
    kind: 'culture',
  },
  {
    name: 'Azurduy',
    province: 'Azurduy',
    region: 'Valles',
    category: 'Sabores locales',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Luz cálida sobre un valle rural',
    intro:
      'Paisajes de valle, celebraciones comunitarias y productos locales que cuentan la vida de la región.',
    highlights: ['Feria del Queso y la Manzana', 'Virgen de la Candelaria', 'Presa Pampas de Azurduy'],
    detail:
      'La capital provincial combina festividades, producción agropecuaria y paisajes de valles y montañas. La Marcada, la Virgen de la Candelaria y la feria del queso y la manzana son expresiones destacadas de su identidad.',
    flavor: 'Picana, queso artesanal y manzana',
    kind: 'flavor',
  },
  {
    name: 'Villa Serrano',
    province: 'Belisario Boeto',
    region: 'Valles',
    category: 'Cultura viva',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Lago y montañas en un paisaje de altura',
    intro:
      'La cuna del charango gigante y la Navidad chuquisaqueña, entre música, historia y naturaleza.',
    highlights: ['Charango Gigante y su museo', 'Cascada de Pajchani', 'Pinturas rupestres de Nuevo Mundo'],
    detail:
      'Villa Serrano celebra sus tradiciones criollas y serranas. El charango gigante, tallado en una sola pieza de madera, convive con atractivos naturales y sitios de interés arqueológico.',
    flavor: 'Lagua uchú',
    kind: 'culture',
  },
  {
    name: 'Zudáñez',
    province: 'Jaime Zudáñez',
    region: 'Valles',
    category: 'Naturaleza',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Valle montañoso junto a un lago',
    intro:
      'Un valle de cultivos y miradores, con una Semana Santa que se vive a través de música y zapateo.',
    highlights: ['Cerro Calle Calle', 'Katari Mocko', 'Pascua y zapateo zudañense'],
    detail:
      'Zudáñez destaca por sus valles agrícolas y la producción de ají y maíz. El cerro Calle Calle ofrece vistas panorámicas; Katari Mocko es un sitio de interés arqueológico mencionado en la investigación local.',
    flavor: 'Picante de pollo criollo, chicha y garapiña',
    kind: 'nature',
  },
  {
    name: 'Culpina',
    province: 'Sud Cinti',
    region: 'Cintis',
    category: 'Naturaleza',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Cordillera rocosa bajo un cielo despejado',
    intro:
      'Lagunas, pampas y montañas para descubrir la naturaleza y la historia productiva de los Cintis.',
    highlights: ['Laguna de Culpina', 'Cañón del Pilaya', 'Túneles de Kuchu Pujro'],
    detail:
      'En el sur de Chuquisaca, Culpina combina actividad agrícola con valles, pampas y zonas montañosas. El patrimonio local también incluye la Ex Fábrica de Alcohol Toro, construida entre 1935 y 1938.',
    flavor: 'Productos agrícolas y cocina tradicional de los Cintis',
    kind: 'nature',
  },
  {
    name: 'Camargo',
    province: 'Nor Cinti',
    region: 'Cintis',
    category: 'Sabores locales',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Viñedos bañados por la luz de la tarde',
    intro:
      'Tradición vitivinícola, paisajes de valle y sabores que han pasado de generación en generación.',
    highlights: ['Viñedos y singani', 'Valle de las Rocas', 'Hacienda La Palca Chica'],
    detail:
      'Camargo es uno de los referentes de la región de los Cintis por su producción de uva, vino y singani. Sus viñedos forman parte tanto de la economía local como de su identidad cultural.',
    flavor: 'Uva, vino y singani de los Cintis',
    kind: 'flavor',
  },
  {
    name: 'Sopachuy',
    province: 'Tomina',
    region: 'Valles',
    category: 'Vida rural',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Camino que cruza un paisaje rural',
    intro:
      'Un destino para bajar el ritmo y acercarse a las costumbres, los paisajes y la hospitalidad rural.',
    highlights: ['Paisajes de valle', 'Tradiciones comunitarias', 'Sabores de la región'],
    detail:
      'Sopachuy forma parte de los municipios de los valles chuquisaqueños. Es una invitación a conocer la vida local y sus paisajes con respeto por las comunidades y sus costumbres.',
    flavor: 'Gastronomía tradicional de los valles',
    kind: 'rural',
  },
  {
    name: 'Monteagudo',
    province: 'Hernando Siles',
    region: 'Chaco',
    category: 'Aventura',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Sendero entre árboles de un bosque verde',
    intro:
      'Naturaleza chaqueña, cascadas y cañones en una región donde se encuentran distintas culturas.',
    highlights: ['Serranía del Iñao', 'Cascadas de Bohorques', 'Cañón de Heredia'],
    detail:
      'Monteagudo, en el Chaco chuquisaqueño, combina bosques, quebradas y ríos con una identidad chaqueña y guaraní. Su entorno invita al senderismo, la observación de naturaleza y el turismo de aventura responsable.',
    flavor: 'Cocina chaqueña y productos de la región',
    kind: 'adventure',
  },
  {
    name: 'Villa Charcas',
    province: 'Nor Cinti',
    region: 'Cintis',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=-20.72262156211653%2C-64.88528615378962',  
    mapEmbedUrl: 'https://maps.google.com/maps?q=-20.72262156211653%2C-64.88528615378962&z=14&output=embed',
    category: 'Vida rural',
    image: '/img/villaCharcas.jpeg',
    imageAlt: 'Personajes con trajes tradicionales de Chuquisaca',
    intro:
      'Comunidades, cultivos y textiles tradicionales muestran una identidad propia en el corazón de los Cintis.',
    highlights: ['FEXAVICH', 'Tejidos y phullus', 'Rutas rurales y agrícolas'],
    detail:
      'Villa Charcas destaca por su producción agrícola, sus artesanías y sus tradiciones comunitarias. La FEXAVICH reúne producción local, gastronomía y cultura. Es un municipio de Nor Cinti; su capital provincial es Camargo.',
    flavor: 'Productos agrícolas, quesos y comidas locales',
    kind: 'rural',
  },
  {
    name: 'Villa Vaca Guzmán',
    province: 'Luis Calvo',
    region: 'Chaco',
    category: 'Cultura viva',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Bosque chaqueño de vegetación frondosa',
    intro:
      'Muyupampa abre la puerta a paisajes chaqueños y a la cultura guaraní de Chuquisaca.',
    highlights: ['Serranía del Iñao', 'Comunidad de Tentayapi', 'Arete Guasu'],
    detail:
      'Villa Vaca Guzmán, también conocida como Muyupampa, es la capital de la provincia Luis Calvo. Su entorno reúne bosques, serranías y una fuerte relación con la cultura guaraní y el Chaco.',
    flavor: 'Pacumutu, chivo a la cruz y macerados de cítricos',
    kind: 'culture',
  },
];

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'culture', label: 'Cultura viva' },
  { id: 'nature', label: 'Naturaleza' },
  { id: 'flavor', label: 'Sabores' },
  { id: 'adventure', label: 'Aventura' },
  { id: 'rural', label: 'Vida rural' },
];

const foodImages = [
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85',
    alt: 'Mesa con distintas preparaciones de comida, imagen ilustrativa',
  },
  {
    src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=85',
    alt: 'Plato de comida servido con ingredientes frescos, imagen ilustrativa',
  },
  {
    src: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    alt: 'Preparación de comida con vegetales y granos, imagen ilustrativa',
  },
];

function FoodCarousel({ compact = false }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = foodImages[activeImageIndex];

  const showImage = (direction) => {
    setActiveImageIndex(
      (currentIndex) => (currentIndex + direction + foodImages.length) % foodImages.length,
    );
  };

  return (
    <div
      className={`food-carousel${compact ? ' food-carousel-compact' : ''}`}
      role="group"
      aria-label="Carrusel de imágenes ilustrativas de comida"
    >
      <div className="food-carousel-image-wrap">
        <img src={activeImage.src} alt={activeImage.alt} loading="lazy" />
        <button
          className="food-carousel-control food-carousel-previous"
          type="button"
          onClick={() => showImage(-1)}
          aria-label="Mostrar imagen anterior de comida"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="food-carousel-control food-carousel-next"
          type="button"
          onClick={() => showImage(1)}
          aria-label="Mostrar siguiente imagen de comida"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="food-carousel-caption">
        <span>Imágenes ilustrativas</span>
        <span aria-live="polite">
          {activeImageIndex + 1} / {foodImages.length}
        </span>
      </div>
    </div>
  );
}

function DestinationCard({ destination, onOpen }) {
  return (
    <article className="destination-card">
      <button
        className="destination-card-main"
        onClick={() => onOpen(destination)}
        type="button"
        aria-label={`Descubrir ${destination.name}`}
      >
        <span
          className={
            destination.name === 'Villa Charcas'
              ? 'card-image-wrap card-image-wrap-contain'
              : 'card-image-wrap'
          }
        >
          <img src={destination.image} alt={destination.imageAlt} loading="lazy" />
          <span className="card-category">{destination.category}</span>
          <span className="card-arrow" aria-hidden="true">
            <ArrowUpRight size={19} strokeWidth={1.8} />
          </span>
        </span>
        <span className="card-content">
          <span className="card-location">
            <MapPin size={13} strokeWidth={1.8} />
            {destination.province}
          </span>
          <span className="card-title">{destination.name}</span>
          <span className="card-intro">{destination.intro}</span>
          <span className="card-highlights">{destination.highlights.slice(0, 2).join(' · ')}</span>
        </span>
      </button>
      <div className="card-food-note">
        <span className="card-food-label">Comida típica</span>
        <span>{destination.flavor}</span>
        <FoodCarousel compact />
      </div>
      {destination.mapUrl && (
        <a
          className="destination-map-link"
          href={destination.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={13} />
          Ver ubicación en Google Maps
          <ArrowUpRight size={13} />
        </a>
      )}
    </article>
  );
}

function DestinationDialog({ destination, onClose }) {
  if (!destination) return null;

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="destination-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <button className="dialog-close" onClick={onClose} type="button" aria-label="Cerrar ficha">
          <X size={20} />
        </button>
        <img
          src={destination.image}
          alt={destination.imageAlt}
          className={
            destination.name === 'Villa Charcas'
              ? 'dialog-image dialog-image-contain'
              : 'dialog-image'
          }
        />
        <div className="dialog-body">
          <span className="dialog-eyebrow">
            {destination.province} · {destination.region}
          </span>
          <h2 id="dialog-title">{destination.name}</h2>
          {destination.mapUrl && (
            <div className="map-preview-card">
              {destination.mapEmbedUrl && (
                <iframe
                  className="map-preview-frame"
                  src={destination.mapEmbedUrl}
                  title={`Mapa de ${destination.name} en Google Maps`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
              <div className="map-preview-footer">
                <span className="map-preview-place">
                  <MapPin size={16} />
                  <span>
                    <strong>{destination.name}</strong>
                    <small>{destination.province}, Chuquisaca</small>
                  </span>
                </span>
                <a
                  className="map-preview-open"
                  href={destination.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ubicación de ${destination.name} en Google Maps`}
                >
                  Abrir mapa <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          )}
          <p>{destination.detail}</p>
          <h3>Para descubrir</h3>
          <ul className="dialog-highlights">
            {destination.highlights.map((highlight) => (
              <li key={highlight}>
                <Sparkles size={15} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="flavor-note">
            <span>Comida típica</span>
            <strong>{destination.flavor}</strong>
            <FoodCarousel />
          </div>
          <p className="local-note">
            Confirma localmente accesos, horarios y disponibilidad antes de organizar tu visita.
          </p>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const visibleDestinations = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('es');

    return destinations.filter((destination) => {
      const matchesFilter = activeFilter === 'all' || destination.kind === activeFilter;
      const searchableText = [
        destination.name,
        destination.province,
        destination.region,
        destination.category,
        ...destination.highlights,
      ]
        .join(' ')
        .toLocaleLowerCase('es');

      return matchesFilter && (!query || searchableText.includes(query));
    });
  }, [activeFilter, searchTerm]);

  return (
    <>
      <header className="site-header">
        <a className="site-logo-link" href="#inicio" aria-label="ChuquiAventuras, inicio">
          <img className="site-logo" src="/img/logo.jpeg" alt="Logo de ChuquiAventuras" />
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#destinos">Destinos</a>
          <a href="#experiencias">Experiencias</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <a className="header-cta" href="#destinos">
          Explorar lugares <ArrowUpRight size={16} />
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90"
            alt=""
            fetchpriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="hero-kicker">
              <span className="kicker-line" />
              CHUQUISACA, BOLIVIA
            </span>
            <h1>
              Hay mucho
              <br />
              <em>por descubrir.</em>
            </h1>
            <p>
              Diez destinos, mil formas de sentir Chuquisaca.
              <br className="desktop-break" /> Encuentra tu próxima historia entre sus valles,
              sabores y culturas.
            </p>
            <a className="hero-button" href="#destinos">
              Encuentra tu aventura <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-caption">
            <span className="caption-dot" />
            Valles, Cintis y Chaco chuquisaqueño
          </div>
          <div className="hero-index">
            <span>01</span>
            <span className="index-rule" />
            <span>10 DESTINOS</span>
          </div>
        </section>

        <section className="intro-section" id="nosotros">
          <div className="intro-overline">
            <span>UN DEPARTAMENTO, MUCHOS MUNDOS</span>
            <span className="overline-dash" />
          </div>
          <div className="intro-copy">
            <h2>
              Chuquisaca se vive
              <br />
              <span>en cada camino.</span>
            </h2>
            <div className="intro-description">
              <p>
                De los tejidos de Tarabuco a los viñedos de los Cintis. De los valles al corazón
                verde del Chaco. Aquí cada municipio tiene su propio ritmo, su paisaje y algo rico
                que compartir.
              </p>
              <a className="text-link" href="#destinos">
                Conoce los destinos <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="intro-facts">
            <div className="fact">
              <span className="fact-number">10</span>
              <span>municipios para explorar</span>
            </div>
            <span className="fact-divider" />
            <div className="fact">
              <span className="fact-number">3</span>
              <span>regiones con identidad propia</span>
            </div>
            <span className="fact-divider" />
            <div className="fact">
              <span className="fact-icon">
                <Leaf size={19} />
              </span>
              <span>una aventura a tu manera</span>
            </div>
          </div>
        </section>

        <section className="destinations-section" id="destinos">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">ARMA TU PROPIO RECORRIDO</span>
              <h2>¿A dónde vamos?</h2>
            </div>
            <p>
              Busca ese lugar que te llama.
              <br />
              La aventura empieza aquí.
            </p>
          </div>

          <div className="explore-toolbar">
            <div className="filter-list" role="group" aria-label="Filtrar destinos">
              {filters.map((filter) => (
                <button
                  className={`filter-button${activeFilter === filter.id ? ' active' : ''}`}
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  type="button"
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} aria-hidden="true" />
              <span className="visually-hidden">Buscar municipio o atractivo</span>
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar un lugar..."
                type="search"
                value={searchTerm}
              />
            </label>
          </div>

          <div className="destination-grid" aria-live="polite">
            {visibleDestinations.map((destination) => (
              <DestinationCard
                destination={destination}
                key={destination.name}
                onOpen={setSelectedDestination}
              />
            ))}
            {visibleDestinations.length === 0 && (
              <p className="empty-state">
                No encontramos destinos con esa búsqueda. Prueba con otro nombre o región.
              </p>
            )}
          </div>
          <p className="results-count">
            {visibleDestinations.length} {visibleDestinations.length === 1 ? 'destino' : 'destinos'}
          </p>
        </section>

        <section className="experience-section" id="experiencias">
          <div className="experience-photo">
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1300&q=85"
              alt="Naturaleza y vida silvestre en un paisaje abierto"
              loading="lazy"
            />
            <span className="photo-label">EL VIAJE TAMBIÉN ES LO QUE SIENTES</span>
          </div>
          <div className="experience-copy">
            <span className="section-eyebrow">VIAJAR CON CURIOSIDAD</span>
            <h2>
              Lo mejor de un lugar
              <br />
              <em>es conocerlo de cerca.</em>
            </h2>
            <p>
              Comparte con respeto. Prueba los sabores locales. Pregunta, escucha y déjate sorprender
              por las historias que hacen único a cada destino.
            </p>
            <a className="experience-link" href="#destinos">
              Empieza a explorar <ArrowRight size={17} />
            </a>
            <span className="experience-stamp">
              <Sparkles size={18} />
              Hecho para descubrir
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a
          className="site-logo-link footer-logo-link"
          href="#inicio"
          aria-label="ChuquiAventuras, inicio"
        >
          <img className="site-logo" src="/img/logo.jpeg" alt="Logo de ChuquiAventuras" />
        </a>
        <p>Historias, cultura y paisajes de Chuquisaca.</p>
        <span className="footer-note">Contenido basado en las investigaciones compartidas.</span>
        <a className="back-top" href="#inicio">
          Volver arriba <ArrowUpRight size={15} />
        </a>
      </footer>

      <DestinationDialog
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </>
  );
}

export default App;
