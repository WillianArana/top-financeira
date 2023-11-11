import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { customerEditRouting } from './customer-edit/customer-edit.routing';
import { customerListingRouting } from './customer-listing/customer-listing.routing';
import { customerRegistrationRouting } from './customer-registration/customer-registration.routing';

const routes: Routes = [
  {
    path: '',
    children: [
      customerListingRouting,
      customerRegistrationRouting,
      customerEditRouting,
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
