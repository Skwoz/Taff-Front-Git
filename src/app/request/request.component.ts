import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
    conge: boolean = true
    dispo: boolean = false
    remplacement: boolean = false
    quarts: boolean = false


    constructor() { }

    ngOnInit() {
    }

    switchPage(page: String) {

        this.conge = false
        this.dispo = false
        this.remplacement = false
        this.quarts = false

        switch (page) {
            case "conge":
                this.conge = true
                break;
            case "dispo":
                this.dispo = true
                break;
            case "remplacement":
                this.remplacement = true
                break;
            case "quarts":
                this.quarts = true
                break;
            default:
                this.conge = true
                break;
        }
    }

}
