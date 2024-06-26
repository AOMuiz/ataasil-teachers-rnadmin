import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { RiAddFill, RiPencilFill } from "react-icons/ri";

import React, { useState } from "react";
import { Title, useAuthenticated, useNotify } from "react-admin";
import { GET_COURSES } from "@/utils/queries";

const Courses = () => {
  useAuthenticated();

  const [filter, setFilter] = useState("");
  const { loading, error, data } = useQuery(GET_COURSES);
  const notify = useNotify();

  //TODO: filtering and search api

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
      <Title title="المعسكرات" />
      <div className="space-y-3 mb-4">
        <h2 className="font-bold text-3xl">المعسكرات</h2>
        <p className="text-[#5A5A5A]">
          لست مسجلًا في أي برنامج تدريبي حتى الآن. بإمكانك الاختيار من قائمة
          البرامج التدريبية أدناه، المقترحة لك حسب اهتماماتك.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <TextField
          label="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="filled"
          size="small"
          margin="normal"
        />
        <NavLink to="/courses/create">
          <button className="btn btn-primary bg-primary-P300 border-primary-P200  text-white hover:bg-primary-P500 hover:border-primary-P200">
            Create Course
          </button>
        </NavLink>
      </div>

      <Card>
        <Table sx={{ padding: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>بطاقة تعريف</TableCell>
              <TableCell>اسم</TableCell>
              <TableCell>وصف</TableCell>
              <TableCell>فئة</TableCell>
              <TableCell>سعر</TableCell>
              <TableCell>أجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.teacher_getCourses?.map((course: any) => (
              <TableRow key={course._id}>
                <TableCell>{course._id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <NavLink to={`/courses/${course._id}/sections`}>
                      <button className="btn bg-primary-P300 p-4 text-white">
                        <RiAddFill />
                      </button>
                    </NavLink>
                    <button className="btn bg-secondary-S300 p-4 text-white">
                      <RiPencilFill />
                    </button>
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

export default Courses;
