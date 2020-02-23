import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-strike',
  templateUrl: './strike.component.html',
  styleUrls: ['./strike.component.scss']
})
export class StrikeComponent implements OnInit {
    StrikeCats: Array<StrikeCategories> = new Array<StrikeCategories>();
    StrikeCatForm: FormGroup;
    StrikeCatSubmitted: boolean = false;
    showStrikeCat: boolean = false;
    showAddStrikeCat: boolean = false;
    editStrikeCat: boolean = false;


    constructor(private data: DataService, private formBuilder: FormBuilder) {
        this.data.getAll('strikeCategories').subscribe((res: Array<StrikeCategories>) => {
            this.StrikeCats = res;
            //get the active value to have a string value ( added to the class )
            this.StrikeCats.forEach(StrikeCatories => {
                if (StrikeCatories.StrikeCat_Innactiv) {
                    StrikeCatories.actif = "Inactif";
                } else {
                    StrikeCatories.actif = "Actif";
                }
            });
        });

        this.StrikeCatForm = this.formBuilder.group({
            StrikeCat_Name: ['', Validators.required],
            StrikeCat_Description: ['', Validators.required],
            StrikeCat_Penality: ['', Validators.required],
            //StrikeCat_Innactiv: [false, Validators.required]
        })

    }

    //access to form fields
    get scf() { return this.StrikeCatForm.controls; }

    onStrikeCatFormSubmit(formData) {
        this.StrikeCatSubmitted = true;
        //stop if the form is not valid
        if (this.StrikeCatForm.invalid) {
            return;
        }

        // display form values on success
        alert('La catégorie à été soumise' + JSON.stringify(this.StrikeCatForm.value, null, 4));
        this.onStrikeCatFormReset();
    }

    onStrikeCatFormReset() {
        this.StrikeCatSubmitted = false;
        this.showAddStrikeCat = false;
        if (this.editStrikeCat)
            this.editStrikeCat = false;
        this.StrikeCatForm.reset();
    }

    editStrike(Strike: StrikeCategories) {
        if (this.editStrikeCat) {
            return;
        } else {
            this.showAddStrikeCat = true;
            this.editStrikeCat = true;
            this.StrikeCatForm.setValue({ 'StrikeCat_Name': Strike.StrikeCat_Name, 'StrikeCat_Description': Strike.StrikeCat_Description, 'StrikeCat_Penality': Strike.StrikeCat_Penality })
        }
    }

    toggleCard(card: string) {
        switch (card) {
            //StrikeCat
            case 'strikeCat':
                this.showStrikeCat = !this.showStrikeCat;
                break;
        }
    }

  ngOnInit() {
  }

}

export class StrikeCategories {
    StrikeCat_ID: number
    StrikeCat_Name: string
    StrikeCat_Description: string
    StrikeCat_Penality: string
    StrikeCat_Innactiv: boolean
    actif: string
}
