import { Component, OnInit } from '@angular/core';

import { ComponentOption } from './classes/componentOption';

const inputComponents = [
    {name: 'Guitar Tablature'},
    {name: 'Scientific Pitch Notation'}
];

@Component({
    selector: 'input-switch',
    templateUrl: 'app/input-switch.component.html'
})
export class InputSwitchComponent implements OnInit {
    componentOptions = inputComponents;
    selectedComponent: ComponentOption;

    ngOnInit(): void {
        this.selectedComponent = this.componentOptions[0];
    };

    selectComponent(option: ComponentOption): void{
        this.selectedComponent = option;
    }
}