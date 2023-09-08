import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import DashBoard from "../components/DashBoard";
import { useUpdatePasswordMutation } from "../api/userapi";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const EditPassword = () => {
  const theme = useTheme();
  const [oldpassword, setOldpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmpassword !== newpassword) {
      toast.error("Password DoesNot Match");
      return;
    }
    const myForm = new FormData();
    myForm.append("oldpassword", oldpassword);
    myForm.append("confirmpassword", confirmpassword);
    myForm.append("newpassword", newpassword);
    try {
      const res = await updatePassword(myForm).unwrap();
      toast.success(res.message);
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
          maxWidth={"1300px"}
          padding={"0.5rem"}
          sx={{
            margin: { xs: "5rem auto 5rem auto", md: "11rem auto 10rem auto" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "1rem",
          }}
        >
          <DashBoard />
          <Stack
            pl={"30px"}
            border={"1px solid grey"}
            flex={1}
            minHeight={"50vh"}
            justifyContent={"center"}
            padding={"1rem"}
            boxSizing={"border-box"}
            sx={{
              flexDirection: { xs: "column", md: "row" },
            }}
            gap={"1rem"}
            direction={"row"}
            boxShadow={5}
            borderRadius={"15px"}
          >
            <Stack
              flex={1}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"1rem"}
            >
              <Typography
                variant="h2"
                fontWeight={600}
                color={theme.palette.primary.main}
              >
                Choose New Password
              </Typography>
              <Typography>
                Almost done. Enter your new password and you are all set
              </Typography>
            </Stack>
            <Stack
              onSubmit={handleSubmit}
              component={"form"}
              flex={1}
              gap={2}
              justifyContent={"center"}
            >
              <TextField
                value={oldpassword}
                onChange={(e) => setOldpassword(e.target.value)}
                label="Enter Your Password"
              />
              <TextField
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
                label="Enter Your New Password"
              />
              <TextField
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                label="Confirm Password"
              />
              <Button type={"submit"} variant={"contained"}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default EditPassword;
