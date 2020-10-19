import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptionHighlightModule } from '@ct-cue/ng-option-highlight';
import { NgSelectModule } from '@ct-cue/ng-select';

//example-import

@Component({
    selector: 'app-component',
    template: '//example-template'
})
export class AppComponent {}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgSelectModule,
        NgOptionHighlightModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        //example-cmp
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}



