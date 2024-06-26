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

export const COURSE_GET_SECTIONS = gql`
  query Course_getSections($courseId: ID!) {
    course_getSections(courseId: $courseId) {
      _id
      course
      title
      banner
      notes
      description
      isCompleted
      files {
        format
        src
        contentType
        size
        description
        title
        isPreview
      }
      test {
        _id
        question
        options
        answers
        isAnswerMultiple
        score
      }
    }
  }
`;
