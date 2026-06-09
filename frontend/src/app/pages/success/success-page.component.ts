import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
  orderId = this.route.snapshot.queryParamMap.get('orderId');

  constructor(private route: ActivatedRoute) {}
}
