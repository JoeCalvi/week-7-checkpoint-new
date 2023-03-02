import { Profile } from "../models/Account.js";
export class Comment {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.creator = new Profile(data.creator)
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.isAttending = data.isAttending
        this.updatedAt = new Date(data.updatedAt).toLocaleTimeString('en-US')
    }
}