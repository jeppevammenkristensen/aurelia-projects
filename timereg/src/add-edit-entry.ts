import { DummyCustomerFactory } from './models/dummy-customer-factory';
import { Customer, Entry, EntryTime } from './models/day-registration';
import { autoinject, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import * as _ from "lodash";

@autoinject
export class AddEditEntry {
    model : Entry;     
    customers : Customer[] = [];

    @computedFrom('model.customer')
    get projects(){
        if (this.model.customer){
            return this.model.customer.projects;
        }

        return [];
    }

    @computedFrom('model.project')
    get tasks(){
        if (this.model.customer && this.model.project){
            return this.model.project.tasks;
        }

        return [];
    }

    validationController: ValidationController;
    constructor(public controller: DialogController, validationFactory: ValidationControllerFactory) {
        this.validationController = validationFactory.createForCurrentScope();
        this.customers = DummyCustomerFactory.dummyCustomers();
    }

    activate(model : Entry) {
        this.model = model;         
    }

    ok() {       
         this.controller.ok(Object.assign(new Entry(), this.model));        
    }

    cancel() {
        this.controller.cancel(this.model);
    }
}
