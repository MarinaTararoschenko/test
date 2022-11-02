import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import moment from 'moment';

interface ISliderProps {
    sliderWrapper: any;
    slider: any;
    itemHeight: number;
    margin: string;
}

interface ISliderData {
    title: string;
    color: string;
    subtitle: string;
    text?: string;
    time: string;
    price: string;
    code: string;
}

@Component({
    selector: 'app-custom-vertical-slider',
    templateUrl: './custom-vertical-slider.component.html',
    styleUrls: ['./custom-vertical-slider.component.scss']
})

export class CustomVerticalSliderComponent implements OnInit, AfterViewInit {
    @ViewChild('verticalSlider') public sliderWrapper!: ElementRef;

    public sliderProps: ISliderProps = {
        sliderWrapper: null,
        slider: null,
        itemHeight: 0,
        margin: "0",
    };

    public verticalSliderList: Array<ISliderData> = [
        {
            title: 'First name',
            color: 'bg-accent-primary',
            subtitle: 'Subtitle',
            text: 'Some text',
            time: moment(new Date(), 'YYYY-MM-DD').format('hh:mm'),
            price: '1000',
            code: '001'
        }, {
            title: 'Second name',
            color: 'bg-accent-primary-light',
            subtitle: 'Subtitle',
            time: moment(new Date(), 'YYYY-MM-DD').format('hh:mm'),
            price: '2000',
            code: '002'
        }, {
            title: 'Third name',
            color: 'bg-accent-primary-dark',
            subtitle: 'Subtitle',
            text: 'Some text',
            time: moment(new Date(), 'YYYY-MM-DD').format('hh:mm'),
            price: '3000',
            code: '003'
        }, {
            title: 'Fourth name',
            color: 'bg-accent-secondary',
            subtitle: 'Subtitle',
            text: 'Some text',
            time: moment(new Date(), 'YYYY-MM-DD').format('hh:mm'),
            price: '4000',
            code: '004'
        }, {
            title: 'Fifth name',
            color: 'bg-accent-secondary-light',
            subtitle: 'Subtitle',
            text: 'Some text',
            time: moment(new Date(), 'YYYY-MM-DD').format('hh:mm'),
            price: '5000',
            code: '005'
        }
    ];

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.initCustomSlider();
        }, 100);
    }

    public initCustomSlider(): void {
        const props = this.sliderProps;
        props.sliderWrapper = <HTMLElement>this.sliderWrapper.nativeElement;
        props.slider = <HTMLElement>props.sliderWrapper.getElementsByClassName('slider-ts')[0];
        props.itemHeight = props.slider.children[0].clientHeight;
        props.slider.margin = window.innerWidth > 670 ? 14 : 10;

        setInterval(() => {
            this.transformSlider();
        }, 1000);
    }

    public transformSlider(): void {
        const props = this.sliderProps;
        const slideToMove = props.slider.children[props.slider.children.length - 1].cloneNode(true);
        props.slider.insertBefore(slideToMove, props.slider.children[0]);

        for (let i = 0; i <= props.slider.children.length - 1; i++) {
            props.slider.children[0].style.transform = 'translateY(0) translateX(-50%) scale(1.1)';
            props.slider.children[i].style.transform = 'translateY(' + 100 * i + '%) translateY(' + props.slider.margin * i + 'px) translateX(-50%)';
        }
        props.slider.children[props.slider.children.length - 1].remove();
    }

    public getAbbr(item: any): string {
        return item.title.substring(0, 1);
    }
}
