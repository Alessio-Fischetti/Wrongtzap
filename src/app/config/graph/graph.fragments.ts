import {gql} from "apollo-angular";

export const friendFragment = gql`
    fragment FriendFragment on FriendResponse {
      friendshipId
      userId
      username
      status
}`

export const pagedMessages = gql`
  fragment MessageFragment on PagedMessages{
    content {
      username
      userId
      chatId
      content
      timestamp
    }
    pageSize
    pageNumber
    totalRecords
    totalPages
  } `

export const joinDateEntry = gql`
    fragment JoinEntryFragment on JoinDateEntry {
      userId
      timestamp
    }`

export const profile = gql`
  fragment ProfileFragment on UserProfile{
    username
    userId
  }`

export const pagedGroup = gql`
  ${joinDateEntry}
  ${pagedMessages}
  ${profile}
    fragment GroupFragment on PagedGroups{
      content{
        chatId
        name
        creationDate
        members{
          ...ProfileFragment
        }
        memberEntry{
          ...JoinEntryFragment
        }
        admins{
          ...ProfileFragment
        }
        messages{
          ...MessageFragment
        }
        archived
      }
      pageSize
      pageNumber
      totalRecords
      totalPages
    }`

export const pagedChat = gql`
  ${profile}
  ${pagedMessages}
 fragment ChatFragment on PagedChats{
   content{
     chatId
     creationDate
     members{
       ...ProfileFragment
     }
     messages{
       ...MessageFragment
     }
     archived
   }
   pageSize
   pageNumber
   totalRecords
   totalPages
 }`



