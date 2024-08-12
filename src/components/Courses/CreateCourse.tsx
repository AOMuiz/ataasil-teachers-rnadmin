import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useAuthenticated } from "react-admin";
import { CategorySelect, FormField } from "./FormComponents";
import { useCourseForm } from "./useCourseForm";
import { useCreateCourse } from "./useCreateCourse";
import { CATEGORIES } from "./data";

const CreateCourse: React.FC = () => {
  useAuthenticated();
  const { formState, handleInputChange } = useCourseForm();
  const { handleSave, loading, error } = useCreateCourse();

  const DATA = useMemo(
    () => [
      { label: "Title", name: "title", value: formState.title },
      {
        label: "Description",
        name: "description",
        value: formState.description,
      },
      { label: "Price", name: "price", value: formState.price.toString() },
      { label: "Banner", name: "banner", value: formState.banner },
      {
        label: "Live Session Link",
        name: "liveSessionLink",
        value: formState.liveSessionLink,
      },
      {
        label: "Live Session Description",
        name: "liveSessionDescription",
        value: formState.liveSessionDescription,
      },
      {
        label: "Live Session Timezone",
        name: "liveSessionTimezone",
        value: formState.liveSessionTimezone,
      },
    ],
    [
      formState.banner,
      formState.description,
      formState.liveSessionDescription,
      formState.liveSessionLink,
      formState.liveSessionTimezone,
      formState.price,
      formState.title,
    ]
  );

  return (
    <Box>
      <div className="space-y-3 mb-4" dir="rtl">
        <h2 className="font-bold text-3xl">إنشاء دورة</h2>
        <p className="text-[#5A5A5A]">
          هنا يمكنك إنشاء دورة جديدة وإدخال التفاصيل اللازمة.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(formState);
        }}
      >
        <CategorySelect
          data={CATEGORIES}
          value={formState.category}
          handleInputChange={(e: any) => handleInputChange(e)}
        />
        {DATA.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            name={field.name}
            value={field.value}
            handleInputChange={handleInputChange}
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
            sx={{ width: "210px" }}
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
