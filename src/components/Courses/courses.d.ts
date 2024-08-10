interface CourseFormState {
  title: string;
  description: string;
  category: string;
  price: number;
  banner: string;
  liveSessionLink: string;
  liveSessionDescription: string;
  liveSessionTimezone: string;
}

interface Category {
  value: string | number;
  label: string;
}
