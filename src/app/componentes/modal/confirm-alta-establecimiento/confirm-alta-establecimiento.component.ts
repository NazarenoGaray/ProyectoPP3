import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-alta-establecimiento',
  template: ` 
    <h2 mat-dialog-title>
      {{ data.modo === 'alta' ? 'Confirmar Alta de Establecimiento' : 'Confirmar cambios en Establecimiento' }}
    </h2>
    <mat-dialog-content>
      <p><strong>Nombre:</strong> {{ data.establecimiento.nombre }}</p>
      <p><strong>CUIT:</strong> {{ data.establecimiento.cuit }}</p>
      <p><strong>Calle:</strong> {{ data.establecimiento.calle }}</p>
      <p><strong>Telefono:</strong> {{ data.establecimiento.telefono }}</p>
      <p><strong>Correo:</strong> {{ data.establecimiento.correo }}</p>
      <p><strong>Sitio Web:</strong> {{ data.establecimiento.sitioweb }}</p>
      <p><strong>Hora apertura:</strong> {{ data.establecimiento.horaEntrada }}</p>
      <p><strong>Pais:</strong> {{ data.establecimiento.paisDescripcion }}</p>
      <p><strong>Provincia:</strong> {{ data.establecimiento.provinciaDescripcion }}</p>
      <p><strong>Localidad:</strong> {{ data.establecimiento.localidadDescripcion }}</p>
      <p><strong>Hora Apertura:</strong> {{ data.establecimiento.horaEntrada }}</p>
      <p><strong>Hora cierre:</strong> {{ data.establecimiento.horaSalida }}</p>

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
export class ConfirmAltaEstablecimientoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmAltaEstablecimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
