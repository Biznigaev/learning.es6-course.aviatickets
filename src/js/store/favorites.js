class Favorites {
  constructor() {
    this.storage = JSON.parse(localStorage.getItem("favoriteItems")) || [];
    this.tickets = [];
  }

  async init() {
    if (this.storage.length) {
      const now = new Date();
      Array.from(this.storage).forEach(ticket => {
        if (now.getTime() > new Date(ticket.expires_at).getTime()) {
          // удаление устаревшего билета
          this.delTicket(ticket);
        }
      });
      this.tickets = this.storage;
    }
  }

  hasTicket(ticket) {
    const findedTicket = this.tickets.filter(
      _ticket =>
        _ticket.airline == ticket.airline &&
        _ticket.origin == ticket.origin &&
        _ticket.departure_at == ticket.departure_at &&
        _ticket.transfers == ticket.transfers &&
        _ticket.destination == ticket.destination &&
        _ticket.flight_number == ticket.flight_number &&
        _ticket.price == ticket.price &&
        _ticket.return_at == ticket.return_at
    );
    return findedTicket.length > 0;
  }

  delTicket(ticket) {
    if (!this.hasTicket(ticket)) {
        return false;
    }
    this.tickets = this.tickets.filter(
      _ticket =>
        !(
          _ticket.airline == ticket.airline &&
          _ticket.origin == ticket.origin &&
          _ticket.departure_at == ticket.departure_at &&
          _ticket.transfers == ticket.transfers &&
          _ticket.destination == ticket.destination &&
          _ticket.flight_number == ticket.flight_number &&
          _ticket.price == ticket.price &&
          _ticket.return_at == ticket.return_at
        )
    );
    this.storage = this.tickets;
    localStorage.setItem("favoriteItems", JSON.stringify(this.storage));
    return true;
  }

  addTicket(ticket) {
    /**
     * @todo: дедубликация
     */
    this.tickets.push(ticket);
    this.storage = this.tickets;
    localStorage.setItem("favoriteItems", JSON.stringify(this.storage));
    return true;
  }

  getTickets() {
    return this.tickets;
  }
}

const favorites = new Favorites();
export default favorites;