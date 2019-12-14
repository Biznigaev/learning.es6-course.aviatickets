import locations from "../store/locations";
import formUI from "../views/form";
import currencyUI from "../views/currency";
import ticketsUI from "../views/tickets";

class FormValidator {
  async onFormSubmit(callbackUserFunc) {
    if (this.isValidForm()) {
      return await callbackUserFunc({
        origin: this.origin,
        destination: this.destination,
        depart_date: this.depart_date,
        return_date: this.return_date,
        currency: this.currency
      });
    }
  }

  get currency() {
    return currencyUI.currecyValue;
  }

  get origin() {
    return locations.getCityCodeByKey(formUI.originValue);
  }

  get destination() {
    return locations.getCityCodeByKey(formUI.destinationValue);
  }

  get depart_date() {
    let depart_date = formUI.departDateValue;
    if (depart_date.length) {
      depart_date = formateDate(
        parseDate(depart_date, "dd.MM.yyyy"),
        "yyyy-MM-dd"
      );
    }
    return depart_date;
  }

  get return_date() {
    let return_date = formUI.returnDateValue;
    if (return_date.length) {
      return_date = formateDate(
        parseDate(return_date, "dd.MM.yyyy"),
        "yyyy-MM-dd"
      );
    }
    return return_date;
  }

  isValidForm() {
    const fields = [
      this.origin,
      this.destination,
      this.depart_date,
      this.return_date,
      this.currency
    ];
    let validInput = true;
    for (let variable of fields) {
      if (typeof variable == "undefined") {
        validInput = false;
        break;
      }
    }
    return validInput;
  }
}