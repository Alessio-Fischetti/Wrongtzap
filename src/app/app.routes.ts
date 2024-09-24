import { Routes } from '@angular/router';
import { ExampleComponent } from './components/example-component/example.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat-view/chat-view.component').then((m) => m.ChatViewComponent),
  },
];
