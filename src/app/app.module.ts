import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './shared/header/material.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';

import { FeaturesComponent } from './features/features.component';
// sections
import { ArcChartComponent } from './features/arc-chart/arc-chart.component';
import { DraggingBlockComponent } from './features/dragging-block/dragging-block.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { LoopSliderComponent } from './features/loop-slider/loop-slider.component';
import { CustomVerticalSliderComponent } from './features/custom-vertical-slider/custom-vertical-slider.component';
import { ListPaginationComponent } from './features/list-pagination/list-pagination.component';
import { TableAdaptiveComponent } from './features/table-adaptive/table-adaptive.component';

import { LibraryComponent } from './library/library.component';

// services
import { LocaleService } from './shared/services/locale.service';
import { CurrencyFormatPipe } from './shared/pipe/currency.pipe';

// locales
import { registerLocaleData } from '@angular/common';
import localeCL from '@angular/common/locales/es-CL';
registerLocaleData(localeCL);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FeaturesComponent,
        DraggingBlockComponent,
        CalendarComponent,
        LibraryComponent,
        ArcChartComponent,
        LoopSliderComponent,
        CustomVerticalSliderComponent,
        CurrencyFormatPipe,
        ListPaginationComponent,
        TableAdaptiveComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomMaterialModule,
        BrowserAnimationsModule
    ],
    providers: [
        LocaleService,
        CurrencyFormatPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
