import { Routes } from '@angular/router';
import { ExampleComponent } from './components/example-component/example.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./components/folder/folder.page').then((m) => m.FolderPage),
  },
];
