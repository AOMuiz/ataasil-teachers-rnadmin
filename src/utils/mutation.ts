// mutations.js
import { gql } from "@apollo/client";

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation ($email: String!) {
    teacher_sendResetPasswordEmail(email: $email) {
      code
      success
      error
      token
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ($token: String!, $password: String!) {
    teacher_resetPassword(token: $token, password: $password) {
      code
      success
      error
      token
    }
  }
`;

export const ACTIVATE_ACCOUNT = gql`
  mutation ($token: String!, $password: String!) {
    teacher_activateAccount(token: $token, password: $password) {
      code
      success
      error
      data {
        _id
        email
        username
        isAccountActivated
      }
      token
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation ($username: String) {
    teacher_editProfile(username: $username) {
      code
      success
      error
      data {
        _id
        email
        username
        isAccountActivated
      }
      token
    }
  }
`;
