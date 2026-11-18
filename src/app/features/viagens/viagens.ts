import { Component } from "@angular/core";
import { ViagensService } from "../../core/services/viagens.service";
import { Viagem } from "../../core/models/viagem.model";
import { inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-viagens",
  templateUrl: "./viagens.html",
  styleUrl: "./viagens.css",
  imports: [RouterLink],
})
export class Viagens {
  private viagemService = inject(ViagensService);

  viagens = signal<Viagem[]>([]);
  loading = signal(true);
  errorMessage = "";
  sucessMessage = "";

  ngOnInit(): void {
    this.loadViagens();
  }

  loadViagens(): void {
    this.loading.set(true);
    this.errorMessage = "";
    this.viagemService.getAll().subscribe({
      next: (response) => {
        this.viagens.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar viagens: " + error.message;
        this.loading.set(false);
      },
    });
  }
}
