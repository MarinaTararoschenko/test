import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

}
