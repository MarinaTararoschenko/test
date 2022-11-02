import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-table-adaptive',
    templateUrl: './table-adaptive.component.html',
    styleUrls: ['./table-adaptive.component.scss']
})

export class TableAdaptiveComponent implements OnInit {

    public isTablet: boolean = false;
    public currentColumn: string = '';
    public currentData: number = 1;

    public dataTable = {
        header: [
            'Title',
            'Price',
            'Category',
            'Type',
            'Sale',
            'Value'
        ],
        body: [
            {
                name: 'Name 1',
                price: 1000,
                category: 'Category 1',
                type: 'Type 1',
                sale: 5,
            }, {
                name: 'Name 2',
                price: 2000,
                category: 'Category 2',
                type: 'Type 2'
            }, {
                name: 'Name 3',
                price: 3000,
                category: 'Category 3',
                type: 'Type 3'
            }, {
                name: 'Name 4',
                price: 4000,
                category: 'Category 4',
                type: 'Type 4'
            }, {
                name: 'Name 5',
                price: 5000,
                category: 'Category 5',
                type: 'Type 5'
            }
        ]
    };

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isTablet = window.innerWidth <= 992 ? true : false;
    }

    constructor() {
    }

    public ngOnInit(): void {
        this.isTablet = window.innerWidth <= 992 ? true : false;
        this.currentColumn = this.dataTable.header[1];
    }

    public selectedColumn(selectedPeriod: string, index: number): void {
        this.currentColumn = selectedPeriod;
        this.currentData = index;
    }
}
