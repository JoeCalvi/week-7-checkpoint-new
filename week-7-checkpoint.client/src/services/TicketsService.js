import { Ticket, MyTicket, EventTicket } from "../models/Ticket.js"
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "../services/AxiosService.js";

class TicketsService {

    async getTicket(eventId) {
        const res = await api.post('api/tickets', { eventId })
        AppState.tickets.push(new Ticket(res.data))
    }

    async getMyTickets() {
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data.map(t => new MyTicket(t))
    }

    async getAllTicketsToThisEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(t => new EventTicket(t))
        logger.log(AppState.tickets)
    }
}

export const ticketsService = new TicketsService()