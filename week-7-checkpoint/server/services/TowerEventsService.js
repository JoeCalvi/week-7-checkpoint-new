import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventsService {

    async getAllEvents() {
        const events = await dbContext.Events.find()
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)

        if (!event) {
            throw new BadRequest('Invalid Event Id.')
        }

        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        return event
    }

    async editEvent(eventId, eventData, requestorId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != requestorId) {
            throw new Forbidden('Must be creator of event to edit.')
        }

        if (event.isCanceled == true) {
            throw new BadRequest('Event has been cancelled and cannot be edited.')
        }
        event.name = eventData.name
        event.description = eventData.description
        await event.save()
        return event
    }

    async cancelEvent(eventId, requestorId) {
        const event = await this.getEventById(eventId)
        event.isCanceled = true
        await event.save()
        if (event.creatorId.toString() != requestorId) {
            throw new Forbidden('Must be creator of event to cancel.')
        } else if (event.isCanceled == true) {
            throw new BadRequest('Event already cancelled.')
        }
        return event
    }
}

export const towerEventsService = new TowerEventsService()