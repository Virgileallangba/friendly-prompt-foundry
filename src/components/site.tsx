import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Search, Heart, GitCompare, Menu, X, Cpu, Camera, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, bestPrice, savings, type Product, type Category } from "@/lib/catalog";

export const CAT_ICON: Record<Category, typeof Cpu> = { pc: Cpu, camera: Camera, handheld: Gamepad2 };

export function SearchBar({ initial = "", big = false }: { initial?: string; big?: boolean }) {
  const [q, setQ] = useState(initial);
  const nav = useNavigate();
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); nav({ to: "/catalogue", search: { q } }); }}
      className={`flex items-center gap-2 rounded-xl border bg-card px-3 ${big ? "h-14" : "h-10"} focus-within:border-primary`}
    >
      <Search className="size-4 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="« RTX 4070 à moins de 400 € »"
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      {big && <Button type="submit" size="sm">Rechercher</Button>}
    </form>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/catalogue", label: "Catégories" },
    { to: "/comparateur", label: "Comparateur" },
    { to: "/admin", label: "Sources" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight">
          TECH<span className="text-primary">REPLAY</span>
        </Link>
        <div className="hidden flex-1 md:block"><SearchBar /></div>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {links.map((l) => <Link key={l.to} to={l.to} className="hover:text-foreground" activeProps={{ className: "text-primary" }}>{l.label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button variant="ghost" size="icon" aria-label="Favoris"><Heart className="size-4" /></Button>
          <Button size="sm" className="hidden sm:inline-flex">Vendre mon matériel</Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="space-y-3 border-t px-4 py-4 lg:hidden">
          <SearchBar />
          {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-1 text-sm">{l.label}</Link>)}
          <Button className="w-full">Vendre mon matériel</Button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t py-10 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 md:flex-row md:justify-between">
        <span className="font-display font-bold text-foreground">TECH<span className="text-primary">REPLAY</span> — La tech performante, au meilleur prix.</span>
        <span>Les annonces affichées sont des exemples de démonstration.</span>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="min-h-screen"><Header /><main className="mx-auto max-w-7xl px-4">{children}</main><Footer /></div>;
}

export const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;

export function ProductCard({ product }: { product: Product }) {
  const price = bestPrice(product.id)!;
  const Icon = CAT_ICON[product.category];
  return (
    <Link to="/produit/$id" params={{ id: product.id }} className="card-hover group flex flex-col rounded-2xl border bg-card p-4">
      <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl bg-hero bg-secondary">
        <Icon className="size-14 text-primary/80 transition-transform group-hover:scale-110" />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{product.brand} · {product.sub}</span>
        {product.platform && <Badge variant="secondary">{product.platform}</Badge>}
      </div>
      <h3 className="mt-1 font-display font-semibold">{product.model}</h3>
      <div className="mt-auto flex items-end justify-between pt-4">
        <div>
          <div className="text-xs text-muted-foreground">dès</div>
          <div className="font-display text-xl font-bold text-primary">{eur(price)}</div>
          <div className="text-xs text-muted-foreground line-through">{eur(product.newPrice)} neuf</div>
        </div>
        <Badge className="bg-accent text-accent-foreground">-{savings(product.newPrice, price)}%</Badge>
      </div>
    </Link>
  );
}

export { CATEGORY_LABELS };
