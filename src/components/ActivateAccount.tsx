import * as React from "react";
import { useState } from "react";
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
import { ACTIVATE_ACCOUNT } from "@/utils/mutation";

const ActivateAccount = () => {
  const { id: token } = useParams(); // Get the token from the URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activateAccount, { loading, error }] = useMutation(ACTIVATE_ACCOUNT);
  const notify = useNotify();
  const navigate = useNavigate();

  const handleActivate = async () => {
    if (password !== confirmPassword) {
      notify("كلمات المرور غير متطابقة.", { type: "error" });
      return;
    }

    try {
      const response = await activateAccount({
        variables: { token, password },
      });
      if (response.data.teacher_activateAccount.success) {
        notify("تم تفعيل الحساب بنجاح.", { type: "success" });
        navigate("/login"); // Redirect to the login page
      } else {
        notify(response.data.teacher_activateAccount.error, { type: "error" });
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
          تفعيل الحساب
        </Typography>
        <TextField
          label="كلمة المرور"
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
            onClick={handleActivate}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              "تفعيل الحساب"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
