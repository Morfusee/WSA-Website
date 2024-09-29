import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
  colors,
  Link,
  Typography,
  useMediaQuery,
  LinearProgress,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import DesktopWaves from "../../components/DesktopWaves";
import CustomUnderlineField from "../../components/CustomUnderlineField";

function Login() {
  // Form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  // Router
  const navigate = useNavigate();

  // Hooks
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <AccessWrapper loading={loading} isMobile={isMobile}>
      <LoginForm
        {...{
          setEmail,
          setPassword,
          isMobile,
          loading,
          failed,
        }}
      />
    </AccessWrapper>
  );
}

function AccessWrapper({
  children,
  loading,
  isMobile,
}: {
  children: React.ReactNode;
  loading: boolean;
  isMobile: boolean;
}) {
  return (
    <div className="h-[100dvh] w-screen text-white">
      {/* Show loading bar */}
      {loading && !isMobile && (
        <LinearProgress sx={{ position: "absolute", width: "100%" }} />
      )}
      <div className="flex w-full h-full">
        <section className="flex flex-col xl:w-[50%] md:w-4/5 w-full overflow-y-auto">
          <div className="2xl:max-w-xl md:max-w-lg sm:p-8 p-10 m-auto z-10 rounded-lg">
            {children}
          </div>
        </section>
        {/* Right Panel */}
        <RightPanel isMobile={isMobile} />
      </div>
    </div>
  );
}

function RightPanel({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Hide this to show the other wave asset */}
      {!isMobile && (
        <section className="flex flex-col xl:w-[50%] md:w-1/5 relative">
          <DesktopWaves />
        </section>
      )}
    </>
  );
}

function LoginForm(props: any) {
  const { setEmail, setPassword, isMobile, loading, failed } = props;

  return (
    <>
      <div className="w-full flex flex-col gap-2 py-5">
        <h1 className="xl:text-5xl md:text-4xl text-2xl font-bold">
          Washing Machine
        </h1>
        <p className="xl:text-base text-gray-300">
          Sign in to your account to continue using Washing Machine
        </p>
      </div>
      <LoginFields
        setEmail={setEmail}
        setPassword={setPassword}
        isMobile={isMobile}
        loading={loading}
        failed={failed}
      />
      {/* <SignUpButton /> */}
    </>
  );
}

function LoginFields({
  setEmail,
  setPassword,
  isMobile,
  loading,
  failed,
}: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Router
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-5">
      <CustomUnderlineField
        error={failed}
        onChange={(e) => setEmail(e.target.value)}
        id="outlined-required"
        label="Email"
        variant="standard"
      />
      <CustomUnderlineField
        error={failed}
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-password-input"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        variant="standard"
        helperText={failed ? "Invalid email or password" : ""}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        // size="small"
        sx={{
          color: colors.grey[100],
          bgcolor: "primary.main",
        }}
        onClick={handleLogin}
      >
        Log In
        {isMobile && loading && (
          <CircularProgress
            sx={{
              "&.MuiCircularProgress-colorPrimary": {
                color: colors.grey[100],
              },
              position: "absolute",
              right: "5%",
            }}
            size={25}
          />
        )}
      </Button>
    </div>
  );
}

function SignUpButton() {
  return (
    <Box className="flex justify-center pt-9">
      <Typography fontSize={14}>
        Don't have an account?{" "}
        <Link underline="hover" component={RouterLink} to={"../signup"}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}

export default Login;
