import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-block-issue',
    templateUrl: './block-issue.component.html',
    styleUrls: ['./block-issue.component.scss']
})
export class BlockIssueComponent implements OnInit {
    @ViewChild('issue') sectionIssue!: ElementRef;

    public stepCol1Picture1 = 0;
    public stepCol1Picture2 = 1140;
    public stepCol2Picture1 = 0;
    public stepCol2Picture2 = 1140;
    public stepCol3Picture1 = 0;
    public stepCol3Picture2 = 1140;
    public pictureHeight: number = 0;
    public pictureWidth: number = 0;
    public rotateImageHeight: number = 0;

    constructor() {
    }

    public ngOnInit(): void {
        setTimeout(() => {
            this._animationIssue();
        }, 1000);
    }

    private _animationIssue(): void {
        const fps = 30;

        if (this.rotateImageHeight !== 0) {
            const restartStep = this.pictureHeight - (this.rotateImageHeight - this.pictureHeight);

            // restart count stepCol1Picture1
            if (this.stepCol1Picture1 <= -this.rotateImageHeight) {
                this.stepCol1Picture1 = restartStep;
            }
            // restart count stepCol1Picture2
            if (this.stepCol1Picture2 <= -this.rotateImageHeight) {
                this.stepCol1Picture2 = restartStep;
            }
            // restart count stepCol2Picture1
            if (this.stepCol2Picture1 <= -this.rotateImageHeight) {
                this.stepCol2Picture1 = restartStep;
            }
            // restart count stepCol2Picture2
            if (this.stepCol2Picture2 <= -this.rotateImageHeight) {
                this.stepCol2Picture2 = restartStep;
            }
            // restart count stepCol3Picture1
            if (this.stepCol3Picture1 <= -this.rotateImageHeight) {
                this.stepCol3Picture1 = restartStep;
            }
            // restart count stepCol3Picture2
            if (this.stepCol3Picture2 <= -this.rotateImageHeight) {
                this.stepCol3Picture2 = restartStep;
            }

            this.stepCol1Picture1--;
            this.stepCol1Picture2--;
            this.stepCol2Picture1 = this.stepCol2Picture1 - 2;
            this.stepCol2Picture2 = this.stepCol2Picture2 - 2;
            this.stepCol3Picture1 = this.stepCol3Picture1 - 0.5;
            this.stepCol3Picture2 = this.stepCol3Picture2 - 0.5;
        }

        this._moveIssue(0, this.stepCol1Picture1, this.stepCol1Picture2);
        this._moveIssue(1, this.stepCol2Picture1, this.stepCol2Picture2);
        this._moveIssue(2, this.stepCol3Picture1, this.stepCol3Picture2);

        setTimeout(() => {
            requestAnimationFrame(() => {
                this._animationIssue();
            });
        }, 1000 / fps);
    }

    private _moveIssue(index: number, step1: number, step2: number): void {
        const issues = this.sectionIssue.nativeElement;

        const col = <HTMLElement>issues.getElementsByClassName('blockIssue-ts')[index];
        const picture1 = col.getElementsByTagName('picture')[0];
        const picture2 = col.getElementsByTagName('picture')[1];

        if (window.innerWidth <= 767) {
            this.pictureHeight = picture1.clientHeight;
            this.pictureWidth = picture1.clientWidth;
        } else {
            this.pictureHeight = picture1.getBoundingClientRect().height;
            this.pictureWidth = picture1.getBoundingClientRect().width;
        }

        this.rotateImageHeight = Math.sqrt(
            (this.pictureHeight * this.pictureHeight) + (this.pictureWidth * this.pictureWidth)
        );

        picture1.style.top = step1 + 'px';
        picture2.style.top = step2 + 'px';
    }
}
