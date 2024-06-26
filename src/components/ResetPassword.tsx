import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNotify } from "react-admin";
import { RESET_PASSWORD } from "@/utils/mutation";

const ResetPassword = () => {
  const { id: token } = useParams(); // Get the token from the URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);
  const notify = useNotify();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (password !== confirmPassword) {
      notify("كلمات المرور غير متطابقة.", { type: "error" });
      return;
    }

    try {
      const response = await resetPassword({ variables: { token, password } });
      if (response.data.teacher_resetPassword.success) {
        notify("تم إعادة تعيين كلمة المرور بنجاح.", { type: "success" });
        navigate("/login"); // Redirect to the login page
      } else {
        notify(response.data.teacher_resetPassword.error, { type: "error" });
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
      <Box width="100%" maxWidth={600} p={4}>
        <Typography variant="h4" align="center" gutterBottom>
          إعادة تعيين كلمة المرور
        </Typography>
        <TextField
          label="كلمة المرور الجديدة"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="تأكيد كلمة المرور"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              "إعادة تعيين"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
