import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Page, CAT_ICON, eur } from "@/components/site";
import { getProduct, listingsFor, savings, GAMES, CATEGORY_LABELS } from "@/lib/catalog";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.product.brand} ${loaderData.product.model} d'occasion — TECH REPLAY` : "Produit — TECH REPLAY";
    const d = loaderData ? `Comparez les offres d'occasion pour ${loaderData.product.model}, prix neuf indicatif ${loaderData.product.newPrice} €.` : "Fiche produit";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const listings = listingsFor(product.id);
  const Icon = CAT_ICON[product.category];
  return (
    <Page>
      <div className="py-6 text-sm text-muted-foreground">
        <Link to="/catalogue" search={{ cat: product.category }} className="hover:text-foreground">{CATEGORY_LABELS[product.category]}</Link> / {product.sub}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-3xl border bg-card bg-hero">
          <Icon className="size-32 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">{product.brand}{product.platform && <Badge variant="secondary">{product.platform}</Badge>}</div>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">{product.model}</h1>
          <p className="mt-2 text-muted-foreground">Prix neuf indicatif : {eur(product.newPrice)}</p>
          {product.platform === "Streaming" && (
            <div className="mt-4 flex gap-2 rounded-xl border border-warning/40 p-3 text-sm text-warning"><Info className="size-4 shrink-0" />Appareil de streaming : il n'exécute pas les jeux nativement.</div>
          )}
          <div className="mt-6 overflow-hidden rounded-2xl border">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b px-4 py-3 text-sm last:border-0"><span className="text-muted-foreground">{k}</span><span className="text-right font-medium">{v}</span></div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-4"><Link to="/comparateur" search={{ ids: product.id }}>Ajouter au comparateur</Link></Button>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Offres d'occasion</h2>
        <p className="mt-1 text-sm text-muted-foreground">Exemples de démonstration — aucune annonce réelle n'est encore connectée.</p>
        <div className="mt-4 space-y-3">
          {listings.map((l) => (
            <div key={l.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">Démo</Badge><Badge variant="secondary">{l.condition}</Badge>
                  {l.warranty && <Badge className="bg-accent text-accent-foreground"><ShieldCheck />Garantie {l.warranty}</Badge>}
                </div>
                <div className="mt-2 text-sm">{l.seller} · {l.sellerType} · <MapPin className="inline size-3" /> {l.location} · {new Date(l.listedAt).toLocaleDateString("fr-FR")}</div>
                {l.accessories && <div className="mt-1 text-xs text-muted-foreground">Inclus : {l.accessories.join(", ")}</div>}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right"><div className="font-display text-2xl font-bold text-primary">{eur(l.price)}</div><div className="text-xs text-muted-foreground">-{savings(product.newPrice, l.price)}% vs neuf</div></div>
                <Button disabled>Voir l'offre</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {product.category === "handheld" && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Compatibilité gaming</h2>
          <p className="mt-1 text-sm text-muted-foreground">Les performances ne sont affichées que lorsqu'elles proviennent d'un benchmark vérifiable (ProtonDB, Notebookcheck…).</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((g) => (
              <div key={g} className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-sm">
                <span>{g}</span><span className="text-muted-foreground">{product.platform === "Streaming" ? "Via PS5 uniquement" : "Source en attente"}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
