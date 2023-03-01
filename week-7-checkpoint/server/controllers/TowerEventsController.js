import { towerEventsService } from "../services/TowerEventsService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"


export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await towerEventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getAllEvents(req, res, next) {
        try {
            const events = await towerEventsService.getAllEvents()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id
            const event = await towerEventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const eventData = req.body
            const requestorId = req.userInfo.id
            const event = await towerEventsService.editEvent(eventId, eventData, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestorId = req.userInfo.Id
            const event = await towerEventsService.cancelEvent(eventId, requestorId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
}