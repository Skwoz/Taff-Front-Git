import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.scss']
})
export class DepartementsComponent implements OnInit {
    actif: string = "";
    mode: string;
    ajout: boolean = false;
    empPositions: Array<Position>;
    positionForm: FormGroup;
    selectedPosition: Position = new Position();
    newPosition: Position;
    formSubmited: boolean;

    constructor(private data: DataService, private formBuilder: FormBuilder) {
        //data.get('empPositions', 1).subscribe(res => { console.log(res) });
        this.buildTable()
    }

    buildTable() {
        this.empPositions = new Array<Position>();
        this.data.getAll('empPositions').subscribe((res: Array<Position>) => {
            this.empPositions = res;
            this.empPositions.forEach(empPosition => {
                if (empPosition.EmpPosition_Innactiv) {
                    empPosition.actif = "Inactif";
                } else {
                    empPosition.actif = "Actif";
                }
            });
        });

        this.positionForm = this.formBuilder.group({
            position_name: ['', Validators.required],
            position_desc: ['', Validators.required],
            //position_color: ['', Validators.required],
            position_actif: Boolean
        });
    }

    //access to form fields
    get f() { return this.positionForm.controls; }
    
    add() {
        this.mode = 'add';
        this.positionForm.reset();
        this.showAddForm();
        //setup de la nouvelle position
        this.newPosition = new Position();
        this.newPosition.EmpPosition_Color = "na";
        this.newPosition.EmpPosition_Name = "";
        this.newPosition.EmpPosition_Description = "";
        this.newPosition.EmpPosition_Innactiv = false;
        this.positionForm.setValue({ 'position_name': this.newPosition.EmpPosition_Name, 'position_desc': this.newPosition.EmpPosition_Description,/* 'position_color': position.EmpPosition_Color,*/ 'position_actif': this.newPosition.EmpPosition_Innactiv });
    }

    edit(position: Position) {
        this.mode = 'edit';
        this.selectedPosition = position;
        this.showAddForm();
        this.positionForm.setValue({ 'position_name': position.EmpPosition_Name, 'position_desc': position.EmpPosition_Description,/* 'position_color': position.EmpPosition_Color,*/ 'position_actif': position.EmpPosition_Innactiv });
        console.log(this.selectedPosition.EmpPosition_ID)
    }

    onFormSubmit(formData) {
        this.formSubmited = true;
       
        if (this.positionForm.invalid) {
            return;
        } else {
            if (this.mode == 'edit') {
                this.selectedPosition.EmpPosition_Name = this.positionForm.get('position_name').value;
                this.selectedPosition.EmpPosition_Description = this.positionForm.get('position_desc').value;
                this.selectedPosition.EmpPosition_Innactiv = this.positionForm.get('position_actif').value;
                this.data.modify('empPositions', this.selectedPosition.EmpPosition_ID, this.selectedPosition).subscribe(res => { this.buildTable(); this.ajout = false;});
            }
            if (this.mode == 'add') {
                this.newPosition.EmpPosition_Name = this.positionForm.get('position_name').value;
                this.newPosition.EmpPosition_Description = this.positionForm.get('position_desc').value;
                this.newPosition.EmpPosition_Innactiv = this.positionForm.get('position_actif').value;
                this.data.post('empPositions', this.newPosition).subscribe(res => { this.buildTable(); this.ajout = false;});
            }
        }
        
    }

    resetForm() {
        this.positionForm.reset();
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

export class Position {
    EmpPosition_ID:number
    EmpPosition_Name:string
    EmpPosition_Description:string
    EmpPosition_Color:string
    EmpPosition_Innactiv: boolean
    actif:string
}
