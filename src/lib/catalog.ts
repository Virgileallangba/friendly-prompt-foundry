export type Category = "pc" | "camera" | "handheld";
export type Condition =
  | "Neuf jamais utilisé" | "Comme neuf" | "Très bon état" | "Bon état" | "État correct" | "Pour pièces / réparation";

export const CATEGORY_LABELS: Record<Category, string> = {
  pc: "Composants PC",
  camera: "Caméras d'action",
  handheld: "Consoles portables",
};

/** Action cameras are strictly limited to these brands. */
export const CAMERA_BRANDS = ["GoPro", "Insta360", "DJI"] as const;

export interface Product {
  id: string;
  category: Category;
  sub: string;
  brand: string;
  model: string;
  newPrice: number; // prix neuf indicatif (€)
  platform?: "Windows" | "Linux" | "Android" | "Nintendo" | "Streaming";
  specs: Record<string, string>;
}

export interface Listing {
  id: string;
  productId: string;
  price: number;
  condition: Condition;
  seller: string;
  sellerType: "Pro" | "Particulier";
  verified: boolean;
  location: string;
  warranty?: string;
  accessories?: string[];
  listedAt: string;
  demo: true; // annonces de démonstration — jamais présentées comme réelles
}

const p = (x: Product) => x;

export const PRODUCTS: Product[] = [
  p({ id: "rtx-4070", category: "pc", sub: "GPU", brand: "NVIDIA", model: "GeForce RTX 4070", newPrice: 599, specs: { VRAM: "12 Go GDDR6X", TDP: "200 W", Interface: "PCIe 4.0 x16", Génération: "Ada Lovelace" } }),
  p({ id: "rtx-3080", category: "pc", sub: "GPU", brand: "NVIDIA", model: "GeForce RTX 3080", newPrice: 719, specs: { VRAM: "10 Go GDDR6X", TDP: "320 W", Interface: "PCIe 4.0 x16", Génération: "Ampere" } }),
  p({ id: "rx-7800xt", category: "pc", sub: "GPU", brand: "AMD", model: "Radeon RX 7800 XT", newPrice: 549, specs: { VRAM: "16 Go GDDR6", TDP: "263 W", Interface: "PCIe 4.0 x16", Génération: "RDNA 3" } }),
  p({ id: "arc-a770", category: "pc", sub: "GPU", brand: "Intel", model: "Arc A770 16 Go", newPrice: 349, specs: { VRAM: "16 Go GDDR6", TDP: "225 W", Interface: "PCIe 4.0 x16", Génération: "Alchemist" } }),
  p({ id: "r7-7800x3d", category: "pc", sub: "CPU", brand: "AMD", model: "Ryzen 7 7800X3D", newPrice: 449, specs: { Cœurs: "8 / 16 threads", Socket: "AM5", TDP: "120 W", Mémoire: "DDR5" } }),
  p({ id: "r5-5600x", category: "pc", sub: "CPU", brand: "AMD", model: "Ryzen 5 5600X", newPrice: 299, specs: { Cœurs: "6 / 12 threads", Socket: "AM4", TDP: "65 W", Mémoire: "DDR4" } }),
  p({ id: "i5-13600k", category: "pc", sub: "CPU", brand: "Intel", model: "Core i5-13600K", newPrice: 349, specs: { Cœurs: "14 (6P+8E)", Socket: "LGA1700", TDP: "125 W", Mémoire: "DDR4 / DDR5" } }),
  p({ id: "b650-tuf", category: "pc", sub: "Carte mère", brand: "ASUS", model: "TUF Gaming B650-Plus", newPrice: 199, specs: { Socket: "AM5", Format: "ATX", Mémoire: "DDR5" } }),
  p({ id: "z790-msi", category: "pc", sub: "Carte mère", brand: "MSI", model: "MAG Z790 Tomahawk", newPrice: 289, specs: { Socket: "LGA1700", Format: "ATX", Mémoire: "DDR5" } }),
  p({ id: "ram-ddr5-32", category: "pc", sub: "RAM", brand: "Corsair", model: "Vengeance DDR5 32 Go 6000", newPrice: 129, specs: { Type: "DDR5", Capacité: "2×16 Go", Fréquence: "6000 MT/s" } }),
  p({ id: "ssd-990pro", category: "pc", sub: "Stockage", brand: "Samsung", model: "990 PRO 2 To", newPrice: 189, specs: { Type: "SSD NVMe", Interface: "PCIe Gen 4", Lecture: "7450 Mo/s" } }),
  p({ id: "psu-rm850", category: "pc", sub: "Alimentation", brand: "Corsair", model: "RM850x", newPrice: 149, specs: { Puissance: "850 W", Certification: "80+ Gold", Modulaire: "Oui" } }),

  p({ id: "gopro-12", category: "camera", sub: "HERO Black", brand: "GoPro", model: "HERO12 Black", newPrice: 449, specs: { Vidéo: "5.3K60 / 4K120", Stabilisation: "HyperSmooth 6.0", Étanchéité: "10 m", Batterie: "Enduro 1720 mAh" } }),
  p({ id: "gopro-13", category: "camera", sub: "HERO Black", brand: "GoPro", model: "HERO13 Black", newPrice: 449, specs: { Vidéo: "5.3K60 / 4K120", Stabilisation: "HyperSmooth 6.0", Étanchéité: "10 m", Batterie: "1900 mAh" } }),
  p({ id: "gopro-max", category: "camera", sub: "MAX", brand: "GoPro", model: "MAX 360", newPrice: 549, specs: { Vidéo: "5.6K30 360°", Stabilisation: "Max HyperSmooth", Étanchéité: "5 m" } }),
  p({ id: "insta-x4", category: "camera", sub: "X Series", brand: "Insta360", model: "X4", newPrice: 549, specs: { Vidéo: "8K30 360°", Stabilisation: "FlowState", Étanchéité: "10 m", Batterie: "2290 mAh" } }),
  p({ id: "insta-acepro", category: "camera", sub: "Ace", brand: "Insta360", model: "Ace Pro", newPrice: 449, specs: { Vidéo: "8K24 / 4K120", Stabilisation: "FlowState", Étanchéité: "10 m" } }),
  p({ id: "insta-go3", category: "camera", sub: "GO Series", brand: "Insta360", model: "GO 3", newPrice: 379, specs: { Vidéo: "2.7K30", Stabilisation: "FlowState", Étanchéité: "IPX8 5 m" } }),
  p({ id: "dji-oa4", category: "camera", sub: "Osmo Action", brand: "DJI", model: "Osmo Action 4", newPrice: 399, specs: { Vidéo: "4K120", Stabilisation: "RockSteady 3.0+", Étanchéité: "18 m", Batterie: "1770 mAh" } }),
  p({ id: "dji-oa5", category: "camera", sub: "Osmo Action", brand: "DJI", model: "Osmo Action 5 Pro", newPrice: 379, specs: { Vidéo: "4K120", Stabilisation: "RockSteady 3.0+", Étanchéité: "20 m", Batterie: "1950 mAh" } }),

  p({ id: "deck-oled", category: "handheld", sub: "PC portable", platform: "Linux", brand: "Valve", model: "Steam Deck OLED 512 Go", newPrice: 569, specs: { APU: "AMD Zen 2 + RDNA 2 (6 nm)", RAM: "16 Go LPDDR5", Écran: "7,4\" OLED 800p 90 Hz", OS: "SteamOS" } }),
  p({ id: "deck-lcd", category: "handheld", sub: "PC portable", platform: "Linux", brand: "Valve", model: "Steam Deck LCD 256 Go", newPrice: 419, specs: { APU: "AMD Zen 2 + RDNA 2 (7 nm)", RAM: "16 Go LPDDR5", Écran: "7\" LCD 800p 60 Hz", OS: "SteamOS" } }),
  p({ id: "rog-allyx", category: "handheld", sub: "PC portable", platform: "Windows", brand: "ASUS", model: "ROG Ally X", newPrice: 899, specs: { APU: "Ryzen Z1 Extreme", RAM: "24 Go LPDDR5X", Écran: "7\" 1080p 120 Hz", OS: "Windows 11" } }),
  p({ id: "legion-go", category: "handheld", sub: "PC portable", platform: "Windows", brand: "Lenovo", model: "Legion Go", newPrice: 799, specs: { APU: "Ryzen Z1 Extreme", RAM: "16 Go LPDDR5X", Écran: "8,8\" 1600p 144 Hz", OS: "Windows 11" } }),
  p({ id: "msi-claw", category: "handheld", sub: "PC portable", platform: "Windows", brand: "MSI", model: "Claw A1M", newPrice: 749, specs: { APU: "Intel Core Ultra 7 155H", RAM: "16 Go LPDDR5", Écran: "7\" 1080p 120 Hz", OS: "Windows 11" } }),
  p({ id: "switch-oled", category: "handheld", sub: "Nintendo", platform: "Nintendo", brand: "Nintendo", model: "Switch OLED", newPrice: 349, specs: { SoC: "NVIDIA Tegra X1", RAM: "4 Go", Écran: "7\" OLED 720p", OS: "Nintendo Switch OS" } }),
  p({ id: "ps-portal", category: "handheld", sub: "Streaming", platform: "Streaming", brand: "Sony", model: "PlayStation Portal", newPrice: 219, specs: { Type: "Lecteur à distance (Remote Play)", Écran: "8\" LCD 1080p 60 Hz", Note: "Nécessite une PS5 — n'exécute aucun jeu nativement" } }),
];

