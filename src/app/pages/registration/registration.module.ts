import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { NgbDropdownModule, NgbAlertModule, NgbCarouselModule, NgbProgressbarModule, NgbNavModule, NgbCollapseModule, NgbAccordionModule, NgbPopoverModule, NgbTooltipModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { RegisterteacherComponent } from './registerteacher/registerteacher.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [


    RegisteruserComponent,
    RegisterteacherComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbPaginationModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TablesRoutingModule,
    NgbTypeaheadModule,
    NgSelectModule
  ]
})
export class RegistrationModule { }
