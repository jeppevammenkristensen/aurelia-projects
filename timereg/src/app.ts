import environment from './environment';
import { HttpClient } from 'aurelia-fetch-client'
import { inject, NewInstance } from "aurelia-framework";
import { Moment } from "moment";
import * as moment from 'moment';
import { Entry, EntryTime } from "./models/day-registration";

@inject(NewInstance.of(HttpClient))
export class App {

  days : Day[] = [];
  day : Day = null;

  constructor(private client: HttpClient) {
    this.client.configure(config => {
      config.withBaseUrl(environment.apiUrl)
        .useStandardConfiguration()
    })
  }

  attached() {
    this.days.push(new Day(moment()));
    this.day = this.days[0];    
  }
}

export class Day {
    entries : EntryTime[] = [];

    constructor(public date : Moment) {        
      for (let i = 9; i <= 24; i++){
          this.entries.push(EntryTime.create(i, 0), EntryTime.create(i,15),EntryTime.create(i,30),EntryTime.create(i,45));
      }
   }
}
