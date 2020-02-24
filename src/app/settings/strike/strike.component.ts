import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-strike',
  templateUrl: './strike.component.html',
  styleUrls: ['./strike.component.scss']
})
export class StrikeComponent implements OnInit {
    mode: string;
    ajout: boolean = false;
    StrikeCats: Array<StrikeCategories>;
    form: FormGroup;
    selected: StrikeCategories;
    new: StrikeCategories;
    formSubmited: boolean;


    constructor(private data: DataService, private formBuilder: FormBuilder) {
        this.buildTable();
    }

    buildTable() {
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

        this.form = this.formBuilder.group({
            StrikeCat_Name: ['', Validators.required],
            StrikeCat_Description: ['', Validators.required],
            StrikeCat_Penality: ['', Validators.required],
            StrikeCat_Innactiv: Boolean
        })
    }

    //access to form fields
    get scf() { return this.form.controls; }

    showAddForm() {
        this.ajout = true;
    }

    hideAddForm() {
        this.ajout = false;
    }

    onStrikeCatFormSubmit(formData) {
        this.formSubmited = true;
        //stop if the form is not valid
        if (this.form.invalid) {
            return;
        } else {
            if (this.mode == 'edit') {
                this.selected.StrikeCat_Name = this.form.get('StrikeCat_Name').value;
                this.selected.StrikeCat_Description = this.form.get('StrikeCat_Description').value;
                this.selected.StrikeCat_Penality = this.form.get('StrikeCat_Penality').value;
                this.selected.StrikeCat_Innactiv = this.form.get('StrikeCat_Innactiv').value;
                this.data.modify('strikeCategories', this.selected.StrikeCat_ID, this.selected).subscribe(res => { this.buildTable(); this.ajout = false; });
            }
            if (this.mode == 'add') {
                this.new.StrikeCat_Name = this.form.get('StrikeCat_Name').value;
                this.new.StrikeCat_Description = this.form.get('StrikeCat_Description').value;
                this.new.StrikeCat_Penality = this.form.get('StrikeCat_Penality').value;
                this.new.StrikeCat_Innactiv = this.form.get('StrikeCat_Innactiv').value;
                this.data.post('strikeCategories', this.new).subscribe(res => { this.buildTable(); this.ajout = false; });
            }
        }
    }

    onStrikeCatFormReset() {
        this.form.reset();
        this.formSubmited = false;
        this.hideAddForm();
    }

    edit(Strike: StrikeCategories) {
        this.mode = 'edit';
        this.selected = Strike;
        this.showAddForm();
        this.form.setValue({ 'StrikeCat_Name': Strike.StrikeCat_Name, 'StrikeCat_Description': Strike.StrikeCat_Description, 'StrikeCat_Penality': Strike.StrikeCat_Penality, 'StrikeCat_Innactiv': Strike.StrikeCat_Innactiv });     
    }

    add() {
        this.mode = 'add';
        this.showAddForm();
        this.new = new StrikeCategories();
        this.new.StrikeCat_Name = "";
        this.new.StrikeCat_Description = "";
        this.new.StrikeCat_Penality = "";
        this.new.StrikeCat_Innactiv = false;
        this.form.setValue({ 'StrikeCat_Name': this.new.StrikeCat_Name, 'StrikeCat_Description': this.new.StrikeCat_Description, 'StrikeCat_Penality': this.new.StrikeCat_Penality, 'StrikeCat_Innactiv': this.new.StrikeCat_Innactiv });
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
