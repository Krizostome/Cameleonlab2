import type { BlogPost, Category } from '../types/blog'

export const AUTHORS = {
  amine: {
    name: 'Amine Khaoui',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'Fondateur & Lead Developer',
  },
  sarah: {
    name: 'Sarah Benali',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    role: 'Directrice Artistique',
  },
  karim: {
    name: 'Karim Dahmani',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'UX Designer Senior',
  },
  lina: {
    name: 'Lina Moussaoui',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    role: 'Content Strategist',
  },
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'lavenir-du-design-web-2026',
    title: "L'avenir du design web en 2026 : tendances et innovations",
    excerpt:
      "Du design immersif aux interfaces neuronales, découvrez les tendances qui redéfiniront l'expérience utilisateur dans les années à venir. Une analyse approfondie des nouvelles paradigmes.",
    content: `<p>Le design web traverse une période de transformation profonde. Entre l'émergence de l'IA générative, les interfaces immersives et les nouvelles capacités des navigateurs, les créateurs digitaux doivent constamment réinventer leur approche. Dans cet article, nous explorons les tendances qui façonneront le design web en 2026 et au-delà.</p>

<h2>1. Le design immersif devient la norme</h2>

<p>Les expériences web ne se limitent plus à un écran plat. Avec la démocratisation de WebGL et WebGPU, les sites deviennent des environnements tridimensionnels où l'utilisateur navigue au cœur du contenu. Les agences premium comme CameleonLab intègrent déjà ces technologies pour créer des expériences mémorables.</p>

<blockquote>Le design immersif ne consiste pas à ajouter du 3D pour du 3D. Il s'agit de créer une présence émotionnelle et spatiale qui transcende l'écran.</blockquote>

<p>Cette tendance s'accompagne d'une nouvelle exigence : la performance. Un environnement 3D doit rester fluide à 60 images par seconde, même sur mobile. Les outils comme Spline, Three.js et React Three Fiber évoluent rapidement pour répondre à ce défi.</p>

<h2>2. Les interfaces neuronales et le Zero UI</h2>

<p>La reconnaissance vocale, gestuelle et oculaire progresse à pas de géant. Le "Zero UI" — l'idée que les interfaces deviennent invisibles — gagne du terrain. Les utilisateurs interagissent naturellement avec les services sans cliquer sur des boutons.</p>

<p>Pour les designers, cela représente un défi fascinant : comment créer une expérience cohérente lorsque l'interface visuelle disparaît ? La réponse réside dans le design conversationnel, les feedbacks haptiques et les transitions auditives soignées.</p>

<h3>Les implications pour le métier de designer</h3>

<ul>
  <li>Compétences pluridisciplinaires : audio, haptique, motion</li>
  <li>Pensée systémique au-delà du pixel</li>
  <li>Accessibilité comme fondement, non comme option</li>
  <li>Collaboration étroite avec les ingénieurs ML</li>
</ul>

<h2>3. La personnalisation algorithmique éthique</h2>

<p>L'IA permet aujourd'hui d'adapter l'interface en temps réel aux préférences et comportements de chaque utilisateur. Mais cette personnalisation soulève des questions éthiques majeures. Comment offrir une expérience sur-mesure sans tomber dans le piège de la bulle informationnelle ?</p>

<p>Les meilleures pratiques émergentes recommandent :</p>

<ol>
  <li><strong>Transparence</strong> : l'utilisateur comprend pourquoi l'interface s'adapte</li>
  <li><strong>Contrôle</strong> : possibilité de désactiver ou modifier la personnalisation</li>
  <li><strong>Diversité</strong> : introduire volontairement du contenu inattendu</li>
  <li><strong>Privacy by design</strong> : données traitées localement quand possible</li>
</ol>

<img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=675&fit=crop" alt="Interfaces futuristes" />

<h2>4. Le retour du design organique</h2>

<p>Après des années de minimalisme strict et de rectangles aux coins arrondis, on observe un retour aux formes organiques, aux textures naturelles et aux imperfections délibérées. Ce mouvement, parfois appelé "Anti-Design" ou "Neo-Brutalism 2.0", cherche à humaniser le numérique.</p>

<blockquote>La perfection numérique peut être froide. Les imperfections, les textures et les asymétries créent une connexion émotionnelle plus forte avec l'utilisateur.</blockquote>

<h2>5. La durabilité comme contrainte créative</h2>

<p>L'empreinte carbone du web est de plus en plus prise en compte. Les designers doivent désormais optimiser non seulement l'expérience utilisateur, mais aussi l'impact environnemental de leurs créations. Cela se traduit par :</p>

<ul>
  <li>Des palettes de couleurs sombres par défaut (moins d'énergie sur OLED)</li>
  <li>Des animations sobres et pertinentes</li>
  <li>Des images optimisées et des polices locales</li>
  <li>Une architecture légère et performante</li>
</ul>

<h2>Conclusion</h2>

<p>Le design web de 2026 sera à la fois plus immersif, plus intelligent et plus responsable. Les équipes qui réussiront seront celles capables de maîtriser ces nouvelles technologies tout en gardant l'humain au centre de leurs préoccupations. Chez CameleonLab, nous nous préparons activement à ces évolutions pour offrir à nos clients des expériences toujours plus mémorables.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
    category: 'Design',
    tags: ['UI/UX', 'Tendances', 'Innovation', 'Web Design'],
    author: AUTHORS.sarah,
    date: '2026-05-10',
    readTime: '8 min',
    views: 8540,
    likes: 892,
    featured: true,
    popular: true,
  },
  {
    id: '2',
    slug: 'optimiser-performance-react',
    title: 'Optimiser la performance de vos applications React',
    excerpt:
      "Techniques avancées pour réduire le time-to-interactive, optimiser le rendu et garantir une expérience fluide à vos utilisateurs. Du code splitting au memoization.",
    content: `<p>La performance est le fondement d'une bonne expérience utilisateur. Un site lent ne convertit pas, ne retient pas, et pénalise votre référencement. Dans cet article, nous explorons les techniques avancées pour optimiser vos applications React en 2026.</p>

<h2>1. Code splitting stratégique</h2>

<p>Webpack, Vite et les autres bundlers modernes offrent des capacités de lazy loading natives. L'enjeu n'est plus de savoir comment diviser son code, mais où et quand le faire.</p>

<pre><code>// Route-based splitting (react-router v7)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));

// Component-based splitting for heavy UI
const DataTable = lazy(() => import('./components/DataTable'));
const Chart = lazy(() => import('./components/Chart'));</code></pre>

<p>La règle d'or : <strong>split au niveau des routes</strong>, puis identifiez les composants lourds (>30ko gzippé) pour un splitting supplémentaire.</p>

<h2>2. Memoization intelligente</h2>

<p>React.memo, useMemo et useCallback sont des outils puissants, mais mal utilisés, ils peuvent dégrader les performances. N'optimisez pas prématurément. Profilez d'abord avec React DevTools Profiler.</p>

<blockquote>La mémoïsation a un coût. Elle échange de la mémoire CPU contre de la mémoire RAM. Mesurez avant d'optimiser.</blockquote>

<h2>3. State management minimaliste</h2>

<p>Zustand, Jotai et Valtio ont supplanté Redux dans la plupart des nouveaux projets. Leur approche atomique réduit les re-renders inutiles en ne mettant à jour que les composants qui consomment réellement la donnée changée.</p>

<h3>Comparaison des approches</h3>

<ul>
  <li><strong>Context + useReducer</strong> : idéal pour les états globaux simples</li>
  <li><strong>Zustand</strong> : store léger, excellent pour les projets moyens</li>
  <li><strong>TanStack Query</strong> : incontournable pour la gestion de données serveur</li>
  <li><strong>Recoil / Jotai</strong> : atom-based, parfait pour les états dérivés complexes</li>
</ul>

<h2>4. Optimisation du rendu serveur</h2>

<p>React Server Components (RSC) révolutionnent l'architecture. En exécutant certains composants côté serveur, on réduit drastiquement le bundle JavaScript envoyé au client. Next.js 15 et Remix en tirent pleinement parti.</p>

<img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop" alt="React performance" />

<h2>Conclusion</h2>

<p>L'optimisation React est un équilibre constant entre expérience développeur et expérience utilisateur. Les outils modernes facilitent le travail, mais la mesure reste la seule vérité. Utilisez Lighthouse, Web Vitals et le Profiler React pour guider vos décisions.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',
    category: 'Développement',
    tags: ['React', 'Performance', 'JavaScript', 'Frontend'],
    author: AUTHORS.amine,
    date: '2026-05-08',
    readTime: '12 min',
    views: 12300,
    likes: 1240,
    popular: true,
  },
  {
    id: '3',
    slug: 'strategie-branding-digitale',
    title: 'Construire une stratégie de branding digitale qui convertit',
    excerpt:
      "Comment aligner identité visuelle, voix de marque et expérience utilisateur pour créer une présence digitale mémorable et performante.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=630&fit=crop',
    category: 'Stratégie',
    tags: ['Branding', 'Marketing', 'Conversion', 'Stratégie'],
    author: AUTHORS.lina,
    date: '2026-05-05',
    readTime: '6 min',
    views: 6200,
    likes: 548,
    popular: true,
  },
  {
    id: '4',
    slug: 'animations-web-cinematiques',
    title: 'Créer des animations web cinématiques avec GSAP & Framer Motion',
    excerpt:
      "Guide complet pour intégrer des animations fluides et performantes dans vos projets. De l'entrée parallax aux micro-interactions sophistiquées.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=630&fit=crop',
    category: 'Développement',
    tags: ['Animation', 'GSAP', 'Framer Motion', 'UX'],
    author: AUTHORS.amine,
    date: '2026-05-01',
    readTime: '10 min',
    views: 9800,
    likes: 875,
  },
  {
    id: '5',
    slug: 'accessibilite-web-2026',
    title: "L'accessibilité web en 2026 : au-delà du WCAG",
    excerpt:
      "Pourquoi l'accessibilité est devenue un avantage concurrentiel et comment créer des expériences véritablement inclusives pour tous les utilisateurs.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=630&fit=crop',
    category: 'UX Design',
    tags: ['Accessibilité', 'A11y', 'Inclusion', 'WCAG'],
    author: AUTHORS.karim,
    date: '2026-04-28',
    readTime: '7 min',
    views: 7100,
    likes: 634,
    popular: true,
  },
  {
    id: '6',
    slug: 'ia-generative-design',
    title: "L'IA générative dans le processus créatif : opportunités et limites",
    excerpt:
      "Comment intégrer intelligemment les outils d'IA dans votre workflow créatif sans sacrifier l'authenticité et la qualité du design.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    category: 'Innovation',
    tags: ['IA', 'Design', 'Créativité', 'Workflow'],
    author: AUTHORS.sarah,
    date: '2026-04-25',
    readTime: '9 min',
    views: 15600,
    likes: 1430,
  },
  {
    id: '7',
    slug: 'architecture-css-scalable',
    title: 'Architecture CSS scalable pour projets enterprise',
    excerpt:
      "Méthodologies et patterns pour maintenir une codebase CSS propre, scalable et performante dans des équipes de grande taille.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=630&fit=crop',
    category: 'Développement',
    tags: ['CSS', 'Architecture', 'Scalability', 'Frontend'],
    author: AUTHORS.amine,
    date: '2026-04-20',
    readTime: '11 min',
    views: 4300,
    likes: 312,
  },
  {
    id: '8',
    slug: 'micro-interactions-ux',
    title: "Le pouvoir des micro-interactions dans l'UX moderne",
    excerpt:
      "Pourquoi les détails comptent : comment des micro-interactions bien conçues améliorent la perception de qualité et l'engagement utilisateur.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    category: 'UX Design',
    tags: ['Micro-interactions', 'UX', 'Animation', 'Engagement'],
    author: AUTHORS.karim,
    date: '2026-04-18',
    readTime: '5 min',
    views: 5400,
    likes: 498,
  },
  {
    id: '9',
    slug: 'seo-technique-2026',
    title: 'SEO technique 2026 : ce qui compte vraiment',
    excerpt:
      "Core Web Vitals, indexation mobile-first, structured data : focus sur les leviers techniques qui impactent réellement votre visibilité.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    category: 'Stratégie',
    tags: ['SEO', 'Performance', 'Marketing', 'Technique'],
    author: AUTHORS.lina,
    date: '2026-04-15',
    readTime: '8 min',
    views: 3800,
    likes: 267,
  },
  {
    id: '10',
    slug: 'design-systems-efficaces',
    title: 'Construire des design systems qui vivent et évoluent',
    excerpt:
      "Les meilleures pratiques pour créer, documenter et maintenir un design system qui s'adapte à la croissance de votre organisation.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop',
    category: 'Design',
    tags: ['Design System', 'Documentation', 'Scalability', 'UI'],
    author: AUTHORS.sarah,
    date: '2026-04-12',
    readTime: '10 min',
    views: 6700,
    likes: 589,
    popular: true,
  },
  {
    id: '11',
    slug: 'webassembly-futur-web',
    title: 'WebAssembly : le futur des applications web performantes',
    excerpt:
      "Comment WebAssembly révolutionne les possibilités du web en permettant des performances proches du natif directement dans le navigateur.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop',
    category: 'Développement',
    tags: ['WebAssembly', 'Performance', 'Rust', 'Frontend'],
    author: AUTHORS.amine,
    date: '2026-04-08',
    readTime: '9 min',
    views: 8200,
    likes: 743,
  },
  {
    id: '12',
    slug: 'typographie-web-moderne',
    title: 'La typographie web moderne : au-delà de Google Fonts',
    excerpt:
      "Variable fonts, subsetting, loading strategies : optimisez l'expérience typographique de vos projets web.",
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=1200&h=630&fit=crop',
    category: 'Design',
    tags: ['Typographie', 'Web Fonts', 'Performance', 'UI'],
    author: AUTHORS.karim,
    date: '2026-04-05',
    readTime: '6 min',
    views: 2900,
    likes: 198,
  },
]

export const CATEGORIES: Category[] = [
  { name: 'Design', count: 4 },
  { name: 'Développement', count: 5 },
  { name: 'Stratégie', count: 2 },
  { name: 'UX Design', count: 2 },
  { name: 'Innovation', count: 1 },
]

export const TAGS = [
  'UI/UX',
  'React',
  'Animation',
  'Performance',
  'Branding',
  'Accessibilité',
  'IA',
  'SEO',
  'Design System',
  'WebAssembly',
  'Typographie',
  'Innovation',
]
