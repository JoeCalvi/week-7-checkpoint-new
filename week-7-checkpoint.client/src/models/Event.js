export class Event {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleString('en-US')
        this.isCanceled = data.isCanceled
        this.type = data.type
    }
}