import { useState } from "react";

export const useCourseForm = () => {
  const [formState, setFormState] = useState<CourseFormState>({
    title: "",
    description: "",
    category: "",
    price: 0,
    banner: "",
    liveSessionLink: "",
    liveSessionDescription: "",
    liveSessionTimezone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "price" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  return { formState, handleInputChange };
};
