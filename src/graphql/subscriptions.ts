// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const subscribeToNewMessage = /* GraphQL */ `
  subscription SubscribeToNewMessage($conversationId: ID!) {
    subscribeToNewMessage(conversationId: $conversationId) {
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
export const subscribeToNewUCs = /* GraphQL */ `
  subscription SubscribeToNewUCs($userId: ID!) {
    subscribeToNewUCs(userId: $userId) {
      associated {
        associated {
          conversationId
          userId
        }
        conversation {
          createdAt
          id
          name
        }
        conversationId
        user {
          cognitoId
          id
          username
          registered
        }
        userId
      }
      conversation {
        createdAt
        id
        messages {
          nextToken
        }
        name
      }
      conversationId
      user {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      userId
    }
  }
`;
export const subscribeToNewUsers = /* GraphQL */ `
  subscription SubscribeToNewUsers {
    subscribeToNewUsers {
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
