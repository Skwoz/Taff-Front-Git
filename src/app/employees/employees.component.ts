
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
//import { access } from 'fs';
import { addDays } from '@fullcalendar/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    Employees: Array<Employee>;
    currentEmployee: Employee = new Employee();
    editMod: boolean = false;
    modOK: boolean = false;
    addMod: boolean = false;
    consultMod: boolean = false;
    click: number = 0;
    pourngModelVide = new Employee;
    readonly = false;
    inputStoreNull = false;
    inputStatusNull = false;


    //form validation:
    employeeForm: FormGroup;
    employeeFormSubmitted: boolean = false;
    employeeAddInfos: FormGroup;

    constructor(private data: DataService, private formBuilder: FormBuilder) {
        this.getAll();

        this.employeeForm = this.formBuilder.group({
            Emp_FirstName: ['', Validators.required],
            Emp_LastName: ['', Validators.required],
            Emp_SocialNumber: ['', Validators.required],
            Emp_1stPhone: ['', Validators.required],
            Emp_2ndPhone: ['', Validators.required],
            Emp_StartDate: ['', Validators.required],
            Emp_HourRate: ['', Validators.required],
            Emp_StreetNumber: ['', Validators.required],
            Emp_StreetName: ['', Validators.required],
            Emp_City: ['', Validators.required],
            Emp_PostalCode: ['', Validators.required],
            Emp_State: ['', Validators.required],
            Emp_Country: ['', Validators.required],
            Emp_Email: ['', Validators.required],
            Emp_NIP: ['', Validators.required],
            Emp_UserName: ['', Validators.required],
            Emp_PassWord: ['', Validators.required],

        })

        this.employeeAddInfos = this.formBuilder.group({});
    }

    get employeeInfoForm() { return this.employeeForm.controls; }

    employeeFormReset() {
        this.employeeFormSubmitted = false;
        this.employeeForm.reset();
        this.consultMod = false;
        this.readonly = false;
        this.editMod = false;
        this.addMod = false;
        console.log("consultMod :" + this.consultMod + " editMod :" + this.editMod, " addMod :" + this.addMod)

    }

    onEmployeeInfoFormSub(formData) {
        this.employeeFormSubmitted = true;
        if (this.employeeForm.invalid) {
            return;
        }
        alert('Employé : ' + this.currentEmployee.Emp_FirstName + " " + this.currentEmployee.Emp_LastName + '\nest ajouté avec succèes!' + JSON.stringify(this.employeeForm.value, null, 4));
        this.employeeFormReset();
    }

    editEmployeeinfos(Employee: Employee) {
        this.modOK = true
        this.click += 1;
        console.log("click : " + this.click)
        if (this.click % 2 != 0) {
            //this.editMod = true;
            this.readonly = false;


        }
        else {
            this.put();
            // this.editMod = false;
            this.readonly = true;
        }

    }

    emptyStoreInput(model) {
        if (model != null) {
            this.inputStoreNull = true;
        }
    }
    emptyStatusInput(model) {
        if (model != null) {
            this.inputStatusNull = true;
        }
    }


    ngOnInit() {
    }
    //CRUD FONCTION

    getAll() {
        this.data.getAll("employees").subscribe((res: Array<Employee>) => {
            this.Employees = res;
            console.log(res);
        })
    }

    //getLastConnection() {
    //    this.loginDate = new Date();
    //    //this.loginDate.getMinutes();
    //    user.lastConnection.getMinutes();
    //    this.diffInDays = Math.floor(Math.abs(<any>this.loginDate - <any>user.lastConnection) / (1000 * 60 * 60 * 24));

    //}


put() {

}
//END CRUD FONCTION 

NewEmployee() {
    console.log("tabarnak");
    this.currentEmployee = new Employee;
    this.addMod = true;
    //this.currentEmployee = Object.assign({}, this.pourngModelVide);
    //this.currentEmployee = Object.assign({}, this.currentEmployee);
    this.consultMod = true;
    this.readonly = false;
    console.log("consultMod :" + this.consultMod + " editMod :" + this.editMod, " addMod :" + this.addMod)

}
addNewEmployee() {
    this.data.post("employees", this.currentEmployee).subscribe(res => {
        this.getAll();
        //pour reset ..
        this.currentEmployee = new Employee();
    })
}

Consult(employee) {
    console.log(employee)
    this.currentEmployee = Object.assign({}, employee);
    this.consultMod = true;
    this.readonly = true;
    this.emptyStatusInput(this.currentEmployee);
    this.emptyStoreInput(this.currentEmployee);
    this.employeeForm.setValue({
        'Emp_FirstName': employee.Emp_FirstName,
        'Emp_LastName': employee.Emp_LastName,
        'Emp_SocialNumber': employee.Emp_SocialNumber,
        'Emp_1stPhone': employee.Emp_1stPhone,
        'Emp_2ndPhone': employee.Emp_2ndPhone,
        'Emp_StartDate': employee.Emp_StartDate,
        'Emp_HourRate': employee.Emp_HourRate,
        'Emp_StreetNumber': employee.Emp_StreetNumber,
        'Emp_StreetName': employee.Emp_StreetName,
        'Emp_City': employee.Emp_City,
        'Emp_PostalCode': employee.Emp_PostalCode,
        'Emp_State': employee.Emp_State,
        'Emp_Country': employee.Emp_Country,
        'Emp_Email': employee.Emp_Email,
        'Emp_NIP': employee.Emp_NIP,
        'Emp_UserName': employee.Emp_UserName,
        'Emp_PassWord': employee.Emp_PassWord,
        'EmpStatus_Name': employee.EmpStatus_Name,
        'Store_Name': employee.Store_Name,
        'EmpPositions': employee.EmpPositions
    })

}

closeEditMod() {

}



mod() {
    this.modOK = true
    this.click += 1;
    console.log("click : " + this.click)
    if (this.click % 2 != 0) {
        //this.editMod = true;
        this.readonly = false;

    }
    else {
        this.put();
        // this.editMod = false;
        this.readonly = true;
    }

}
}

export class Employee {
    Emp_ID: number;
    FK_EmpStatus_ID: number;
    EmpStatus_Name: string;
    FK_Store_ID: number;
    Store_Name: string;
    Emp_Picture: string;
    Emp_FirstName: string;
    Emp_LastName: string;
    Emp_SocialNumber: number;
    Emp_1stPhone: number;
    Emp_2ndPhone: number;
    Emp_StartDate: number;
    Emp_HourRate: number;
    Emp_StreetNumber: number;
    Emp_StreetName: string;
    Emp_City: string;
    Emp_PostalCode: string;
    Emp_State: string;
    Emp_Country: string;
    Emp_Email: string;
    Emp_NIP: number;
    Emp_LastConnection: number;
    Emp_VacationScheduled: boolean;
    Emp_innactiv: boolean;
    Emp_UserName: string;
    Emp_PassWord: string;
    EmpPositions: Array<any>;
}


