import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/model/categoria.model';

const API_URL = 'http://localhost/probando/categoria.php';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  // Aquí se definirán los métodos para consumir la API de Categoriaes

  obtenerCategoriaes(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(API_URL);
  }
  obtenerCategoriaPorId(id: number): Observable<Categoria> {
    const url = `${API_URL}/${id}`;
    return this.http.get<Categoria>(url);
  }
  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(API_URL, categoria);
  }
  actualizarCategoria(categoria: Categoria): Observable<any> {
    const url = `${API_URL}/${categoria.idCategoria}`;
    return this.http.put(url, categoria);
  }
  eliminarCategoria(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.delete(url);
  }
}