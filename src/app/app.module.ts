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
import { DraggingBlockComponent } from './features/dragging-block/dragging-block.component';

import { LibraryComponent } from './library/library.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FeaturesComponent,
        DraggingBlockComponent,
        LibraryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomMaterialModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
