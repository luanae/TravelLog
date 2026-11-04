import { AsyncPipe, DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from "rxjs";
import { ViagensService } from "../../core/services/viagens.service";

@Component({
  selector: "app-detalhe-viagem",
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: "./detalhe-viagem.html",
  styleUrl: "./detalhe-viagem.css",
})
export class DetalheViagem {
  readonly viagem$;

  constructor(route: ActivatedRoute, viagensService: ViagensService) {
    this.viagem$ = route.paramMap.pipe(
      map((parametros) => Number(parametros.get("id"))),
      switchMap((id) => viagensService.buscarPorId(id)),
    );
  }
}
