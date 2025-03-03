import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exito-alta-usuario',
  template: `
    <h2 mat-dialog-title>
    {{ data.modo === 'alta' ? 'Usuario Creado' : 'Usuario modificado' }}
    </h2>
    <mat-dialog-content>
    <p>El Usuario se creó exitosamente.
      {{ data.modo === 'alta' ? 'El Usuario se creó exitosamente.' : 'Usuario se modificado exitosamente.' }}
      </p>
      <p><strong>ID de Usuario:</strong> {{ data.res.idUsuario }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="close()">Aceptar</button>
    </mat-dialog-actions>
  `
})
export class ExitoAltaUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<ExitoAltaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
