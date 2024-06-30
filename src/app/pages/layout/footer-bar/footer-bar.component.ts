import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBarComponent {
  year: number = new Date().getFullYear();
}
