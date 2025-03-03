import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exito-cargar-incidente',
  template: `
    <h2 mat-dialog-title>Incidente Creado</h2>
    <mat-dialog-content>
      <p>El Incidente se creó exitosamente.</p>
      <p><strong>ID de Incidente:</strong> {{ data.res.idIncidente }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="close()">Aceptar</button>
    </mat-dialog-actions>
  `
})
export class ExitoCargarIncidenteComponent {
  constructor(
    public dialogRef: MatDialogRef<ExitoCargarIncidenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
