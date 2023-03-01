import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {

    async getAllEvents() {
        const res = await api.get('api/events')
        AppState.events = res.data.map(e => new Event(e))
        logger.log('[ALL EVENTS]', AppState.events)
    }

    async getEventById(eventId) {
        const res = await api.get('api/events/' + eventId)
        AppState.event = new Event(res.data)
        logger.log('[EVENT BY ID]', AppState.event)
    }

    async createEvent(eventData) {
        const res = await api.post('api/events', eventData)
        AppState.events.push(new Event(res.data))
        logger.log(AppState.events)
    }

    async cancelEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        logger.log('[CANCELLED EVENT]', res.data)
    }
}

export const eventsService = new EventsService()