import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favorites from './store/favorites';
import { FormValidator } from "./helpers/form";
import { parseDate, formateDate } from "./helpers/date";
import favoritesUI from "./views/favorites";

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener('submit', e => {
	e.preventDefault();
	try {
        (new FormValidator()).onFormSubmit(...fields => {
			const {
				origin,
				destination,
				depart_date,
				return_date,
				currency
			} = fields;
			
			locations.fetchTickets({
				origin,
				destination,
				depart_date,
				return_date,
				currency
			});
			
			ticketsUI.renderTickets(locations.lastSearch);
		});
	} catch (err) {
		console.warn(err);
	}
  });

  // handlers
  async function initApp() {
	await Promise.all([locations.init(), favorites.init()]).then(() => {
    favoritesUI.renderTickets();
    formUI.setAutocompleteData(locations.shortCities);
  });
  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
