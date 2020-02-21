import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employees/employees.component';
import { AlertService } from '../_services/alert.service';
import { AuthentificationService } from '../_services/authentification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { diffDates } from '@fullcalendar/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    employees: Array<Employees>;
    
    loading = false;
    submitted = false;
    returnUrl: string;
    loginDate: Date;
    diffInDays: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthentificationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            //this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            Emp_UserName: ['', Validators.required],
            Emp_PassWord: ['', Validators.required],
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    sendForm() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        //if (this.loginForm.invalid) {
        //    return;
        //}

        var user = new User();

        user.Emp_UserName = this.f.Emp_UserName.value;
        user.Emp_PassWord = this.f.Emp_PassWord.value;

        this.loading = true;
        this.authenticationService.login(user)
            .subscribe(
                data => { 
                    this.router.navigate(["employees"]);
                    this.loginDate = new Date();
                    //this.loginDate.getMinutes();
                    user.lastConnection.getMinutes();
                    this.diffInDays = Math.floor(Math.abs(<any>this.loginDate - <any>user.lastConnection) / (1000 * 60 * 60 * 24));
                    
                },
            error => {
                console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }


}

export class Employees {
    Emp_ID: number;
    Emp_UserName: string;
    Emp_PassWord: string;
}
