import { gql } from "@apollo/client";

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
      success
      error
      code
    }
  }
`;
