import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RformComponent } from './rform/rform.component';
import { DogImageComponent } from './dog-images/dog-images.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'rform', component: RformComponent},
  { path: 'api', component: DogImageComponent},
  { path: '**', redirectTo: ''}
];
