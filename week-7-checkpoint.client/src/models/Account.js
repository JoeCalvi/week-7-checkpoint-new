
export class Profile {
  constructor(data) {
    this.name = data.name
    this.picture = data.picture
  }
}
export class Account extends Profile {
  constructor(data) {
    super(data)
    this.id = data.id
    this.email = data.email
  }
}
