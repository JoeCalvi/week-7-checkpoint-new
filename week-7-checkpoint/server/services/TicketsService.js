import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"


class TicketsService {

    async getMyTickets(accountId) {
        const myTickets = await dbContext.Tickets.find({ accountId })
            .populate('event')
        return myTickets
    }

    async getEventTickets(eventId) {
        const eventTickets = await dbContext.Tickets.find({ eventId })
            .populate('profile', 'name picture')
        return eventTickets
    }
    async createTicket(ticketData) {
        const event = await towerEventsService.getEventById(ticketData.eventId)
        if (event.isCanceled) {
            throw new Forbidden('This event has been cancelled.')
        }
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        event.capacity--
        await event.save()
        return ticket
    }

    async deleteTicket(ticketId, requestorId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (ticket == null) {
            throw new BadRequest('Ticket not found.')
        }

        if (ticket.accountId.toString() != requestorId) {
            throw new Forbidden('Must be ticket owner to delete ticket.')
        }
        const event = await towerEventsService.getEventById(ticket.eventId)
        event.capacity++
        await event.save()
        await dbContext.Tickets.findByIdAndDelete(ticketId)
        return 'deleted ticket'
    }
}

export const ticketsService = new TicketsService()