import bcrypt from 'bcryptjs';
import moment from 'moment';
import { AppError } from './error/error';

class Utils {
    async hashPassword (password:string) {
        return bcrypt.hashSync(password, 12);
    }

    async compareHash (password:string, hash:string) {
        return bcrypt.compareSync(password, hash);
    }

    generateRef (size: number, alpha: boolean): string  {

        let characters = alpha
          ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          : "0123456789";
        let chars = characters.split("");
        let selections: string = "";
        for (let i = 0; i < size; i++) {
          let index = Math.floor(Math.random() * chars.length);
          selections += chars[index];
          chars.splice(index, 1);
        }
        return selections;
    }

    formatRequestDatePeriod(start_date:string, end_date:string) {
      end_date = moment(end_date).add(1, 'day').format() || moment().format();
      
      if(!this.checkDateIsBefore(new Date(start_date) , new Date(end_date)) ) throw new AppError("invalid date period", 400);
  
      return {
        start_date: new Date(start_date),
        end_date: new Date(end_date)
      }
    }

    checkDateIsBefore(date:Date, comparator:Date) {
      return (moment(date).isBefore(comparator)) ?  true:false
    }
}

export const utils = new Utils();