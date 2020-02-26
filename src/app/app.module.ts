import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { MyScheduleComponent } from './schedule/my-schedule/my-schedule.component';
import { ScheduleComponent } from './schedule/schedule/schedule.component';
import { DayOffComponent } from './request/day-off/day-off.component';
import { DisponibilitiesComponent } from './request/disponibilities/disponibilities.component';
import { ReplacementsComponent } from './request/replacements/replacements.component';
import { TimeSlotComponent } from './request/time-slot/time-slot.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { GlobalMessageComponent } from './global-message/global-message.component';
import { P2pMessagesComponent } from './p2p-messages/p2p-messages.component';
import { DepartementsComponent } from './settings/departements/departements.component';
import { OpeningHoursComponent } from './settings/opening-hours/opening-hours.component';
import { PayCycleComponent } from './settings/pay-cycle/pay-cycle.component';
import { StatusComponent } from './settings/status/status.component';
import { StoreComponent } from './settings/store/store.component';
import { StrikeComponent } from './settings/strike/strike.component';
import { RequestComponent } from './request/request.component';
import { CalendarModule, DatePickerModule, DateRangePickerModule, TimePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PhonePipe } from './phone.pipe';

export const options: Partial<IConfig> | (() => Partial<IConfig> ) = null;
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    MyScheduleComponent,
    ScheduleComponent,
    DayOffComponent,
    DisponibilitiesComponent,
    ReplacementsComponent,
    TimeSlotComponent,
    LoginComponent,
    AlertComponent,
    GlobalMessageComponent,
    P2pMessagesComponent,
    DepartementsComponent,
    OpeningHoursComponent,
    PayCycleComponent,
    StatusComponent,
    StoreComponent,
    StrikeComponent,
    RequestComponent,
    PhonePipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        DatePickerModule,
        TimePickerModule ,
        DateRangePickerModule,
        NgxMaskModule.forRoot(options)
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, { provide: LOCALE_ID, useValue: "fr-CA" }],
    bootstrap: [AppComponent]
})

export class AppModule { }
