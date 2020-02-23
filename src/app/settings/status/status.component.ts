import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
    mode: string;
    ajout: boolean = false;
    empStatus: Array<Status>;
    form: FormGroup;
    selected: Status = new Status();
    new: Status = new Status();
    formSubmited: boolean;


    constructor(private data: DataService, private formBuilder: FormBuilder) {
        this.buildTable()
    }

    buildTable() {
        this.empStatus = new Array<Status>();
        this.data.getAll('empStatus').subscribe((res: Array<Status>) => {
            this.empStatus = res;
            this.empStatus.forEach(status => {
                if (status.EmpStatus_Innactiv) {
                    status.actif = "Inactif";
                } else {
                    status.actif = "Actif";
                }
            });
        });

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            desc: ['', Validators.required],
            actif: Boolean
        })

    }

    //access to form fields
    get f() { return this.form.controls; }

    onFormSubmit(formData) {
        this.formSubmited = true;
       
        if (this.form.invalid) {
            return;
        } else {
            if (this.mode == 'edit') {
                this.selected.EmpStatus_Name = this.form.get('name').value;
                this.selected.EmpStatus_Descriptions = this.form.get('desc').value;
                this.selected.EmpStatus_Innactiv = this.form.get('actif').value;
                //checker les probleme de cors, on peut pas parler a un id en particulier
                this.data.modify('empStatus', this.selected.EmpStatus_ID, this.selected).subscribe(res => { this.buildTable(); this.ajout = false;});
            }
            if (this.mode == 'add') {
                this.new.EmpStatus_Name = this.form.get('name').value;
                this.new.EmpStatus_Descriptions = this.form.get('desc').value;
                this.new.EmpStatus_Innactiv = this.form.get('actif').value;
                this.data.post('empStatus', this.new).subscribe(res => { this.buildTable(); this.ajout = false;});
            }
        }
    }

    add() {
        this.mode = 'add';
        this.form.reset();
        this.showAddForm();
        this.new = new Status();
        this.new.EmpStatus_Name = "";
        this.new.EmpStatus_Descriptions = "";
        this.new.EmpStatus_Color = "";
        this.new.EmpStatus_Innactiv = false;
        this.form.setValue({ 'name': this.new.EmpStatus_Name, 'desc': this.new.EmpStatus_Descriptions, 'actif': this.new.EmpStatus_Innactiv });        

    }

    edit(status: Status) {
        this.mode = 'edit';
        this.selected = status;
        this.showAddForm();
        this.form.setValue({ 'name': status.EmpStatus_Name, 'desc': status.EmpStatus_Descriptions,'actif': status.EmpStatus_Innactiv });        
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

export class Status {
    EmpStatus_ID:number
    EmpStatus_Name :string
    EmpStatus_Descriptions: string
    EmpStatus_Color: string
    EmpStatus_Innactiv: boolean
    actif:string
}
