import { Component, OnInit } from '@angular/core';

import { ComponentOption } from './classes/componentOption';

const outputComponents = [
    {name: 'Scientific Pitch Notation'}
];

@Component({
    selector: 'output-switch',
    templateUrl: 'app/output-switch.component.html'
})
export class OutputSwitchComponent implements OnInit {
    componentOptions = outputComponents;
    selectedComponent: ComponentOption;

    ngOnInit(): void {
        this.selectedComponent = this.componentOptions[0];
    };

    selectComponent(option: ComponentOption): void{
        this.selectedComponent = option;
    }
}