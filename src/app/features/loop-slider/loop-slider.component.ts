import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface ISliderLoop {
    id: number;
    text: string;
    name: string;
}

@Component({
    selector: 'app-loop-slider',
    templateUrl: './loop-slider.component.html',
    styleUrls: ['./loop-slider.component.scss']
})

export class LoopSliderComponent implements OnInit, AfterViewInit {
    @ViewChild('slider') public slider!: ElementRef;
    current = 0;

    public sliderList: Array<ISliderLoop> = [
        {
            id: 1,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolor voluptate enim error in eum. Illum numquam sapiente quasi a deserunt, expedita ullam doloribus porro, sunt autem voluptatibus inventore pariatur.',
            name: 'First Author'
        }, {
            id: 2,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolor voluptate enim error in eum',
            name: 'Second Author'
        }, {
            id: 3,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus dolor voluptate enim error in eum. Illum numquam sapiente quasi a deserunt, expedita ullam doloribus porro',
            name: 'Third Author'
        }, {
            id: 4,
            text: 'Illum numquam sapiente quasi a deserunt, expedita ullam doloribus porro, sunt autem voluptatibus inventore pariatur.',
            name: 'Fourth Author'
        }
    ];

    constructor(
        @Inject(PLATFORM_ID) private platformId: any
    ) {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                this.initSliderLoop();
            }, 100);
        }
    }

    public initSliderLoop(): void {
        setInterval(() => {
            const sliderItems = this.slider.nativeElement.getElementsByClassName('item-ts');

            if (this.current < sliderItems.length - 1) {
                this.current++;
            } else {
                this.current = 0;
            }

            for (let i = 0; i <= sliderItems.length - 1; i++) {
                sliderItems[i].style.opacity = '0';
                sliderItems[i].getElementsByClassName('inner')[0].style.transform = 'scale(0)';
            }

            if (this.current > 0) {
                sliderItems[this.current - 1].style.opacity = '0';
                sliderItems[this.current - 1].getElementsByClassName('inner')[0].style.transform = 'scale(0)';
            } else {
                sliderItems[0].style.opacity = '0';
                sliderItems[0].getElementsByClassName('inner')[0].style.transform = 'scale(0)';
            }

            setTimeout(() => {
                sliderItems[this.current].style.opacity = '1';
                sliderItems[this.current].getElementsByClassName('inner')[0].style.transform = 'scale(1,1)';
            }, 100);
        }, 3000);
    }

}
