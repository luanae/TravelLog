import { DatePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Viagem } from "../../core/models/viagem.model";
import { ViagensService } from "../../core/services/viagens.service";

@Component({
  selector: "app-admin",
  imports: [RouterLink, DatePipe],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
  private viagemService = inject(ViagensService);
  private router = inject(Router);

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

  edit(id: string): void {
    this.router.navigate(["/admin/form", id]);
  }

  remove(id: string): void {
    const confirmDelete = confirm("Tem certeza que deseja remover esta viagem?");
    if (!confirmDelete) {
      return;
    }
    this.viagemService.delete(id).subscribe({
      next: () => {
        this.sucessMessage = "Viagem removida com sucesso!";
        this.loadViagens();
        setTimeout(() => {
          this.sucessMessage = "";
        }, 2000);
      },
      error: () => {
        this.errorMessage = "Erro ao remover viagem!";
      },
    });
  }
}