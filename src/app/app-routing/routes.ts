import { AboutUsComponent } from './../about-us/about-us.component';
import { HomeComponent } from './../home/home.component';
import { ExistingUsersComponent } from './../existing-users/existing-users.component';
import { AdminHomeComponent } from './../admin-home/admin-home.component';
import { UserRecordsComponent } from './../user-records/user-records.component';
import { AdminLoginComponent } from './../admin-login/admin-login.component';
import { UserGamingComponent } from './../user-gaming/user-gaming.component';
import { Routes } from '@angular/router';
import { GameDetailsComponent } from './../game-details/game-details.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { GameRecordsComponent } from '../game-records/game-records.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { ProfSignupComponent } from '../prof-signup/prof-signup.component';
import { ProfHomeComponent } from '../prof-home/prof-home.component';
import { ProfLoginComponent } from '../prof-login/prof-login.component';
import { ProfNewSubscriptionComponent } from '../prof-new-subscription/prof-new-subscription.component';
import { ProfMenuComponent } from '../prof-menu/prof-menu.component';
import { ProfMySubscriptionsComponent } from '../prof-my-subscriptions/prof-my-subscriptions.component';
import { ProfRecordsComponent } from '../prof-records/prof-records.component';

export const routes: Routes = [
  { path: 'user/userLogin', component: LoginComponent },
  { path: 'user/home/:uid', component: UserHomeComponent },
  { path: 'user/userGaming/:uid', component: UserGamingComponent },
  { path: 'user/record/:uid', component: UserRecordsComponent },
  { path: 'user/aboutus/:uid', component: AboutUsComponent },

  
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/userSignup', component: SignupComponent },
  { path: 'admin/recordsAll', component: GameRecordsComponent },
  { path: 'admin/record/:uid', component: UserRecordsComponent },
  { path: 'admin/adminLogin', component: AdminLoginComponent },
  { path: 'admin/existingUsers', component: ExistingUsersComponent },

  { path: 'admin/profSignup', component: ProfSignupComponent },

  { path: 'prof/home/:uid', component: ProfHomeComponent },
  { path: 'prof/login', component: ProfLoginComponent },
  { path: 'prof/home/new/subscription', component: ProfNewSubscriptionComponent },
  { path: 'prof/home/my/subscriptions', component: ProfMySubscriptionsComponent },
  { path: 'prof/home/edit/gameDetails', component: GameDetailsComponent },
  { path: 'prof/home/records/all',component:ProfRecordsComponent },
  { path: 'home', component: HomeComponent },
  

  { path: '', redirectTo: 'home', pathMatch: 'full' }
  
];