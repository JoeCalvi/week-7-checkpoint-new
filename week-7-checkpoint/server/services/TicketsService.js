import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"


class TicketsService {

    async getMyTickets(accountId) {
        const myTickets = await dbContext.Tickets.find({ accountId })
        return myTickets
    }
    async createTicket(ticketData) {
        const event = await towerEventsService.getEventById(ticketData.eventId)

        if (event.isCanceled) {
            throw new Forbidden('This event has been cancelled.')
        }
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')

        return ticket
    }
}

export const ticketsService = new TicketsService()