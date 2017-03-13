import { ProjectCompiler } from 'gulp-typescript/release/compiler';
import * as moment from 'moment';
import { Moment } from "moment";
import { computedFrom } from "aurelia-framework";

export class DayRegistration {
    public date : Moment;
    public entries : Entry[] = [];

    constructor(){  
        this.date = moment();
    }
}

export class  Entry {
    start : EntryTime;
    end : EntryTime;

    description : string;
    customer? : Customer;
    project? : Project;
    task? : Task;   

    static fromStart(start : EntryTime){
        let entry = new Entry();
        entry.start = start;
        entry.end = start.addDuplicate(0,30);
        return entry;
    } 
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
        this.tasks = this.tasks.concat(tasks);
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

        this.projects = this.projects.concat(projects);
        return this;
    } 
}

export class EntryTime {
    hour : number;
    minute : number;
    entry: Entry;  

    toHour : number;
    toMinute : number; 
    
    color: string;

    static create(hour : number, minute : number){
        let result = new EntryTime();
        result.hour = hour;
        result.minute = minute;
        let to = EntryTime.add(result,0,15);
        result.toHour = to.hour;
        result.toMinute = to.minute;
        return result;
    }

    addDuplicate(hour : number, minute : number){
        let result = new EntryTime();
        Object.assign(result, EntryTime.add(this, hour,minute));
        return result;        
    }

    static add(entryTime : {hour:number, minute : number}, hour : number, minute : number){
         var newHour = entryTime.hour;
         var newMinute = entryTime.minute;

         let addMinutes = newMinute + minute;
         newHour = hour + newHour + Math.floor(addMinutes / 60);
         newMinute = addMinutes % 60;
         return {
             hour : newHour,
             minute : newMinute
         }         
    }

    isInRange(start : EntryTime, end :EntryTime){
        if (start.hour > this.hour || end.hour < this.hour){
            return false;
        }

        if (start.hour == this.hour){
            if (this.minute < start.minute)
                return false;
        }
        if (end.hour == this.hour){
            if (this.minute  >= end.minute){
                return false;
            }
        }

        return true;
    }
}