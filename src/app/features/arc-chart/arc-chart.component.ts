import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

interface ICanvas {
    canvas: any;
    ctx: any;
    x: number;
    y: number;
    radius: number;
    start: number;
    end: number;
    totalArcLength: number;
}

@Component({
    selector: 'app-arc-chart',
    templateUrl: './arc-chart.component.html',
    styleUrls: ['./arc-chart.component.scss']
})
export class ArcChartComponent implements OnInit {
    @ViewChild('circleProgress', { static: true }) public circleProgress!: ElementRef;

    public canvasSettings!: ICanvas;

    public chartsIsAnimated: boolean = false;

    public endValue: number = 90;
    public maxValue: number = 100;
    public curPerc: number = 0;

    @HostListener('window: scroll')
    onScroll() {
        this.playAnimateChart();
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private _document: Document,
    ) {
    }

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initCanvas();
        }
    }

    public _isInViewport(elem: any): boolean {
        const viewportWindow = window.innerHeight || this._document.documentElement.clientHeight;
        const elemRect = elem.getBoundingClientRect();
        return (elemRect.top >= 56 && elemRect.bottom <= viewportWindow);
    }

    public playAnimateChart(): void {

        if (this._isInViewport(this.circleProgress.nativeElement) && !this.chartsIsAnimated) {
            this._animate();
            this.chartsIsAnimated = true;
        }
    }

    public initCanvas(): void {
        this.canvasSettings = {
            canvas: this.circleProgress.nativeElement,
            ctx: this.circleProgress.nativeElement.getContext('2d'),
            x: this.circleProgress.nativeElement.width / 2,
            y: this.circleProgress.nativeElement.height / 2,
            radius: this.circleProgress.nativeElement.width / 2 - 20,
            start: Math.PI * 1.5,
            end: Math.PI * 3.5,
            totalArcLength: Math.PI * 2
        }

        this._defCircle();
    }

    // START arc default
    private _defCircle(): void {
        this.canvasSettings.ctx.beginPath();
        this.canvasSettings.ctx.lineWidth = 30;
        this.canvasSettings.ctx.strokeStyle = '#dddfe3';
        this.canvasSettings.ctx.arc(this.canvasSettings.x, this.canvasSettings.y, this.canvasSettings.radius, this.canvasSettings.start, this.canvasSettings.end, false);
        this.canvasSettings.ctx.stroke();
    }

    // START supValueCircle
    private _supValueCircle(): void {
        this.canvasSettings.ctx.beginPath();
        this.canvasSettings.ctx.font = '30px CircularStd-Bold';
        this.canvasSettings.ctx.fillStyle = '#03a9f4';
        this.canvasSettings.ctx.textAlign = 'center';
        this.canvasSettings.ctx.textBaseline = 'middle';
        this.canvasSettings.ctx.fillText('Progress', this.canvasSettings.x, this.canvasSettings.canvas.width / 2 - 30);
    }

    // START subValueCircle
    private _subValueCircle(): void {
        this.canvasSettings.ctx.beginPath();
        this.canvasSettings.ctx.font = '12px CircularStd-Bold';
        this.canvasSettings.ctx.fillStyle = '#03a9f4';
        this.canvasSettings.ctx.textAlign = 'center';
        this.canvasSettings.ctx.textBaseline = 'middle';
        this.canvasSettings.ctx.fillText('Some text', this.canvasSettings.x, this.canvasSettings.canvas.width / 2 + 30);
    }

    // START valueCircle
    private _valueCircle(): void {
        this.canvasSettings.ctx.beginPath();
        this.canvasSettings.ctx.font = '40px CircularStd-Bold';
        this.canvasSettings.ctx.fillStyle = '#03a9f4';
        this.canvasSettings.ctx.textAlign = 'center';
        this.canvasSettings.ctx.textBaseline = 'middle';
        this.canvasSettings.ctx.fillText('2x', this.canvasSettings.x, this.canvasSettings.canvas.width / 2);
    }

    // START progress
    private _progress(current: any): void {
        this.canvasSettings.ctx.beginPath();
        this.canvasSettings.ctx.lineWidth = 30;
        this.canvasSettings.ctx.strokeStyle = '#8bc34a';
        this.canvasSettings.ctx.arc(
            this.canvasSettings.x,
            this.canvasSettings.y,
            this.canvasSettings.radius,
            this.canvasSettings.start,
            ((this.canvasSettings.totalArcLength * current) + this.canvasSettings.start), false);
        this.canvasSettings.ctx.stroke();
    }

    private _animate(current?: number): void {
        this.canvasSettings.ctx.clearRect(0, 0, this.canvasSettings.canvas.width, this.canvasSettings.canvas.height);
        this.canvasSettings.ctx.beginPath();
        this._defCircle();
        this._subValueCircle();
        this._supValueCircle();
        this._valueCircle();
        this._progress(current);
        this.curPerc++;

        if (this.curPerc < this.endValue + 1) {
            requestAnimationFrame(() => {
                this._animate(this.curPerc / this.maxValue);
            });
        }
    }
}
