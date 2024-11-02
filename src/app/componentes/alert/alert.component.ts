import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message!: string;
  @Input() showAlert!: boolean;
  @Output() close = new EventEmitter<void>();

  closeAlert(): void {
    this.close.emit();
  }
}
