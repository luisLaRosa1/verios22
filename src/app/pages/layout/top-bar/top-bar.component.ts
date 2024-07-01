import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  @Output() onToggleSidebar: EventEmitter<any> = new EventEmitter()
}
