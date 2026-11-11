import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Viagem } from "../models/viagem.model";
import { HttpClient } from "@angular/common/http";

type FirebaseViagem = Omit<Viagem, "id"> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class ViagensService {
  private http = inject(HttpClient);
  private apiUrl = "https://travellog-4398c-default-rtdb.firebaseio.com/viagens";
  private sufix = ".json";

  getAll(): Observable<Viagem[]> {
    return this.http
      .get<Record<string, FirebaseViagem> | null>(this.apiUrl + this.sufix)
      .pipe(
        map((response) => {
          if (!response) {
            return [];
          }
          return Object.entries(response).map(([id, viagem]) => {
            const { id: _ignoredId, ...viagemData } = viagem;
            return { id, ...viagemData } as Viagem;
          });
        }),
      );
  }

  getById(id: string): Observable<Viagem> {
    return this.http
      .get<FirebaseViagem | null>(`${this.apiUrl}/${id}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error("Viagem não encontrada!");
          }
          const { id: _ignoredId, ...viagemData } = response;
          return { id, ...viagemData };
        }),
      );
  }

  create(viagem: Omit<Viagem, "id">): Observable<Viagem> {
    return this.http
      .post<{ name: string }>(this.apiUrl + this.sufix, viagem)
      .pipe(map((response) => ({ id: response.name, ...viagem })));
  }

  update(id: string, viagem: Omit<Viagem, "id">): Observable<Viagem> {
    return this.http
      .put<Omit<Viagem, "id">>(`${this.apiUrl}/${id}${this.sufix}`, viagem)
      .pipe(map(() => ({ id, ...viagem })));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}