const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Nantes", "Toulouse", "Rennes"];
const CONDS: Condition[] = ["Comme neuf", "Très bon état", "Bon état", "Très bon état", "État correct"];
const RATIO = [0.62, 0.7, 0.58, 0.75, 0.66, 0.54];

export const LISTINGS: Listing[] = PRODUCTS.flatMap((prod, i) =>
  [0, 1].map((k) => {
    const n = i * 2 + k;
    return {
      id: `${prod.id}-${k}`,
      productId: prod.id,
      price: Math.round(prod.newPrice * RATIO[n % RATIO.length]),
      condition: CONDS[n % CONDS.length],
      seller: k ? "Vendeur démo" : "Boutique démo",
      sellerType: k ? "Particulier" : "Pro",
      verified: false,
      location: CITIES[n % CITIES.length],
      warranty: k ? undefined : "6 mois",
      accessories: prod.category === "camera" ? (k ? ["Batterie", "Chargeur"] : ["2 batteries", "Caisson étanche", "Carte 128 Go"]) : undefined,
      listedAt: `2026-10-${String(10 + (n % 18)).padStart(2, "0")}`,
      demo: true,
    } satisfies Listing;
  }),
);

export const getProduct = (id: string) => PRODUCTS.find((x) => x.id === id);
export const listingsFor = (id: string) => LISTINGS.filter((l) => l.productId === id).sort((a, b) => a.price - b.price);
export const bestPrice = (id: string) => listingsFor(id)[0]?.price;
export const savings = (newPrice: number, used: number) => Math.round((1 - used / newPrice) * 100);

