import { gql } from "@apollo/client";

export const AUTHENTICATE_ADMIN = gql`
  mutation Admin_login($email: String!, $password: String!) {
    admin_login(email: $email, password: $password) {
      code
      success
      error
      token
      data {
        _id
        email
        username
      }
    }
  }
`;
export const AUTHENTICATE_TEACHER = gql`
  mutation Teacher_login($email: String!, $password: String!) {
    teacher_login(email: $email, password: $password) {
      code
      success
      error
      token
      data {
        _id
        email
        username
        isAccountActivated
      }
    }
  }
`;
