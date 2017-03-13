import { Moment } from 'moment';

export class TimeFormatValueConverter {
  toView(value : Moment, format = 'dd MM YY, HH:mm:ss') {
      if (value)
        return value.format(format);
  }  
}

