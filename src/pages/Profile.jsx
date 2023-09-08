import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";
import profile from "../images/userImage.png";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../api/userapi";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { logout, setCredentials } from "../api/userSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [update, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e) => {
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
    myForm.append("file", file);
    try {
      const res = await update(myForm).unwrap();
      dispatch(logout());
      dispatch(setCredentials(res.user));
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
  }, [userInfo?.email, userInfo?.name]);

  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          maxWidth={"1300px"}
          padding={"0.5rem"}
          sx={{
            margin: { xs: "5rem auto 1rem auto", md: "11rem auto 10rem auto" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
          }}
        >
          <DashBoard />
          <Stack
            p={"30px"}
            border={"1px solid black"}
            boxShadow={5}
            borderRadius={"15px"}
            flex={1}
            minHeight={"50vh"}
            gap={"0.3rem"}
          >
            <Typography variant="h2" color={"primary"}>
              My Account
            </Typography>
            <Typography>You can edit your account information</Typography>
            <Typography>In case you need any help contact us</Typography>
            <Divider />
            <Stack
              sx={{ flexDirection: { xs: "column", md: "row" } }}
              height={"100%"}
              mt={2}
            >
              <Stack
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}
                gap={2}
                pb={2}
              >
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : userInfo?.avatar?.url
                      ? userInfo?.avatar?.url
                      : profile
                  }
                  alt="profile"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
              </Stack>
              <Stack
                component={"form"}
                onSubmit={handleSubmit}
                flex={1}
                gap={2}
                justifyContent={"center"}
              >
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label={"Name"}
                />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label={"Email"}
                />
                <TextField onChange={handleChange} type={"file"} />
                <Button type={"submit"} variant={"contained"}>
                  Update
                </Button>
              </Stack>
            </Stack>
            <Divider />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Profile;
