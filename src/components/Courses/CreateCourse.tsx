import * as React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useAuthenticated, useNotify } from "react-admin";
import { gql } from "@apollo/client";
import { CREATE_COURSE } from "@/utils/mutation";
import { Val } from "@/utils/helpers";

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

const CreateCourse: React.FC = () => {
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

  const {
    title,
    description,
    category,
    price,
    banner,
    liveSessionLink,
    liveSessionDescription,
    liveSessionTimezone,
  } = formState;

  const [createCourse, { loading, error }] = useMutation(CREATE_COURSE);
  const notify = useNotify();
  useAuthenticated();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await createCourse({
        variables: {
          title,
          description,
          banner,
          liveSessions: [
            {
              link: liveSessionLink,
              description: liveSessionDescription,
              timezone: liveSessionTimezone,
              time: new Date().toISOString(), // Example, adjust as necessary
            },
          ],
          category,
          price,
        },
      });
      if (response.data.course_create.success) {
        notify("تم إنشاء الدورة بنجاح", { type: "success" });
      } else {
        notify(response.data.course_create.error, { type: "error" });
      }
    } catch (err) {
      notify("حدث خطأ. يرجى المحاولة مرة أخرى.", { type: "error" });
      console.error(err);
    }
  };

  return (
    <Box height="100vh">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {[
          { label: "Title", name: "title", value: title },
          { label: "Description", name: "description", value: description },
          { label: "Category", name: "category", value: category },
          { label: "Price", name: "price", value: price.toString() },
          { label: "Banner", name: "banner", value: banner },
          {
            label: "Live Session Link",
            name: "liveSessionLink",
            value: liveSessionLink,
          },
          {
            label: "Live Session Description",
            name: "liveSessionDescription",
            value: liveSessionDescription,
          },
          {
            label: "Live Session Timezone",
            name: "liveSessionTimezone",
            value: liveSessionTimezone,
          },
        ].map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            variant="outlined"
            margin="normal"
            fullWidth
            name={field.name}
            value={field.value}
            onChange={handleInputChange}
          />
        ))}

        {error && (
          <Typography color="error" variant="body1">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              "Create Course"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCourse;
