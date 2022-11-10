import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogLoadingComponent } from '../shared/dialogs/dialog-loading/dialog-loading.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.openDialog();
        }, 3000);
    }

    public openDialog(): void {
        this.dialog.open(DialogLoadingComponent, {
            panelClass: 'dialogCoupons',
            width: '800px'
        });
    }

}
