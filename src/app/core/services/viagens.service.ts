import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Viagem } from "../models/viagem.model";
import { HttpClient } from "@angular/common/http";

type FirebaseViagem = Omit<Viagem, "id"> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class ViagensService {
  private http = inject(HttpClient);
  private apiUrl = "https://travellog-4398c-default-rtdb.firebaseio.com/viagens";
  private sufix = ".json";

  getAll(): Observable<Viagem[]> {
    return this.http.get<Record<string, FirebaseViagem> | null >(this.apiUrl + this.sufix).
    pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([id, viagem]) => {
          const {id: _ignoredId, ...viagemData } = viagem;
          return { id, ...viagemData } as Viagem;
        });
      })
    );
  }

  getById(id: string): Observable<Viagem> {
    return this.http
    .get<FirebaseViagem | null>(`${this.apiUrl}/${id}${this.sufix}`)
    .pipe(
      map((response) => {
        if (!response) {
          throw new Error(`Viagem não encontrada!`);
        }
        const { id: _ignoredId, ...viagemData } = response;
        return { id, ...viagemData };
      }),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }

  private readonly viagensDemonstracao: Viagem[] = [
    
  ];

  listar(): Observable<Viagem[]> {
    // Quando a API estiver disponível, substitua o `of` por:
    // return this.http.get<Viagem[]>('URL_DA_API/viagens');
    return of(this.viagensDemonstracao);
  }

  buscarPorId(id: number): Observable<Viagem | undefined> {
    // Com a API: return this.http.get<Viagem>(`URL_DA_API/viagens/${id}`);
    return of(this.viagensDemonstracao.find((viagem) => viagem.id === id));
  }
}
