import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent implements OnInit {
  formulario: FormGroup;
  roles: { id_rol: number, rol: string }[] = [
    { id_rol: 1, rol: 'Administrador' },
    { id_rol: 2, rol: 'Gerencial' },
    { id_rol: 3, rol: 'Mesa de ayuda' },
    { id_rol: 4, rol: 'Técnicos' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreusuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      correo: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreusuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      correo: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
    this.http.post('http://localhost/PP3/ProyectoPP3/backend/index.php', this.formulario.value)
    .subscribe((response: any) => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  
  }
}
