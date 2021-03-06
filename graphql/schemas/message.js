module.exports = {
  Single: `
    "Generic Message"
    type Message {
      "UUID of message, must be collision resistant"
      id: String

      "Stringified for extreme diversity, but must require a 'body' inside object"
      payload: String

      "User that send the message"
      user: User
      user_address: String

      "Channel messages belong to"
      channel: Channel
      channel_id: String

      "ISO8601 Timestamp in UTC"
      timestamp: String

      "APP ID of the rich media message, OPTIONAL"
      app_id: String

      "APP name, OPTIONAL"
      app_name: String
    }
  `,

  Query: `
    "Get all Messages of a channel"
    messages(channel_id: String!): [Message]

    "Get single message"
    message(channel_id: String!, id: String!): Message
  `,

  Mutation: `
    "Add new Message"
    addMessage(
      channel_id: String!
      payload: String
      user_address: String
      app_id: String
      app_name: String
    ): Message
  `
}
