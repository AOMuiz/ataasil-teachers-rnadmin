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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useNotify } from "react-admin";
import { useParams } from "react-router-dom";
import { RiAddFill, RiPencilFill, RiDeleteBinFill } from "react-icons/ri";
import Image from "next/image";

interface FormInputs {
  courseId: string;
  title: string;
  banner: string;
  notes: string;
  description: string;
  files: {
    id: string; // Add id field to identify each item uniquely
    format: string;
    src: string;
    contentType: string;
    size: number;
    description: string;
    title: string;
    isPreview: boolean;
  }[];
  test: {
    id: string; // Add id field to identify each item uniquely
    question: string;
    options: string[];
    answers: string[];
    isAnswerMultiple: boolean;
    score: number;
  }[];
}

const CreateCourseSection: React.FC = () => {
  const { course_id } = useParams<{ course_id: string }>();
  const { control, handleSubmit, register, setValue, watch, reset } =
    useForm<FormInputs>({
      defaultValues: {
        courseId: course_id,
        title: "",
        banner: "",
        notes: "",
        description: "",
        files: [],
        test: [],
      },
    });

  const {
    fields: fileFields,
    append: appendFile,
    update: updateFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: "files",
  });
  const {
    fields: testFields,
    append: appendTest,
    update: updateTest,
    remove: removeTest,
  } = useFieldArray({
    control,
    name: "test",
  });

  const [createCourseSection, { loading, error }] = useMutation(
    COURSE_SECTION_CREATE
  );
  const notify = useNotify();

  const [bannerPreview, setBannerPreview] = React.useState<string | null>(null);
  const [openFileModal, setOpenFileModal] = React.useState(false);
  const [openTestModal, setOpenTestModal] = React.useState(false);
  const [editFileIndex, setEditFileIndex] = React.useState<number | null>(null);
  const [editTestIndex, setEditTestIndex] = React.useState<number | null>(null);

  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await createCourseSection({ variables: data });
      if (response.data.courseSection_create.success) {
        notify("Course section created successfully", { type: "success" });
        reset(); // Reset form after successful submission
      } else {
        notify(response.data.courseSection_create.error, { type: "error" });
      }
    } catch (err) {
      notify("An error occurred. Please try again.", { type: "error" });
      console.error(err);
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
        setValue("banner", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSubmit = (data: FormInputs) => {
    if (editFileIndex !== null) {
      updateFile(editFileIndex, data.files[0]);
    } else {
      appendFile(data.files[0]);
    }
    setOpenFileModal(false);
    setEditFileIndex(null);
    // reset(); // Reset form after adding/editing file
  };

  const handleTestSubmit = (data: FormInputs) => {
    if (editTestIndex !== null) {
      updateTest(editTestIndex, data.test[0]);
    } else {
      appendTest(data.test[0]);
    }
    setOpenTestModal(false);
    setEditTestIndex(null);
    // reset(); // Reset form after adding/editing test
  };

  const handleEditFile = (index: number) => {
    setEditFileIndex(index);
    // No need to setValue here, as it directly accesses fileFields[index]
    setOpenFileModal(true);
  };

  const handleEditTest = (index: number) => {
    setEditTestIndex(index);
    // No need to setValue here, as it directly accesses testFields[index]
    setOpenTestModal(true);
  };

  return (
    <Box className="flex flex-col">
      <div className="space-y-3 mb-4" dir="rtl">
        <h2 className="font-bold text-3xl">إنشاء قسم الدورة</h2>
        <p className="text-[#5A5A5A]">
          هنا يمكنك إنشاء قسم جديد للدورة التدريبية وإدخال التفاصيل اللازمة.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white rounded-xl shadow-lg p-10 w-full mx-auto"
      >
        <section>
          <div className="flex items-center gap-4 mb-4">
            <p>إضافة قسم</p>
            <TextField
              required
              label="العنوان"
              {...register("title")}
              className="flex-1"
              variant="outlined"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            style={{ display: "none" }}
            id="banner-upload"
          />
          <label htmlFor="banner-upload">
            <Button variant="contained" component="span">
              تحميل البانر
            </Button>
          </label>
          {bannerPreview && (
            <div className="mt-4 flex place-content-center">
              <Image
                src={bannerPreview}
                width={300}
                height={300}
                alt="معاينة البانر"
                className="object-cover rounded"
              />
            </div>
          )}
          <TextField
            required
            label="الملاحظات"
            {...register("notes")}
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            label="الوصف"
            {...register("description")}
            fullWidth
            variant="outlined"
          />
        </section>
        <hr />
        <section className="border border-[#D3D7DC] rounded-lg">
          <div className="bg-[#ECEFF4] rounded-t-lg flex p-2 items-center justify-between">
            <p className="font-bold text-md text-[#383450]">ملفات قسم الدورة</p>
            <Button type="button" onClick={() => setOpenFileModal(true)}>
              إضافة ملف
            </Button>
          </div>
          <div className="p-4 space-y-4">
            {fileFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between space-y-2"
              >
                <div>
                  <Typography variant="body1">{field.title}</Typography>
                  <Typography variant="body2">{field.description}</Typography>
                </div>
                <div>
                  <IconButton onClick={() => handleEditFile(index)}>
                    <RiPencilFill />
                  </IconButton>
                  <IconButton onClick={() => removeFile(index)}>
                    <RiDeleteBinFill />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="border border-[#D3D7DC] rounded-lg">
          <div className="bg-[#ECEFF4] rounded-t-lg flex p-2 items-center justify-between">
            <p className="font-bold text-md">اختبار / أسئلة قسم الدورة</p>
            <Button type="button" onClick={() => setOpenTestModal(true)}>
              إضافة سؤال اختبار
            </Button>
          </div>
          <div className="p-4 space-y-4">
            {testFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between space-y-2"
              >
                <div>
                  <Typography variant="body1">{field.question}</Typography>
                </div>
                <div>
                  <IconButton onClick={() => handleEditTest(index)}>
                    <RiPencilFill />
                  </IconButton>
                  <IconButton onClick={() => removeTest(index)}>
                    <RiDeleteBinFill />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. حاول مرة أخرى.
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
              "إنشاء قسم الدورة"
            )}
          </Button>
        </Box>
      </form>

      {/* File Modal */}
      <Dialog open={openFileModal} onClose={() => setOpenFileModal(false)}>
        <DialogTitle>
          {editFileIndex !== null ? "تعديل الملف" : "إضافة ملف"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFileSubmit)}>
            <TextField
              required
              label="العنوان"
              {...register("files.0.title")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="الوصف"
              {...register("files.0.description")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="صيغة الملف"
              {...register("files.0.format")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="مصدر الملف"
              {...register("files.0.src")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="نوع المحتوى"
              {...register("files.0.contentType")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="الحجم"
              type="number"
              {...register("files.0.size")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <Controller
              name="files.0.isPreview"
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...field} />
                  <span>هل هو معاينة</span>
                </label>
              )}
            />
            <DialogActions>
              <Button onClick={() => setOpenFileModal(false)} color="secondary">
                إلغاء
              </Button>
              <Button type="submit" color="primary">
                {editFileIndex !== null ? "تحديث الملف" : "إضافة الملف"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Test Modal */}
      <Dialog open={openTestModal} onClose={() => setOpenTestModal(false)}>
        <DialogTitle>
          {editTestIndex !== null ? "تعديل سؤال الاختبار" : "إضافة سؤال اختبار"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleTestSubmit)}>
            <TextField
              required
              label="السؤال"
              {...register("test.0.question")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="الخيار 1"
              {...register("test.0.options.0")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="الخيار 2"
              {...register("test.0.options.1")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <TextField
              required
              label="الإجابة"
              {...register("test.0.answers.0")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <Controller
              name="test.0.isAnswerMultiple"
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...field} />
                  <span>هل هناك أكثر من إجابة</span>
                </label>
              )}
            />
            <TextField
              required
              label="الدرجة"
              type="number"
              {...register("test.0.score")}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <DialogActions>
              <Button onClick={() => setOpenTestModal(false)} color="secondary">
                إلغاء
              </Button>
              <Button type="submit" color="primary">
                {editTestIndex !== null
                  ? "تحديث سؤال الاختبار"
                  : "إضافة سؤال الاختبار"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateCourseSection;
