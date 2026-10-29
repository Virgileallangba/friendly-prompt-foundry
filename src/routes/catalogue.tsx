import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, SearchBar, ProductCard } from "@/components/site";
import { CATEGORY_LABELS, PRODUCTS, searchProducts, parseQuery, type Category } from "@/lib/catalog";

type S = { q?: string; cat?: Category; brand?: string; max?: number; sort?: "price" | "savings" | "relevance" };

export const Route = createFileRoute("/catalogue")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: ["pc", "camera", "handheld"].includes(s.cat as string) ? (s.cat as Category) : undefined,
    brand: typeof s.brand === "string" ? s.brand : undefined,
    max: s.max ? Number(s.max) : undefined,
    sort: ["price", "savings", "relevance"].includes(s.sort as string) ? (s.sort as S["sort"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catalogue occasion — TECH REPLAY" },
      { name: "description", content: "Parcourez composants PC, caméras d'action et consoles portables d'occasion avec filtres avancés." },
      { property: "og:title", content: "Catalogue — TECH REPLAY" },
      { property: "og:description", content: "Filtrez par marque, prix, catégorie et trouvez la meilleure offre." },
    ],
  }),
  component: Catalogue,
});

const chip = (active: boolean) => `rounded-full border px-3 py-1.5 text-xs whitespace-nowrap ${active ? "border-primary bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`;

function Catalogue() {
  const s = Route.useSearch();
  const q = s.q ?? "";
  const results = searchProducts(q, { category: s.cat, brand: s.brand, maxPrice: s.max, sort: s.sort });
  const cat = s.cat ?? parseQuery(q).category;
  const brands = [...new Set(PRODUCTS.filter((p) => !cat || p.category === cat).map((p) => p.brand))];
  return (
    <Page>
      <div className="py-8">
        <h1 className="text-3xl font-bold">{cat ? CATEGORY_LABELS[cat] : "Tout le catalogue"}</h1>
        <div className="mt-4"><SearchBar initial={q} key={q} /></div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Link to="/catalogue" search={{ ...s, cat: undefined }} className={chip(!s.cat)}>Toutes</Link>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <Link key={c} to="/catalogue" search={{ ...s, cat: c, brand: undefined }} className={chip(s.cat === c)}>{CATEGORY_LABELS[c]}</Link>
          ))}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {brands.map((b) => (
            <Link key={b} to="/catalogue" search={{ ...s, brand: s.brand === b ? undefined : b }} className={chip(s.brand === b)}>{b}</Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">{results.length} produit(s){parseQuery(q).maxPrice ? ` · moins de ${parseQuery(q).maxPrice} €` : ""}</span>
          <div className="flex gap-2">
            {([["relevance", "Pertinence"], ["price", "Prix"], ["savings", "Meilleures offres"]] as const).map(([k, l]) => (
              <Link key={k} to="/catalogue" search={{ ...s, sort: k }} className={chip((s.sort ?? "relevance") === k)}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
      {results.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">Aucun produit ne correspond. Essayez « Steam Deck OLED à moins de 400 € ».</p>
      )}
    </Page>
  );
}
