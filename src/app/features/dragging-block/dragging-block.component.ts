import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-dragging-block',
    templateUrl: './dragging-block.component.html',
    styleUrls: ['./dragging-block.component.scss']
})
export class DraggingBlockComponent implements OnInit, AfterViewInit {
    @ViewChild('dragContainer', { static: true }) dragContainer!: ElementRef;

    public isDrag: boolean;

    constructor() {
        this.isDrag = false;
    }

    public ngOnInit(): void {
        this.toDrag();
    }

    ngAfterViewInit() {

    }

    public toDrag(): void {
        const container = this.dragContainer.nativeElement;
        const dragme = <HTMLElement>container.getElementsByClassName('dragme')[0];
        const sliderCoords = this._getCoords(container);
        let newPosition;

        container.addEventListener('mousedown', (e: any) => {
            this.isDrag = true;
            const rightEdge = container.offsetWidth + 2;
            newPosition = e.pageX - sliderCoords.left;
            newPosition = newPosition < 2 ? 0 : newPosition;
            newPosition = newPosition > rightEdge ? rightEdge : newPosition;
            this._moveAt(newPosition);
        });

        // mousedown event
        dragme.addEventListener('mousedown', (e) => {
            this.isDrag = false;
            const dragmeCoords = this._getCoords(dragme);
            const shiftX = e.pageX - dragmeCoords.left;

            const changePosition = (el: any) => {
                this.isDrag = false;
                const rightEdge = container.offsetWidth - dragme.offsetWidth + 2;
                newPosition = el.pageX - shiftX - sliderCoords.left;
                newPosition = newPosition < 2 ? 0 : newPosition;
                newPosition = newPosition > rightEdge ? rightEdge : newPosition;
                this._moveAt(newPosition);
            };

            container.addEventListener('mousemove', changePosition, false);

            const containerMouseUp = container.addEventListener('mouseup', () => {
                container.removeEventListener('mousemove', changePosition, false);
                container.removeEventListener('mouseup', containerMouseUp, false);
            });
        });

        // touch event
        dragme.addEventListener('touchstart', (e) => {
            this.isDrag = false;
            const dragmeCoords = this._getCoords(dragme);
            const shiftX = e.touches[0].clientX - dragmeCoords.left;

            const changePosition = (el: any) => {
                this.isDrag = false;
                const rightEdge = container.offsetWidth - dragme.offsetWidth + 2;
                newPosition = el.touches[0].clientX - shiftX - sliderCoords.left;
                newPosition = newPosition < 2 ? 0 : newPosition;
                newPosition = newPosition > rightEdge ? rightEdge : newPosition;
                this._moveAt(newPosition);
            };

            container.addEventListener('touchmove', changePosition, false);

            const containerTouchend = container.addEventListener('touchend', () => {
                container.removeEventListener('touchmove', changePosition, false);
                container.removeEventListener('touchend', containerTouchend, false);
            });
        });

        dragme.addEventListener('dragstart', () => {
            return false;
        });
    }

    private _getCoords(elem: HTMLElement) {
        const box = elem.getBoundingClientRect();
        return { left: box.left + scrollX };
    }

    private _moveAt(position: number): void {
        const container = this.dragContainer.nativeElement;
        const preview = <HTMLElement>container.getElementsByClassName('preview')[0];
        const dragme = <HTMLElement>container.getElementsByClassName('dragme')[0];

        preview.style.width = position + 'px';
        dragme.style.left = position + 'px';
    }
}
