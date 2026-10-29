import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X, Trophy } from "lucide-react";
import { Page, eur } from "@/components/site";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, getProduct, bestPrice, savings, type Product } from "@/lib/catalog";

export const Route = createFileRoute("/comparateur")({
  validateSearch: (s: Record<string, unknown>): { ids?: string | undefined } => ({ ids: typeof s.ids === "string" ? s.ids : undefined }),
  head: () => ({
    meta: [
      { title: "Comparateur — TECH REPLAY" },
      { name: "description", content: "Comparez jusqu'à 4 produits high-tech d'occasion : prix, économies, caractéristiques." },
      { property: "og:title", content: "Comparateur — TECH REPLAY" },
      { property: "og:description", content: "RTX 4070 vs RTX 3080, Steam Deck OLED vs ROG Ally X…" },
    ],
  }),
  component: Compare,
});

const PRESETS = [["rtx-4070", "rtx-3080"], ["gopro-12", "dji-oa4"], ["deck-oled", "rog-allyx"], ["legion-go", "msi-claw"]];

function Compare() {
  const { ids } = Route.useSearch();
  const nav = useNavigate();
  const sel = (ids?.split(",") ?? []).map(getProduct).filter(Boolean) as Product[];
  const set = (list: string[]) => nav({ to: "/comparateur", search: { ids: list.join(",") || undefined } });
  const best = sel.length > 1 ? sel.reduce((a, b) => (savings(b.newPrice, bestPrice(b.id)!) > savings(a.newPrice, bestPrice(a.id)!) ? b : a)) : undefined;
  const specKeys = [...new Set(sel.flatMap((p) => Object.keys(p.specs)))];
  const cat = sel[0]?.category;
  return (
    <Page>
      <h1 className="pt-8 text-3xl font-bold">Comparateur</h1>
      <p className="mt-1 text-muted-foreground">Jusqu'à 4 produits.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((pr) => (
          <button key={pr.join()} onClick={() => set(pr)} className="rounded-full border px-3 py-1.5 text-xs hover:border-primary">
            {pr.map((i) => getProduct(i)!.model).join(" vs ")}
          </button>
        ))}
      </div>
      {sel.length < 4 && (
        <select className="mt-4 h-10 w-full rounded-xl border bg-card px-3 text-sm md:w-80" value="" onChange={(e) => e.target.value && set([...sel.map((p) => p.id), e.target.value])}>
          <option value="">+ Ajouter un produit</option>
          {PRODUCTS.filter((p) => !sel.find((s) => s.id === p.id) && (!cat || p.category === cat)).map((p) => <option key={p.id} value={p.id}>{p.brand} {p.model}</option>)}
        </select>
      )}
      {sel.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b bg-card">
                <th className="p-4 text-left text-muted-foreground font-normal w-32"></th>
                {sel.map((p) => (
                  <th key={p.id} className="p-4 text-left align-top">
                    <div className="flex justify-between gap-2">
                      <Link to="/produit/$id" params={{ id: p.id }} className="font-display hover:text-primary">{p.model}</Link>
                      <button aria-label="Retirer" onClick={() => set(sel.filter((s) => s.id !== p.id).map((s) => s.id))}><X className="size-4 text-muted-foreground" /></button>
                    </div>
                    {best?.id === p.id && <Badge className="mt-2"><Trophy />Meilleur rapport</Badge>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label="Occasion dès" vals={sel.map((p) => <span className="font-bold text-primary">{eur(bestPrice(p.id)!)}</span>)} />
              <Row label="Neuf indicatif" vals={sel.map((p) => eur(p.newPrice))} />
              <Row label="Économie" vals={sel.map((p) => `-${savings(p.newPrice, bestPrice(p.id)!)}%`)} />
              {specKeys.map((k) => <Row key={k} label={k} vals={sel.map((p) => p.specs[k] ?? "—")} />)}
            </tbody>
          </table>
        </div>
      )}
    </Page>
  );
}

function Row({ label, vals }: { label: string; vals: React.ReactNode[] }) {
  return <tr className="border-b last:border-0"><td className="p-4 text-muted-foreground">{label}</td>{vals.map((v, i) => <td key={i} className="p-4">{v}</td>)}</tr>;
}
