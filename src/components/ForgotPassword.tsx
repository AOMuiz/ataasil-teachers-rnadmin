import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useNotify } from "react-admin";
import { SEND_RESET_PASSWORD_EMAIL } from "@/utils/mutation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendResetPasswordEmail, { loading, error, data }] = useMutation(
    SEND_RESET_PASSWORD_EMAIL
  );
  const navigate = useNavigate();
  const notify = useNotify();

  const handleSendResetPasswordEmail = async () => {
    try {
      const response = await sendResetPasswordEmail({ variables: { email } });
      if (response.data.teacher_sendResetPasswordEmail.success) {
        notify("تم إرسال البريد الإلكتروني بنجاح.", { type: "success" });
        setEmail(""); // Clear the input field
      } else {
        notify(response.data.teacher_sendResetPasswordEmail.error, {
          type: "error",
        });
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
          نسيت كلمة المرور
        </Typography>
        <TextField
          label="البريد الإلكتروني"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleSendResetPasswordEmail}
            disabled={loading}
          >
            {loading ? <CircularProgress size={25} color="inherit" /> : "إرسال"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
