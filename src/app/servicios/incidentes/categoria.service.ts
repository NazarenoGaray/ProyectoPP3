import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]> {
    const url = `${this.apiURL}/categorias`;
    return this.http.get<Categoria[]>(url);
  }

  obtenerCategoriasPorId(idCategoria: number): Observable<Categoria> {
    const url = `${this.apiURL}/categorias/${idCategoria}`;
    return this.http.get<Categoria>(url);
  }

    crearCategoria(categoria: Categoria): Observable<Categoria> {
      return this.http.post<Categoria>(this.apiURL, categoria);
    }


}
