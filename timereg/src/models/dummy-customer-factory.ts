import { Customer, Project, Task } from "./day-registration";

export class DummyCustomerFactory {
    static dummyCustomers() {
        let result : Customer[] = [];

        let firstCustomer = new Customer();
        firstCustomer.id = "Id1";
        firstCustomer.name = "Rancor Industries";
        firstCustomer.withProjects(
            new Project()
                .with({ id : "Proj1", name : "Farming"})
                .withTasks(
                    new Task().with({ id : "Task1", name : "Seed"}),
                    new Task().with({ id : "Task2", name : "Water"}),
                    new Task().with({ id : "Task2", name : "Farm"})
                ),
            new Project()
                .with({ id : "Proj2", name : "Hunter Gather"})
                .withTasks(
                    new Task().with({ id : "Task1", name : "Hunt"}),
                    new Task().with({ id : "Task2", name : "Gather"})                    
                )
        );

        result.push(firstCustomer);
        return result;   
    }
}