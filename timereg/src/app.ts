import environment from './environment';
import { HttpClient } from 'aurelia-fetch-client'
import { inject, NewInstance } from "aurelia-framework";
import { Moment } from "moment";
import * as moment from 'moment';
import { Entry, EntryTime } from "./models/day-registration";
import {AddEditEntry} from './add-edit-entry';
import { DialogService} from 'aurelia-dialog';
import * as _ from 'lodash';

@inject(NewInstance.of(HttpClient), DialogService)
export class App {

  days : Day[] = [];
  day : Day = null;
  inputFormat = 'dd MM YY, HH:mm:ss';

  constructor(private client: HttpClient, private dialogService : DialogService) {
    this.client.configure(config => {
      config.withBaseUrl(environment.apiUrl)
        .useStandardConfiguration()
    })
  }

  attached() {
    this.days.push(new Day(moment()));
    this.day = this.days[0];    
  }

  open(entryTime: EntryTime){
    let entry = Entry.fromStart(entryTime);

    return this.dialogService.open({ viewModel : AddEditEntry, model : entry}).then(res => {
        if (!res.wasCancelled){
          this.day.addEntry(res.output);
        }
    });
    
  }
}

export class Day {
    times : EntryTime[] = [];
    entries : Entry[] = [];
    colors = ['red','green','cyan','yellow','blue','brown','purple'];
    colorIndex = 0;

    constructor(public date : Moment) {        
      for (let i = 7; i <= 19; i++){
          this.times.push(EntryTime.create(i, 0), EntryTime.create(i,15),EntryTime.create(i,30),EntryTime.create(i,45));
      }      
   }

   addEntry(entry : Entry){
      this.entries.push(entry);
      let currentColor =  this.getColor();

      _.forEach(_.filter(this.times, x => x.isInRange(entry.start, entry.end)), x => {
        x.entry = entry;
       x.color = currentColor;
      });
   } 

   removeEntry(entry : Entry){

   }  

   getColor(){
     let result = this.colors[this.colorIndex];
     this.colorIndex = Math.floor((this.colorIndex + 1) % this.colors.length + 1);
     return result;
   }

   
}
