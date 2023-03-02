import { Profile } from "./Account.js"
import { Event } from "./Event.js"


export class MyTicket {
    constructor(data) {
        this.id = data.id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.event = new Event(data.event)
    }
}

export class EventTicket {
    constructor(data) {
        this.id = data.accountId
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.profile = new Profile(data.profile)
    }
}

export class Ticket extends MyTicket {
    constructor(data) {
        super(data)
        this.profile = new Profile(data.profile)
    }
}