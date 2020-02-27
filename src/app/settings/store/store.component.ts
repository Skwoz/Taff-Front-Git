import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { format } from 'util';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
    
    mode: string;
    ajout: boolean = false;
    stores: Array<Store>;
    form: FormGroup;
    selected: Store;
    new: Store;
    formSubmited: boolean;
    phonePatern = {
        'i': { pattern: new RegExp('\[\(0-2\)\]') },
        '-': { pattern: new RegExp('\[-\]') },
        's': { pattern: new RegExp('\[0-2\]') },
        'e': { pattern: new RegExp('\[0-3\]') }
    }
    provinces: Array<string> = ["AB", "BC", "PE", "MB", "NB", "NS", "NU", "ON", "QC", "SK", "NL"];

    constructor(private data: DataService, private formBuilder: FormBuilder) {
        this.buildTable();
    }

    buildTable() {
        this.stores = new Array<Store>();
        this.data.getAll('stores').subscribe((res: Array<Store>) => {
            this.stores = res;
            this.stores.forEach(store => {
                if (store.Store_Innactiv) {
                    store.actif = "Inactif";
                } else {
                    store.actif = "Actif";
                }
            });
        });

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            logo: String,
            number: ['', Validators.required],
            street: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            phone: ['', Validators.required],
            fax: String,
            actif: Boolean,
            state: ['', Validators.required],
            cp: ['', Validators.required]
        });

    }
    get f() { return this.form.controls; }

    edit(store: Store) {
        this.mode = 'edit';
        this.selected = store;
        this.showAddForm();
        this.form.setValue({
            'name': store.Store_Name,
            'logo': store.Store_Logo,
            'number': store.Store_Number,
            'street': store.Store_Street,
            'city': store.Store_City,
            'country': store.Store_Country,
            'phone': store.Store_Phone,
            'fax': store.Store_Fax,
            'actif': store.Store_Innactiv,
            'state': store.Store_State,
            'cp':store.Store_PostalCode
        });
        console.log(this.selected.Store_Innactiv);
    }

    onFormSubmit(formData) {
        this.formSubmited = true;

        if (this.form.invalid) {
            return;
        } else {
            if (this.mode == 'edit') {
                this.selected.Store_Name = this.form.get('name').value;
                this.selected.Store_Logo = this.form.get('logo').value;
                this.selected.Store_Number = this.form.get('number').value;
                this.selected.Store_Street = this.form.get('street').value;
                this.selected.Store_City = this.form.get('city').value;
                this.selected.Store_Country = this.form.get('country').value;
                this.selected.Store_Phone = this.form.get('phone').value;
                this.selected.Store_Fax = this.form.get('fax').value;
                this.selected.Store_Innactiv = this.form.get('actif').value;
                this.selected.Store_State = this.form.get('state').value;
                this.selected.Store_PostalCode = this.form.get('cp').value;
                this.data.modify('stores', this.selected.Store_ID, this.selected).subscribe(res => { this.buildTable(); this.ajout = false;});
            }
            if (this.mode == 'add') {
                this.new.Store_Name = this.form.get('name').value;
                this.new.Store_Logo = this.form.get('logo').value;
                this.new.Store_Number = this.form.get('number').value;
                this.new.Store_Street = this.form.get('street').value;
                this.new.Store_City = this.form.get('city').value;
                this.new.Store_Country = this.form.get('country').value;
                this.new.Store_Phone = this.form.get('phone').value;
                this.new.Store_Fax = this.form.get('fax').value;
                this.new.Store_Innactiv = this.form.get('actif').value;
                this.new.Store_State = this.form.get('state').value;
                this.new.Store_PostalCode = this.form.get('cp').value;
                this.data.post('stores', this.new).subscribe(res => { this.buildTable(); this.ajout = false;});
            }
        }
    }

    add() {
        this.mode = 'add';
        this.form.reset();
        this.showAddForm();
        this.new = new Store();
        this.new.Store_Name = "";
        this.new.Store_Logo ="\assets\img\SportsExperts.jpg";
        this.new.Store_Number = "";
        this.new.Store_Street = "";
        this.new.Store_City = "";
        this.new.Store_Country = "";
        this.new.Store_Phone = "";
        this.new.Store_Fax = "";
        this.new.Store_Color = "";
        this.new.Store_Innactiv = false;
        this.new.Store_State = "Québec";
        this.new.Store_PostalCode = "";
        this.form.setValue({
            'name': this.new.Store_Name,
            'logo': this.new.Store_Logo,
            'number': this.new.Store_Number,
            'street': this.new.Store_Street,
            'city': this.new.Store_City,
            'country': this.new.Store_Country,
            'phone': this.new.Store_Phone,
            'fax': this.new.Store_Fax,
            'actif': this.new.Store_Innactiv,
            'state': this.new.Store_State,
            'cp': this.new.Store_PostalCode
        });
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

export class Store {
    Store_ID:number
    Store_Name:string
    Store_Logo: string
    Store_Number: string
    Store_Street: string
    Store_City: string
    Store_Country: string
    Store_Phone: string
    Store_Fax: string
    Store_Color: string
    Store_Innactiv:boolean
    Store_State: string
    Store_PostalCode: string
    actif: string;
}
