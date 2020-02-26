import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';


@Component({
    selector: 'app-opening-hours',
    templateUrl: './opening-hours.component.html',
    styleUrls: ['./opening-hours.component.scss']
})

    
export class OpeningHoursComponent implements OnInit {
    public formatString: string = 'HH:mm';
    public enableStrictMode: boolean = true;
    //public interval: number = 30;

    mode: string;
    ajout: boolean = false;
    weeks: Array<Week>;
    day: Day;
    form: FormGroup;
    currentWeek: Week;
    selected: Week = new Week();
    new: Week = new Week();
    formSubmited: boolean;

    constructor( private data: DataService, private formBuilder: FormBuilder ) { this.buildTable(); }

    buildTable() {
        this.weeks = new Array<Week>();
      
        this.data.getAll('weeks').subscribe((res: Array<Week>) => {
            this.weeks = res;
            this.weeks.forEach(week => {
               
                if (week.Week_Innactiv) {
                    week.actif = "Inactif";
                } else {
                    week.actif = "Actif";
                }
            }); 
        });

        this.form = this.formBuilder.group({
            weekName: ['', Validators.required],
            //weekActiv: Boolean,
            DimancheOpen: ['', Validators.required],
            DimancheClose: ['', Validators.required],
            LundiOpen: ['', Validators.required],
            LundiClose: ['', Validators.required],
            MardiOpen: ['', Validators.required],
            MardiClose: ['', Validators.required],
            MercrediOpen: ['', Validators.required],
            MercrediClose: ['', Validators.required],
            JeudiOpen: ['', Validators.required],
            JeudiClose: ['', Validators.required],
            VendrediOpen: ['', Validators.required],
            VendrediClose: ['', Validators.required],
            SamediOpen: ['', Validators.required],
            SamediClose: ['', Validators.required]
        });
    }

    add() {
        this.mode = "add";
        this.showAddForm();
        this.resetForm();

        this.currentWeek = new Week();
        this.currentWeek.Week_Complete = false;
        this.currentWeek.Week_Name = "";
        this.currentWeek.Week_StartingWeekDay =""
        this.currentWeek.Week_StatingDayDate = '2020-02-01'; //fakeDate ;
        this.currentWeek.Week_Innactiv = false;

        this.currentWeek.days = new Array<Day>();
        for (var d = 0; d < 7; d++) {
            this.createDay(d);
        }
    }

    edit(week: Week) {
        this.mode = "edit";
        this.showAddForm();
        this.currentWeek = week;
        
        this.form.setValue({
            'weekName': this.currentWeek.Week_Name,
            'DimancheOpen': this.currentWeek.days[0].Day_StoreOpening,
            'DimancheClose': this.currentWeek.days[0].Day_StoreClosing,
            'LundiOpen': this.currentWeek.days[1].Day_StoreOpening,
            'LundiClose': this.currentWeek.days[1].Day_StoreClosing,
            'MardiOpen': this.currentWeek.days[2].Day_StoreOpening,
            'MardiClose': this.currentWeek.days[2].Day_StoreClosing,
            'MercrediOpen': this.currentWeek.days[3].Day_StoreOpening,
            'MercrediClose': this.currentWeek.days[3].Day_StoreClosing,
            'JeudiOpen': this.currentWeek.days[4].Day_StoreOpening,
            'JeudiClose': this.currentWeek.days[4].Day_StoreClosing,
            'VendrediOpen': this.currentWeek.days[5].Day_StoreOpening,
            'VendrediClose': this.currentWeek.days[5].Day_StoreClosing,
            'SamediOpen': this.currentWeek.days[6].Day_StoreOpening,
            'SamediClose': this.currentWeek.days[6].Day_StoreClosing
        });
        console.log(week);
        console.log(this.currentWeek);
    }

    onFormSubmit() {
        if (this.form.invalid) {
            return;
        } else {
            if (this.form.invalid) {
                return;
            } else {
                this.currentWeek.Week_Name = this.form.get('weekName').value;
                
                this.currentWeek.days[0].Day_StoreOpening = this.form.get('DimancheOpen').value;
                this.currentWeek.days[0].Day_StoreClosing = this.form.get('DimancheClose').value;
                this.currentWeek.days[1].Day_StoreOpening = this.form.get('LundiOpen').value;
                this.currentWeek.days[1].Day_StoreClosing = this.form.get('LundiClose').value;
                this.currentWeek.days[2].Day_StoreOpening = this.form.get('MardiOpen').value;
                this.currentWeek.days[2].Day_StoreClosing = this.form.get('MardiClose').value;
                this.currentWeek.days[3].Day_StoreOpening = this.form.get('MercrediOpen').value;
                this.currentWeek.days[3].Day_StoreClosing = this.form.get('MercrediClose').value;
                this.currentWeek.days[4].Day_StoreOpening = this.form.get('JeudiOpen').value;
                this.currentWeek.days[4].Day_StoreClosing = this.form.get('JeudiClose').value;
                this.currentWeek.days[5].Day_StoreOpening = this.form.get('VendrediOpen').value;
                this.currentWeek.days[5].Day_StoreClosing = this.form.get('VendrediClose').value;
                this.currentWeek.days[6].Day_StoreOpening = this.form.get('SamediOpen').value;
                this.currentWeek.days[6].Day_StoreClosing = this.form.get('SamediClose').value;

                console.log(this.currentWeek);

                if (this.mode == 'edit') {
                    //checker les probleme de cors, on peut pas parler a un id en particulier
                    this.currentWeek.days.forEach(d => {
                        this.data.modify('days', d.Day_ID, d).subscribe(res => { });
                    });
                    this.data.modify('weeks', this.currentWeek.Week_ID, this.currentWeek).subscribe(res => { this.buildTable(); this.ajout = false; });
                }
                if (this.mode == 'add') {
                    this.data.post('weeks', this.currentWeek).subscribe(res => { this.buildTable(); this.ajout = false; });
                }
                
            }
        }
    }
    createDay(d) {
        var day: Day = new Day();
        switch (d) {
            case 0:day.Day_WeekDay = "Dimanche";break;
            case 1:day.Day_WeekDay = "Lundi";break;
            case 2:day.Day_WeekDay = "Mardi"; break;
            case 3:day.Day_WeekDay = "Mercredi"; break;
            case 4:day.Day_WeekDay = "Jeudi";break;
            case 5:day.Day_WeekDay = "Vendredi";break;
            case 6:day.Day_WeekDay = "Samedi";break;
        }
        day.Day_StoreOpening = "";
        day.Day_StoreClosing = "";
        day.Day_Innactiv = false;
        day.Day_Date = '2020-02-01'; //fakeDate
        this.currentWeek.days.push(day);
    }
    
    resetForm() {
        this.form.reset();
        this.formSubmited = false;
        this.hideAddForm();
    }

    showAddForm() {
        this.ajout = true;
    }

    hideAddForm() {
        this.ajout = false;
    }
    
    ngOnInit() {
    }
}

export class Week {
    Week_ID: number
    Week_Name: string
    Week_StartingWeekDay: string
    Week_StatingDayDate: string
    Week_Complete: boolean
    Week_Innactiv: boolean
    days: Array<Day>
    actif: string
}

export class Day {
    Day_ID: number
    FK_Week_ID: number
    Day_WeekDay: string
    Day_StoreOpening: string
    Day_StoreClosing: string
    Day_Date: string
    Day_Innactiv: boolean
}