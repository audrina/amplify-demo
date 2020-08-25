/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProposal = /* GraphQL */ `
  query GetProposal($id: ID!) {
    getProposal(id: $id) {
      id
      name
      description
      votes
      createdAt
      updatedAt
    }
  }
`;
export const listProposals = /* GraphQL */ `
  query ListProposals(
    $filter: ModelProposalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProposals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        votes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
