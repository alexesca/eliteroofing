import {Component, Input} from '@angular/core'

@Component({
    selector: 'personal-info-selector',
    templateUrl: 'personalInfo.component.html',

})

export class PersonalInfoComponente{
     @Input() name : string;
     @Input() email : string;
     @Input() phone : string;
     @Input() address : string;
}