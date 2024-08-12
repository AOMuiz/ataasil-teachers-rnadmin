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

export const CREATE_COURSE = gql`
  mutation Course_create(
    $title: String!
    $description: String!
    $banner: String!
    $liveSessions: [LiveSessionInput!]!
    $category: CourseCategory!
    $price: Float!
  ) {
    course_create(
      title: $title
      description: $description
      banner: $banner
      liveSessions: $liveSessions
      category: $category
      price: $price
    ) {
      code
      success
      error
      data {
        _id
        title
        description
        banner
        liveSessions {
          link
          time
          timezone
          description
        }
        createdAt
        teacher {
          _id
          email
          username
          isAccountActivated
        }
        category
        price
        hasAccess
        progress
        sectionCount
        studentCount
      }
    }
  }
`;

export const COURSE_SECTION_CREATE = gql`
  mutation CourseSection_create(
    $courseId: ID!
    $title: String!
    $banner: String!
    $notes: String!
    $description: String!
    $files: [CourseSectionFileInput!]!
    $test: [CourseSectionTestQuestionInput!]!
  ) {
    courseSection_create(
      courseId: $courseId
      title: $title
      banner: $banner
      notes: $notes
      description: $description
      files: $files
      test: $test
    ) {
      code
      success
      error
    }
  }
`;
