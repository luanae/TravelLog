import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Viagem } from "../../core/models/viagem.model";
import { ViagensService } from "../../core/services/viagens.service";


@Component({
  selector: "app-admin",
  imports: [RouterLink],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
  private viagemService = inject(ViagensService);
  private router = inject(Router);

  viagens: Viagem[] = [];
  loading = false;
  errorMessage = "";
  sucessMessage = "";

  ngInit(): void {
    this.loadViagens();
  }

  loadViagens(): void {
    this.loading = true;
    this.errorMessage = "";
    this.viagemService.getAll().subscribe({
      next: (response) => {
        this.viagens = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar viagens: " + error.message;
        this.loading = false;
      },
    });
  }
  
  edit(id: string): void {
    this.router.navigate(["/admin/editar"],{
      queryParams: { id },
    });
  }

  remove(id: string): void {
    const confirmDelete = confirm("Tem certeza que deseja remover esta viagem?");
    if (confirmDelete) {
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