import { gql } from "@/__generated__";

export const USERS_QUERY = gql(`
  query Users {
    users {
      email
      id
    }
  }
`);
