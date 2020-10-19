import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'readonly-example',
    templateUrl: './readonly-example.component.html',
    styleUrls: ['./readonly-example.component.scss']
})
export class ReadonlyExampleComponent implements OnInit {
    heroForm: FormGroup;

    ages: any[] = [
        { value: '<18', label: 'Under 18' },
        { value: '18', label: '18' },
        { value: '>18', label: 'More than 18' },
    ];

    selectedItem: any;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.heroForm = this.fb.group({
            age: [null, Validators.required],
        });

        this.selectedItem = this.ages[0];
    }
}
