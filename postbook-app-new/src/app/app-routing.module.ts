import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './_core/services/authguard.service';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/posts/create-post/create-post.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'posts/create',
    component: CreatePostComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'posts/edit/:postId',
    component: CreatePostComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'posts/list',
    component: PostListComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthguardService]
})
export class AppRoutingModule { }
