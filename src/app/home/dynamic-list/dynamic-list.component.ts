import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

    public form: FormGroup;

    constructor(
        public dataSrv: TestDataService,
        public renderer: Renderer2,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            newName: new FormControl('', [Validators.minLength(3), Validators.required]),
            names: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.dataSrv.getJSON().subscribe(item => {
            this.data = item;
            for (let i = 0; i < this.data.length; i++) {
                this.names.push(new FormControl(this.data[i].name, [Validators.minLength(3), Validators.required]));
            }
        });
    }

    get names(): FormArray {
        return this.form.get('names') as FormArray;
    }

    get newName(): FormControl { return this.form.get('newName')! as FormControl }

    public addItem(): void {
        this.data.push({
            id: this.data.length,
            name: this.form.controls['newName'].value
        });
        this.names.push(new FormControl(this.newName.value, Validators.minLength(3)));
        this.newName.reset();
    }

    public removeItem(ev: any, index: number): void {
        const currentItem = ev.currentTarget.parentElement.parentElement;
        this.renderer.addClass(currentItem, 'remove');

        setTimeout(() => {
            this.currentSwipe = null;
            this.data.splice(index, 1);
            this.names.removeAt(index);
        }, 300);
    }

    public swipe(index: number): void {
        this.currentEdit = null;
        this.currentSwipe = this.currentSwipe === index ? null : index;
    }

    public toEdit(index: number, input: HTMLInputElement): void {
        input.focus();
        input.value = this.data[index].name;
        this.currentEdit = index;
        this.currentSwipe = null;
    }

    public changeName(index: number, input: HTMLInputElement): void {
        this.currentEdit = null;
        this.data[index].name = input.value;
    }

    public save(index: number, input: HTMLInputElement): void {
        this.currentEdit = null;
        this.data[index].name = input.value;
    }
}
