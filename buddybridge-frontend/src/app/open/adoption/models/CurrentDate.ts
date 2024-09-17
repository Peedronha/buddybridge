import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root' // Makes CurrentDate available throughout the application
})
export class CurrentDate{
      getCurrentDate(): string {
      const today = new Date();
      const year = today.getFullYear();
      const month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are zero-based
      const day = ('0' + today.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    getReducedDate(reduceYear: number): string {
      const today = new Date();
      const year = today.getFullYear() - reduceYear;
      const month = ('0' + (today.getMonth() + 1)).slice(-2); // Months are zero-based
      const day = ('0' + today.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

  constructor() {
  }
}
