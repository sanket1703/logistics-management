import { baseURL } from './shared/baseurl';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';


import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import {MatTableModule, MatTable} from '@angular/material/table'; 

import { AppComponent } from './app.component';

import 'hammerjs';
import { GameDetailsComponent } from './game-details/game-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UserGamingComponent } from './user-gaming/user-gaming.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { GameRecordsComponent } from './game-records/game-records.component';
import { UserRecordsComponent } from './user-records/user-records.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { GamingDataService } from './services/gaming-data.service';
import { GameDetailsService } from './services/game-details.service';
import { LoginDetailsService } from './services/login-details.service';
import { ProcessHTTPMsgService } from './services/processhttpmsg.service';
import { HomeComponent } from './home/home.component';
import { GameEndComponent } from './game-end/game-end.component';
import { ExistingUsersComponent } from './existing-users/existing-users.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfSignupComponent } from './prof-signup/prof-signup.component';
import { ProfMenuComponent } from './prof-menu/prof-menu.component';
import { ProfHomeComponent } from './prof-home/prof-home.component';
import { ProfLoginComponent } from './prof-login/prof-login.component';
import { ProfNewSubscriptionComponent } from './prof-new-subscription/prof-new-subscription.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ProfMySubscriptionsComponent } from './prof-my-subscriptions/prof-my-subscriptions.component';

import { ProfRecordsComponent } from './prof-records/prof-records.component';


@NgModule({
  declarations: [
    AppComponent,
    GameDetailsComponent,
    UserGamingComponent,
    LoginComponent,
    SignupComponent,
    AdminLoginComponent,
    GameRecordsComponent,
    UserRecordsComponent,
    AdminMenuComponent,
    UserMenuComponent,
    UserHomeComponent,
    AdminHomeComponent,
    HomeComponent,
    GameEndComponent,
    ExistingUsersComponent,
    UpdateUserComponent,
    AboutUsComponent,
    ProfSignupComponent,
    ProfMenuComponent,
    ProfHomeComponent,
    ProfLoginComponent,
    ProfNewSubscriptionComponent,
    ProfMySubscriptionsComponent,
 
    ProfRecordsComponent
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
 
    
  ],
  entryComponents:[
    GameEndComponent,
    UpdateUserComponent
  ],
  providers: [GameDetailsService, GamingDataService, 
    AngularFirestore, LoginDetailsService, ProcessHTTPMsgService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
