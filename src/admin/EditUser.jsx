import { Box, Stack, TextField, Button, MenuItem } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useUpdateAdminUserMutation,
} from "../api/adminUsers";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useGetAllUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.users?.find((u) => u._id === id),
    }),
  });

  const [update, { isLoading }] = useUpdateAdminUserMutation();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setRole(user?.role);
  }, [user?.name, user?.email, user?.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("role", role);

    try {
      const res = await update({ id: user._id, myForm }).unwrap();
      toast.success(res.message);
      setName("");
      setEmail("");
      setRole("");
      navigate("/admin/users");
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
          sx={{
            display: { xs: "flex", md: "block" },
            flexDirection: { xs: "column", md: "none" },
            alignItems: { xs: "center", md: "none" },
          }}
        >
          <AdminSidebar open={open} setOpen={setOpen} />
          <Stack
            minHeight={"100vh"}
            flex={1}
            margin="0rem auto 10rem auto"
            border={"1px solid red"}
            spacing={4}
            sx={{
              padding: { xs: "1rem", md: "2rem" },
              paddingLeft: { xs: "1rem", md: `${open ? "300px" : "30px"}` },
            }}
          >
            <AdminMenu
              setOpen={setOpen}
              title={"Update User"}
              subtitle={"Fill Details of the user"}
            />
            <Stack
              gap={2}
              width={"100%"}
              sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
              <Stack
                onSubmit={handleSubmit}
                component={"form"}
                flex={1}
                gap={2}
              >
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label={"Name"}
                />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type={"text"}
                  label={"Email"}
                />
                <TextField
                  select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={""}>Select Role</MenuItem>
                  <MenuItem value={"admin"}>admin</MenuItem>
                  <MenuItem value={"user"}>user</MenuItem>
                </TextField>
                <Button
                  disabled={role ? false : true}
                  type={"submit"}
                  variant={"contained"}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default EditUser;
