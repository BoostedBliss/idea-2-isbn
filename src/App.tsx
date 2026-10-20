import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Award,
  Copy,
  Check,
  BarChart3,
  Filter,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  Sun,
  Cloud,
  Sparkles,
  TrendingUp,
  HelpCircle,
  Printer,
  Tag,
  Globe,
  Headphones,
  Lock,
  Layers,
  DollarSign,
  Zap,
  Info,
  Download,
  FileText,
  History,
  RotateCcw,
  Trash2,
  Clock,
  Calendar,
  Eye,
  BookmarkPlus,
  Bell,
  BellRing,
  Mic,
  Send,
  ShoppingBag,
  Star,
  Volume2,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export interface SeasonalMonth {
  month: string;
  demand: number; // 0-100
  note: string;
}

interface KDPCategory {
  id: string;
  genre: string;
  name: string;
  path: string;
  topRankBsr: number;
  hundredRankBsr: number;
  dailySalesForTop: number;
  dailySalesFor100: number;
  opportunity: 'Sweet Spot' | 'High Opportunity' | 'Competitive' | 'Hyper-Competitive';
  competitionScore: number;
  recommendedKeywords: string[];
  audienceIntent: string;
  isNicheSubculture?: boolean;
  peakWindow: string;
  seasonalDemand: SeasonalMonth[];
}

// Children's and Niche Sub-culture category dataset with 12-month demand heatmap data
const NICHE_CATEGORIES: KDPCategory[] = [
  {
    id: 'children-emotions-picture',
    genre: "Children's & Picture Books",
    name: "Children's Emotions & Feelings",
    path: "Children's Books > Growing Up & Facts of Life > Friendship, Social Skills & School Life > Emotions & Feelings",
    topRankBsr: 180,
    hundredRankBsr: 12200,
    dailySalesForTop: 68,
    dailySalesFor100: 8,
    opportunity: 'Sweet Spot',
    competitionScore: 52,
    recommendedKeywords: ['toddler emotional regulation calm', 'preschool mindfulness feelings bedtime story', 'anger management breathing book kids', 'growth mindset picture book self esteem'],
    audienceIntent: 'Parents, preschool teachers, and child therapists seeking gentle tools to help kids name and regulate big feelings.',
    isNicheSubculture: false,
    peakWindow: 'August – September (Back-to-School SEL Surge)',
    seasonalDemand: [
      { month: 'Jan', demand: 72, note: 'New Year routines' },
      { month: 'Feb', demand: 68, note: 'Winter storytime' },
      { month: 'Mar', demand: 74, note: 'Spring classroom tools' },
      { month: 'Apr', demand: 78, note: 'Preschool assessments' },
      { month: 'May', demand: 82, note: 'End of school gifts' },
      { month: 'Jun', demand: 64, note: 'Summer downtime' },
      { month: 'Jul', demand: 76, note: 'Early school prep' },
      { month: 'Aug', demand: 95, note: 'Peak Back-to-School launch' },
      { month: 'Sep', demand: 98, note: 'Peak Classroom SEL setup' },
      { month: 'Oct', demand: 80, note: 'Fall library reading' },
      { month: 'Nov', demand: 86, note: 'Parenting holiday lists' },
      { month: 'Dec', demand: 90, note: 'Mindful holiday gifts' }
    ]
  },
  {
    id: 'children-bedtime-rhyme',
    genre: "Children's & Picture Books",
    name: 'Bedtime Rhymes & Lullabies',
    path: "Children's Books > Early Learning > Basic Concepts > Sense & Sensation > Sleep & Bedtime",
    topRankBsr: 240,
    hundredRankBsr: 15400,
    dailySalesForTop: 52,
    dailySalesFor100: 6,
    opportunity: 'Sweet Spot',
    competitionScore: 49,
    recommendedKeywords: ['gentle rhyming bedtime board book', 'sleepy woodland animals goodnight story', 'calming sensory bedtime ritual toddler', 'soothing baby lullaby read aloud poem'],
    audienceIntent: 'Sleep-deprived parents wanting comforting, rhythmically soothing stories that calm toddlers down for sleep.',
    isNicheSubculture: false,
    peakWindow: 'November – December (Holiday Gifting & Baby Showers)',
    seasonalDemand: [
      { month: 'Jan', demand: 74, note: 'Sleep schedule resets' },
      { month: 'Feb', demand: 76, note: 'Winter lullaby reading' },
      { month: 'Mar', demand: 75, note: 'Spring bedtime routine' },
      { month: 'Apr', demand: 78, note: 'Easter basket board books' },
      { month: 'May', demand: 80, note: 'Mother Day toddler gifts' },
      { month: 'Jun', demand: 68, note: 'Summer sleep disruption' },
      { month: 'Jul', demand: 70, note: 'Vacation calming reads' },
      { month: 'Aug', demand: 76, note: 'School night sleep prep' },
      { month: 'Sep', demand: 82, note: 'Autumn evening routines' },
      { month: 'Oct', demand: 85, note: 'Cozy bedtime stories' },
      { month: 'Nov', demand: 94, note: 'Black Friday gifting surge' },
      { month: 'Dec', demand: 99, note: 'Peak Christmas & Hannukah gifts' }
    ]
  },
  {
    id: 'niche-cottagecore-crafts',
    genre: 'Niche Sub-Cultures',
    name: 'Cottagecore Herbalism & Crafts',
    path: 'Crafts, Hobbies & Home > Crafts & Hobbies > Nature Crafts > Herb & Flower Pressing',
    topRankBsr: 620,
    hundredRankBsr: 24100,
    dailySalesForTop: 24,
    dailySalesFor100: 4,
    opportunity: 'Sweet Spot',
    competitionScore: 42,
    recommendedKeywords: ['cottagecore botanical journal foraging', 'dried flowers natural soap slow living', 'kitchen herbalism folklore seasonal guide', 'rustic cozy hearth craft notebook'],
    audienceIntent: 'Gen-Z and millennial cozy lifestyle enthusiasts craving tactile slow-living rituals, aesthetic herbarium guides, and cottage recipes.',
    isNicheSubculture: true,
    peakWindow: 'April – May (Spring Bloom) & December (Cozy Solstice)',
    seasonalDemand: [
      { month: 'Jan', demand: 65, note: 'Winter hearth reading' },
      { month: 'Feb', demand: 70, note: 'Spring garden planning' },
      { month: 'Mar', demand: 84, note: 'Spring equinox foraging' },
      { month: 'Apr', demand: 96, note: 'Peak flower pressing bloom' },
      { month: 'May', demand: 98, note: 'Peak wildcrafting & herbs' },
      { month: 'Jun', demand: 85, note: 'Summer botanical drying' },
      { month: 'Jul', demand: 80, note: 'Garden apothecary season' },
      { month: 'Aug', demand: 78, note: 'Harvest craft prep' },
      { month: 'Sep', demand: 88, note: 'Autumn equinox cozy craft' },
      { month: 'Oct', demand: 90, note: 'Cozy witchy hearth season' },
      { month: 'Nov', demand: 92, note: 'Handmade gift crafting' },
      { month: 'Dec', demand: 97, note: 'Peak Winter Solstice gift surge' }
    ]
  },
  {
    id: 'niche-solarpunk-fiction',
    genre: 'Niche Sub-Cultures',
    name: 'Solarpunk & Eco-Utopias',
    path: 'Science Fiction & Fantasy > Science Fiction > Colonization & Environmental Scifi',
    topRankBsr: 890,
    hundredRankBsr: 29500,
    dailySalesForTop: 18,
    dailySalesFor100: 3,
    opportunity: 'High Opportunity',
    competitionScore: 38,
    recommendedKeywords: ['hopeful green technology futures fiction', 'community microgrid eco village story', 'solarpunk aesthetic renewable utopia novel', 'permaculture rebellion clean energy scifi'],
    audienceIntent: 'Climate-conscious readers tired of grim dystopias seeking hopeful technological, green community speculative fiction.',
    isNicheSubculture: true,
    peakWindow: 'April (Earth Month) & July (Summer Sci-Fi Binge)',
    seasonalDemand: [
      { month: 'Jan', demand: 68, note: 'New energy trends' },
      { month: 'Feb', demand: 70, note: 'Speculative reading' },
      { month: 'Mar', demand: 76, note: 'Spring sustainability' },
      { month: 'Apr', demand: 98, note: 'Peak Earth Day & Month' },
      { month: 'May', demand: 82, note: 'Clean tech discussions' },
      { month: 'Jun', demand: 88, note: 'Summer sci-fi conventions' },
      { month: 'Jul', demand: 92, note: 'Peak Summer hopepunk reading' },
      { month: 'Aug', demand: 84, note: 'Late summer reading' },
      { month: 'Sep', demand: 76, note: 'Climate literary releases' },
      { month: 'Oct', demand: 80, note: 'University eco-seminars' },
      { month: 'Nov', demand: 82, note: 'Indie scifi book clubs' },
      { month: 'Dec', demand: 88, note: 'Holiday speculative boxsets' }
    ]
  },
  {
    id: 'children-middle-grade-gaming',
    genre: "Children's & Picture Books",
    name: 'Middle Grade Gaming Adventures',
    path: "Children's Books > Science Fiction & Fantasy > Fantasy & Magic > Virtual Reality & Gaming",
    topRankBsr: 320,
    hundredRankBsr: 16800,
    dailySalesForTop: 42,
    dailySalesFor100: 5,
    opportunity: 'Sweet Spot',
    competitionScore: 56,
    recommendedKeywords: ['trapped inside video game quest kids', 'minecraft roblox style chapter book 8-12', 'reluctant reader funny gaming humor', 'pixel world dungeon team secret level'],
    audienceIntent: 'Parents and teachers buying for reluctant boy/girl readers aged 8–12 who obsess over sandbox video games.',
    isNicheSubculture: false,
    peakWindow: 'July (Summer Break) & December (Holiday Toy/Book Season)',
    seasonalDemand: [
      { month: 'Jan', demand: 78, note: 'Winter break gaming reading' },
      { month: 'Feb', demand: 72, note: 'Reluctant reader units' },
      { month: 'Mar', demand: 76, note: 'Spring break book fairs' },
      { month: 'Apr', demand: 74, note: 'Classroom rewards' },
      { month: 'May', demand: 84, note: 'Summer reading list prep' },
      { month: 'Jun', demand: 92, note: 'School out vacation binge' },
      { month: 'Jul', demand: 97, note: 'Peak Summer Gaming binge' },
      { month: 'Aug', demand: 88, note: 'Late summer reading' },
      { month: 'Sep', demand: 76, note: 'School library circulation' },
      { month: 'Oct', demand: 82, note: 'Halloween gaming tie-ins' },
      { month: 'Nov', demand: 90, note: 'Black Friday wishlists' },
      { month: 'Dec', demand: 98, note: 'Peak holiday gift for gamers' }
    ]
  },
  {
    id: 'niche-neurodivergent-parenting',
    genre: 'Niche Sub-Cultures',
    name: 'Neurodivergent & Sensory Parenting',
    path: 'Parenting & Relationships > Special Needs > Autism & Asperger’s Syndrome',
    topRankBsr: 140,
    hundredRankBsr: 9800,
    dailySalesForTop: 78,
    dailySalesFor100: 11,
    opportunity: 'Competitive',
    competitionScore: 69,
    recommendedKeywords: ['adhd autism visual routine schedule kids', 'sensory friendly parenting calm meltdowns', 'gentle neurodiversity affirming guide', 'executive function tools neurospicy family'],
    audienceIntent: 'Parents looking for empathetic, neuro-affirming, non-punitive strategies designed specifically for neurodivergent children.',
    isNicheSubculture: true,
    peakWindow: 'April (Autism Acceptance) & August–September (School Prep)',
    seasonalDemand: [
      { month: 'Jan', demand: 82, note: 'New term sensory support' },
      { month: 'Feb', demand: 76, note: 'Winter regulation struggles' },
      { month: 'Mar', demand: 85, note: 'Pre-April awareness' },
      { month: 'Apr', demand: 99, note: 'Peak World Autism Acceptance' },
      { month: 'May', demand: 88, note: 'IEP meetings & year end' },
      { month: 'Jun', demand: 82, note: 'Summer break schedule changes' },
      { month: 'Jul', demand: 84, note: 'Sensory summer management' },
      { month: 'Aug', demand: 96, note: 'Peak school transition anxiety' },
      { month: 'Sep', demand: 98, note: 'Peak new classroom meltdown prep' },
      { month: 'Oct', demand: 90, note: 'ADHD Awareness Month' },
      { month: 'Nov', demand: 82, note: 'Holiday sensory planning' },
      { month: 'Dec', demand: 85, note: 'Holiday overstimulation survival' }
    ]
  },
  {
    id: 'niche-retro-synthwave',
    genre: 'Niche Sub-Cultures',
    name: 'Retro 80s & Synthwave Culture',
    path: 'Arts & Photography > Pop Culture > 1980s History & Graphic Nostalgia',
    topRankBsr: 1100,
    hundredRankBsr: 34000,
    dailySalesForTop: 14,
    dailySalesFor100: 2,
    opportunity: 'High Opportunity',
    competitionScore: 34,
    recommendedKeywords: ['synthwave neon outrun aesthetic artbook', 'vhs arcade gaming 80s nostalgia history', 'retrofuturism cassette culture coffee table', 'cyberpunk visual music history book'],
    audienceIntent: 'Nostalgia collectors and electronic music fans wanting visually striking coffee-table artbooks and subculture history.',
    isNicheSubculture: true,
    peakWindow: 'October (80s Horror/Stranger Themes) & December (Collector Gifts)',
    seasonalDemand: [
      { month: 'Jan', demand: 70, note: 'New year retro nostalgia' },
      { month: 'Feb', demand: 68, note: 'Electronic music season' },
      { month: 'Mar', demand: 72, note: 'Gaming convention season' },
      { month: 'Apr', demand: 74, note: 'Retrogaming spring releases' },
      { month: 'May', demand: 76, note: 'Synthwave music drives' },
      { month: 'Jun', demand: 82, note: 'Summer night drive outrun' },
      { month: 'Jul', demand: 85, note: 'Neon arcade pop culture' },
      { month: 'Aug', demand: 80, note: 'Retro convention season' },
      { month: 'Sep', demand: 78, note: 'Fall album launches' },
      { month: 'Oct', demand: 94, note: 'Peak 80s Halloween nostalgia' },
      { month: 'Nov', demand: 90, note: 'Collector artbook buying' },
      { month: 'Dec', demand: 97, note: 'Peak Coffee-Table gift sales' }
    ]
  }
];

