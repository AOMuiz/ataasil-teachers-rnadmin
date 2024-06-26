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
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Title, useAuthenticated, useNotify } from "react-admin";
import { GET_COURSES } from "@/utils/queries";

const Courses = () => {
  useAuthenticated();

  const [filter, setFilter] = useState("");
  const { loading, error, data } = useQuery(GET_COURSES);
  const notify = useNotify();

  //TODO: filtering and search api

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    notify("حدث خطأ. يرجى المحاولة مرة أخرى.", { type: "error" });
  }

  return (
    <Box minHeight="100%" padding="20px">
      <Title title="Book list" />
      <TextField
        label="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        variant="filled"
        size="small"
        margin="normal"
      />

      <Card>
        <Table sx={{ padding: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.teacher_getCourses?.map((course: any) => (
              <TableRow key={course._id}>
                <TableCell>{course._id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default Courses;
