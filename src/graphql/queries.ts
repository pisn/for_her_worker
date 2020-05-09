// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const allMessage = /* GraphQL */ `
  query AllMessage($after: String, $conversationId: ID!, $first: Int) {
    allMessage(after: $after, conversationId: $conversationId, first: $first) {
      author {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      content
      conversationId
      createdAt
      isSent
      recipient {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      sender
    }
  }
`;
export const allMessageConnection = /* GraphQL */ `
  query AllMessageConnection(
    $after: String
    $conversationId: ID!
    $first: Int
  ) {
    allMessageConnection(
      after: $after
      conversationId: $conversationId
      first: $first
    ) {
      messages {
        author {
          cognitoId
          id
          username
          registered
        }
        content
        conversationId
        createdAt
        isSent
        recipient {
          cognitoId
          id
          username
          registered
        }
        sender
      }
      nextToken
    }
  }
`;
export const allMessageFrom = /* GraphQL */ `
  query AllMessageFrom(
    $after: String
    $conversationId: ID!
    $first: Int
    $sender: String!
  ) {
    allMessageFrom(
      after: $after
      conversationId: $conversationId
      first: $first
      sender: $sender
    ) {
      author {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      content
      conversationId
      createdAt
      isSent
      recipient {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      sender
    }
  }
`;
export const allUser = /* GraphQL */ `
  query AllUser($after: String, $first: Int) {
    allUser(after: $after, first: $first) {
      cognitoId
      conversations {
        nextToken
        userConversations {
          conversationId
          userId
        }
      }
      id
      username
      registered
    }
  }
`;
export const me = /* GraphQL */ `
  query Me {
    me {
      cognitoId
      conversations {
        nextToken
        userConversations {
          conversationId
          userId
        }
      }
      id
      username
      registered
    }
  }
`;
