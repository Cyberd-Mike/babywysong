
export const getGuestbyName = /* GraphQL */ `
query getGuest($lastName: string!, $firstName: string!) {
    getGuest(lastName: $lastName, firstName: $firstName ) {
    id
    lastName
    firstName
    phoneNumber
    timeStart
    timeEnd
    isAttending
    _version
    _deleted
    _lastChangedAt
  }
}
`;