import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query Teacher_getCourses {
    teacher_getCourses {
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
`;
