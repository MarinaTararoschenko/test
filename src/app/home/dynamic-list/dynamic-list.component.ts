import { Component, OnInit, Renderer2 } from '@angular/core';
import { TestDataService } from 'src/app/shared/services/data.service';

@Component({
    selector: 'app-dynamic-list',
    templateUrl: './dynamic-list.component.html',
    styleUrls: ['./dynamic-list.component.scss']
})
export class DynamicListComponent implements OnInit {

    public data: any;
    public currentSwipe: null | number = null;
    public currentEdit: null | number = null;
    public textButton: string = 'Add';
    public isReadonly: boolean = true;

    constructor(
        public dataSrv: TestDataService,
        public renderer: Renderer2
    ) {
        this.dataSrv.getJSON().subscribe(item => this.data = item);
    }

    ngOnInit(): void {
    }

    public addItem(input: any): void {
        this.data.push({
            id: this.data.length,
            name: input.value,
            state: 'disactive'
        });
    }

    public removeItem(ev: any, index: number): void {
        const currentItem = ev.currentTarget.parentElement.parentElement;
        this.renderer.addClass(currentItem, 'remove');

        setTimeout(() => {
            this.currentSwipe = null;
            this.data.splice(index, 1);
        }, 300);
    }

    public swipe(index: number): void {
        this.currentEdit = null;
        this.currentSwipe = this.currentSwipe === index ? null : index;
    }

    public changeItem(index: number, input: HTMLInputElement): void {
        input.focus();
        this.currentEdit = index;
        this.currentSwipe = null;
    }

    public changeName(index: number, input: HTMLInputElement): void {
        this.currentEdit = null;
        this.data[index].name = input.value;
    }
}
