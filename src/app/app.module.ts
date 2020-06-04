import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import {AppComponent } from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TaskListComponent } from './components/task-list/task-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FilterPipe } from './shared/pipes/filter.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpLoadingInterceptor} from './core/services/http-loading-interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpLoadingInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
