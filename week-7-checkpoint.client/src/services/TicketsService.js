import { Ticket, MyTicket, EventTicket } from "../models/Ticket.js"
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "../services/AxiosService.js";
import Pop from "../utils/Pop.js";

class TicketsService {

    async getTicket(eventId) {
        if (AppState.myTickets.find(t => t.eventId == eventId)) {
            Pop.toast('You already have a ticket to this event.', 'error', 'center', 3000, true)
            return
        } else {
            const res = await api.post('api/tickets', { eventId })
            AppState.myTickets.push(new Ticket(res.data))
            AppState.tickets.push(new EventTicket(res.data))
            Pop.toast("Ticket Received", "success", "center", 3000, true);
            logger.log('[MY TICKETS]', AppState.myTickets)
        }
    }

    async getMyTickets() {
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data.map(t => new MyTicket(t))
        logger.log('[MY TICKETS]', AppState.myTickets)
    }

    async getAllTicketsToThisEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(t => new EventTicket(t))
        logger.log('[ALL TICKETS]', AppState.tickets)
    }

    async deleteTicket(ticketId, eventId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log('[res.data]', res.data)
        let deletedTicketIndex = AppState.tickets.findIndex(t => t.eventId == eventId)
        if (deletedTicketIndex == -1) {
            Pop.toast('Ticket not found.', 'error', 'center', 3000, true)
            return
        }
        AppState.tickets.splice(deletedTicketIndex, 1)
        logger.log('[DELETED FROM ALL TICKETS]', deletedTicketIndex, '[ALL TICKETS]', AppState.tickets)
        let myTicketIndex = AppState.myTickets.findIndex(t => t.id == ticketId)
        if (myTicketIndex == -1) {
            Pop.toast('Ticket not found.', 'error', 'center', 3000, true)
            return
        }
        AppState.myTickets.splice(myTicketIndex, 1)
        logger.log('[DELETED FROM MY TICKETS]', myTicketIndex, '[MY TICKETS]', AppState.myTickets)

        Pop.toast('Ticket deleted.', 'success', 'center', 3000, true)
        await this.getAllTicketsToThisEvent(eventId)
        return
    }
}

export const ticketsService = new TicketsService()