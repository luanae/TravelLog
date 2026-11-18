import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | TravelLog",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/sobre/sobre").then((m) => m.Sobre),
    title: "Sobre | TravelLog",
  },
  {
    path: "viagens",
    loadComponent: () =>
      import("./features/viagens/viagens").then((m) => m.Viagens),
    title: "Viagens | TravelLog",
  },
  {
    path: "viagens/:id",
    loadComponent: () =>
      import("./features/detalhe-viagem/detalhe-viagem").then(
        (m) => m.DetalheViagem,
      ),
    title: "Detalhes da viagem | TravelLog",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | TravelLog",
  },
  {
    path: "admin/form",
    loadComponent: () =>
      import("./features/manutencao-viagem/manutencao-viagem").then(
        (m) => m.ManutencaoViagem,
      ),
    title: "Nova viagem | TravelLog",
  },
  {
    path: "admin/form/:id",
    loadComponent: () =>
      import("./features/manutencao-viagem/manutencao-viagem").then(
        (m) => m.ManutencaoViagem,
      ),
    title: "Editar viagem | TravelLog",
  },
  { path: "**", redirectTo: "" },
];
