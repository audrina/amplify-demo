/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const castVote = /* GraphQL */ `
  mutation CastVote($input: CastVoteInput!) {
    castVote(input: $input) {
      id
      name
      description
      votes
      createdAt
      updatedAt
    }
  }
`;
export const createProposal = /* GraphQL */ `
  mutation CreateProposal(
    $input: CreateProposalInput!
    $condition: ModelProposalConditionInput
  ) {
    createProposal(input: $input, condition: $condition) {
      id
      name
      description
      votes
      createdAt
      updatedAt
    }
  }
`;
export const updateProposal = /* GraphQL */ `
  mutation UpdateProposal(
    $input: UpdateProposalInput!
    $condition: ModelProposalConditionInput
  ) {
    updateProposal(input: $input, condition: $condition) {
      id
      name
      description
      votes
      createdAt
      updatedAt
    }
  }
`;
export const deleteProposal = /* GraphQL */ `
  mutation DeleteProposal(
    $input: DeleteProposalInput!
    $condition: ModelProposalConditionInput
  ) {
    deleteProposal(input: $input, condition: $condition) {
      id
      name
      description
      votes
      createdAt
      updatedAt
    }
  }
`;
