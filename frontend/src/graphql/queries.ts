import { gql } from "@/__generated__";

export const USERS_QUERY = gql(/* GraphQL */ `
  query Users {
    users {
      email
      id
    }
  }
`);

export const PROTECTED_QUERY = gql(/* GraphQL */ `
  query Query {
    helloProtectedRoute
  }
`);
