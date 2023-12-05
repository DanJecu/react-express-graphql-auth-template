import { gql } from "@/__generated__";

export const REGISTER_USER = gql(/* GraphQL */ `
  mutation Register($password: String!, $email: String!) {
    register(password: $password, email: $email)
  }
`);

export const LOGIN_USER = gql(/* GraphQL */ `
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      accessToken
    }
  }
`);
