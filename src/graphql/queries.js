/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGuest = /* GraphQL */ `
  query GetGuest($id: ID!) {
    getGuest(id: $id) {
      id
      lastName
      firstName
      altFirstName
      altLastName
      phoneNumber
      allowPlusOne
      plusOne
      timeStart
      timeEnd
      isAttending
      createdAt
      updatedAt
    }
  }
`;
export const listGuests = /* GraphQL */ `
  query ListGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastName
        firstName
        altFirstName
        altLastName
        phoneNumber
        allowPlusOne
        plusOne
        timeStart
        timeEnd
        isAttending
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
