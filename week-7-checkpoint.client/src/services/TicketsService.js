import { Ticket } from "../models/Ticket.js"
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "../services/AxiosService.js";

class TicketsService {

    async getTicket(eventId) {
        const res = await api.post('api/tickets', eventId)
        logger.log(res.data)
    }
}

export const ticketsService = new TicketsService()