import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { MyScheduleComponent } from './schedule/my-schedule/my-schedule.component';
import { ScheduleComponent } from './schedule/schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_helpers/auth.guard';
import { StrikeComponent } from './settings/strike/strike.component';
import { StoreComponent } from './settings/store/store.component';
import { PayCycleComponent } from './settings/pay-cycle/pay-cycle.component';
import { OpeningHoursComponent } from './settings/opening-hours/opening-hours.component';
import { DepartementsComponent } from './settings/departements/departements.component';
import { StatusComponent } from './settings/status/status.component';
import { RequestComponent } from './request/request.component';
import { GlobalMessageComponent } from './global-message/global-message.component';
import { P2pMessagesComponent } from './p2p-messages/p2p-messages.component';


const routes: Routes = [
    { path: "", component: EmployeesComponent, canActivate: [AuthGuard] },
    { path: "employees", component: EmployeesComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "mySchedule", component: MyScheduleComponent, canActivate: [AuthGuard] },
    { path: "schedule", component: ScheduleComponent, canActivate: [AuthGuard] },
    //setting dropDown
    {
        path: "strike",
        component: StrikeComponent, canActivate: [AuthGuard] 
    },
    {
        path: "store",
        component: StoreComponent, canActivate: [AuthGuard] 
    },
    {
        path: "pay-cycle",
        component: PayCycleComponent, canActivate: [AuthGuard] 
    },
    {
        path: "opening-hours",
        component: OpeningHoursComponent, canActivate: [AuthGuard] 
    },
    {
        path: "departements",
        component: DepartementsComponent, canActivate: [AuthGuard] 
    },
    {
        path: "status",
        component: StatusComponent, canActivate: [AuthGuard] 
    },
    //demande
    {
        path: "request",
        component: RequestComponent, canActivate: [AuthGuard] 
    },
    //global messages
  {
        path: "global-message",
        component: GlobalMessageComponent
    },
    {
        path: "message",
        component: P2pMessagesComponent
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
