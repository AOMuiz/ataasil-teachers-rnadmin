import { gql } from "@apollo/client";

export const ADMIN_PROFILE = gql`
  query AdminLoggedIn {
    adminLoggedIn {
      _id
      email
      username
    }
  }
`;

export const ALL_TEACHERS = gql`
  query AllTeachers(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: TeacherFilter
  ) {
    allTeachers(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      _id
      email
      username
      isAccountActivated
    }
  }
`;

export const ALL_PAYMENTS = gql`
  query AllPayments {
    allPayments {
      url
    }
  }
`;
