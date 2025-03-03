import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exito-alta-establecimiento',
  template: `
    <h2 mat-dialog-title>
      {{ data.modo === 'alta' ? 'Establecimiento Creado' : 'Establecimiento modificado' }}
    </h2>
    <mat-dialog-content>
      <p>
      {{ data.modo === 'edicion' ? 'El Establecimiento se creó exitosamente.' : 'Establecimiento se modificado exitosamente.' }}
      </p>
      <p><strong>ID de Establecimiento:</strong> {{ data.res.idEstablecimiento }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="close()">Aceptar</button>
    </mat-dialog-actions>
  `
})
export class ExitoAltaEstablecimientoComponent {
  constructor(
    public dialogRef: MatDialogRef<ExitoAltaEstablecimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
