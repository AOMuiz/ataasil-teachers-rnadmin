import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { COURSE_SECTION_CREATE } from "@/utils/mutation";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNotify } from "react-admin";

interface FormInputs {
  courseId: string;
  title: string;
  banner: string;
  notes: string;
  description: string;
  files: {
    format: string;
    src: string;
    contentType: string;
    size: number;
    description: string;
    title: string;
    isPreview: boolean;
  }[];
  test: {
    question: string;
    options: string[];
    answers: string[];
    isAnswerMultiple: boolean;
    score: number;
  }[];
}

const CreateCourseSection: React.FC = () => {
  const { control, handleSubmit, register } = useForm<FormInputs>({
    defaultValues: {
      courseId: "",
      title: "",
      banner: "",
      notes: "",
      description: "",
      files: [
        {
          format: "",
          src: "",
          contentType: "",
          size: 0,
          description: "",
          title: "",
          isPreview: false,
        },
      ],
      test: [
        {
          question: "",
          options: ["", ""],
          answers: [""],
          isAnswerMultiple: false,
          score: 0,
        },
      ],
    },
  });

  const { fields: fileFields, append: appendFile } = useFieldArray({
    control,
    name: "files",
  });
  const { fields: testFields, append: appendTest } = useFieldArray({
    control,
    name: "test",
  });

  const [createCourseSection, { loading, error }] = useMutation(
    COURSE_SECTION_CREATE
  );
  const notify = useNotify();

  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await createCourseSection({ variables: data });
      if (response.data.courseSection_create.success) {
        notify("Course section created successfully", { type: "success" });
      } else {
        notify(response.data.courseSection_create.error, { type: "error" });
      }
    } catch (err) {
      notify("An error occurred. Please try again.", { type: "error" });
      console.error(err);
    }
  };

  return (
    <Box className="h-screen flex flex-col items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6"
      >
        <TextField
          label="Course ID"
          {...register("courseId")}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Title"
          {...register("title")}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Banner"
          {...register("banner")}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Notes"
          {...register("notes")}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Description"
          {...register("description")}
          fullWidth
          variant="outlined"
        />

        {fileFields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <TextField
              label="File Format"
              {...register(`files.${index}.format`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="File Source"
              {...register(`files.${index}.src`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Content Type"
              {...register(`files.${index}.contentType`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Size"
              type="number"
              {...register(`files.${index}.size`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              {...register(`files.${index}.description`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Title"
              {...register(`files.${index}.title`)}
              fullWidth
              variant="outlined"
            />
            <Controller
              name={`files.${index}.isPreview`}
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...field} />
                  <span>Is Preview</span>
                </label>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendFile({
              format: "",
              src: "",
              contentType: "",
              size: 0,
              description: "",
              title: "",
              isPreview: false,
            })
          }
        >
          Add File
        </Button>

        {testFields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <TextField
              label="Question"
              {...register(`test.${index}.question`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Options"
              {...register(`test.${index}.options.0`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Options"
              {...register(`test.${index}.options.1`)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Answers"
              {...register(`test.${index}.answers.0`)}
              fullWidth
              variant="outlined"
            />
            <Controller
              name={`test.${index}.isAnswerMultiple`}
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...field} />
                  <span>Is Answer Multiple</span>
                </label>
              )}
            />
            <TextField
              label="Score"
              type="number"
              {...register(`test.${index}.score`)}
              fullWidth
              variant="outlined"
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendTest({
              question: "",
              options: ["", ""],
              answers: [""],
              isAnswerMultiple: false,
              score: 0,
            })
          }
        >
          Add Test Question
        </Button>

        {error && (
          <Typography color="error" variant="body2">
            An error occurred. Please try again.
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
              "Create Course Section"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCourseSection;
