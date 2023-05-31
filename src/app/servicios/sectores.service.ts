import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectoresService {
  private baseUrl = 'http://localhost/probando';
  public sectores: any[] = []; // Declara la propiedad sectores como un arreglo vacío

  constructor(private http: HttpClient) { }

  obtenerSectoresPorEstablecimiento(idEstablecimiento: number): Observable<any> {
    const url = `${this.baseUrl}/sectores.php?id_establecimiento=${idEstablecimiento}`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        this.sectores = response;
      })
    );
  }
}
