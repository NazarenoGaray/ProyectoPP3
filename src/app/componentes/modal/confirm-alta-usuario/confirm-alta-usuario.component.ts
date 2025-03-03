import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-alta-usuario',
  template: ` 
  <h2 mat-dialog-title>
  {{ data.modo === 'alta' ? 'Confirmar Alta de Usuario' : 'Confirmar cambios en Usuario' }}
  </h2>
    <mat-dialog-content>
      <p><strong>Nombre:</strong> {{ data.datosUsuarioCompleto.nombre }}</p>
      <p><strong>Apellido:</strong> {{ data.datosUsuarioCompleto.apellido }}</p>
      <p><strong>Direccion:</strong> {{ data.datosUsuarioCompleto.direccion }}</p>
      <p><strong>Telefono:</strong> {{ data.datosUsuarioCompleto.telefono }}</p>
      <p><strong>Correo:</strong> {{ data.datosUsuarioCompleto.correo }}</p>
      <p><strong>Usuario:</strong> {{ data.datosUsuarioCompleto.usuario }}</p>
      <p><strong>Rol:</strong> {{ data.datosUsuarioCompleto.idRol }}</p>

      <h4 mat-dialog-title>
      {{ data.modo === 'alta' ? '¿Desea confirmar el alta?' : '¿Desea confirmar el cambio?' }}
      </h4>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-button (click)="cancel()">Cancelar</button>
      <button mat-button color="primary" (click)="confirm()">Confirmar</button>
    </mat-dialog-actions>
  `
})
export class ConfirmAltaUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmAltaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