/** Parse natural queries like "RTX 4070 à moins de 400 €". */
export function parseQuery(q: string) {
  const s = q.toLowerCase();
  const m = s.match(/(?:moins de|max|<|sous)\s*(\d+)/);
  const maxPrice = m ? Number(m[1]) : undefined;
  let category: Category | undefined;
  if (/console|portable|deck|ally|switch|jouer/.test(s)) category = "handheld";
  else if (/gopro|insta|dji|cam[ée]ra|osmo/.test(s)) category = "camera";
  else if (/rtx|gtx|ryzen|intel|gpu|cpu|ram|ssd|carte/.test(s)) category = "pc";
  const terms = s
    .replace(/(?:moins de|max|<|sous)\s*\d+\s*€?/, "")
    .replace(/d['’]occasion|occasion|à|pour|avec|console portable|jouer|€/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
  return { maxPrice, category, terms };
}

export function searchProducts(q: string, opts: { category?: Category; brand?: string; maxPrice?: number; sort?: "price" | "savings" | "relevance" } = {}) {
  const parsed = parseQuery(q);
  const cat = opts.category ?? parsed.category;
  const max = opts.maxPrice ?? parsed.maxPrice;
  let res = PRODUCTS.filter((pr) => {
    if (cat && pr.category !== cat) return false;
    if (opts.brand && pr.brand !== opts.brand) return false;
    const bp = bestPrice(pr.id) ?? Infinity;
    if (max && bp > max) return false;
    const hay = `${pr.brand} ${pr.model} ${pr.sub}`.toLowerCase().replace(/\s|-/g, "");
    const matched = parsed.terms.filter((t) => hay.includes(t.replace(/-/g, "")));
    if (parsed.terms.length && !parsed.category && matched.length === 0) return false;
    if (parsed.terms.length && parsed.category && matched.length === 0 && parsed.terms.some((t) => /\d/.test(t))) return false;
    return true;
  });
  if (opts.sort === "price") res = [...res].sort((a, b) => (bestPrice(a.id) ?? 0) - (bestPrice(b.id) ?? 0));
  if (opts.sort === "savings") res = [...res].sort((a, b) => savings(b.newPrice, bestPrice(b.id)!) - savings(a.newPrice, bestPrice(a.id)!));
  return res;
}

export const GAMES = ["Cyberpunk 2077", "Elden Ring", "Black Myth: Wukong", "Forza Horizon 5", "Hogwarts Legacy", "GTA V"];

export interface DataSource { name: string; group: string; enabled: boolean; status: "Actif" | "À configurer" | "Autorisation requise" }
export const DATA_SOURCES: DataSource[] = [
  ...["Intel", "AMD", "NVIDIA", "TechPowerUp", "PassMark", "PCPartPicker"].map((n) => ({ name: n, group: "PC Hardware", enabled: false, status: "À configurer" as const })),
  ...CAMERA_BRANDS.map((n) => ({ name: n, group: "Caméras", enabled: false, status: "À configurer" as const })),
  ...["ProtonDB", "DeckVerified.Games", "Notebookcheck", "Tom's Hardware"].map((n) => ({ name: n, group: "Benchmarks", enabled: false, status: "À configurer" as const })),
  { name: "eBay Browse API", group: "Marketplaces", enabled: false, status: "À configurer" },
  ...["Leboncoin", "Back Market", "Facebook Marketplace", "Vinted"].map((n) => ({ name: n, group: "Marketplaces", enabled: false, status: "Autorisation requise" as const })),
  { name: "Import CSV", group: "Marketplaces", enabled: true, status: "Actif" },
  { name: "Annonces utilisateurs", group: "Marketplaces", enabled: true, status: "Actif" },
];
