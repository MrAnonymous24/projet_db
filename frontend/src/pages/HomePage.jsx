
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn = async (provider, formData, navigate) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      navigate("/teacher-dashboard"); // Redirection vers le tableau de bord
    }, 300);
  });
  return promise;
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData, navigate)}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
