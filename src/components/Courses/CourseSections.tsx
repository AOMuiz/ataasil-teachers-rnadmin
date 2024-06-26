import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { Title, useAuthenticated, useNotify } from "react-admin";
import { COURSE_GET_SECTIONS } from "@/utils/queries";

const CourseSections: React.FC = () => {
  useAuthenticated();

  const { course_id } = useParams<{ course_id: string }>();
  const [filter, setFilter] = useState("");
  const { loading, error, data } = useQuery(COURSE_GET_SECTIONS, {
    variables: { courseId: course_id },
  });
  const notify = useNotify();

  if (loading || !data) {
    return (
      <div className={"flex items-center justify-center h-full"}>
        <span className="loading loading-infinity loading-lg"></span>.
      </div>
    );
  }

  if (error) {
    notify("حدث خطأ. يرجى المحاولة مرة أخرى.", { type: "error" });
  }

  return (
    <Box minHeight="100%">
      <Title title="أقسام الدورة" />
      <div className="space-y-3 mb-4" dir="rtl">
        <h2 className="font-bold text-3xl">أقسام الدورة</h2>
        <p className="text-[#5A5A5A]">
          هنا يمكنك إدارة أقسام الدورة التدريبية الخاصة بك.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <TextField
          label="بحث"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="filled"
          size="small"
          margin="normal"
        />
        <NavLink to={`/courses/${course_id}/sections/create`}>
          <button className="btn btn-primary bg-primary-P300 border-primary-P200 text-white hover:bg-primary-P500 hover:border-primary-P200">
            إضافة قسم دورة
          </button>
        </NavLink>
      </div>

      <Card>
        <Table sx={{ padding: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>بطاقة تعريف</TableCell>
              <TableCell>اسم</TableCell>
              <TableCell>ملاحظات</TableCell>
              <TableCell>وصف</TableCell>
              <TableCell>أكمل</TableCell>
              <TableCell>أجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.course_getSections.map((section: any) => (
              <TableRow key={section._id}>
                <TableCell>{section._id}</TableCell>
                <TableCell>{section.title}</TableCell>
                <TableCell>{section.notes}</TableCell>
                <TableCell>{section.description}</TableCell>
                <TableCell>{section.isCompleted ? "نعم" : "لا"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <NavLink
                      to={`/courses/${course_id}/sections/edit/${section._id}`}
                    >
                      <button className="btn bg-primary-P300 p-4 text-white">
                        <RiPencilFill />
                      </button>
                    </NavLink>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default CourseSections;
