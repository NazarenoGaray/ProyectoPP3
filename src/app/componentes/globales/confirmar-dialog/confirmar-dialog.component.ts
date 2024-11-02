import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-dialog',
  templateUrl: './confirmar-dialog.component.html',
  styleUrls: ['./confirmar-dialog.component.css']
})
export class ConfirmarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarDialogComponent>
  ) {}
}
