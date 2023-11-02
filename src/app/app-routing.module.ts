import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", 
    redirectTo:"student-enquiry",
    pathMatch: 'full' 
  },
  {
    path: "student-enquiry",
    loadChildren: () => import('./studentenquiry/studentenquiry.module').then(m => m.StudentenquiryModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
