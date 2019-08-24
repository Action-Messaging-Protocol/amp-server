module.exports = {
  Single: `
    "Generic Message"
    type Message {
      "UUID of message, must be collision resistant"
      id: String

      "Stringified for extreme diversity, but must require a 'body' inside object"
      payload: String

      "TODO: User"
      user: User

      "TODO: Channel"
      channel: Channel

      "ISO8601 Timestamp in UTC"
      timestamp: String

      "APP ID of the rich media message, OPTIONAL"
      app_id: String

      "APP ID of the rich media message, OPTIONAL"
      app_name: String
    }
  `,

  Query: `
    "Get all Messages of ALL Chats, yeah scary..."
    messages: [Message]

    "Get single message"
    message(id: String!): Message
  `,

  Mutation: `
    "add new Message"
    addMessage(
      id: String!
    ): Message
  `
}
