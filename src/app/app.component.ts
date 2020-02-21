import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

import { AuthentificationService } from './_services/authentification.service';
import { User } from './_models/user';
import { DisponibilitiesComponent } from './request/disponibilities/disponibilities.component';

declare var require: any;

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/fr-CA/ca-gregorian.json'),
    require('cldr-data/main/fr-CA/numbers.json'),
    require('cldr-data/main/fr-CA/timeZoneNames.json'),
    require('cldr-data/supplemental/weekdata.json')
);

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    //for calendar
    public month: number = new Date().getMonth();
    public fullYear: number = new Date().getFullYear();
    public dateValue: Object = new Date();
    public minDate: Date = new Date(this.fullYear, this.month, 9);
    public maxDate: Date = new Date(this.fullYear, this.month, 15);

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        /*loads the localization text*/
        L10n.load({
            'fr-CA': {
                'calendar': {
                    today: "Aujourd'hui"
                }
            }
        });
    }

}