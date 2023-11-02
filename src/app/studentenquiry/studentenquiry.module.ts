import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentenquiryRoutingModule } from './studentenquiry-routing.module';
import { StudentEnquiryComponent } from './student-enquiry.component';
import { StudentenquiryPopupComponent } from './studentenquiry-popup/studentenquiry-popup.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    StudentEnquiryComponent,
    StudentenquiryPopupComponent
  ],
  imports: [
    CommonModule,
    StudentenquiryRoutingModule, 
    DataTablesModule,
    FormsModule,NgbModule,
    ReactiveFormsModule,NgSelectModule
  ]
})
export class StudentenquiryModule { }
