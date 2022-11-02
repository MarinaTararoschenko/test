import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-list-pagination',
    templateUrl: './list-pagination.component.html',
    styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {

    public quantity: number = 24;
    public items = Array;

    public itemsVisible: number;
    public currentPage: number;
    public currentMin: number;
    public currentMax: number;
    public prevEnabled: boolean;
    public nextEnabled: boolean;
    public maxArr: number;

    constructor() {
        this.itemsVisible = 0;
        this.currentPage = 0;
        this.currentMin = 0;
        this.currentMax = 0;
        this.prevEnabled = false;
        this.nextEnabled = false;
        this.maxArr = 0;
    }

    public ngOnInit(): void {
        this.itemsVisible = 7;
        this.maxArr = this.items(this.quantity).fill(1).length;
        this._checkMinMax();
    }

    public prevItems(): void {
        this.currentPage--;
        this._checkMinMax();
    }

    public nextItems(): void {
        this.currentPage++;
        this._checkMinMax();
    }

    private _checkMinMax(): void {
        this.nextEnabled = false;
        this.prevEnabled = false;
        this.currentMin = this.itemsVisible * this.currentPage;
        this.currentMax = this.itemsVisible * (this.currentPage + 1);
        if (this.currentMax >= this.maxArr) {
            this.currentMax = this.maxArr;
        }

        if (this.currentMax > this.maxArr - 1) {
            this.nextEnabled = true;
        }

        if (this.currentMin < 1) {
            this.prevEnabled = true;
        }
    }
}
