import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CustomerFormModule } from './components/customer-form/customer-form.module';
import { CustomerTableModule } from './components/customer-table/customer-table.module';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerFormModule,
    CustomerTableModule,
  ],
  declarations: [
    CustomerEditComponent,
    CustomerListingComponent,
    CustomerRegistrationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerModule {}
