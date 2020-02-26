import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { AuthentificationService } from './_services/authentification.service';
import { User } from './_models/user';

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
    public day: number = new Date().getDay();
    public hour: number = new Date().getHours();
    public dateValue: Date = new Date();
    public minDate: Date = new Date(this.fullYear, this.month, this.day); // 2 semaine a l'avance
    public maxDate: Date = new Date(this.fullYear, this.month, this.day);
    public formatString: string = 'HH:mm'; //pour le temps
    public enableStrictMode: boolean = true;
    //for the rangepicker
    public start: Date = new Date(this.fullYear, this.month, this.day +14);
    public end: Date = new Date();

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
                },
                'datepicker': {
                    placeholder: "Entrer une date",
                    today: "Aujourd'hui"
                },
                'daterangepicker': {
                    placeholder: "Entrer une date",
                    applyText: "Ok",
                    cancelText: "Annuler",
                    selectedDays: "jours sélectionné",
                    days: "jours",
                    startLabel: "date de départ",
                    endLabel: "date de fin"
                },
                'datetimepicker': {
                    placeholder: "Choisir une heure",
                    today: "Aujourd'hui"
                },
                'timepicker': {
                    placeholder:"Choisir une heure"
                }
            }
        });
    }

}
