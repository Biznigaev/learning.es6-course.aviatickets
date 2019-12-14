import favorites from "../store/favorites";
import { isThisMinute } from "date-fns";

class FavoritesUI {
  constructor() {
    this.container = document.querySelector(".favorites");
    this.button = this.container.querySelector(".dropdown-trigger");
  }

  renderTickets() {
    this.clearContainer();
    if (favorites.getTickets().length) {
      const wrapper = document.getElementById("dropdown1");
      favorites.getTickets().forEach(ticket => {
        const template = FavoritesUI.favoriteItemTemplate(ticket);
        wrapper.insertAdjacentHTML("beforeend", template);
        const buttons = wrapper.querySelectorAll(".delete-favorite");
        buttons[buttons.length -1].addEventListener("click", e => {
            /**
             * @todo: при удалении билета, нужно искать его в списке выведенных в результате и разлочивать ему кнопку добавления в избранные
             */
            favorites.delTicket(ticket);
            if (!favorites.getTickets().length) {
                this.clearContainer();
            } else {
                e.target.closest(".favorite-item").remove();
            }
        });
      });
    }
    this.container.classList.remove("hide");
  }

  clearContainer() {
      const wrapper = document.getElementById("dropdown1");
      wrapper.innerHTML = '';
  }

  addToFavoritesAction(ticket) {
    if (favorites.addTicket(ticket)) {
      this.renderTickets();
    }
  }

  clearContainer() {
    this.container.querySelector(".dropdown-content").innerHTML = "";
    this.container.classList.add("hide");
  }

  static favoriteItemTemplate(ticket) {
    return `
        <div class="favorite-item  d-flex align-items-start">
            <img
                src="http://pics.avs.io/200/200/${ticket.airline}.png"
                class="favorite-item-airline-img"
            />
            <div class="favorite-item-info d-flex flex-column">
                <div
                    class="favorite-item-destination d-flex align-items-center"
                >
                    <div class="d-flex align-items-center mr-auto">
                        <span class="favorite-item-city">${ticket.origin_name} </span>
                        <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="medium material-icons">flight_land</i>
                        <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">${ticket.currency}${ticket.price}</span>
                </div>
                <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                </div>
                <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                >Delete</a
                >
            </div>
        </div>
        `;
  }
}

const favoritesUI = new FavoritesUI();
export default favoritesUI;