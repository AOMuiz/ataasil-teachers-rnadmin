import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DateInput, minValue, useAuthenticated, useNotify } from "react-admin";
import { EDIT_PROFILE } from "@/utils/mutation";

const CreateCourse = () => {
  const [username, setUsername] = useState("");
  const [editProfile, { loading, error, data }] = useMutation(EDIT_PROFILE);
  const notify = useNotify();
  useAuthenticated();

  const handleSave = async () => {
    try {
      const response = await editProfile({ variables: { username } });
      if (response.data.teacher_editProfile.success) {
        notify("تم تحديث الملف الشخصي بنجاح", { type: "success" });
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("user") as string),
          username: response.data.teacher_editProfile.data.username,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUsername(response.data.teacher_editProfile.data.username);
      } else {
        notify(response.data.teacher_editProfile.error, { type: "error" });
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
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}
        <TextField
          label="Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}
        <TextField
          label="Category"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}
        <TextField
          label="Price"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}

        <TextField
          label="Banner"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}

        <TextField
          label="Session Link"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}
        <TextField
          label="Session Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}

        <TextField
          label="Timezone"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2">
            حدث خطأ. يرجى المحاولة مرة أخرى.
          </Typography>
        )}

        {/* <DateInput source='published' validate={minValue('2022-10-26')} /> */}
        <input type="date" onChange={() => null} />

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
