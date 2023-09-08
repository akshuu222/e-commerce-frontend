import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import profile from "../images/userImage.png";
import Loading from "../components/Loading";
import { useRegisterMutation } from "../api/userapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../api/userSlice";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  });

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setFile(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", file);
    try {
      const res = await register(myForm).unwrap();
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
          <Stack flex={1} justifyContent={"center"} spacing={2}>
            <Typography variant="h1" color={"primary"} fontWeight={600}>
              Hello, Friend!
            </Typography>
            <Typography color={"grey"} fontWeight={200}>
              Enter your personal details and start your journey with us
            </Typography>
            <img
              src={imagePreview ? imagePreview : profile}
              alt="profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%",
                border: `1px solid ${theme.palette.primary.main}`,
                alignSelf: "center",
              }}
            />
          </Stack>
          <Stack
            component={"form"}
            onSubmit={handleSubmit}
            flex={1}
            justifyContent={"center"}
            spacing={2}
          >
            <TextField
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              label={"Enter name"}
            />
            <TextField
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label={"Enter email"}
            />
            <TextField
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label={"Enter password"}
            />
            <TextField
              type={"file"}
              placeholder="Choose Profile"
              sx={{ boxSizing: "border-box" }}
              onChange={handleFileChange}
            />
            <Button type={"submit"} variant={"contained"}>
              Sign up
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Register;
