import { Component, inject } from "@angular/core";
import { RouterLink, Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ViagensService } from "../../core/services/viagens.service";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-manutencao-viagem",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./manutencao-viagem.html",
  styleUrl: "./manutencao-viagem.css",
})
export class ManutencaoViagem {
  private fb = inject(FormBuilder);
  private viagemService = inject(ViagensService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  sucessMessage = "";
  errorMessage = "";

  form = this.fb.nonNullable.group({
    cidade: ['', [Validators.required, Validators.minLength(3)]],
    pais: ['', [Validators.required]],
    dataViagem: ['', [Validators.required]],
    avaliacao: [0, [Validators.required]],
    relato: ['', [Validators.required]],
    meioTransporte: ['', [Validators.required]],
    favorita: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editingId = id;
      this.loadViagem(id);
    }
  }  
  loadViagem(id: string): void {
    this.loadingData = true;
    this.viagemService.getById(id).subscribe({
      next: (viagem) => {
        this.form.patchValue({
          cidade: viagem.cidade,
          pais: viagem.pais,
          dataViagem: viagem.dataViagem,
          avaliacao: viagem.avaliacao,
          relato: viagem.relato,
          meioTransporte: viagem.meioTransporte,
          favorita: viagem.favorita,
        });
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar viagem: " + error.message;
        this.loadingData = false;
      },
    });
  }    
  submit(): void {
    this.sucessMessage = "";
    this.errorMessage = "";
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
    
      this.loading = true;
      const formValue = this.form.getRawValue();
      const viagemData = {
        cidade: formValue.cidade,
        pais: formValue.pais,
        dataViagem: formValue.dataViagem,
        avaliacao: formValue.avaliacao,
        relato: formValue.relato,
        meioTransporte: formValue.meioTransporte,
        favorita: formValue.favorita || false,
      };

      if (this.editingId !== null) {
        this.viagemService.update(this.editingId, viagemData).subscribe({
        next: () => {
          this.loading = false;
          this.sucessMessage = "Viagem atualizada com sucesso!";
          setTimeout(() => {
            this.router.navigate(["/admin"]);
          }, 1000);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Erro ao atualizar viagem";
        },
      });
      return;
      }

      this.viagemService.create(viagemData).subscribe({
        next: () => {
          this.loading = false;
          this.sucessMessage = "Viagem criada com sucesso!";
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(["/admin"]);
          }, 1000);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Erro ao criar viagem";
        },
      });
  }  
}