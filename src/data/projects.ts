export type ProjectCategory = "web" | "mobile" | "branding" | "seo" | "ecommerce"

export interface Project {
  id: string
  slug: string
  number: string
  title: string
  client: string
  category: ProjectCategory
  tags: string[]
  description: string
  fullDescription: string
  image: string
  imageAlt: string
  year: string
  duration: string
  results: { label: string; value: string }[]
  technologies: string[]
  featured: boolean
  size: "large" | "medium" | "small"
  challenge: string
  solution: string
  services?: string[]
  equation?: string[]
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "refonte-boutique-mode-cotonou",
    number: "01",
    title: "Boutique Mode Cotonou",
    client: "Élégance Africaine",
    category: "ecommerce",
    tags: ["E-commerce", "Next.js", "Stripe"],
    description: "Refonte complète d'une boutique de mode avec paiement en ligne.",
    fullDescription:
      "Nous avons repensé de fond en comble l'expérience digitale d'Élégance Africaine, une boutique de mode établie à Cotonou. L'objectif était de moderniser l'image de marque tout en optimisant le tunnel de conversion. Nous avons développé une boutique en ligne performante sous Next.js avec un système de paiement Stripe intégré, un dashboard admin personnalisé et une expérience mobile first irréprochable. Le résultat : une augmentation drastique du taux de conversion et du trafic organique.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    imageAlt: "Mockup boutique mode Élégance Africaine sur écran desktop et mobile",
    year: "2024",
    duration: "4 semaines",
    results: [
      { label: "Conversion", value: "+127%" },
      { label: "Trafic", value: "+340%" },
      { label: "Délai", value: "4 sem." },
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    featured: true,
    size: "large",
    challenge: "L'ancienne boutique avait un taux d'abandon panier élevé et une image dépassée qui n'inspirait pas confiance aux clients en ligne.",
    solution: "Refonte UX/UI complète avec un tunnel de commande en 3 étapes, paiement Stripe sécurisé et un design premium inspiré des grandes maisons de mode.",
    services: ["Stratégie digitale", "UX/UI Design", "Développement Next.js", "Intégration Stripe", "SEO e-commerce"],
    equation: ["Boutique obsolète", "+", "Tunnel de conversion", "=", "+127% de ventes"],
  },
  {
    id: "2",
    slug: "app-mobile-livraison-abidjan",
    number: "02",
    title: "QuickDeli Abidjan",
    client: "QuickDeli",
    category: "mobile",
    tags: ["React Native", "Node.js", "Maps"],
    description: "Application mobile de livraison à domicile avec géolocalisation temps réel.",
    fullDescription:
      "QuickDeli est une application de livraison à domicile développée pour le marché abidjanais. Elle permet aux utilisateurs de commander des repas, de suivre leur livreur en temps réel sur une carte interactive et de payer directement depuis l'application. Nous avons architecturé le backend avec Node.js et intégré Google Maps API pour une géolocalisation précise. L'application est disponible sur iOS et Android avec une note moyenne de 4.8 étoiles.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    imageAlt: "Application mobile QuickDeli affichée sur un smartphone",
    year: "2024",
    duration: "6 semaines",
    results: [
      { label: "Note store", value: "4.8/5" },
      { label: "Téléchargements", value: "12k+" },
      { label: "Délai", value: "6 sem." },
    ],
    technologies: ["React Native", "Node.js", "Google Maps API", "Firebase"],
    featured: true,
    size: "large",
    challenge: "Le marché de la livraison à Abidjan est compétitif et les utilisateurs exigent une géolocalisation précise et des délais respectés.",
    solution: "Application React Native avec tracking GPS en temps réel, notifications push et un algorithme d'attribution intelligent des livreurs.",
    services: ["Conception mobile", "Développement React Native", "Backend Node.js", "Intégration Maps"],
    equation: ["Commande", "+", "Tracking GPS", "=", "4.8/5 sur les stores"],
  },
  {
    id: "3",
    slug: "identite-visuelle-cabinet-juridique",
    number: "03",
    title: "Cabinet Maître Adjo",
    client: "Cabinet Adjo & Associés",
    category: "branding",
    tags: ["Identité visuelle", "Logo", "Charte"],
    description: "Création d'une identité visuelle premium pour un cabinet d'avocats.",
    fullDescription:
      "Le Cabinet Adjo & Associés souhaitait une identité visuelle qui reflète son sérieux et son ancrage africain. Nous avons conçu un logo monogramme élégant, une palette couleur sobre et chaleureuse, ainsi qu'une charte graphique complète déclinable sur papeterie, site web et réseaux sociaux. Le projet a été livré en deux semaines avec une satisfaction client totale.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    imageAlt: "Charte graphique et logo du Cabinet Maître Adjo",
    year: "2023",
    duration: "2 semaines",
    results: [
      { label: "Satisfaction", value: "100%" },
      { label: "Délai", value: "2 sem." },
    ],
    technologies: ["Figma", "Adobe Illustrator", "After Effects"],
    featured: false,
    size: "medium",
    challenge: "Moderniser l'image d'un cabinet juridique traditionnel sans perdre son aura de sérieux et de confiance.",
    solution: "Identité visuelle minimaliste avec un monogramme personnalisé, typographies serif et une palette vert foncé/or sobre.",
    services: ["Direction artistique", "Création de logo", "Charte graphique"],
    equation: ["Tradition", "+", "Modernité", "=", "Identité forte"],
  },
  {
    id: "4",
    slug: "site-vitrine-clinique-dakar",
    number: "04",
    title: "Clinique Santé Plus",
    client: "Clinique Santé Plus Dakar",
    category: "web",
    tags: ["Site vitrine", "React", "SEO"],
    description: "Site vitrine multilingue pour une clinique médicale à Dakar.",
    fullDescription:
      "La Clinique Santé Plus à Dakar avait besoin d'un site vitrine multilingue (français, anglais, wolof) pour présenter ses services médicaux et faciliter la prise de rendez-vous en ligne. Nous avons développé le site sous Next.js avec un CMS headless (Sanity) pour permettre à l'équipe de gérer facilement le contenu. L'optimisation SEO a permis une forte croissance du trafic organique et une augmentation significative des rendez-vous.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    imageAlt: "Page d'accueil du site de la Clinique Santé Plus Dakar",
    year: "2023",
    duration: "3 semaines",
    results: [
      { label: "Trafic organique", value: "+280%" },
      { label: "Rendez-vous", value: "+95%" },
    ],
    technologies: ["Next.js", "i18n", "Tailwind", "Sanity CMS"],
    featured: false,
    size: "medium",
    challenge: "Le site précédent n'était pas multilingue et n'apparaissait pas dans les résultats Google pour les recherches locales.",
    solution: "Site Next.js avec i18n (français, anglais, wolof), CMS Sanity pour l'autonomie éditoriale et un SEO local optimisé.",
    services: ["Stratégie digitale", "UX/UI Design", "Développement Next.js", "SEO Local"],
  },
  {
    id: "5",
    slug: "seo-restaurant-lome",
    number: "05",
    title: "Le Griot Doré",
    client: "Restaurant Le Griot Doré",
    category: "seo",
    tags: ["SEO Local", "Google My Business"],
    description: "Stratégie SEO locale pour un restaurant traditionnel à Lomé.",
    fullDescription:
      "Le Griot Doré, restaurant emblématique de Lomé, souhaitait améliorer sa visibilité sur Google pour attirer davantage de clients locaux et de tourisme gastronomique. Nous avons mis en place une stratégie SEO local complète : optimisation Google My Business, création de fiches dans les annuaires locaux, netlinking et production de contenu autour de la cuisine togolaise. Résultat en 3 mois : top 3 sur les requêtes principales et plus de 200% de réservations en ligne.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    imageAlt: "Plat typique du restaurant Le Griot Doré à Lomé",
    year: "2023",
    duration: "8 semaines",
    results: [
      { label: "Position Google", value: "Top 3" },
      { label: "Réservations", value: "+210%" },
    ],
    technologies: ["SEO", "Google Analytics", "Search Console"],
    featured: false,
    size: "small",
    challenge: "Le restaurant était invisible sur Google malgré sa réputation locale, et perdait des clients au profit de la concurrence mieux référencée.",
    solution: "Audit SEO complet, optimisation GMB, création de contenu localisé et campagne de netlinking sur des sites gastronomiques africains.",
    services: ["Audit SEO", "SEO Local", "Content Marketing", "Netlinking"],
    equation: ["Invisibilité Google", "+", "Stratégie SEO", "=", "Top 3 Lomé"],
  },
  {
    id: "6",
    slug: "plateforme-formation-en-ligne",
    number: "06",
    title: "EduAfrique LMS",
    client: "EduAfrique",
    category: "web",
    tags: ["LMS", "Next.js", "Vidéo", "Auth"],
    description: "Plateforme e-learning avec système de cours, quiz et certificats.",
    fullDescription:
      "EduAfrique est une plateforme d'apprentissage en ligne dédiée aux compétences numériques en Afrique francophone. Nous avons conçu et développé un LMS complet avec système de cours structuré (vidéos, PDF, quizz), génération de certificats, tableau de bord apprenant et espace administrateur. La stack technique repose sur Next.js, PostgreSQL et Cloudinary pour le streaming vidéo. Aujourd'hui, la plateforme compte plus de 2 500 apprenants actifs.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
    imageAlt: "Interface de la plateforme e-learning EduAfrique",
    year: "2024",
    duration: "8 semaines",
    results: [
      { label: "Apprenants", value: "2 500+" },
      { label: "Cours", value: "48" },
    ],
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Cloudinary"],
    featured: false,
    size: "medium",
    challenge: "Il manquait une plateforme e-learning francophone adaptée aux connexions lentes et aux appareils mobiles majoritaires en Afrique.",
    solution: "LMS optimisé avec streaming vidéo adaptatif, mode hors-ligne pour les PDF et un parcours pédagogique gamifié.",
    services: ["Product Design", "Développement Full Stack", "Architecture Vidéo", "Authentification sécurisée"],
  },
  {
    id: "7",
    slug: "app-gestion-stock-pme",
    number: "07",
    title: "StockPro Manager",
    client: "PME Distribution Bénin",
    category: "mobile",
    tags: ["React Native", "SQLite", "Dashboard"],
    description: "Application de gestion de stock hors-ligne pour PME.",
    fullDescription:
      "StockPro Manager est une application mobile de gestion de stock conçue pour les PME béninoises souvent confrontées à des problèmes de connectivité. L'application fonctionne entièrement hors-ligne grâce à SQLite, synchronise les données dès qu'une connexion est disponible et offre un dashboard visuel des niveaux de stock, alertes de réapprovisionnement et historique des ventes. Gain de temps estimé : 3 heures par jour pour les équipes commerciales.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    imageAlt: "Dashboard de l'application StockPro Manager sur mobile",
    year: "2024",
    duration: "5 semaines",
    results: [
      { label: "Temps gagné", value: "3h/jour" },
      { label: "Erreurs stock", value: "-90%" },
    ],
    technologies: ["React Native", "SQLite", "Redux"],
    featured: false,
    size: "small",
    challenge: "Les PME perdaient du temps et de l'argent à cause d'inventaires manuels et d'erreurs de stock dans des zones à faible connectivité.",
    solution: "Application mobile offline-first avec SQLite, synchronisation cloud et alertes automatiques de seuil de stock critique.",
    services: ["Conception mobile", "Développement React Native", "Base de données locale", "Dashboard analytics"],
    equation: ["Inventaire manuel", "+", "App mobile", "=", "3h gagnées/jour"],
  },
  {
    id: "8",
    slug: "refonte-marque-agro-industrie",
    number: "08",
    title: "AgroGold Bénin",
    client: "AgroGold Export",
    category: "branding",
    tags: ["Rebranding", "Packaging", "Figma"],
    description: "Rebranding complet d'une entreprise agro-industrielle pour l'export international.",
    fullDescription:
      "AgroGold Export, leader agro-industriel béninois, souhaitait moderniser son image pour séduire de nouveaux marchés européens et américains. Notre mission de rebranding a inclus la refonte du logo, la création de packagings premium pour les produits agricoles, la rédaction d'un nouveau story-telling de marque et la production de mockups réalistes. Depuis le lancement, l'entreprise a conquis 3 nouveaux pays et vu ses commandes internationales augmenter de 180%.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
    imageAlt: "Nouveau packaging AgroGold Bénin sur fond neutre",
    year: "2023",
    duration: "6 semaines",
    results: [
      { label: "Nouveaux marchés", value: "3 pays" },
      { label: "Commandes", value: "+180%" },
    ],
    technologies: ["Figma", "Adobe CC", "Mockup"],
    featured: false,
    size: "medium",
    challenge: "L'ancienne image de marque ne transmettait pas la qualité premium des produits et freinait l'expansion à l'international.",
    solution: "Rebranding complet : logo, packaging premium, storytelling de marque et mockups 3D pour les catalogues export.",
    services: ["Direction artistique", "Packaging Design", "Storytelling de marque", "Mockup 3D"],
    equation: ["Image dépassée", "+", "Rebranding premium", "=", "+180% de commandes"],
  },
  {
    id: "9",
    slug: "landing-page-startup-fintech",
    number: "09",
    title: "PayFlow Africa",
    client: "PayFlow",
    category: "web",
    tags: ["Landing page", "Animations", "Conversion"],
    description: "Landing page haute conversion pour une startup fintech africaine.",
    fullDescription:
      "PayFlow Africa est une startup fintech qui propose des solutions de paiement mobile pour les PME africaines. Nous avons conçu une landing page haute conversion avec un storytelling visuel immersif, des animations GSAP soignées et un parcours utilisateur optimisé vers la conversion. La page intègre un calculateur de frais interactif, des témoignages clients et une FAQ dynamique. Résultat : un taux de conversion de 8.4% et plus de 340 leads qualifiés par mois.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    imageAlt: "Landing page PayFlow Africa sur écran d'ordinateur portable",
    year: "2024",
    duration: "2 semaines",
    results: [
      { label: "Taux conversion", value: "8.4%" },
      { label: "Leads/mois", value: "340+" },
    ],
    technologies: ["Next.js", "GSAP", "Framer Motion"],
    featured: false,
    size: "small",
    challenge: "La startup avait besoin d'une landing page qui convertisse rapidement les visiteurs en leads qualifiés pour son lancement.",
    solution: "Landing page single-page avec animations GSAP, preuves sociales, calculateur interactif et CTA répétés stratégiquement.",
    services: ["UX/UI Design", "Développement Next.js", "Animations GSAP", "Optimisation conversion"],
    equation: ["Trafic", "+", "Landing optimisée", "=", "8.4% de conversion"],
  },
]
