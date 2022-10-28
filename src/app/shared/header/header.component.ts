import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public scale: number = 1;

    constructor(
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: any
    ) { }

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // set contrast from localStorage
            if (localStorage.getItem('contrast') !== null) {
                this.renderer.addClass(document.body, 'contrast');
            }
        }
    }

    public contrast(): void {
        if (localStorage.getItem('contrast') === null) {
            this.renderer.addClass(document.body, 'contrast');
            localStorage.setItem('contrast', 'true');
        } else {
            this.renderer.removeClass(document.body, 'contrast');
            localStorage.removeItem('contrast');
        }
    }

    public toScale(type: number): void {
        if (type === 1) {
            if (this.scale < 3) {
                this.scale++;
                this.renderer.removeClass(document.body.parentElement, 'scale-' + (this.scale - 1));
                localStorage.removeItem('scale');
            }
        } else {
            if (this.scale > 1) {
                this.scale--;
                this.renderer.removeClass(document.body.parentElement, 'scale-' + (this.scale + 1));
                localStorage.removeItem('scale');
            }
        }

        this.renderer.addClass(document.body.parentElement, 'scale-' + this.scale);
        localStorage.setItem('scale', this.scale + '');
    }

}
