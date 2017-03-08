import { ProjectCompiler } from 'gulp-typescript/release/compiler';
import * as moment from 'moment';
import { Moment } from "moment";

export class DayRegistration {
    public date : Moment;
    public entries : Entry[] = [];

    constructor(){  
        this.date = moment();
    }
}

export class Entry {
    start : EntryTime;
    end : EntryTime;

    description : string;
    customer? : Customer;
    project? : Project;
    task? : Task;    
}   

export class Project {
    id : string;
    name : string;

    tasks : Task[] = [];

    with( properties : { id : string, name : string}){
        Object.assign(this, properties);
        return this;
    }

    withTasks(...tasks : Task[]){
        this.tasks.concat(tasks);
        return this;
    }
    
}

export class Task {
    id : string;
    name : string   

    with( properties : { id : string, name : string}){
        Object.assign(this, properties);
        return this;
    }

}

export class Customer {
    id : string;
    name : string;

    projects : Project[] = [];   

    withProjects(... projects : Project[] ){

        this.projects.concat(projects);
        return this;
    } 
}

export class EntryTime {
    hour : number;
    minute : number;

    static create(hour : number, minute : number){
        let result = new EntryTime();
        result.hour = hour;
        result.minute = minute;
        return result;
    }
}