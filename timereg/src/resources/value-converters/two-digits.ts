export class TwoDigitsValueConverter {
  toView(value : number) {
     return value <= 9 ? `0${value}` :  (value%100).toString(); 
  }

  
}

