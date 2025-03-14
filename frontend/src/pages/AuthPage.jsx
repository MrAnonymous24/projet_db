import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and password' }];

const signIn = async (provider, formData, navigate) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = formData?.get('email');
      const password = formData?.get('password');
      // Simulez une connexion
      if (email == "smgueye90@gmail.com" && password == "passer") {
        resolve();
        navigate("/teacher-dashboard");
      } else {
        resolve({
          type: 'CredentialsSignin',
          error: 'Invalid credentials.',
        });
      }
    }, 300);
  });
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={(provider, formData) => signIn(provider, formData, navigate)}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
  );
}

