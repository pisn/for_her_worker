/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateConversationMutationVariables = {
  createdAt?: string | null,
  id: string,
  name: string,
};

export type CreateConversationMutation = {
  // Create a Conversation. Use some of the cooked in template functions for UUID and DateTime.
  createConversation:  {
    __typename: "Conversation",
    // The Conversation's timestamp.
    createdAt: string | null,
    // A unique identifier for the Conversation.
    id: string,
    // The Conversation's messages.
    messages:  {
      __typename: "MessageConnection",
      messages:  Array< {
        __typename: "Message",
        // The message content.
        content: string,
        // The id of the Conversation this message belongs to. This is the table primary key.
        conversationId: string,
        // The message timestamp. This is also the table sort key.
        createdAt: string | null,
        // Flag denoting if this message has been accepted by the server or not.
        isSent: boolean | null,
        sender: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    // The Conversation's name.
    name: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  content?: string | null,
  conversationId: string,
  createdAt: string,
};

export type CreateMessageMutation = {
  // Create a message in a Conversation.
  createMessage:  {
    __typename: "Message",
    // The author object. Note: `authorId` is only available because we list it in `extraAttributes` in `Conversation.messages`
    author:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    // The message content.
    content: string,
    // The id of the Conversation this message belongs to. This is the table primary key.
    conversationId: string,
    // The message timestamp. This is also the table sort key.
    createdAt: string | null,
    // Flag denoting if this message has been accepted by the server or not.
    isSent: boolean | null,
    recipient:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    sender: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  username: string,
};

export type CreateUserMutation = {
  // Put a single value of type 'User'. If an item does not exist with the same key the item will be created. If there exists an item at that key already, it will be updated.
  createUser:  {
    __typename: "User",
    // A unique identifier for the user.
    cognitoId: string,
    // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
    conversations:  {
      __typename: "UserConverstationsConnection",
      nextToken: string | null,
      userConversations:  Array< {
        __typename: "UserConversations",
        conversationId: string,
        userId: string,
      } | null > | null,
    } | null,
    // Generated id for a user. read-only
    id: string,
    // The username
    username: string,
    // is the user registered?
    registered: boolean | null,
  } | null,
};

export type CreateUserConversationsMutationVariables = {
  conversationId: string,
  userId: string,
};

export type CreateUserConversationsMutation = {
  // Put a single value of type 'UserConversations'. If an item does not exist with the same key the item will be created. If there exists an item at that key already, it will be updated.
  createUserConversations:  {
    __typename: "UserConversations",
    associated:  Array< {
      __typename: "UserConversations",
      associated:  Array< {
        __typename: "UserConversations",
        conversationId: string,
        userId: string,
      } | null > | null,
      conversation:  {
        __typename: "Conversation",
        // The Conversation's timestamp.
        createdAt: string | null,
        // A unique identifier for the Conversation.
        id: string,
        // The Conversation's name.
        name: string,
      } | null,
      conversationId: string,
      user:  {
        __typename: "User",
        // A unique identifier for the user.
        cognitoId: string,
        // Generated id for a user. read-only
        id: string,
        // The username
        username: string,
        // is the user registered?
        registered: boolean | null,
      } | null,
      userId: string,
    } | null > | null,
    conversation:  {
      __typename: "Conversation",
      // The Conversation's timestamp.
      createdAt: string | null,
      // A unique identifier for the Conversation.
      id: string,
      // The Conversation's messages.
      messages:  {
        __typename: "MessageConnection",
        nextToken: string | null,
      } | null,
      // The Conversation's name.
      name: string,
    } | null,
    conversationId: string,
    user:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    userId: string,
  } | null,
};

export type AllMessageQueryVariables = {
  after?: string | null,
  conversationId: string,
  first?: number | null,
};

export type AllMessageQuery = {
  // Scan through all values of type 'Message'. Use the 'after' and 'before' arguments with the 'nextToken' returned by the 'MessageConnection' result to fetch pages.
  allMessage:  Array< {
    __typename: "Message",
    // The author object. Note: `authorId` is only available because we list it in `extraAttributes` in `Conversation.messages`
    author:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    // The message content.
    content: string,
    // The id of the Conversation this message belongs to. This is the table primary key.
    conversationId: string,
    // The message timestamp. This is also the table sort key.
    createdAt: string | null,
    // Flag denoting if this message has been accepted by the server or not.
    isSent: boolean | null,
    recipient:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    sender: string | null,
  } | null > | null,
};

export type AllMessageConnectionQueryVariables = {
  after?: string | null,
  conversationId: string,
  first?: number | null,
};

export type AllMessageConnectionQuery = {
  // Scan through all values of type 'MessageConnection'. Use the 'after' and 'before' arguments with the 'nextToken' returned by the 'MessageConnectionConnection' result to fetch pages.
  allMessageConnection:  {
    __typename: "MessageConnection",
    messages:  Array< {
      __typename: "Message",
      // The author object. Note: `authorId` is only available because we list it in `extraAttributes` in `Conversation.messages`
      author:  {
        __typename: "User",
        // A unique identifier for the user.
        cognitoId: string,
        // Generated id for a user. read-only
        id: string,
        // The username
        username: string,
        // is the user registered?
        registered: boolean | null,
      } | null,
      // The message content.
      content: string,
      // The id of the Conversation this message belongs to. This is the table primary key.
      conversationId: string,
      // The message timestamp. This is also the table sort key.
      createdAt: string | null,
      // Flag denoting if this message has been accepted by the server or not.
      isSent: boolean | null,
      recipient:  {
        __typename: "User",
        // A unique identifier for the user.
        cognitoId: string,
        // Generated id for a user. read-only
        id: string,
        // The username
        username: string,
        // is the user registered?
        registered: boolean | null,
      } | null,
      sender: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type AllMessageFromQueryVariables = {
  after?: string | null,
  conversationId: string,
  first?: number | null,
  sender: string,
};

export type AllMessageFromQuery = {
  allMessageFrom:  Array< {
    __typename: "Message",
    // The author object. Note: `authorId` is only available because we list it in `extraAttributes` in `Conversation.messages`
    author:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    // The message content.
    content: string,
    // The id of the Conversation this message belongs to. This is the table primary key.
    conversationId: string,
    // The message timestamp. This is also the table sort key.
    createdAt: string | null,
    // Flag denoting if this message has been accepted by the server or not.
    isSent: boolean | null,
    recipient:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    sender: string | null,
  } | null > | null,
};

export type AllUserQueryVariables = {
  after?: string | null,
  first?: number | null,
};

export type AllUserQuery = {
  // Scan through all values of type 'User'. Use the 'after' and 'before' arguments with the 'nextToken' returned by the 'UserConnection' result to fetch pages.
  allUser:  Array< {
    __typename: "User",
    // A unique identifier for the user.
    cognitoId: string,
    // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
    conversations:  {
      __typename: "UserConverstationsConnection",
      nextToken: string | null,
      userConversations:  Array< {
        __typename: "UserConversations",
        conversationId: string,
        userId: string,
      } | null > | null,
    } | null,
    // Generated id for a user. read-only
    id: string,
    // The username
    username: string,
    // is the user registered?
    registered: boolean | null,
  } | null > | null,
};

export type MeQuery = {
  // Get my user.
  me:  {
    __typename: "User",
    // A unique identifier for the user.
    cognitoId: string,
    // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
    conversations:  {
      __typename: "UserConverstationsConnection",
      nextToken: string | null,
      userConversations:  Array< {
        __typename: "UserConversations",
        conversationId: string,
        userId: string,
      } | null > | null,
    } | null,
    // Generated id for a user. read-only
    id: string,
    // The username
    username: string,
    // is the user registered?
    registered: boolean | null,
  } | null,
};

export type SubscribeToNewMessageSubscriptionVariables = {
  conversationId: string,
};

export type SubscribeToNewMessageSubscription = {
  // Subscribes to all new messages in a given Conversation.
  subscribeToNewMessage:  {
    __typename: "Message",
    // The author object. Note: `authorId` is only available because we list it in `extraAttributes` in `Conversation.messages`
    author:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    // The message content.
    content: string,
    // The id of the Conversation this message belongs to. This is the table primary key.
    conversationId: string,
    // The message timestamp. This is also the table sort key.
    createdAt: string | null,
    // Flag denoting if this message has been accepted by the server or not.
    isSent: boolean | null,
    recipient:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    sender: string | null,
  } | null,
};

export type SubscribeToNewUCsSubscriptionVariables = {
  userId: string,
};

export type SubscribeToNewUCsSubscription = {
  subscribeToNewUCs:  {
    __typename: "UserConversations",
    associated:  Array< {
      __typename: "UserConversations",
      associated:  Array< {
        __typename: "UserConversations",
        conversationId: string,
        userId: string,
      } | null > | null,
      conversation:  {
        __typename: "Conversation",
        // The Conversation's timestamp.
        createdAt: string | null,
        // A unique identifier for the Conversation.
        id: string,
        // The Conversation's name.
        name: string,
      } | null,
      conversationId: string,
      user:  {
        __typename: "User",
        // A unique identifier for the user.
        cognitoId: string,
        // Generated id for a user. read-only
        id: string,
        // The username
        username: string,
        // is the user registered?
        registered: boolean | null,
      } | null,
      userId: string,
    } | null > | null,
    conversation:  {
      __typename: "Conversation",
      // The Conversation's timestamp.
      createdAt: string | null,
      // A unique identifier for the Conversation.
      id: string,
      // The Conversation's messages.
      messages:  {
        __typename: "MessageConnection",
        nextToken: string | null,
      } | null,
      // The Conversation's name.
      name: string,
    } | null,
    conversationId: string,
    user:  {
      __typename: "User",
      // A unique identifier for the user.
      cognitoId: string,
      // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
      conversations:  {
        __typename: "UserConverstationsConnection",
        nextToken: string | null,
      } | null,
      // Generated id for a user. read-only
      id: string,
      // The username
      username: string,
      // is the user registered?
      registered: boolean | null,
    } | null,
    userId: string,
  } | null,
};

export type SubscribeToNewUsersSubscription = {
  subscribeToNewUsers:  {
    __typename: "User",
    // A unique identifier for the user.
    cognitoId: string,
    // A user's enrolled Conversations. This is an interesting case. This is an interesting pagination case.
    conversations:  {
      __typename: "UserConverstationsConnection",
      nextToken: string | null,
      userConversations:  Array< {
        __typename: "UserConversations",
        conversationId: string,
        userId: string,
      } | null > | null,
    } | null,
    // Generated id for a user. read-only
    id: string,
    // The username
    username: string,
    // is the user registered?
    registered: boolean | null,
  } | null,
};
