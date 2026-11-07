import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | Raxadinha",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/sobre/sobre").then((m) => m.Sobre),
    title: "Sobre | Raxadinha",
  },
  {
    path: "viagens",
    loadComponent: () =>
      import("./features/viagens/viagens").then((m) => m.Viagens),
    title: "Viagens | Raxadinha",
  },
  {
    path: "viagens/:id",
    loadComponent: () =>
      import("./features/detalhe-viagem/detalhe-viagem").then(
        (m) => m.DetalheViagem,
      ),
    title: "Detalhes da viagem | Raxadinha",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | Raxadinha",
  },
  {
    path: "admin/form",
    loadComponent: () =>
      import("./features/manutencao-viagem/manutencao-viagem").then(
        (m) => m.ManutencaoViagem,
      ),
    title: "Nova viagem | Raxadinha",
  },
  {
    path: "admin/form/:id",
    loadComponent: () =>
      import("./features/manutencao-viagem/manutencao-viagem").then(
        (m) => m.ManutencaoViagem,
      ),
    title: "Editar viagem | Raxadinha",
  },
  { path: "**", redirectTo: "" },
];
