import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

<<<<<<< HEAD
    onFormSubmit() {
        if (this.form.invalid) {
            return;
        } else {
            if (this.form.invalid) {
                return;
            } else {
                this.currentWeek.Week_Name = this.form.get('weekName').value;

                this.currentWeek.days[0].Day_StoreOpening = this.decalage(this.currentWeek.days[0].Day_StoreOpening,this.form.get('DimancheOpen').value);
                this.currentWeek.days[0].Day_StoreClosing = this.decalage(this.currentWeek.days[0].Day_StoreClosing, this.form.get('DimancheClose').value);

                this.currentWeek.days[1].Day_StoreOpening = this.decalage(this.currentWeek.days[1].Day_StoreOpening, this.form.get('LundiOpen').value);
                this.currentWeek.days[1].Day_StoreClosing = this.decalage(this.currentWeek.days[1].Day_StoreClosing, this.form.get('LundiClose').value);

                this.currentWeek.days[2].Day_StoreOpening = this.decalage(this.currentWeek.days[2].Day_StoreOpening,this.form.get('MardiOpen').value);
                this.currentWeek.days[2].Day_StoreClosing = this.decalage(this.currentWeek.days[2].Day_StoreClosing, this.form.get('MardiClose').value);

                this.currentWeek.days[3].Day_StoreOpening = this.decalage(this.currentWeek.days[3].Day_StoreOpening, this.form.get('MercrediOpen').value);
                this.currentWeek.days[3].Day_StoreClosing = this.decalage(this.currentWeek.days[3].Day_StoreClosing, this.form.get('MercrediClose').value);

                this.currentWeek.days[4].Day_StoreOpening = this.decalage(this.currentWeek.days[4].Day_StoreOpening, this.form.get('JeudiOpen').value);
                this.currentWeek.days[4].Day_StoreClosing = this.decalage(this.currentWeek.days[4].Day_StoreClosing, this.form.get('JeudiClose').value);

                this.currentWeek.days[5].Day_StoreOpening = this.decalage(this.currentWeek.days[5].Day_StoreOpening , this.form.get('VendrediOpen').value);
                this.currentWeek.days[5].Day_StoreClosing = this.decalage(this.currentWeek.days[5].Day_StoreClosing, this.form.get('VendrediClose').value);

                this.currentWeek.days[6].Day_StoreOpening = this.decalage(this.currentWeek.days[6].Day_StoreOpening, this.form.get('SamediOpen').value);
                this.currentWeek.days[6].Day_StoreClosing = this.decalage(this.currentWeek.days[6].Day_StoreClosing , this.form.get('SamediClose').value);

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

    decalage(model: string, input: string) {
        var modelDateFormat = new Date(model);
        var inputDateFormat = new Date(input);
        if (modelDateFormat != inputDateFormat) {
            return new Date(inputDateFormat.getTime() - (1000 * 60 * 60 * 5));
        }
        else {
            return inputDateFormat;
        }

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
=======
>>>>>>> parent of 6b59afa1... final version qui marche pas et crossage de con
}
