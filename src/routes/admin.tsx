import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/site";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DATA_SOURCES } from "@/lib/catalog";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Sources de données — TECH REPLAY" },
      { name: "description", content: "Gestion des sources de données, connecteurs et synchronisation du catalogue TECH REPLAY." },
      { property: "og:title", content: "Sources de données — TECH REPLAY" },
      { property: "og:description", content: "Activez ou configurez les connecteurs de données." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [src, setSrc] = useState(DATA_SOURCES);
  const groups = [...new Set(src.map((s) => s.group))];
  return (
    <Page>
      <h1 className="pt-8 text-3xl font-bold">Sources de données</h1>
      <p className="mt-1 text-muted-foreground">Les connecteurs nécessitant une autorisation restent désactivés jusqu'à leur configuration.</p>
      <div className="mt-8 space-y-8">
        {groups.map((g) => (
          <section key={g}>
            <h2 className="mb-3 text-lg font-semibold">{g}</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {src.filter((s) => s.group === g).map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <Badge variant={s.status === "Actif" ? "default" : "outline"} className="mt-1">{s.status}</Badge>
                  </div>
                  <Switch
                    checked={s.enabled}
                    disabled={s.status !== "Actif"}
                    onCheckedChange={(v) => setSrc(src.map((x) => (x.name === s.name ? { ...x, enabled: v } : x)))}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  );
}
