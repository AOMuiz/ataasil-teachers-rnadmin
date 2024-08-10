import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "@/utils/mutation";
import { useNotify } from "react-admin";

export const useCreateCourse = () => {
  const [createCourse, { loading, error }] = useMutation(CREATE_COURSE);
  const notify = useNotify();

  const handleSave = async (formState: CourseFormState) => {
    try {
      const response = await createCourse({
        variables: {
          title: formState.title,
          description: formState.description,
          banner: formState.banner,
          liveSessions: [
            {
              link: formState.liveSessionLink,
              description: formState.liveSessionDescription,
              timezone: formState.liveSessionTimezone,
              time: new Date().toISOString(),
            },
          ],
          category: formState.category,
          price: formState.price,
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

  return { handleSave, loading, error };
};
