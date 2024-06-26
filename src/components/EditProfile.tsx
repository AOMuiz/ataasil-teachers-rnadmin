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
import { useAuthenticated, useNotify } from "react-admin";
import { EDIT_PROFILE } from "@/utils/mutation";
import nookies from "nookies";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [editProfile, { loading, error, data }] = useMutation(EDIT_PROFILE);
  const notify = useNotify();
  useAuthenticated();

  useEffect(() => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const { data } = JSON.parse(auth);
      const { username } = data?.teacher_login?.data;
      setUsername(username);
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await editProfile({ variables: { username } });
      if (response.data.teacher_editProfile.success) {
        notify("تم تحديث الملف الشخصي بنجاح", { type: "success" });
        const auth = nookies.get()["auth"];
        if (auth) {
          const { data } = JSON.parse(auth);
          const user = data.teacher_login.data;
          const updatedUser = {
            ...user,
            username: response.data.teacher_editProfile.data.username,
          };

          //TODO: UPDATE THIS TO FOX LOCAL MAPPING OF UPDATEDuSER
          nookies.set(null, "auth", JSON.stringify(updatedUser), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            strict: true,
          });

          setUsername(response.data.teacher_editProfile.data.username);
        }
      } else {
        notify(response.data.teacher_editProfile.error, { type: "error" });
      }
    } catch (err) {
      notify("حدث خطأ. يرجى المحاولة مرة أخرى.", { type: "error" });
      console.error(err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box width="100%" maxWidth={800} p={4}>
        <Typography variant="h4" align="center" gutterBottom>
          تعديل الملف الشخصي
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <TextField
            label="اسم المستخدم"
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
                "حفظ التغييرات"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
