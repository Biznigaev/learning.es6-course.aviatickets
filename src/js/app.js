import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favorites from './store/favorites';
import { isValidForm } from './helpers/form';
import { parseDate, formateDate } from "./helpers/date";
import favoritesUI from "./views/favorites";

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener('submit', e => {
	e.preventDefault();
	try {
        onFormSubmit();
	} catch (err) {
		console.warn(err);
	}
  });

  // handlers
  async function initApp() {
    await locations.init();
	await favorites.init();
	favoritesUI.renderTickets();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    let depart_date = formUI.departDateValue;
    let return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

	if (isValidForm(origin, destination, depart_date, return_date, currency)) {
		if (depart_date.length) {
			depart_date = formateDate(
				parseDate(depart_date, "dd.MM.yyyy"),
				"yyyy-MM-dd"
			);
		}
		if (return_date.length) {
			return_date = formateDate(
				parseDate(return_date, "dd.MM.yyyy"),
				"yyyy-MM-dd"
			);
    	}
		await locations.fetchTickets({
			origin,
			destination,
			depart_date,
			return_date,
			currency
		});

		ticketsUI.renderTickets(locations.lastSearch);
		console.log(locations.lastSearch);
	}
  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
