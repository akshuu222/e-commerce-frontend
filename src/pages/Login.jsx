import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../api/userapi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../api/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = () => {
  const { userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          maxWidth={"1100px"}
          padding={"2rem"}
          sx={{
            margin: { xs: "5rem auto 1rem auto", md: "11rem auto 10rem auto" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
            minHeight: "50vh",
          }}
        >
          <Stack
            flex={1}
            justifyContent={"center"}
            spacing={2}
            textAlign={"center"}
          >
            <Typography variant="h1" color={"primary"} fontWeight={600}>
              Welcome Back
            </Typography>
            <Typography color={"grey"} fontWeight={200}>
              To keep connected with us please
            </Typography>
            <Typography color={"grey"} fontWeight={200}>
              login with your personal info
            </Typography>
          </Stack>
          <Stack
            component={"form"}
            onSubmit={handleSubmit}
            flex={1}
            justifyContent={"center"}
            spacing={2}
          >
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"Enter email"}
            />
            <TextField
              value={password}
              onChange={(e) => setPasswod(e.target.value)}
              label={"Enter password"}
            />
            <Button type={"submit"} variant={"contained"}>
              Sign in
            </Button>
            <Stack>
              <Link to={"/register"} >
                <Typography sx={{textDecoration:"underline"}} >
                  Don't have an account ? <span>Sign up</span>
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Login;
