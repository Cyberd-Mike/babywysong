/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGuest = /* GraphQL */ `
  mutation CreateGuest(
    $input: CreateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    createGuest(input: $input, condition: $condition) {
      id
      lastName
      firstName
      phoneNumber
      timeStart
      timeEnd
      isAttending
    }
  }
`;
export const updateGuest = /* GraphQL */ `
  mutation UpdateGuest(
    $input: UpdateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    updateGuest(input: $input, condition: $condition) {
      id
      lastName
      firstName
      phoneNumber
      timeStart
      timeEnd
      isAttending
    }
  }
`;
export const deleteGuest = /* GraphQL */ `
  mutation DeleteGuest(
    $input: DeleteGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    deleteGuest(input: $input, condition: $condition) {
      id
      lastName
      firstName
      phoneNumber
      timeStart
      timeEnd
      isAttending
    }
  }
`;
