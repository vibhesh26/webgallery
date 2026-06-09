import { Routes } from '@angular/router';
import { GalleryPageComponent } from './pages/gallery/gallery-page.component';
import { SuccessPageComponent } from './pages/success/success-page.component';

export const routes: Routes = [
  { path: '', component: GalleryPageComponent },
  { path: 'checkout', redirectTo: '' },
  { path: 'success', component: SuccessPageComponent },
  { path: '**', redirectTo: '' }
];