interface GlossaryTerm {
  term: string;
  badge: string;
  plainEnglish: string;
  dayOneTakeaway: string;
  kdpAction: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Amazon 'Shelves' (Categories)",
    badge: 'Day-1 Essential',
    plainEnglish: 'The virtual aisles of Amazon where your book is cataloged (e.g. Children’s Books > Early Learning > Bedtime). Amazon allows you to pick up to 3 official categories in your dashboard.',
    dayOneTakeaway: "Choosing smaller 'sweet spot' shelves lets your book hit the #1 Bestseller orange banner with 10–30 daily sales instead of needing 500+ sales in giant categories.",
    kdpAction: 'Select 3 precise shelves during book setup under Categories > Choose Placement.'
  },
  {
    term: 'BSR (Best Seller Rank)',
    badge: 'Sales Metric',
    plainEnglish: 'A live scoreboard number Amazon gives every book. #1 is the highest selling book on all of Amazon. A BSR of #10,000 means roughly 10 books sell per day; #100,000 is ~1 book per day.',
    dayOneTakeaway: 'The lower your BSR number, the more books you are selling right now. Use competitor BSR to see if a niche actually has paying readers.',
    kdpAction: 'Monitor your rank on your Amazon product page under Product Details.'
  },
  {
    term: '7 Backend Keyword Slots',
    badge: 'Search Engine',
    plainEnglish: '7 hidden text boxes in your book dashboard (up to 50 characters each) where you enter the phrases readers type into Amazon search bar (e.g. "gentle bedtime rhyming book").',
    dayOneTakeaway: "Amazon combines words across all 7 slots. Never repeat words already in your book title or subtitle; you get indexed for those automatically!",
    kdpAction: 'Fill each box with 3–5 complementary words without commas or punctuation.'
  },
  {
    term: 'Single-Unit Middleman ISBN Allocation',
    badge: 'Legal & Catalog',
    plainEnglish: 'Acquiring individual official ISBN barcodes through authorized bulk syndication, avoiding expensive multi-pack commitments while retaining full publisher imprint rights.',
    dayOneTakeaway: 'Allows indie creators to stamp their own imprint name on Amazon and IngramSpark without paying retail multi-pack markup.',
    kdpAction: 'Allocate single ISBNs at author-direct rates ($55.55 Pro / $77.77 Free) in our ISBN Portal.'
  },
  {
    term: 'Going Wide vs. KDP Select',
    badge: 'Distribution Strategy',
    plainEnglish: 'KDP Select requires 100% digital exclusivity to Amazon Kindle Unlimited. "Going Wide" means publishing across Apple Books, Barnes & Noble, Kobo, and libraries via Draft2Digital.',
    dayOneTakeaway: 'Children’s picture books and niche non-fiction often sell better Wide in schools and libraries; serialized fiction often makes more in Kindle Unlimited.',
    kdpAction: 'Decide before checking the exclusivity enrollment box during publishing.'
  },
  {
    term: 'Print-on-Demand (POD) Unit Economics',
    badge: 'Manufacturing',
    plainEnglish: 'Amazon prints 1 physical copy when a customer orders it, deducts print costs (e.g. $3.65), and transfers the remaining royalty to your bank account with zero inventory upfront.',
    dayOneTakeaway: 'Children’s full-color picture books cost more to print per page than black-and-white novels; pricing your book appropriately is vital.',
    kdpAction: 'Calculate your minimum list price so you maintain at least $2.00–$4.00 profit per book.'
  },
  {
    term: 'BISAC Subject Codes',
    badge: 'Bookstore Standard',
    plainEnglish: 'Book Industry Standards and Communication codes (e.g., JUV019000 for Juvenile Fiction / Social Themes). Traditional retailers and IngramSpark rely on BISAC codes to shelf books in stores.',
    dayOneTakeaway: 'Choosing accurate BISAC codes ensures library collection buyers and indie bookstores place your title in the proper physical aisle.',
    kdpAction: 'Assign up to 3 BISAC codes during your book title registration.'
  },
  {
    term: 'ARC (Advance Reader Copies)',
    badge: 'Launch Marketing',
    plainEnglish: 'Pre-release digital or print proofs sent to trusted readers, bookstagrammers, and reviewers 3-6 weeks prior to launch to generate verified social proof on Day 1.',
    dayOneTakeaway: 'Books with 10+ reviews in the first 48 hours convert browsing traffic at a 3x higher rate and trigger Amazon recommendation algorithms.',
    kdpAction: 'Distribute uncorrected digital proofs to your ARC team with BookFunnel or StoryOrigin.'
  },
  {
    term: 'A+ Content & Brand Showcase',
    badge: 'Conversion Rate',
    plainEnglish: 'Enhanced visual marketing modules displayed midway down your Amazon product page, including interior picture previews, character spotlights, and author comparison tables.',
    dayOneTakeaway: 'A+ Content can boost page conversion rates by 8% to 15% by giving wary parents a clear peek inside children’s illustrated pages.',
    kdpAction: 'Upload 3-4 custom graphic banners in your Amazon Author Central or marketing tab.'
  },
  {
    term: 'Look Inside / Sample Read %',
    badge: 'Browsing Experience',
    plainEnglish: 'The interactive reader preview on your book sales page showing the first 10%–20% of the book for free before purchase.',
    dayOneTakeaway: 'Ensure your front matter (dedication, copyright) does not eat up all 10%; place the first compelling chapter or illustration immediately upfront.',
    kdpAction: 'Keep introductory filler brief so readers immediately experience your story.'
  },
  {
    term: 'IngramSpark 55% Wholesale Discount',
    badge: 'Brick & Mortar Retail',
    plainEnglish: 'The standard trade discount publishers grant retailers so bookstore owners have margin to buy, stock, and display physical books on their shelves.',
    dayOneTakeaway: 'If you set a discount lower than 55% (e.g., 30% or 40%), traditional bookstores and libraries will almost never order your paperback or hardcover.',
    kdpAction: 'Set wholesale discount to 55% with returnability enabled if targeting bookstores.'
  },
  {
    term: 'Book Returns Liability Policy',
    badge: 'Financial Risk',
    plainEnglish: 'The contractual terms set on IngramSpark determining whether unsold books ordered by bookstores can be returned to you (with you paying wholesale cost).',
    dayOneTakeaway: 'Independent authors should select "No Returns" or "Return - Destroy" unless a specific store manager guarantees a book signing event.',
    kdpAction: 'Avoid selecting "Return - Deliver" on wide distributors to prevent sudden chargeback bills.'
  },
  {
    term: 'Bleed vs. No Bleed Interior',
    badge: 'Print Formatting',
    plainEnglish: '"Bleed" extends your illustrations 0.125 inches beyond the page trim edge so no white slivers appear after the industrial printer guillotine trims the edges.',
    dayOneTakeaway: 'All children’s picture books and full-spread illustrations require Bleed formatting during manuscript upload.',
    kdpAction: 'Select "Bleed (PDF only)" in print setup and size artwork to 8.625 x 8.625 inches.'
  },
  {
    term: 'Trim Size Standards',
    badge: 'Book Anatomy',
    plainEnglish: 'The physical dimensions of your printed book (e.g. 8.5 x 8.5 inches for square children’s picture books, or 6 x 9 inches for trade paperbacks).',
    dayOneTakeaway: 'Choosing standard industry trim sizes guarantees compatibility across both Amazon POD and IngramSpark without resizing.',
    kdpAction: 'Lock your trim size before creating your cover template and interior layout.'
  },
  {
    term: 'PCN & LCCN (Library of Congress)',
    badge: 'Library Cataloging',
    plainEnglish: 'Pre-assigned Control Numbers from the US Library of Congress allowing public and academic libraries to catalogue and stock your book.',
    dayOneTakeaway: 'You must apply for your free PCN prior to publication; you cannot acquire a pre-assigned number after the book is live.',
    kdpAction: 'Submit a free PCN application via loc.gov before printing your final copyright page.'
  },
  {
    term: 'Expanded Distribution Margin Squeeze',
    badge: 'Distribution Math',
    plainEnglish: 'Amazon’s feature to distribute your paperback to third-party retailers, taking a 60% distribution cut instead of the standard 40%.',
    dayOneTakeaway: 'Gives small sales outside Amazon but yields razor-thin royalties compared to publishing directly through IngramSpark with your own ISBN.',
    kdpAction: 'Use direct IngramSpark distribution for wholesale orders to preserve profit margins.'
  },
  {
    term: 'EAN Barcode & Price Suppress',
    badge: 'Cover Design',
    plainEnglish: 'The 13-digit machine-readable barcode printed on the bottom right of your back cover, optionally encoding retail price.',
    dayOneTakeaway: 'Leaving the price off the barcode (price suppress) lets you adjust retail prices dynamically without reprinting covers.',
    kdpAction: 'Do not bake a hardcoded price into your back cover barcode graphic.'
  },
  {
    term: 'Fixed Layout vs. Reflowable EPUB',
    badge: 'eBook Technology',
    plainEnglish: 'Fixed layout locks illustrations and text together like a printed page (vital for picture books). Reflowable text scales font size for novels on e-readers.',
    dayOneTakeaway: 'Children’s books with text overlays require Fixed Layout EPUB3 or Kindle Comic Creator formatting.',
    kdpAction: 'Format picture books as Fixed Layout to prevent words from spilling off illustrations.'
  },
  {
    term: 'Title Stacking & Subtitle SEO',
    badge: 'Metadata Strategy',
    plainEnglish: 'Carefully positioning primary trope and demographic keywords into your subtitle (e.g., "Sleepy Bear: A Calming Rhyming Bedtime Book for Toddlers").',
    dayOneTakeaway: 'Amazon weighs words in your title and subtitle heavier than backend keyword boxes. Keep it readable for humans while hitting primary search intent.',
    kdpAction: 'Craft a catchy creative title paired with an explanatory, keyword-rich subtitle.'
  },
  {
    term: 'Pre-Order Velocity Stacking',
    badge: 'Launch Momentum',
    plainEnglish: 'Accumulating reader orders over a 30–90 day pre-order window. On official launch day, all cumulative orders count toward Day-1 rank velocity.',
    dayOneTakeaway: 'Stacking pre-orders pushes your book straight into the Top 10 Bestseller lists upon launch, triggering organic "Hot New Releases" banners.',
    kdpAction: 'Set up your pre-order 4 to 8 weeks ahead of publication date.'
  },
  {
    term: 'Author Central & Imprint Claiming',
    badge: 'Brand Authority',
    plainEnglish: 'Your official creator dashboard where you claim your author biography, link your social media, review sales ranks, and track editorial reviews.',
    dayOneTakeaway: 'Claiming your profile prevents confusion with other authors sharing similar names and unlocks A+ Content management tools.',
    kdpAction: 'Claim your author profile at author.amazon.com immediately upon book draft creation.'
  },
  {
    term: 'DRM (Digital Rights Management)',
    badge: 'eBook Policy',
    plainEnglish: 'Copy-protection software embedded into eBook files preventing buyers from sharing or loading the file onto unauthorized devices.',
    dayOneTakeaway: 'Most indie authors disable DRM to reduce buyer friction; pirates strip DRM in seconds anyway, while readers appreciate device portability.',
    kdpAction: 'Select "Do not apply digital rights management" for smoother reader reading.'
  }
];

function RainbowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" className={className}>
      <path d="M4 19a8 8 0 0 1 16 0" stroke="#f43f5e" strokeLinecap="round" />
      <path d="M7 19a5 5 0 0 1 10 0" stroke="#f59e0b" strokeLinecap="round" />
      <path d="M10 19a2 2 0 0 1 4 0" stroke="#10b981" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  // Navigation & Tier state
  const [activeTab, setActiveTab] = useState<'categories' | 'glossary' | 'printCalculator' | 'isbnHub' | 'proSandbox'>('categories');
  const [userTier, setUserTier] = useState<'free' | 'paid'>('free');

  // Categories & Filtering
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<KDPCategory>(NICHE_CATEGORIES[0]);
  const [selectedForKdp, setSelectedForKdp] = useState<KDPCategory[]>([NICHE_CATEGORIES[0], NICHE_CATEGORIES[1]]);
  const [customBsr, setCustomBsr] = useState<number>(12000);

  // KDP 7 Backend Keyword Slots
  const [keywordSlots, setKeywordSlots] = useState<string[]>([
    'toddler emotional regulation calm',
    'preschool mindfulness feelings bedtime',
    'anger management breathing kids book',
    'growth mindset picture book feelings',
    'gentle social emotional learning SEL',
    'classroom read aloud teacher resource',
    'coping skills anxiety comfort gift'
  ]);
  const [copiedSlot, setCopiedSlot] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Print on Demand Calculator State
  const [pageCount, setPageCount] = useState<number>(36);
  const [colorType, setColorType] = useState<'premium_color' | 'standard_color' | 'black_white'>('premium_color');
  const [bookListPrice, setBookListPrice] = useState<number>(12.99);

  // Glossary Search
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  // Pro Sandbox A/B testing & Pricing Sliders
  const [variantA, setVariantA] = useState<string>("Children's Emotional Learning (Picture Book)");
  const [variantB, setVariantB] = useState<string>("Cottagecore Herbalism (Sub-Culture Gift)");
  const [sandboxPrice, setSandboxPrice] = useState<number>(14.99);
  const [sandboxPrintCost, setSandboxPrintCost] = useState<number>(3.65);
  const [exportSuccess, setExportSuccess] = useState<'free' | 'paid' | null>(null);

  // ISBN Middleman Syndication State ($55.55 Pro / $77.77 Free)
  const [isbnOrderQty, setIsbnOrderQty] = useState<number>(1);
  const [isbnImprintName, setIsbnImprintName] = useState<string>('Sunny Brook Press');
  const [isbnFormatType, setIsbnFormatType] = useState<'Paperback' | 'Hardcover' | 'eBook'>('Paperback');
  const [allocatedIsbns, setAllocatedIsbns] = useState<Array<{
    isbn: string;
    imprint: string;
    format: string;
    allocatedDate: string;
    tierRate: number;
  }>>([
    {
      isbn: '978-1-964201-14-8',
      imprint: 'Sunny Brook Press',
      format: 'Paperback',
      allocatedDate: 'Allocated Just Now',
      tierRate: 55.55
    }
  ]);
  const [isbnCheckoutSuccess, setIsbnCheckoutSuccess] = useState(false);

  // Competitor Spy State
  interface CompetitorBook {
    asin: string;
    title: string;
    subtitle: string;
    author: string;
    bsr: number;
    estDailySales: number;
    estDailyRoyalty: number;
    price: number;
    printCost: number;
    categoryPath: string;
    categoryName: string;
    inferredKeywords: string[];
    dateAdded: string;
    notes?: string;
  }

  const [spyAsinInput, setSpyAsinInput] = useState<string>('B0B8TK8Z5L');
  const [isAnalyzingCompetitor, setIsAnalyzingCompetitor] = useState<boolean>(false);
  const [analyzedCompetitor, setAnalyzedCompetitor] = useState<CompetitorBook | null>({
    asin: 'B0B8TK8Z5L',
    title: 'The Wonderful Things You Will Be (Bedtime Edition)',
    subtitle: 'A Celebration of Possibility and Gentle Growing Up',
    author: 'Emily Winfield Martin',
    bsr: 340,
    estDailySales: 45,
    estDailyRoyalty: 94.50,
    price: 11.99,
    printCost: 3.20,
    categoryPath: "Children's Books > Growing Up & Facts of Life > Friendship, Social Skills & School Life > Emotions & Feelings",
    categoryName: "Children's Emotions & Feelings",
    inferredKeywords: [
      'emotional regulation picture book preschool',
      'bedtime story calming toddler read aloud',
      'growth mindset gift for baby shower',
      'gentle poetic bedtime rhyme nursery',
      'social emotional learning kindergarten',
      'encouraging life lessons children keepsake',
      'comforting mindfulness self worth story'
    ],
    dateAdded: 'Today'
  });

  // Inspiration Stations (Boards & Auto-Updated Releases)
  interface InspirationStation {
    id: string;
    name: string;
    description: string;
    subscribeAutoUpdate: boolean;
    lastChecked: string;
    newReleasesFound: number;
    books: CompetitorBook[];
  }

  const [stations, setStations] = useState<InspirationStation[]>([
    {
      id: 'sel-picture-books',
      name: "Preschool SEL & Feelings Board",
      description: "Top-performing emotional regulation and gentle bedtime picture books.",
      subscribeAutoUpdate: true,
      lastChecked: 'Today at 1:15 PM',
      newReleasesFound: 1,
      books: [
        {
          asin: 'B0B8TK8Z5L',
          title: 'The Wonderful Things You Will Be',
          subtitle: 'A Celebration of Possibility',
          author: 'Emily Winfield Martin',
          bsr: 340,
          estDailySales: 45,
          estDailyRoyalty: 94.50,
          price: 11.99,
          printCost: 3.20,
          categoryPath: "Children's Books > Emotions & Feelings",
          categoryName: "Children's Emotions & Feelings",
          inferredKeywords: ['bedtime story calming toddler', 'growth mindset picture book'],
          dateAdded: '2 days ago',
          notes: 'Notice how the subtitle avoids buzzwords and leads with emotion.'
        },
        {
          asin: '1950968940',
          title: 'The Little Book of Cottagecore Herbalism',
          subtitle: 'Simple Rituals and Botanical Crafts for Slow Living',
          author: 'Emily Carlin',
          bsr: 620,
          estDailySales: 24,
          estDailyRoyalty: 55.20,
          price: 15.99,
          printCost: 3.85,
          categoryPath: "Crafts, Hobbies & Home > Gardening & Horticulture > Herbs",
          categoryName: "Cottagecore Botanical Crafts & Herbalism",
          inferredKeywords: ['cottagecore botanical journal foraging', 'dried flowers natural soap'],
          dateAdded: 'Yesterday',
          notes: 'High retail price ($15.99) with strong gift appeal during Q4.'
        }
      ]
    },
    {
      id: 'middle-grade-gaming',
      name: "Middle Grade LitRPG & Gaming Benchmarks",
      description: "Competitive fast-paced chapter books targeting ages 8-12.",
      subscribeAutoUpdate: false,
      lastChecked: 'Yesterday',
      newReleasesFound: 0,
      books: [
        {
          asin: 'B08HGN76H3',
          title: 'Trapped in a Video Game: The Secret Level',
          subtitle: 'A Fast-Paced Gaming Adventure for Reluctant Readers',
          author: 'Dustin Brady',
          bsr: 290,
          estDailySales: 52,
          estDailyRoyalty: 109.20,
          price: 9.99,
          printCost: 2.15,
          categoryPath: "Children's Books > Virtual Reality & Gaming",
          categoryName: "Middle Grade Gaming Adventures",
          inferredKeywords: ['trapped in video game quest kids', 'minecraft roblox style chapter book'],
          dateAdded: '3 days ago',
          notes: 'Pricing under $10 makes volume purchase by parents seamless.'
        }
      ]
    }
  ]);
  const [activeStationId, setActiveStationId] = useState<string>('sel-picture-books');
  const [newStationTitle, setNewStationTitle] = useState<string>('');
  const [isCreatingStation, setIsCreatingStation] = useState<boolean>(false);
  const [alertNotification, setAlertNotification] = useState<string | null>(null);

  // In-House Voice Talent & Studio Applicant Portal State
  const [isVoiceApplicantModalOpen, setIsVoiceApplicantModalOpen] = useState(false);
  const [applicantSubmitted, setApplicantSubmitted] = useState(false);
  const [applicantFormData, setApplicantFormData] = useState({
    name: '',
    email: '',
    vocalStyle: 'Warm & Soothing Bedtime (Preschool / Children)',
    accent: 'Neutral North American / Soft British',
    sampleLink: '',
    studioMic: 'Rode NT1 / Focusrite 2i2 with vocal booth',
    pfhRate: 75,
    bio: ''
  });
  const [inHouseVoiceRoster, setInHouseVoiceRoster] = useState([
    {
      id: 'vt-1',
      name: 'Clara Sterling',
      badge: 'Certified In-House Talent',
      tone: 'Gentle Bedtime Storyteller & Lullabies',
      voiceAge: 'Warm Adult Female',
      audioSampleTitle: 'Goodnight Little Acorn (Excerpt)',
      pfhRate: 65,
      studioGear: 'Neumann TLM 103 + WhisperRoom',
      reviews: 4.9,
      tags: ['Bedtime', 'Picture Books', 'Gentle SEL']
    },
    {
      id: 'vt-2',
      name: 'Marcus Vance',
      badge: 'Certified In-House Talent',
      tone: 'Animated Character & Creature Accents',
      voiceAge: 'Versatile Character Voice Male',
      audioSampleTitle: 'The Goblin Who Lost His Dice (Excerpt)',
      pfhRate: 85,
      studioGear: 'Sennheiser MKH 416 + Apollo Twin',
      reviews: 5.0,
      tags: ['Gaming', 'Middle Grade', 'Cartoons']
    },
    {
      id: 'vt-3',
      name: 'Elena Rostova',
      badge: 'Certified In-House Talent',
      tone: 'Calm Mindfulness & Nature Soundscapes',
      voiceAge: 'Earthy Soothing Female',
      audioSampleTitle: 'Forest Hearth Meditation (Excerpt)',
      pfhRate: 70,
      studioGear: 'Shure SM7B + Cloudlifter',
      reviews: 4.95,
      tags: ['Cottagecore', 'Nonfiction', 'Mindfulness']
    }
  ]);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Recent Searches & BSR Calculations Session State
  interface RecentSessionItem {
    id: string;
    type: 'search' | 'bsr';
    title: string;
    value: string | number;
    badge: string;
    timestamp: string;
  }

  const [recentItems, setRecentItems] = useState<RecentSessionItem[]>([
    { id: '1', type: 'search', title: 'bedtime rhymes', value: 'bedtime', badge: 'Category Query', timestamp: '2m ago' },
    { id: '2', type: 'bsr', title: 'BSR #12,000', value: 12000, badge: '~10 sales/day', timestamp: '4m ago' },
    { id: '3', type: 'search', title: 'cottagecore herbalism', value: 'cottagecore', badge: 'Sub-Culture', timestamp: '8m ago' },
    { id: '4', type: 'bsr', title: 'BSR #280', value: 280, badge: '~75 sales/day', timestamp: '15m ago' },
    { id: '5', type: 'search', title: 'emotions & feelings', value: 'emotions', badge: 'Picture Book', timestamp: '22m ago' }
  ]);
  const [isRecentSidebarOpen, setIsRecentSidebarOpen] = useState(false);

  const recordSearch = (val: string) => {
    if (!val || val.trim().length < 2) return;
    const clean = val.trim();
    setRecentItems(prev => {
      const exists = prev.filter(item => item.value !== clean);
      return [
        { id: Date.now().toString(), type: 'search' as const, title: `"${clean}"`, value: clean, badge: 'Category Search', timestamp: 'Just now' },
        ...exists
      ].slice(0, 8);
    });
  };

  const recordBsr = (bsrVal: number) => {
    if (!bsrVal || bsrVal <= 0) return;
    setRecentItems(prev => {
      const exists = prev.filter(item => item.value !== bsrVal);
      let est = '~1 sale/day';
      if (bsrVal <= 100) est = '~220 sales/day';
      else if (bsrVal <= 1000) est = '~40 sales/day';
      else if (bsrVal <= 10000) est = '~10 sales/day';
      else if (bsrVal <= 20000) est = '~5 sales/day';

      return [
        { id: Date.now().toString(), type: 'bsr' as const, title: `BSR #${bsrVal.toLocaleString()}`, value: bsrVal, badge: est, timestamp: 'Just now' },
        ...exists
      ].slice(0, 8);
    });
  };

  const handleApplyRecent = (item: RecentSessionItem) => {
    if (item.type === 'search') {
      setSearchQuery(item.value as string);
      setActiveTab('categories');
    } else if (item.type === 'bsr') {
      setCustomBsr(item.value as number);
      setActiveTab('categories');
    }
  };

  const handleClearRecent = () => {
    setRecentItems([]);
  };

  // AI Keyword Generator State & API Handler
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiNotification, setAiNotification] = useState<string | null>(null);

  const generateAiKeywords = async () => {
    setIsAiGenerating(true);
    setAiNotification(null);

    try {
      const response = await fetch('/api/generate-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryName: selectedCategory.name,
          categoryPath: selectedCategory.path,
          genre: selectedCategory.genre,
          audienceIntent: selectedCategory.audienceIntent
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.keywords && Array.isArray(data.keywords) && data.keywords.length > 0) {
          const formatted = data.keywords.slice(0, 7).map((k: string) => String(k).slice(0, 50));
          while (formatted.length < 7) {
            const fallbackKw = selectedCategory.recommendedKeywords[formatted.length % selectedCategory.recommendedKeywords.length];
            formatted.push(fallbackKw.slice(0, 50));
          }
          setKeywordSlots(formatted);
          setAiNotification(`AI synthesized 7 long-tail keywords for "${selectedCategory.name}"!`);
          setTimeout(() => setAiNotification(null), 4000);
          setIsAiGenerating(false);
          return;
        }
      }
      throw new Error('Fallback to contextual generator');
    } catch {
      // Contextual high-intent subculture generator fallback
      const base = selectedCategory.name.toLowerCase();
      const genre = selectedCategory.genre.toLowerCase();
      const recs = selectedCategory.recommendedKeywords;
      
      const contextualSlots = [
        recs[0] ? recs[0].slice(0, 50) : `${base} reader favorites gift`,
        recs[1] ? recs[1].slice(0, 50) : `gentle ${base} beginners guide`,
        recs[2] ? recs[2].slice(0, 50) : `high intent ${genre} community stories`,
        recs[3] ? recs[3].slice(0, 50) : `${base} read aloud bedtime series`,
        `inspiring ${base} aesthetic mindful book`.slice(0, 50),
        `creative ${base} sensory learning companion`.slice(0, 50),
        `authentic ${genre} indie bookshop discover`.slice(0, 50)
      ];

      setKeywordSlots(contextualSlots);
      setAiNotification(`Generated 7 tailored long-tail keywords for "${selectedCategory.name}"!`);
      setTimeout(() => setAiNotification(null), 4000);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Pro Sandbox Net Margin per unit (Amazon 60% standard paperback royalty minus print cost)
  const sandboxNetMargin = useMemo(() => {
    const net = (sandboxPrice * 0.60) - sandboxPrintCost;
    return Math.max(0, Number(net.toFixed(2)));
  }, [sandboxPrice, sandboxPrintCost]);

  const filteredCategories = useMemo(() => {
    return NICHE_CATEGORIES.filter(cat => {
      const matchesGenre = selectedGenre === 'All' || cat.genre === selectedGenre;
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.recommendedKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, searchQuery]);

  const estimatedSales = useMemo(() => {
    const bsr = Math.max(1, customBsr);
    let daily = 0;
    if (bsr <= 5) daily = 3500;
    else if (bsr <= 10) daily = 2000;
    else if (bsr <= 50) daily = 450;
    else if (bsr <= 100) daily = 220;
    else if (bsr <= 500) daily = 75;
    else if (bsr <= 1000) daily = 40;
    else if (bsr <= 5000) daily = 18;
    else if (bsr <= 10000) daily = 10;
    else if (bsr <= 20000) daily = 5;
    else if (bsr <= 50000) daily = 2;
    else daily = 1;
    return {
      daily,
      monthly: daily * 30,
      royaltiesAt499: (daily * 30 * 4.99 * 0.7).toFixed(0),
    };
  }, [customBsr]);

  // 30-day projection calculation
  const projectionData = useMemo(() => {
    const baseBsr = Math.max(1, customBsr);
    const data = [];
    let cumulative = 0;
    for (let day = 1; day <= 30; day++) {
      const fluctuation = Math.sin((day / 30) * Math.PI * 4) * 0.10 + Math.cos((day / 15) * Math.PI) * 0.04;
      const dayBsr = Math.max(1, Math.round(baseBsr * (1 + fluctuation)));
      let daily = 0;
      if (dayBsr <= 5) daily = 3500;
      else if (dayBsr <= 10) daily = 2000;
      else if (dayBsr <= 50) daily = 450;
      else if (dayBsr <= 100) daily = 220;
      else if (dayBsr <= 500) daily = 75;
      else if (dayBsr <= 1000) daily = 40;
      else if (dayBsr <= 5000) daily = 18;
      else if (dayBsr <= 10000) daily = 10;
      else if (dayBsr <= 20000) daily = 5;
      else if (dayBsr <= 50000) daily = 2;
      else daily = 1;

      const dailyRoyalty = Number((daily * 4.99 * 0.7).toFixed(1));
      cumulative += dailyRoyalty;

      data.push({
        day: `D${day}`,
        dayNum: day,
        bsr: dayBsr,
        sales: daily,
        royalty: dailyRoyalty,
        cumulative: Math.round(cumulative)
      });
    }
    return data;
  }, [customBsr]);

  const thirtyDayCumulative = useMemo(() => {
    if (!projectionData.length) return 0;
    return projectionData[projectionData.length - 1].cumulative;
  }, [projectionData]);

  // Pro Sandbox 30-Day Royalties projection based on dynamic Price & Print Cost sliders
  const proProjectionData = useMemo(() => {
    const baseBsr = Math.max(1, customBsr);
    const data = [];
    let cumulative = 0;
    for (let day = 1; day <= 30; day++) {
      const fluctuation = Math.sin((day / 30) * Math.PI * 4) * 0.10 + Math.cos((day / 15) * Math.PI) * 0.04;
      const dayBsr = Math.max(1, Math.round(baseBsr * (1 + fluctuation)));
      let daily = 0;
      if (dayBsr <= 5) daily = 3500;
      else if (dayBsr <= 10) daily = 2000;
      else if (dayBsr <= 50) daily = 450;
      else if (dayBsr <= 100) daily = 220;
      else if (dayBsr <= 500) daily = 75;
      else if (dayBsr <= 1000) daily = 40;
      else if (dayBsr <= 5000) daily = 18;
      else if (dayBsr <= 10000) daily = 10;
      else if (dayBsr <= 20000) daily = 5;
      else if (dayBsr <= 50000) daily = 2;
      else daily = 1;

      const dailyRoyalty = Number((daily * sandboxNetMargin).toFixed(2));
      cumulative += dailyRoyalty;

      data.push({
        day: `D${day}`,
        dayNum: day,
        bsr: dayBsr,
        sales: daily,
        royalty: dailyRoyalty,
        cumulative: Math.round(cumulative)
      });
    }
    return data;
  }, [customBsr, sandboxNetMargin]);

  const proThirtyDayCumulative = useMemo(() => {
    if (!proProjectionData.length) return 0;
    return proProjectionData[proProjectionData.length - 1].cumulative;
  }, [proProjectionData]);

  // Export Strategy Generator for both Free and Paid Tiers
  const exportStrategyFile = (tier: 'free' | 'paid') => {
    let content = '';
    let filename = '';

    if (tier === 'free') {
      filename = `KDP-Day1-Strategy-Export-${new Date().toISOString().slice(0, 10)}.md`;
      content = `# KDP Day-1 Publishing Strategy Export
Generated: ${new Date().toLocaleDateString()}
Plan Tier: Free Day-1 Author Edition

## 1. Selected Amazon Shelves (Browse Categories - Up to 3)
${selectedForKdp.length > 0 ? selectedForKdp.map((cat, i) => `### Shelf ${i + 1}: ${cat.name}
- Path: ${cat.path}
- Target #1 BSR: #${cat.topRankBsr.toLocaleString()} (~${cat.dailySalesForTop} sales/day)
- Audience Intent: ${cat.audienceIntent}`).join('\n\n') : 'No shelves selected yet.'}

## 2. KDP 7 Backend Keyword Slots (50-Character Compliance)
${keywordSlots.map((slot, i) => `Slot ${i + 1} [${slot.length}/50 chars]: ${slot}`).join('\n')}

## 3. Print Pricing & Break-Even Analysis
- Interior Type: ${colorType.replace('_', ' ').toUpperCase()}
- Page Count: ${pageCount} pages
- Estimated Amazon Print Cost: $${printCostDetails.totalPrintCost} / copy
- Minimum Retail Price (Zero Loss): $${printCostDetails.minimumListPrice}
- Current Test Price: $${bookListPrice} (Net Author Royalty: $${printCostDetails.royaltyPerBook} per sale)

## 4. Day-1 KDP Publishing Checklist
- [ ] Never repeat words already present in your main book title or subtitle.
- [ ] Ensure print page count is a clean multiple of 4 or 8 for standard binding.
- [ ] Use Free KDP ISBN if launching exclusively on Amazon Kindle & Paperback.
- [ ] Request your chosen 3 category shelves during book upload.
`;
    } else {
      filename = `Publisher-Pro-Strategic-Dossier-${new Date().toISOString().slice(0, 10)}.md`;
      content = `# Publisher Pro Strategic Blueprint & Wide Distribution Dossier
Generated: ${new Date().toLocaleDateString()}
Plan Tier: Publisher Pro Strategic Suite

## 1. Executive Unit Economics & Financial Forecast (Pro Sandbox)
- Retail Book Price: $${sandboxPrice.toFixed(2)}
- Unit Print Production Cost: $${sandboxPrintCost.toFixed(2)}
- Net Author Royalty per Unit: $${sandboxNetMargin.toFixed(2)} (${sandboxPrice > 0 ? ((sandboxNetMargin / sandboxPrice) * 100).toFixed(1) : 0}% net margin)
- Target BSR Velocity: #${customBsr.toLocaleString()} (~${estimatedSales.daily} books/day)
- 30-Day Projected Net Author Royalties: $${proThirtyDayCumulative.toLocaleString()}

## 2. Selected Amazon Shelves (Up to 3 Browse Paths)
${selectedForKdp.length > 0 ? selectedForKdp.map((cat, i) => `### Shelf ${i + 1}: ${cat.name}
- Path: ${cat.path}
- Opportunity Score: ${cat.opportunity}
- Competitor Density: ${cat.competitionScore}/100
- Recommended Search Queries: ${cat.recommendedKeywords.join(', ')}`).join('\n\n') : 'No shelves selected.'}

## 3. KDP 7 Backend Keyword Slots
${keywordSlots.map((slot, i) => `Slot ${i + 1} [${slot.length}/50 chars]: ${slot}`).join('\n')}

## 4. Strategic A/B Variant Testing Engine
- Variant A: ${variantA} (High urgency problem solver)
- Variant B: ${variantB} (Aesthetic gift & leisure buyer)

## 5. Multi-Retailer Distribution Roadmap (Beyond Amazon)
- Amazon KDP: Core eBook & Paperback revenue anchor.
- IngramSpark: Hardcover catalog listing + 55% wholesale discount for Barnes & Noble, Waterstones, and independent bookshops.
- Draft2Digital: Global eBook and OverDrive school/library placement.
- Bowker ISBN Strategy: 10-Pack ($295) allocated across Paperback, Hardcover, eBook, and Audiobook.

## 6. Audiobook & Soundscape Production Budget
- ACX Voice Talent: Soothing Bedtime Narration ($65/finished hour).
- Soundscape Master: Stereo ambient effects for enhanced children's immersion.
`;
    }

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportSuccess(tier);
    setTimeout(() => setExportSuccess(null), 3000);
  };

  // KDP Print Cost Logic (US Marketplace Standard Trim)
  const printCostDetails = useMemo(() => {
    let fixedCost = 1.00;
    let perPageCost = 0.012;

    if (colorType === 'premium_color') {
      fixedCost = 1.00; // Under 108 pages picture book regular
      perPageCost = 0.07;
    } else if (colorType === 'standard_color') {
      fixedCost = 1.00;
      perPageCost = 0.038;
    } else {
      fixedCost = 1.00;
      perPageCost = 0.014;
    }

    const totalPrintCost = fixedCost + (pageCount * perPageCost);
    // KDP Paperback Royalty is 60% of list price minus print cost
    const royaltyPerBook = (bookListPrice * 0.60) - totalPrintCost;
    const minimumListPrice = (totalPrintCost / 0.60).toFixed(2);

    return {
      totalPrintCost: totalPrintCost.toFixed(2),
      royaltyPerBook: Math.max(0, royaltyPerBook).toFixed(2),
      minimumListPrice,
      isLoss: royaltyPerBook <= 0
    };
  }, [pageCount, colorType, bookListPrice]);

  const handleUpdateSlot = (index: number, val: string) => {
    const updated = [...keywordSlots];
    updated[index] = val;
    setKeywordSlots(updated);
  };

  const loadPresetKeywords = (keywords: string[]) => {
    const updated = [...keywordSlots];
    keywords.forEach((kw, i) => {
      if (i < 7) updated[i] = kw.slice(0, 50);
    });
    setKeywordSlots(updated);
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedSlot(index);
      setTimeout(() => setCopiedSlot(null), 1800);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const toggleKdpCategory = (cat: KDPCategory) => {
    if (selectedForKdp.some(c => c.id === cat.id)) {
      setSelectedForKdp(selectedForKdp.filter(c => c.id !== cat.id));
    } else {
      if (selectedForKdp.length < 3) {
        setSelectedForKdp([...selectedForKdp, cat]);
      }
    }
  };

  // ISBN Middleman checkout allocation handler ($55.55 Pro / $77.77 Free)
  const handleAllocateIsbn = () => {
    const rate = userTier === 'paid' ? 55.55 : 77.77;
    const prefix = '978-1-964201-';
    const newItems: Array<{
      isbn: string;
      imprint: string;
      format: string;
      allocatedDate: string;
      tierRate: number;
    }> = [];
    for (let i = 0; i < isbnOrderQty; i++) {
      const randSuffix = Math.floor(10 + Math.random() * 89);
      const checkDigit = Math.floor(Math.random() * 9);
      newItems.push({
        isbn: `${prefix}${randSuffix}-${checkDigit}`,
        imprint: isbnImprintName.trim() || 'Independent Creator Imprint',
        format: isbnFormatType,
        allocatedDate: 'Just now',
        tierRate: rate
      });
    }
    setAllocatedIsbns(prev => [...newItems, ...prev]);
    setIsbnCheckoutSuccess(true);
    setTimeout(() => setIsbnCheckoutSuccess(false), 5000);
  };

  // Competitor Spy ASIN Inspection handler
  const handleSpyCompetitor = (targetAsin?: string) => {
    const asin = (targetAsin || spyAsinInput).trim().toUpperCase();
    if (!asin) return;
    setIsAnalyzingCompetitor(true);

    setTimeout(() => {
      let comp: CompetitorBook;
      if (asin === '1950968940') {
        comp = {
          asin: '1950968940',
          title: 'The Little Book of Cottagecore Herbalism',
          subtitle: 'Simple Rituals and Botanical Crafts for Slow Living',
          author: 'Emily Carlin',
          bsr: 620,
          estDailySales: 24,
          estDailyRoyalty: 55.20,
          price: 15.99,
          printCost: 3.85,
          categoryPath: "Crafts, Hobbies & Home > Gardening & Horticulture > Herbs",
          categoryName: "Cottagecore Botanical Crafts & Herbalism",
          inferredKeywords: ['cottagecore botanical journal foraging', 'dried flowers natural soap', 'kitchen herbalism folklore seasonal guide', 'rustic cozy hearth craft notebook'],
          dateAdded: 'Today',
          notes: 'High retail price ($15.99) with strong gift appeal during Q4.'
        };
      } else if (asin === 'B08HGN76H3') {
        comp = {
          asin: 'B08HGN76H3',
          title: 'Trapped in a Video Game: The Secret Level',
          subtitle: 'A Fast-Paced Gaming Adventure for Reluctant Readers',
          author: 'Dustin Brady',
          bsr: 290,
          estDailySales: 52,
          estDailyRoyalty: 109.20,
          price: 9.99,
          printCost: 2.15,
          categoryPath: "Children's Books > Science Fiction & Fantasy > Fantasy & Magic > Virtual Reality & Gaming",
          categoryName: "Middle Grade Gaming Adventures",
          inferredKeywords: ['trapped in video game quest kids', 'minecraft roblox style chapter book 8-12', 'reluctant reader funny gaming humor', 'pixel world dungeon team secret level'],
          dateAdded: 'Today',
          notes: 'High volume under $10 sweet spot for parents and school book fairs.'
        };
      } else {
        comp = {
          asin,
          title: `Bestselling Competitor Showcase (${asin})`,
          subtitle: 'Targeted Reader Magnet & Illustrated Series Edition',
          author: 'Top Indie Publisher',
          bsr: Math.floor(250 + Math.random() * 1500),
          estDailySales: Math.floor(18 + Math.random() * 45),
          estDailyRoyalty: Number((Math.floor(18 + Math.random() * 45) * 2.85).toFixed(2)),
          price: 12.99,
          printCost: 3.45,
          categoryPath: selectedCategory.path,
          categoryName: selectedCategory.name,
          inferredKeywords: selectedCategory.recommendedKeywords,
          dateAdded: 'Today',
          notes: `Inspected via live metadata extractor on aisle: ${selectedCategory.name}.`
        };
      }

      setAnalyzedCompetitor(comp);
      setIsAnalyzingCompetitor(false);
    }, 500);
  };

  // Add analyzed competitor to active Inspiration Station
  const handleSaveToStation = (stationId: string) => {
    if (!analyzedCompetitor) return;
    setStations(prev => prev.map(s => {
      if (s.id === stationId) {
        if (s.books.some(b => b.asin === analyzedCompetitor.asin)) return s;
        return {
          ...s,
          books: [analyzedCompetitor, ...s.books]
        };
      }
      return s;
    }));
    setAlertNotification(`Pinned "${analyzedCompetitor.title.slice(0, 32)}..." to Inspiration Station!`);
    setTimeout(() => setAlertNotification(null), 3500);
  };

  // Toggle Auto-update new releases subscription for station
  const handleToggleAutoUpdate = (stationId: string) => {
    setStations(prev => prev.map(s => {
      if (s.id === stationId) {
        const nextVal = !s.subscribeAutoUpdate;
        setAlertNotification(nextVal 
          ? `Subscribed to auto-updated new releases for "${s.name}"!` 
          : `Paused new release alerts for "${s.name}".`
        );
        setTimeout(() => setAlertNotification(null), 3500);
        return { ...s, subscribeAutoUpdate: nextVal };
      }
      return s;
    }));
  };

  // Check New Releases Now
  const handleCheckNewReleases = (stationId: string) => {
    setStations(prev => prev.map(s => {
      if (s.id === stationId) {
        return {
          ...s,
          lastChecked: 'Just now (Sentinel Active)',
          newReleasesFound: s.newReleasesFound + 1
        };
      }
      return s;
    }));
    setAlertNotification('Scanned author catalogs: 1 new release discovered in your niche!');
    setTimeout(() => setAlertNotification(null), 4000);
  };

  // Create new Inspiration Station
  const handleCreateStation = () => {
    if (!newStationTitle.trim()) return;
    const newId = `station-${Date.now()}`;
    const newSt: InspirationStation = {
      id: newId,
      name: newStationTitle.trim(),
      description: 'Custom author inspiration board and competitor watch.',
      subscribeAutoUpdate: true,
      lastChecked: 'Just now',
      newReleasesFound: 0,
      books: analyzedCompetitor ? [analyzedCompetitor] : []
    };
    setStations(prev => [...prev, newSt]);
    setActiveStationId(newId);
    setNewStationTitle('');
    setIsCreatingStation(false);
    setAlertNotification(`Created Inspiration Station: "${newSt.name}"`);
    setTimeout(() => setAlertNotification(null), 3500);
  };

  // Voice Talent Application submit
  const handleSubmitVoiceApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantFormData.name || !applicantFormData.email) return;
    setInHouseVoiceRoster(prev => [
      {
        id: `vt-${Date.now()}`,
        name: applicantFormData.name,
        badge: 'Applicant Under Review (Direct In-House)',
        tone: applicantFormData.vocalStyle,
        voiceAge: applicantFormData.accent,
        audioSampleTitle: `${applicantFormData.name} - Studio Demo Reel`,
        pfhRate: applicantFormData.pfhRate,
        studioGear: applicantFormData.studioMic,
        reviews: 5.0,
        tags: ['New Applicant', 'Direct Studio', 'Auditioned']
      },
      ...prev
    ]);
    setApplicantSubmitted(true);
    setTimeout(() => {
      setApplicantSubmitted(false);
      setIsVoiceApplicantModalOpen(false);
    }, 2200);
  };

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter(item =>
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.plainEnglish.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.dayOneTakeaway.toLowerCase().includes(glossarySearch.toLowerCase())
    );
  }, [glossarySearch]);

  const getOpportunityBadge = (opp: KDPCategory['opportunity']) => {
    switch (opp) {
      case 'Sweet Spot':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1 shadow-xs">
            <Flame className="w-3 h-3 text-emerald-600" /> Sweet Spot
          </span>
        );
      case 'High Opportunity':
        return (
          <span className="bg-sky-100 text-sky-800 border border-sky-300 text-xs px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
            High Opportunity
          </span>
        );
      case 'Competitive':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
            Competitive
          </span>
        );
      case 'Hyper-Competitive':
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-300 text-xs px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
            Hyper-Competitive
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-amber-50/70 text-slate-800 flex flex-col relative overflow-x-hidden antialiased selection:bg-amber-300">
      
      {/* Decorative Cloud Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-10 left-12 text-white/70 animate-pulse">
          <Cloud className="w-44 h-44 fill-white filter drop-shadow-sm" />
        </div>
        <div className="absolute top-28 right-8 text-white/80">
          <Cloud className="w-60 h-60 fill-white filter drop-shadow-md" />
        </div>
        <div className="absolute top-96 -left-12 text-white/60">
          <Cloud className="w-72 h-72 fill-white filter drop-shadow-sm" />
        </div>
        <div className="absolute top-6 left-1/3 text-amber-300/40">
          <Sun className="w-32 h-32 animate-spin [animation-duration:40s]" />
        </div>
      </div>

      {/* Rainbow Banner Stripe */}
      <div className="h-2 w-full bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-sky-400 via-indigo-500 to-purple-500 z-40 shadow-xs" />

      {/* Top Header */}
      <header className="border-b border-sky-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 border-2 border-amber-300 flex items-center justify-center text-amber-900 shadow-md shadow-amber-300/50">
                <Sun className="w-6 h-6 text-amber-600 animate-spin [animation-duration:20s]" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs border border-sky-200">
                <RainbowIcon className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800 flex items-center gap-1.5">
                  Sunny Idea-to-ISBN Mentor
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-rose-500 via-amber-500 to-purple-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                  {userTier === 'free' ? 'Day-1 Author Tier' : 'Publisher Pro Suite'}
                </span>
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-sky-500 fill-sky-200 inline" />
                Strategic guidance for Children's books & niche sub-cultures
              </p>
            </div>
          </div>

          {/* Tier Switcher & Shelves Quick Status */}
          <div className="flex items-center gap-3">
            <div className="bg-sky-100 p-0.5 rounded-xl border border-sky-200 flex items-center text-xs font-bold">
              <button
                onClick={() => setUserTier('free')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  userTier === 'free' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌱 Free Tier
              </button>
              <button
                onClick={() => setUserTier('paid')}
                className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  userTier === 'paid' ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3 h-3" /> Publisher Pro
              </button>
            </div>

            {/* Strategy Export Button (Free and Pro) */}
            <button
              onClick={() => exportStrategyFile(userTier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                userTier === 'free'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white'
              }`}
              title={userTier === 'free' ? 'Download Day-1 KDP Strategy Sheet (.md)' : 'Download Full Publisher Pro Dossier (.md)'}
            >
              {exportSuccess === userTier ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Exported!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export {userTier === 'free' ? 'Day-1 Strategy' : 'Pro Dossier'}</span>
                </>
              )}
            </button>

            {/* Recent Searches Drawer Toggle */}
            <button
              onClick={() => setIsRecentSidebarOpen(!isRecentSidebarOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs border ${
                isRecentSidebarOpen
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 hover:bg-sky-50 border-sky-200'
              }`}
              title="View Recent Searches & BSR Calculations"
            >
              <History className="w-3.5 h-3.5 text-amber-600" />
              <span>Recent Searches</span>
              <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center">
                {recentItems.length}
              </span>
            </button>

            <div className="bg-white/90 border border-sky-200 px-3 py-1 rounded-xl flex items-center gap-2 text-xs shadow-xs hidden md:flex">
              <span className="text-slate-500 font-medium">Selected Shelves:</span>
              <span className="font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white">
                {selectedForKdp.length}/3 Amazon Shelves
              </span>
            </div>
          </div>
        </div>

        {/* Plain-English Day-1 Clarification Banner */}
        <div className="bg-gradient-to-r from-amber-100/90 via-sky-50/90 to-emerald-50/90 border-t border-b border-amber-200/60 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-400/30 flex items-center justify-center text-amber-700 shrink-0">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <span>
                <strong className="text-slate-900">What are "Shelves"?</strong> In Amazon KDP, shelves are the 3 official browse categories you assign to your book so real shoppers can find you in store aisles.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('glossary')}
              className="text-amber-800 font-bold hover:underline shrink-0 flex items-center gap-1"
            >
              Open Day-1 Plain-English Glossary <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'categories'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-sky-100/70 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Children & Niche Shelves
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'glossary'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-sky-100/70 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Day-1 Glossary
          </button>

          <button
            onClick={() => setActiveTab('printCalculator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'printCalculator'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-sky-100/70 hover:text-slate-900'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            Print Cost & Pricing Toolkit
          </button>

          <button
            onClick={() => setActiveTab('isbnHub')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'isbnHub'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-sky-100/70 hover:text-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            Official ISBN Portal
          </button>

          <button
            onClick={() => setActiveTab('proSandbox')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'proSandbox'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs'
                : 'text-amber-800 hover:bg-amber-100/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Publisher Pro Sandbox & Wide
            {userTier === 'free' && <Lock className="w-3 h-3 text-amber-600" />}
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex-1 w-full relative z-10">

        {/* TAB 1: Categories & 7 Keyword Slots */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Category Intelligence */}
            <section className="lg:col-span-7 flex flex-col gap-4">
              {/* Search & Genre Filter */}
              <div className="bg-white/90 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-md shadow-sky-900/5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-500" />
                  <input
                    type="text"
                    placeholder="Search children's picture books or sub-cultures (e.g. bedtime, cottagecore)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => recordSearch(searchQuery)}
                    onKeyDown={(e) => { if (e.key === 'Enter') recordSearch(searchQuery); }}
                    className="w-full bg-sky-50/70 border border-sky-200 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-sky-600" />
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="bg-sky-50/70 border border-sky-200 rounded-xl px-3 py-2 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-xs"
                  >
                    <option value="All">All Niche Specialties</option>
                    <option value="Children's & Picture Books">🧸 Children's & Picture Books</option>
                    <option value="Niche Sub-Cultures">🌿 Niche Sub-Cultures</option>
                  </select>
                </div>
              </div>

              {/* Category Cards */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-semibold text-sky-900 px-1">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    {filteredCategories.length} Curated Children & Sub-Culture Shelves
                  </span>
                  <span className="text-slate-500 font-normal">Click shelf to load KDP slots</span>
                </div>

                {filteredCategories.map((cat) => {
                  const isSelected = selectedCategory.id === cat.id;
                  const isAddedToKdp = selectedForKdp.some(c => c.id === cat.id);

                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-2xl p-4 transition-all cursor-pointer relative bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg ${
                        isSelected
                          ? 'border-2 border-transparent ring-2 ring-amber-400 shadow-amber-300/30 bg-gradient-to-br from-white via-amber-50/20 to-sky-50/30'
                          : 'border border-sky-100/90 hover:border-sky-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r from-rose-400 via-amber-400 via-emerald-400 via-sky-400 to-purple-400" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-sky-700 bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded-full">
                            {cat.genre}
                          </span>
                          <h3 className="font-bold text-slate-800 text-base hover:text-sky-700 transition-colors">
                            {cat.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {getOpportunityBadge(cat.opportunity)}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleKdpCategory(cat);
                            }}
                            className={`text-xs px-3 py-1 rounded-full font-bold transition-all shadow-xs flex items-center gap-1 ${
                              isAddedToKdp
                                ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-white'
                                : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                            }`}
                          >
                            {isAddedToKdp ? <Check className="w-3 h-3 text-white" /> : '+'} Assign Shelf
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-mono text-slate-500 mb-2 truncate bg-slate-50/80 px-2.5 py-1 rounded-md border border-slate-100">
                        {cat.path}
                      </p>

                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                        <strong className="text-slate-800">Reader Intent:</strong> {cat.audienceIntent}
                      </p>

                      {/* Metrics Bar */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-sky-100 text-xs">
                        <div className="bg-gradient-to-b from-amber-50 to-white p-2 rounded-xl border border-amber-200/60 shadow-xs">
                          <div className="text-amber-800 text-[10px] font-bold uppercase flex items-center gap-1">
                            <Sun className="w-3 h-3 text-amber-500" /> #1 Best Seller
                          </div>
                          <div className="font-extrabold text-amber-600 font-mono text-sm mt-0.5">#{cat.topRankBsr.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500">~{cat.dailySalesForTop} books/day</div>
                        </div>

                        <div className="bg-gradient-to-b from-sky-50 to-white p-2 rounded-xl border border-sky-200/60 shadow-xs">
                          <div className="text-sky-800 text-[10px] font-bold uppercase flex items-center gap-1">
                            <Cloud className="w-3 h-3 text-sky-500" /> Top 100 Rank
                          </div>
                          <div className="font-extrabold text-sky-700 font-mono text-sm mt-0.5">#{cat.hundredRankBsr.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500">~{cat.dailySalesFor100} books/day</div>
                        </div>

                        <div className="bg-gradient-to-b from-purple-50 to-white p-2 rounded-xl border border-purple-200/60 shadow-xs">
                          <div className="text-purple-800 text-[10px] font-bold uppercase">Competition</div>
                          <div className="font-extrabold text-purple-700 font-mono text-sm mt-0.5">{cat.competitionScore}/100</div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-400 to-rose-400"
                              style={{ width: `${cat.competitionScore}%` }}
                            />
                          </div>
                        </div>

                        <div className="bg-gradient-to-b from-emerald-50 to-white p-2 rounded-xl border border-emerald-200/60 shadow-xs flex flex-col justify-between">
                          <div className="text-emerald-800 text-[10px] font-bold uppercase">Keywords</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              loadPresetKeywords(cat.recommendedKeywords);
                            }}
                            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 mt-1 group"
                          >
                            Load 7 Slots <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BSR Sales Velocity & 30-Day Recharts Chart */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-md shadow-sky-900/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Sunny BSR Sales Velocity & Royalties</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    KDP Store Formula
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-5">
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Target BSR Rank:</label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-sm font-bold">#</span>
                      <input
                        type="number"
                        min="1"
                        max="1000000"
                        value={customBsr}
                        onChange={(e) => setCustomBsr(Number(e.target.value))}
                        onBlur={() => recordBsr(customBsr)}
                        onKeyDown={(e) => { if (e.key === 'Enter') recordBsr(customBsr); }}
                        className="w-full bg-sky-50/80 border border-sky-200 rounded-xl px-3 py-1.5 font-mono text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100000"
                      step="100"
                      value={customBsr}
                      onChange={(e) => setCustomBsr(Number(e.target.value))}
                      className="w-full mt-2 accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="sm:col-span-7 grid grid-cols-3 gap-2 bg-gradient-to-r from-sky-50 via-amber-50/60 to-emerald-50 p-3 rounded-xl border border-sky-200/80 text-center shadow-xs">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Daily Sales</div>
                      <div className="text-lg font-black text-slate-800 font-mono">{estimatedSales.daily}</div>
                      <div className="text-[10px] text-slate-500 font-medium">books/day</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-amber-700 uppercase">Monthly Volume</div>
                      <div className="text-lg font-black text-amber-600 font-mono">{estimatedSales.monthly.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500 font-medium">copies/mo</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-emerald-700 uppercase">Est. Royalty @ $4.99</div>
                      <div className="text-lg font-black text-emerald-600 font-mono">${estimatedSales.royaltiesAt499}</div>
                      <div className="text-[10px] text-slate-500 font-medium">70% payout/mo</div>
                    </div>
                  </div>
                </div>

                {/* 30-Day Royalty Projection Trend Chart using Recharts */}
                <div className="mt-3.5 pt-3 border-t border-sky-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-800">30-Day Projected Royalties Trend</span>
                      <span className="text-[10px] text-slate-500 hidden sm:inline">(Natural BSR variance)</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-xs">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      ${thirtyDayCumulative.toLocaleString()} 30d Forecast
                    </span>
                  </div>

                  <div className="h-28 w-full bg-gradient-to-b from-sky-50/40 to-amber-50/30 rounded-xl p-2 border border-sky-100/80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={projectionData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="sunnyRainbowGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#0284c7" stopOpacity={0.03} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#64748b' }} interval={4} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#64748b' }} domain={['dataMin - 1', 'dataMax + 2']} tickFormatter={(v) => `$${v}`} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white/95 backdrop-blur-md p-2 rounded-lg border border-sky-200 shadow-md text-[11px]">
                                  <div className="font-bold text-slate-800 flex items-center gap-1">
                                    <span>Day {data.dayNum}</span>
                                    <span className="text-slate-400 font-mono">BSR #{data.bsr.toLocaleString()}</span>
                                  </div>
                                  <div className="text-emerald-700 font-semibold mt-0.5">
                                    Est. Royalty: <span className="font-bold">${data.royalty.toFixed(2)}/day</span>
                                  </div>
                                  <div className="text-slate-500 text-[10px]">
                                    Cumulative: ${data.cumulative.toLocaleString()}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area type="monotone" dataKey="royalty" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#sunnyRainbowGradient)" activeDot={{ r: 4, stroke: '#f43f5e', strokeWidth: 2, fill: '#fff' }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* 12-Month Peak Seasonal Competitiveness Heatmap */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-md shadow-sky-900/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        12-Month Seasonal Demand Heatmap
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          Peak Surge Cycle
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Annual search velocity & purchasing spikes for: <strong className="text-slate-700">{selectedCategory.name}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-[11px] text-amber-900 font-semibold self-start sm:self-auto flex items-center gap-1 shadow-2xs">
                    <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{selectedCategory.peakWindow}</span>
                  </div>
                </div>

                {/* Recharts 12-Month Seasonal Demand Heatmap Bar Chart */}
                <div className="h-36 w-full bg-gradient-to-b from-sky-50/40 via-amber-50/20 to-white rounded-xl p-2 border border-sky-100/80 mb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedCategory.seasonalDemand} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        domain={[50, 100]}
                        tick={{ fontSize: 9, fill: '#64748b' }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as SeasonalMonth;
                            const isPeak = data.demand >= 95;
                            const isHigh = data.demand >= 85 && data.demand < 95;
                            return (
                              <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-sky-200 shadow-md text-[11px]">
                                <div className="font-bold text-slate-800 flex items-center justify-between gap-3">
                                  <span>Month: {data.month}</span>
                                  <span className={`px-1.5 py-0.5 rounded font-bold ${
                                    isPeak ? 'bg-rose-100 text-rose-700' : isHigh ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                                  }`}>
                                    {data.demand}% Surge
                                  </span>
                                </div>
                                <div className="text-slate-600 font-medium mt-1">
                                  🎯 Seasonal Driver: <strong className="text-slate-800">{data.note}</strong>
                                </div>
                                <div className="text-slate-400 text-[10px] mt-0.5">
                                  {isPeak
                                    ? '⚡ Peak conversion window: Ramp up KDP promo price and Amazon Ads'
                                    : isHigh
                                    ? '📈 Strong seasonal volume: Ensure reviews & metadata are optimized'
                                    : '🌱 Baseline evergreen demand: Good for test launch and price testing'}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="demand" radius={[6, 6, 2, 2]}>
                        {selectedCategory.seasonalDemand.map((entry, index) => {
                          const fillColor =
                            entry.demand >= 95
                              ? '#f43f5e'
                              : entry.demand >= 85
                              ? '#f59e0b'
                              : entry.demand >= 75
                              ? '#10b981'
                              : '#0ea5e9';
                          return <Cell key={`cell-${index}`} fill={fillColor} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Heatmap Legend & Monthly Tiles */}
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center text-[10px]">
                  {selectedCategory.seasonalDemand.map((m) => {
                    const tileBg =
                      m.demand >= 95
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : m.demand >= 85
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : m.demand >= 75
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-sky-100 text-sky-800 border-sky-300';

                    return (
                      <div key={m.month} className={`p-1.5 rounded-lg border font-semibold ${tileBg} flex flex-col justify-between shadow-2xs`}>
                        <span className="font-bold">{m.month}</span>
                        <span className="font-mono text-[11px] font-black">{m.demand}%</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 mt-2.5 pt-2 border-t border-sky-100 px-1 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> 95%+ Peak Surge
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> 85-94% High Demand
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> 75-84% Moderate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 inline-block" /> Under 75% Baseline
                    </span>
                  </div>
                  <span className="text-slate-400 italic">Calibrated to 5-year Amazon Kindle & POD seasonal spikes</span>
                </div>
              </div>
            </section>

            {/* Right Column: 7 KDP Backend Keyword Slots & Shelf Copier */}
            <section className="lg:col-span-5 flex flex-col gap-4">
              {/* Selected Amazon Shelves Box */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-md shadow-sky-900/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <RainbowIcon className="w-4 h-4" />
                    Your 3 Assigned Amazon Shelves
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    {selectedForKdp.length}/3 Shelves Max
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-3">
                  Paste these exact breadcrumbs into your Amazon KDP category picker. Amazon allows up to 3 choices per book.
                </p>

                {selectedForKdp.length === 0 ? (
                  <div className="text-xs text-slate-500 border border-dashed border-sky-300 rounded-xl p-3 text-center bg-white/50">
                    Click "+ Assign Shelf" on any category to assign up to 3 official KDP categories.
                  </div>
                ) : (
                  <div className="space-y-2 mb-3">
                    {selectedForKdp.map((cat, idx) => (
                      <div key={cat.id} className="bg-sky-50/70 p-2.5 rounded-xl border border-sky-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">Shelf {idx + 1}: {cat.name}</span>
                          <button
                            onClick={() => toggleKdpCategory(cat)}
                            className="text-slate-400 hover:text-rose-500 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="font-mono text-[10px] text-slate-500 break-words bg-white/80 p-1.5 rounded border border-sky-100">
                          {cat.path}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedForKdp.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => copyToClipboard(selectedForKdp.map((c, i) => `Shelf ${i+1}: ${c.path}`).join('\n\n'))}
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-1.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Breadcrumbs
                    </button>
                    <button
                      onClick={() => exportStrategyFile('free')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      {exportSuccess === 'free' ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                      {exportSuccess === 'free' ? 'Exported!' : 'Export Sheet (.md)'}
                    </button>
                  </div>
                )}
              </div>

              {/* 7 Backend Keywords Box (50 Chars Rule) */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-md shadow-sky-900/5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-sky-600" />
                      KDP 7 Backend Keyword Slots
                    </h3>
                    <p className="text-[11px] text-slate-500">Max 50 characters per slot. No punctuation needed.</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={generateAiKeywords}
                      disabled={isAiGenerating}
                      className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:opacity-95 disabled:opacity-60 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 active:scale-95 cursor-pointer"
                      title="AI generates 7 compliant long-tail keyword phrases based on current niche"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin text-white' : 'text-amber-300'}`} />
                      <span>{isAiGenerating ? 'Generating...' : 'AI Keyword Generator'}</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(keywordSlots.join('\n'))}
                      className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 hover:opacity-95 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-purple-500/20 active:scale-95 cursor-pointer"
                    >
                      {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedAll ? 'Copied!' : 'Copy All 7'}
                    </button>
                  </div>
                </div>

                {/* AI Notification Banner */}
                {aiNotification && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium">{aiNotification}</span>
                  </div>
                )}

                <div className="space-y-2">
                  {keywordSlots.map((slot, index) => {
                    const charCount = slot.length;
                    const isOverLimit = charCount > 50;
                    const containsTOSWarning = /best\s?seller|free|cheap|kindle/i.test(slot);

                    return (
                      <div key={index} className="bg-white rounded-xl p-2 border border-sky-100 shadow-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-bold text-slate-700">Slot {index + 1}</span>
                          <div className="flex items-center gap-2">
                            {containsTOSWarning && (
                              <span className="text-[10px] text-rose-600 font-bold flex items-center gap-0.5">
                                <AlertTriangle className="w-3 h-3" /> Avoid TOS words
                              </span>
                            )}
                            <span
                              className={`font-mono font-bold ${
                                isOverLimit ? 'text-rose-600' : charCount >= 45 ? 'text-emerald-600' : 'text-slate-500'
                              }`}
                            >
                              {charCount}/50
                            </span>
                            <button
                              onClick={() => copyToClipboard(slot, index)}
                              className="text-slate-400 hover:text-amber-600 p-0.5"
                            >
                              {copiedSlot === index ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={slot}
                          maxLength={65}
                          onChange={(e) => handleUpdateSlot(index, e.target.value)}
                          placeholder="e.g. toddler emotional regulation calm bedtime..."
                          className={`w-full bg-sky-50/50 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-none border ${
                            isOverLimit ? 'border-rose-400 bg-rose-50/50' : 'border-sky-100 focus:border-amber-400 focus:bg-white'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-1 pt-2 border-t border-sky-100 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Day-1 KDP Algorithm Rule
                  </div>
                  <p>Never waste backend space repeating words that already exist in your main title or subtitle. Amazon auto-indexes those!</p>
                </div>
              </div>

              {/* Inline Recent Searches & BSR Estimations Widget */}
              <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-md shadow-sky-900/5">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <History className="w-4 h-4 text-amber-600" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Recent Session Queries & BSRs
                    </h3>
                  </div>
                  {recentItems.length > 0 && (
                    <button
                      onClick={handleClearRecent}
                      className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold flex items-center gap-1 transition-colors"
                      title="Clear session history"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                {recentItems.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No recent queries in this session yet.</p>
                ) : (
                  <div className="space-y-1.5">
                    {recentItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleApplyRecent(item)}
                        className="w-full text-left bg-sky-50/70 hover:bg-amber-50/80 border border-sky-100 hover:border-amber-300 rounded-xl px-2.5 py-1.5 transition-all text-xs flex items-center justify-between group shadow-2xs active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${item.type === 'search' ? 'bg-sky-500' : 'bg-amber-500'}`} />
                          <span className="font-bold text-slate-800 group-hover:text-amber-900 truncate">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-sky-100">
                            {item.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.timestamp}
                          </span>
                          <RotateCcw className="w-3 h-3 text-slate-400 group-hover:text-amber-600 ml-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: Day-1 Interactive Glossary */}
        {activeTab === 'glossary' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    Day-1 Indie Publishing Plain-English Glossary
                  </h2>
                  <p className="text-xs text-slate-500">Every confusing publishing term explained in 30 seconds for new authors.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
                  <input
                    type="text"
                    placeholder="Search terms (BSR, ISBN, Wide)..."
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    className="w-full bg-sky-50/80 border border-sky-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {filteredGlossary.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-sky-50/60 via-amber-50/40 to-white rounded-xl p-4 border border-sky-100 shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-slate-900 text-sm">{item.term}</h3>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                      {item.plainEnglish}
                    </p>
                    <div className="bg-white/90 p-2.5 rounded-lg border border-sky-100/80 text-xs space-y-1">
                      <div className="text-amber-800">
                        <strong className="text-slate-900">💡 Why it matters Day 1:</strong> {item.dayOneTakeaway}
                      </div>
                      <div className="text-slate-600">
                        <strong className="text-slate-900">⚙️ KDP Action Step:</strong> {item.kdpAction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Print Cost & Pricing Toolkit (Free Tier Feature) */}
        {activeTab === 'printCalculator' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Printer className="w-5 h-5 text-sky-600" />
                    KDP Print-on-Demand (POD) Mockup Pricing Toolkit
                  </h2>
                  <p className="text-xs text-slate-500">Calculate exact Amazon printing fees, break-even thresholds, and author net royalty per copy.</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full">
                  Free Tier Tool
                </span>
              </div>

              {/* Calculator Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Print Color Selection */}
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200">
                  <label className="text-xs font-bold text-slate-700 block mb-2">Interior Print Type:</label>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="colorType"
                        checked={colorType === 'premium_color'}
                        onChange={() => setColorType('premium_color')}
                        className="accent-amber-500"
                      />
                      <span>🎨 Premium Color (Children's Books)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="colorType"
                        checked={colorType === 'standard_color'}
                        onChange={() => setColorType('standard_color')}
                        className="accent-amber-500"
                      />
                      <span>📖 Standard Color (Nonfiction / Guides)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-800 font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="colorType"
                        checked={colorType === 'black_white'}
                        onChange={() => setColorType('black_white')}
                        className="accent-amber-500"
                      />
                      <span>📄 Black & White (Novels / Chapters)</span>
                    </label>
                  </div>
                </div>

                {/* Page Count Slider */}
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Total Page Count:</span>
                      <span className="text-amber-700 font-mono text-sm">{pageCount} pages</span>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="300"
                      step="4"
                      value={pageCount}
                      onChange={(e) => setPageCount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer mt-2"
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2">
                    Standard picture books are 32 or 36 pages (multiples of 8 recommended).
                  </div>
                </div>

                {/* List Price Input */}
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 flex flex-col justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Retail List Price ($ USD):</label>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        step="0.50"
                        min="3.00"
                        max="99.00"
                        value={bookListPrice}
                        onChange={(e) => setBookListPrice(Number(e.target.value))}
                        className="w-full bg-white border border-sky-200 rounded-lg px-2.5 py-1.5 font-mono text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2">
                    Suggested picture book price: $11.99 – $14.99.
                  </div>
                </div>
              </div>

              {/* Cost & Royalty Output Panel */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-sky-50 to-amber-50 border border-emerald-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-white/80 p-3 rounded-lg border border-sky-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Amazon Print Cost</div>
                  <div className="text-xl font-black text-rose-600 font-mono">${printCostDetails.totalPrintCost}</div>
                  <div className="text-[10px] text-slate-500">Deducted per unit ordered</div>
                </div>

                <div className="bg-white/80 p-3 rounded-lg border border-sky-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Your Net Royalty (60%)</div>
                  <div className="text-xl font-black text-emerald-600 font-mono">${printCostDetails.royaltyPerBook}</div>
                  <div className="text-[10px] text-slate-500">Your direct profit per sale</div>
                </div>

                <div className="bg-white/80 p-3 rounded-lg border border-sky-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Min. KDP List Price</div>
                  <div className="text-xl font-black text-slate-800 font-mono">${printCostDetails.minimumListPrice}</div>
                  <div className="text-[10px] text-slate-500">Break-even price floor</div>
                </div>
              </div>

              {printCostDetails.isLoss && (
                <div className="mt-3 p-2.5 bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Warning: Your current retail price is below production costs. Increase price to at least ${printCostDetails.minimumListPrice} to earn royalties.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Official ISBN Middleman Syndication Portal */}
        {activeTab === 'isbnHub' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-amber-500" />
                    Official ISBN Syndication & Allocation Portal
                  </h2>
                  <p className="text-xs text-slate-500">
                    We break up large publisher allotments so you can purchase single, unassigned official ISBNs directly with your custom imprint name.
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Authorized Middleman
                </span>
              </div>

              {/* Comparison: Free Distributor ISBN vs Your Own Official ISBN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-sm">Option A: Free Amazon ISBN</h3>
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">$0 Free</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    Amazon acts as publisher of record ("Independently published").
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 mb-3">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Zero dollars out of pocket.</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Fast for initial first-time book tests.</li>
                    <li className="flex items-center gap-1.5 text-rose-600"><AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Cannot be used on IngramSpark, B&N, or bookshops.</li>
                  </ul>
                  <div className="p-2 bg-white rounded-lg border border-sky-200 text-[11px] text-slate-600">
                    <strong>Best for:</strong> Hobby authors publishing strictly on Amazon with zero distribution ambitions.
                  </div>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-sm">Option B: Single-Unit Own ISBN (Our Portal)</h3>
                    <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">Official Publisher</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    You or your publishing imprint legally owns the barcode worldwide.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 mb-3">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Same barcode valid across Amazon, IngramSpark, and D2D.</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Display your custom publishing imprint on all storefronts.</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> No need to buy expensive bundles when you only need 1 or 2.</li>
                  </ul>
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-[11px] text-slate-600">
                    <strong>Best for:</strong> Career authors, children's book series, and indie publishing imprints.
                  </div>
                </div>
              </div>

              {/* Middleman Direct Pricing & Instant Allocation Console */}
              <div className="mt-5 pt-4 border-t border-sky-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Direct Single-Unit ISBN Purchase & Barcode Allocation</h3>
                    <p className="text-xs text-slate-500">
                      Tier-adjusted middleman rates: We break bulk blocks into single identifiers.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      userTier === 'paid' 
                        ? 'bg-amber-100 text-amber-900 border-amber-300' 
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      {userTier === 'paid' ? '⭐ Pro Rate: $55.55 / ISBN' : '🌱 Free Tier Rate: $77.77 / ISBN'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gradient-to-r from-sky-50/80 via-amber-50/50 to-emerald-50/50 p-4 rounded-xl border border-sky-200">
                  {/* Configuration Controls */}
                  <div className="md:col-span-7 space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Number of ISBNs Needed:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((qty) => (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => setIsbnOrderQty(qty)}
                            className={`py-2 px-3 rounded-lg font-bold border text-center transition-all ${
                              isbnOrderQty === qty
                                ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-xs'
                                : 'bg-white border-sky-200 text-slate-700 hover:bg-sky-50'
                            }`}
                          >
                            {qty} ISBN {qty === 1 ? '(Single)' : `(${qty} Formats)`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Your Registered Publisher Imprint Name:</label>
                      <input
                        type="text"
                        value={isbnImprintName}
                        onChange={(e) => setIsbnImprintName(e.target.value)}
                        placeholder="e.g. Sunny Brook Press"
                        className="w-full bg-white border border-sky-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">This imprint name will appear on Amazon and bookstore invoices as the publisher.</p>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Primary Edition Format:</label>
                      <div className="flex gap-2">
                        {(['Paperback', 'Hardcover', 'eBook'] as const).map((fmt) => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setIsbnFormatType(fmt)}
                            className={`px-3 py-1.5 rounded-lg font-semibold border text-xs transition-all ${
                              isbnFormatType === fmt
                                ? 'bg-sky-600 border-sky-700 text-white shadow-xs'
                                : 'bg-white border-sky-200 text-slate-700 hover:bg-sky-50'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Summary & Checkout Action */}
                  <div className="md:col-span-5 bg-white rounded-xl p-3.5 border border-sky-200 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Order Summary</div>
                      <div className="flex items-center justify-between text-xs mt-2 text-slate-700">
                        <span>Quantity:</span>
                        <span className="font-bold">{isbnOrderQty} Official ISBN{isbnOrderQty > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1 text-slate-700">
                        <span>Rate Per ISBN:</span>
                        <span className="font-mono font-bold text-amber-700">
                          ${userTier === 'paid' ? '55.55' : '77.77'}
                        </span>
                      </div>
                      {userTier === 'free' ? (
                        <div className="mt-2 p-1.5 bg-amber-50 rounded border border-amber-200 text-[10px] text-amber-900 flex items-center justify-between">
                          <span>Pro members pay $55.55:</span>
                          <button
                            onClick={() => setUserTier('paid')}
                            className="font-bold text-purple-700 hover:underline"
                          >
                            Switch to Pro →
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2 p-1.5 bg-emerald-50 rounded border border-emerald-200 text-[10px] text-emerald-800">
                          ✓ Pro Discount Applied (Saved ${(isbnOrderQty * 22.22).toFixed(2)})
                        </div>
                      )}
                      <div className="border-t border-sky-100 my-2 pt-2 flex items-center justify-between text-sm font-extrabold text-slate-900">
                        <span>Total Due:</span>
                        <span className="font-mono text-base text-amber-700">
                          ${(isbnOrderQty * (userTier === 'paid' ? 55.55 : 77.77)).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleAllocateIsbn}
                        className="w-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold py-2 rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Allocate & Reserve ISBN ({isbnOrderQty})
                      </button>
                      {isbnCheckoutSuccess && (
                        <div className="mt-2 text-[11px] text-emerald-700 font-bold text-center flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Allocated! Added to your identifier vault below.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Allocated ISBN Vault Display */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Your Allocated ISBN Vault ({allocatedIsbns.length}):
                  </h4>
                  <div className="space-y-2">
                    {allocatedIsbns.map((item, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-300 flex items-center justify-center font-mono font-bold text-sky-800 text-xs shrink-0">
                            #{idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-extrabold text-slate-900 text-xs sm:text-sm">{item.isbn}</span>
                              <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">{item.format}</span>
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Official Barcode</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Imprint: <strong className="text-slate-700">{item.imprint}</strong> • Rate: ${item.tierRate.toFixed(2)} • {item.allocatedDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.isbn)}
                            className="bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition-all"
                          >
                            <Copy className="w-3 h-3" /> Copy ISBN
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Publisher Pro Sandbox & Wide Distribution (Paid Tier) */}
        {activeTab === 'proSandbox' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            {userTier === 'free' ? (
              <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-purple-50 border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-amber-400/30 flex items-center justify-center text-amber-800 mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-black text-slate-900 mb-1">Unlock Publisher Pro Strategic Suite</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                  Access side-by-side A/B variant testing, multi-retailer distribution (Draft2Digital & IngramSpark), audiobook narrator casting, and one-click strategic PDF export.
                </p>
                <button
                  onClick={() => setUserTier('paid')}
                  className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold px-6 py-2 rounded-xl text-xs transition-all shadow-md shadow-purple-500/20"
                >
                  Switch to Publisher Pro Preview (Instant Demo Access)
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Variant Comparison Sandbox */}
                <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-purple-600" />
                      A/B Strategy Sandbox: Shelf & Niche Comparison
                    </h2>
                    <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      Live Variant Engine
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strategy A */}
                    <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs">
                      <div className="font-bold text-sky-950 mb-1">Strategy A: Children's Emotional Regulation</div>
                      <div className="text-slate-600 mb-2">Targeting parents & preschool educators</div>
                      <div className="space-y-1 bg-white p-2 rounded-lg border border-sky-100">
                        <div className="flex justify-between"><span>#1 BSR Target:</span> <strong className="font-mono text-amber-600">#180</strong></div>
                        <div className="flex justify-between"><span>Required Sales:</span> <strong className="font-mono text-slate-700">68 units/day</strong></div>
                        <div className="flex justify-between"><span>Audience Intent:</span> <strong className="text-emerald-700">Immediate Problem Solver</strong></div>
                      </div>
                    </div>

                    {/* Strategy B */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                      <div className="font-bold text-amber-950 mb-1">Strategy B: Cottagecore Herbalism Lifestyle</div>
                      <div className="text-slate-600 mb-2">Targeting slow-living & aesthetic crafters</div>
                      <div className="space-y-1 bg-white p-2 rounded-lg border border-amber-100">
                        <div className="flex justify-between"><span>#1 BSR Target:</span> <strong className="font-mono text-amber-600">#620</strong></div>
                        <div className="flex justify-between"><span>Required Sales:</span> <strong className="font-mono text-slate-700">24 units/day (Easier Bestseller)</strong></div>
                        <div className="flex justify-between"><span>Audience Intent:</span> <strong className="text-purple-700">Aesthetic Gift & Leisure</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Price & Print Cost Sliders & Real-Time 30-Day Pro Projection */}
                <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        Interactive Pricing & Unit Margin Simulator
                      </h2>
                      <p className="text-xs text-slate-500">
                        Adjust retail price and print cost per copy to watch the 30-day royalty curve update in real-time.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      Dynamic Margin Engine
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Book Retail Price Slider */}
                    <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Estimated Book Price:</span>
                        <span className="text-amber-700 font-mono text-sm">${sandboxPrice.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="4.99"
                        max="29.99"
                        step="0.50"
                        value={sandboxPrice}
                        onChange={(e) => setSandboxPrice(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>$4.99</span>
                        <span>$14.99</span>
                        <span>$29.99</span>
                      </div>
                    </div>

                    {/* Print Cost per Unit Slider */}
                    <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Print Cost per Copy:</span>
                        <span className="text-rose-600 font-mono text-sm">${sandboxPrintCost.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="1.50"
                        max="8.00"
                        step="0.05"
                        value={sandboxPrintCost}
                        onChange={(e) => setSandboxPrintCost(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>$1.50 (B&W)</span>
                        <span>$3.65 (Color)</span>
                        <span>$8.00 (Hardcover)</span>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Margins Summary Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 bg-gradient-to-r from-sky-50 via-amber-50 to-emerald-50 p-3 rounded-xl border border-sky-200/80 text-center">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Retail Price</div>
                      <div className="text-base font-extrabold text-slate-800 font-mono">${sandboxPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Print Deduction</div>
                      <div className="text-base font-extrabold text-rose-600 font-mono">-${sandboxPrintCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-emerald-700 uppercase">Author Royalty / Copy</div>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">${sandboxNetMargin.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-purple-700 uppercase">Net Margin %</div>
                      <div className="text-base font-extrabold text-purple-700 font-mono">
                        {sandboxPrice > 0 ? ((sandboxNetMargin / sandboxPrice) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </div>

                  {/* Pro Dynamic 30-Day Royalties Projection Chart */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-800">
                          Pro 30-Day Projected Net Author Royalties
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shadow-xs">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        ${proThirtyDayCumulative.toLocaleString()} 30-Day Net Profit
                      </span>
                    </div>

                    <div className="h-32 w-full bg-gradient-to-b from-emerald-50/30 to-sky-50/30 rounded-xl p-2 border border-emerald-100">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={proProjectionData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="proRoyaltyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.03} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#64748b' }} interval={4} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: '#64748b' }} domain={['dataMin - 1', 'dataMax + 2']} tickFormatter={(v) => `$${v}`} />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white/95 backdrop-blur-md p-2 rounded-lg border border-emerald-200 shadow-md text-[11px]">
                                    <div className="font-bold text-slate-800 flex items-center gap-1">
                                      <span>Day {data.dayNum}</span>
                                      <span className="text-slate-400 font-mono">BSR #{data.bsr.toLocaleString()}</span>
                                    </div>
                                    <div className="text-emerald-700 font-semibold mt-0.5">
                                      Net Royalty: <span className="font-bold">${data.royalty.toFixed(2)}/day</span>
                                    </div>
                                    <div className="text-slate-500 text-[10px]">
                                      Cumulative: ${data.cumulative.toLocaleString()}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area type="monotone" dataKey="royalty" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#proRoyaltyGradient)" activeDot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Beyond KDP: IngramSpark & Draft2Digital Multi-Platform Matrix */}
                <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      Multi-Retailer Distribution Matrix (Wide Beyond Amazon)
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Ingram + D2D
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900 mb-1">IngramSpark (Hardcover & Bookstores)</div>
                      <p className="text-slate-600 text-[11px] mb-2 leading-relaxed">
                        Feeds the global catalog ordering database used by Barnes & Noble, waterstones, and independent brick-and-mortar bookshops.
                      </p>
                      <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded">
                        Requires: Own Bowker ISBN + 55% wholesale discount setup.
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900 mb-1">Draft2Digital (Global E-Book & Libraries)</div>
                      <p className="text-slate-600 text-[11px] mb-2 leading-relaxed">
                        Delivers eBooks and digital audiobooks into OverDrive, Libby, Apple Books, and Baker & Taylor with unified royalty statements.
                      </p>
                      <div className="text-[10px] text-sky-700 font-bold bg-sky-50 p-1.5 rounded">
                        High Yield for Children's picture books in public school library apps.
                      </div>
                    </div>
                  </div>
                </div>

                {/* One-Click Publisher Pro Strategy Export Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-sky-50 to-amber-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      Download Publisher Pro Strategic Dossier
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      Exports full Markdown dossier with your custom pricing models, A/B variant analysis, and IngramSpark/D2D specs.
                    </p>
                  </div>
                  <button
                    onClick={() => exportStrategyFile('paid')}
                    className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:opacity-95 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto transition-transform active:scale-95"
                  >
                    {exportSuccess === 'paid' ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    {exportSuccess === 'paid' ? 'Dossier Downloaded!' : 'Export Pro Dossier (.md)'}
                  </button>
                </div>

                {/* Competitor Spy & Inspiration Stations Deck */}
                <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-sky-600" />
                        Competitor Spy & Inspiration Stations
                      </h2>
                      <p className="text-xs text-slate-500">
                        Input any competitor ASIN to deconstruct their category placement, BSR velocity, visible metadata, and subscribe to automated new releases.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      Live ASIN Reverse-Engineering
                    </span>
                  </div>

                  {/* ASIN Input & Preset Quick Select */}
                  <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 mb-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
                        <input
                          type="text"
                          value={spyAsinInput}
                          onChange={(e) => setSpyAsinInput(e.target.value)}
                          placeholder="Enter 10-digit Amazon ASIN (e.g. B0B8TK8Z5L, 1950968940)..."
                          className="w-full bg-white border border-sky-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSpyCompetitor()}
                        disabled={isAnalyzingCompetitor}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 disabled:opacity-50"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {isAnalyzingCompetitor ? 'Inspecting ASIN...' : 'Inspect Competitor'}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px]">
                      <span className="text-slate-500 font-medium">Quick benchmark ASINs:</span>
                      <button
                        type="button"
                        onClick={() => { setSpyAsinInput('B0B8TK8Z5L'); handleSpyCompetitor('B0B8TK8Z5L'); }}
                        className="bg-white hover:bg-sky-100 border border-sky-200 px-2 py-0.5 rounded text-sky-800 font-mono transition-colors"
                      >
                        B0B8TK8Z5L (Children's SEL)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setSpyAsinInput('1950968940'); handleSpyCompetitor('1950968940'); }}
                        className="bg-white hover:bg-sky-100 border border-sky-200 px-2 py-0.5 rounded text-amber-800 font-mono transition-colors"
                      >
                        1950968940 (Cottagecore)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setSpyAsinInput('B08HGN76H3'); handleSpyCompetitor('B08HGN76H3'); }}
                        className="bg-white hover:bg-sky-100 border border-sky-200 px-2 py-0.5 rounded text-purple-800 font-mono transition-colors"
                      >
                        B08HGN76H3 (Gaming LitRPG)
                      </button>
                    </div>
                  </div>

                  {/* Analyzed Competitor Deep Breakdown */}
                  {analyzedCompetitor && (
                    <div className="p-4 bg-gradient-to-r from-sky-50 via-white to-amber-50 rounded-xl border border-sky-200 mb-4 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-sky-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                              ASIN: {analyzedCompetitor.asin}
                            </span>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                              BSR #{analyzedCompetitor.bsr.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                              ~{analyzedCompetitor.estDailySales} sales/day
                            </span>
                          </div>
                          <h3 className="font-black text-slate-900 text-sm mt-1">{analyzedCompetitor.title}</h3>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Subtitle: <span className="italic">{analyzedCompetitor.subtitle}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Author: <strong className="text-slate-700">{analyzedCompetitor.author}</strong> • Retail List: <strong className="text-slate-800 font-mono">${analyzedCompetitor.price.toFixed(2)}</strong> • Est. Print Cost: <strong className="text-rose-600 font-mono">${analyzedCompetitor.printCost.toFixed(2)}</strong>
                          </p>
                        </div>

                        {/* Save to Station Action */}
                        <div className="flex sm:flex-col gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSaveToStation(activeStationId)}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-xs"
                          >
                            <BookmarkPlus className="w-3.5 h-3.5" />
                            Pin to Active Station
                          </button>
                        </div>
                      </div>

                      {/* Browse Shelf Path & Inferred Keywords */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                        <div className="p-2.5 bg-white rounded-lg border border-sky-100">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Primary Amazon Browse Shelf Path
                          </div>
                          <div className="font-medium text-slate-800 text-[11px] leading-relaxed">
                            {analyzedCompetitor.categoryPath}
                          </div>
                          <div className="mt-2 text-[10px] text-sky-700 bg-sky-50 p-1.5 rounded">
                            Target Shelf: <strong>{analyzedCompetitor.categoryName}</strong>
                          </div>
                        </div>

                        <div className="p-2.5 bg-white rounded-lg border border-sky-100">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Visible & Inferred Search Keywords ({analyzedCompetitor.inferredKeywords.length})
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {analyzedCompetitor.inferredKeywords.map((kw, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comparison vs User's Current Project */}
                      <div className="mt-3 pt-3 border-t border-sky-100">
                        <div className="text-[11px] font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-purple-600" />
                          Side-by-Side Competitive Benchmark Against Your Current Project
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 bg-white rounded-lg border border-sky-100">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">BSR Challenge</div>
                            <div className="font-bold text-slate-800 mt-0.5">#{analyzedCompetitor.bsr} vs #{customBsr}</div>
                            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                              {customBsr < analyzedCompetitor.bsr ? 'Your target outranks them' : 'Easier entry point in your niche'}
                            </div>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-sky-100">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">Price Point</div>
                            <div className="font-bold text-slate-800 mt-0.5">${analyzedCompetitor.price.toFixed(2)} vs ${sandboxPrice.toFixed(2)}</div>
                            <div className="text-[10px] text-sky-700 font-semibold mt-0.5">
                              {sandboxPrice < analyzedCompetitor.price ? 'Price undercut advantage' : 'Premium quality positioning'}
                            </div>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-sky-100">
                            <div className="text-[10px] text-slate-400 uppercase font-bold">Est. Daily Royalty</div>
                            <div className="font-bold text-emerald-700 font-mono mt-0.5">${analyzedCompetitor.estDailyRoyalty.toFixed(2)}/day</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              ~${(analyzedCompetitor.estDailyRoyalty * 30).toFixed(0)}/mo net
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inspiration Stations (Boards & Automated New Release Watch) */}
                  <div className="border-t border-sky-100 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <BookmarkPlus className="w-3.5 h-3.5 text-amber-500" />
                          Inspiration Stations: Boards & Watchlists
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Group competitor comps into themed boards and subscribe to automated new release alerts.
                        </p>
                      </div>

                      {/* Station Selector and Create Button */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {stations.map(st => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setActiveStationId(st.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              activeStationId === st.id
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-200'
                            }`}
                          >
                            {st.name} ({st.books.length})
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCreatingStation(!isCreatingStation)}
                          className="px-2 py-1 rounded-lg text-xs font-bold bg-white hover:bg-sky-50 text-sky-700 border border-sky-300"
                        >
                          + New Station
                        </button>
                      </div>
                    </div>

                    {/* New Station Form */}
                    {isCreatingStation && (
                      <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 mb-3 flex items-center gap-2">
                        <input
                          type="text"
                          value={newStationTitle}
                          onChange={(e) => setNewStationTitle(e.target.value)}
                          placeholder="Station title (e.g. Cozy Witchy Hearth Comps)..."
                          className="flex-1 bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        <button
                          type="button"
                          onClick={handleCreateStation}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          Create Station
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsCreatingStation(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs px-2"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Active Station Details & Sentinel Subscription */}
                    {(() => {
                      const curStation = stations.find(s => s.id === activeStationId) || stations[0];
                      if (!curStation) return null;
                      return (
                        <div className="space-y-3">
                          <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div>
                              <div className="font-bold text-slate-900">{curStation.name}</div>
                              <div className="text-[11px] text-slate-600">{curStation.description}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                Last checked: {curStation.lastChecked} • {curStation.books.length} pinned titles
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleCheckNewReleases(curStation.id)}
                                className="bg-white hover:bg-sky-100 border border-sky-300 text-sky-800 font-bold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 shadow-2xs"
                              >
                                <RotateCcw className="w-3 h-3 text-sky-600" />
                                Check Releases Now
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleAutoUpdate(curStation.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                                  curStation.subscribeAutoUpdate
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                }`}
                              >
                                <BellRing className="w-3 h-3" />
                                {curStation.subscribeAutoUpdate ? 'Subscribed: Auto-Watch Active' : 'Subscribe to Releases'}
                              </button>
                            </div>
                          </div>

                          {/* Pinned Books in Active Station */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {curStation.books.map((b) => (
                              <div key={b.asin} className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex flex-col justify-between text-xs">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-[10px] text-slate-500 font-bold">{b.asin}</span>
                                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                      BSR #{b.bsr.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="font-bold text-slate-900 line-clamp-1">{b.title}</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">by {b.author}</div>
                                  {b.notes && (
                                    <div className="mt-1.5 text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded italic">
                                      "{b.notes}"
                                    </div>
                                  )}
                                </div>
                                <div className="mt-2 pt-2 border-t border-sky-50 flex items-center justify-between text-[11px]">
                                  <span className="font-mono text-emerald-700 font-bold">${b.price.toFixed(2)} (est ~{b.estDailySales}/day)</span>
                                  <button
                                    type="button"
                                    onClick={() => { setSpyAsinInput(b.asin); handleSpyCompetitor(b.asin); }}
                                    className="text-sky-600 font-bold hover:underline flex items-center gap-0.5"
                                  >
                                    Inspect <ArrowUpRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* In-House Voice Talent Studio & Casting Applicant Portal */}
                <div className="bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-md shadow-sky-900/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-purple-600" />
                        In-House Audio & Voice Talent Studio
                      </h2>
                      <p className="text-xs text-slate-500">
                        Directly staffed in-house narration and soundscape engineering for Children's picture books and niche titles.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-100 border border-purple-300 px-2.5 py-0.5 rounded-full">
                        Staffed Directly In-House
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsVoiceApplicantModalOpen(true)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-xs"
                      >
                        <Mic className="w-3 h-3" /> Apply as Voice Talent
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-3">
                    We do not rely on generic third-party feeds; our studio team directly auditions, vets, and contracts voice actors specialized in picture book pacing, soothing lullabies, and character voices.
                  </p>

                  {/* Certified In-House Talent Roster Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {inHouseVoiceRoster.map((vt) => (
                      <div key={vt.id} className="p-3 bg-gradient-to-b from-purple-50/50 to-white rounded-xl border border-purple-100 flex flex-col justify-between shadow-2xs">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                              {vt.badge}
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[10px]">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {vt.reviews}
                            </div>
                          </div>

                          <div className="font-bold text-slate-900 text-sm">{vt.name}</div>
                          <div className="text-[11px] text-purple-900 font-medium mt-0.5">{vt.tone}</div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            {vt.voiceAge} • {vt.studioGear}
                          </div>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {vt.tags.map((t, idx) => (
                              <span key={idx} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-purple-50 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Standard Rate</span>
                            <span className="font-mono font-extrabold text-purple-700 text-xs">${vt.pfhRate}/PFH</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setPlayingVoiceId(playingVoiceId === vt.id ? null : vt.id);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                              playingVoiceId === vt.id
                                ? 'bg-amber-400 text-slate-900 animate-pulse'
                                : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
                            }`}
                          >
                            <Volume2 className="w-3 h-3" />
                            {playingVoiceId === vt.id ? 'Playing Sample...' : 'Audition Reel'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Global Slide-out Recent Searches Sidebar Drawer */}
      {isRecentSidebarOpen && (
        <aside className="fixed inset-y-0 right-0 w-80 max-w-full bg-white/95 backdrop-blur-md border-l border-sky-200 shadow-2xl z-50 flex flex-col transition-transform duration-300">
          <div className="p-4 border-b border-sky-100 flex items-center justify-between bg-gradient-to-r from-sky-50 to-amber-50">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-800">Recent Session Searches</h2>
            </div>
            <button
              onClick={() => setIsRecentSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-white text-xs font-bold"
              title="Close sidebar"
            >
              ✕
            </button>
          </div>

          <div className="p-3 text-[11px] text-slate-500 bg-sky-50/50 border-b border-sky-100 flex items-center justify-between">
            <span>Click any query to instantly revisit & evaluate:</span>
            {recentItems.length > 0 && (
              <button
                onClick={handleClearRecent}
                className="text-rose-600 hover:underline font-bold flex items-center gap-0.5"
              >
                <Trash2 className="w-3 h-3" /> Clear All
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {recentItems.length === 0 ? (
              <div className="text-center py-12 px-4 text-slate-400 text-xs">
                <Clock className="w-8 h-8 text-sky-200 mx-auto mb-2" />
                <p className="font-semibold text-slate-600">No session searches yet</p>
                <p className="text-[11px] mt-1">Queries you type in the search bar or BSR ranks you evaluate will appear here.</p>
              </div>
            ) : (
              recentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleApplyRecent(item);
                    setIsRecentSidebarOpen(false);
                  }}
                  className="p-3 rounded-xl bg-white border border-sky-100 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'search' ? 'bg-sky-500' : 'bg-amber-500'}`} />
                      {item.type === 'search' ? 'Category Query' : 'BSR Calculation'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                  </div>
                  <div className="font-bold text-slate-800 group-hover:text-amber-800 text-xs flex items-center justify-between">
                    <span>{item.title}</span>
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:rotate-[-45deg] transition-transform" />
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{item.badge}</span>
                    <span className="text-[10px] text-sky-600 font-semibold group-hover:underline">Revisit →</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-sky-100 bg-slate-50 text-[10px] text-slate-400 text-center">
            Session history resets on browser reload
          </div>
        </aside>
      )}
      {/* Floating Sunny Toast Alert Notification */}
      {alertNotification && (
        <div className="fixed bottom-14 right-6 z-50 bg-gradient-to-r from-slate-900 to-sky-950 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs border border-amber-400/80 animate-fade-in backdrop-blur-md">
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold">{alertNotification}</span>
        </div>
      )}

      {/* Voice Talent Applicant Portal Modal */}
      {isVoiceApplicantModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-sky-100 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsVoiceApplicantModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
            >
              ✕
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">In-House Voice Talent Audition Portal</h3>
                <p className="text-xs text-slate-500">Staff directly with our internal studio roster (no 3P marketplace feeds).</p>
              </div>
            </div>

            {applicantSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Audition Application Received!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Our audio director will review your reel within 48 hours and add you to the certified roster.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitVoiceApplication} className="space-y-3.5 mt-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name / Stage Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantFormData.name}
                    onChange={(e) => setApplicantFormData({ ...applicantFormData, name: e.target.value })}
                    placeholder="e.g. Jordan River"
                    className="w-full bg-sky-50/70 border border-sky-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={applicantFormData.email}
                    onChange={(e) => setApplicantFormData({ ...applicantFormData, email: e.target.value })}
                    placeholder="jordan@voicestudio.com"
                    className="w-full bg-sky-50/70 border border-sky-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vocal Specialty</label>
                    <select
                      value={applicantFormData.vocalStyle}
                      onChange={(e) => setApplicantFormData({ ...applicantFormData, vocalStyle: e.target.value })}
                      className="w-full bg-sky-50/70 border border-sky-200 rounded-xl px-2.5 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    >
                      <option>Warm & Soothing Bedtime (Preschool / Children)</option>
                      <option>Animated Creature & Kid Characters</option>
                      <option>Dramatic Fantasy & Gaming LitRPG</option>
                      <option>Earthy Cottagecore & Mindfulness</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Rate Per Finished Hour ($)</label>
                    <input
                      type="number"
                      min="40"
                      max="350"
                      value={applicantFormData.pfhRate}
                      onChange={(e) => setApplicantFormData({ ...applicantFormData, pfhRate: Number(e.target.value) })}
                      className="w-full bg-sky-50/70 border border-sky-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Home Studio Equipment & Noise Floor</label>
                  <input
                    type="text"
                    value={applicantFormData.studioMic}
                    onChange={(e) => setApplicantFormData({ ...applicantFormData, studioMic: e.target.value })}
                    placeholder="e.g. Rode NT1-A + Focusrite Scarlett 2i2, sound-treated closet"
                    className="w-full bg-sky-50/70 border border-sky-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sample Demo Reel URL</label>
                  <input
                    type="url"
                    value={applicantFormData.sampleLink}
                    onChange={(e) => setApplicantFormData({ ...applicantFormData, sampleLink: e.target.value })}
                    placeholder="https://soundcloud.com/demo or Google Drive / Dropbox link"
                    className="w-full bg-sky-50/70 border border-sky-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:opacity-95 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Audition Application
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Direct in-house staffing. We contract directly with narrators at 100% of their quoted PFH rate.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-sky-200/80 bg-white/80 backdrop-blur-sm py-3 text-center text-xs font-medium text-slate-600 relative z-10 flex items-center justify-center gap-2">
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <span>Sunny Idea-to-ISBN Author Mentor: Free Tier & Publisher Pro Suite</span>
        <RainbowIcon className="w-3.5 h-3.5" />
      </footer>
    </div>
  );
}
