import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-cargar-incidente',
  template: ` 
    <h2 mat-dialog-title>
      {{ data.modo === 'alta' ? 'Confirmar Carga de Incidente' : 'Confirmar cambios en Incidente' }}
    </h2>
    <mat-dialog-content>
    <p><strong>Título:</strong> {{ data.incidenteDialog.titulo }}</p>
    <p><strong>Descripción:</strong> {{ data.incidenteDialog.descripcion }}</p>
    <p><strong>Prioridad:</strong> {{ data.incidenteDialog.prioridadDescripcion }}</p>
    <p><strong>Estado:</strong> {{ data.incidenteDialog.estadoDescripcion }}</p>
    <p><strong>Establecimiento:</strong> {{ data.incidenteDialog.establecimientoNombre }}</p>
    <p><strong>Sector:</strong> {{ data.incidenteDialog.sectorNombre }}</p>
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
export class ConfirmCargarIncidenteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmCargarIncidenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}