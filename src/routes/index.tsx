import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Page, SearchBar, ProductCard, CAT_ICON } from "@/components/site";
import { PRODUCTS, CATEGORY_LABELS, bestPrice, savings, type Category } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TECH REPLAY — La tech d'occasion au meilleur prix" },
      { name: "description", content: "Composants PC, caméras d'action GoPro, Insta360, DJI et consoles portables gaming d'occasion. Comparez et économisez." },
      { property: "og:title", content: "TECH REPLAY — La tech performante, au meilleur prix" },
      { property: "og:description", content: "Le meilleur de la tech d'occasion : PC, caméras d'action, consoles portables." },
    ],
  }),
  component: Index,
});

const CATS: { id: Category; desc: string }[] = [
  { id: "pc", desc: "CPU, GPU, cartes mères, RAM, stockage" },
  { id: "camera", desc: "GoPro, Insta360 et DJI uniquement" },
  { id: "handheld", desc: "Steam Deck, ROG Ally, Legion Go, Switch" },
];

function Index() {
  const deals = [...PRODUCTS].sort((a, b) => savings(b.newPrice, bestPrice(b.id)!) - savings(a.newPrice, bestPrice(a.id)!)).slice(0, 8);
  return (
    <Page>
      <section className="relative -mx-4 overflow-hidden px-4 pb-16 pt-12 md:pt-20">
        <img src={hero} alt="Carte graphique, caméra d'action et console portable" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="rounded-full border border-primary/40 bg-accent px-3 py-1 text-xs text-accent-foreground">La tech performante, au meilleur prix.</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">Le meilleur de la <span className="text-primary">tech d'occasion.</span></h1>
          <p className="mt-4 text-muted-foreground md:text-lg">Composants PC, caméras d'action et consoles gaming portables. Trouvez les meilleures performances au meilleur prix.</p>
          <div className="mt-6"><SearchBar big /></div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-glow"><Link to="/catalogue">Explorer les produits <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/comparateur">Comparer les prix</Link></Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {CATS.map((c) => {
          const Icon = CAT_ICON[c.id];
          return (
            <Link key={c.id} to="/catalogue" search={{ cat: c.id }} className="card-hover rounded-2xl border bg-card bg-hero p-6">
              <Icon className="size-8 text-primary" />
              <h2 className="mt-4 text-xl font-bold">{CATEGORY_LABELS[c.id]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Les meilleures offres du moment</h2>
          <Link to="/catalogue" search={{ sort: "savings" }} className="text-sm text-primary">Tout voir</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Page>
  );
}
