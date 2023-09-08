import { Box, Icon, IconButton, Stack } from "@mui/material";

import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useDeleteuserMutation, useGetAllUsersQuery } from "../api/adminUsers";
import AdminSidebar from "./AdminSidebar";
import AdminMenu from "./AdminMenu";

const AllUsers = () => {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useGetAllUsersQuery();
  const [deleteUser , {isLoading:deleteUserLoading}] = useDeleteuserMutation()

  const handleClick = async (id) => {
    try {
      const res = await deleteUser(id).unwrap()
      toast.success(res.message)
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "User Name",
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "XYZ",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Link to={`/admin/edituser/${params.row.id}`}>
              <Icon>
                <EditIcon />
              </Icon>
            </Link>
            <IconButton onClick={() => handleClick(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const rows = [];

  data &&
    data?.users?.forEach((u) => {
      rows.push({
        id: u?._id,
        name: u?.name,
        email: u?.email,
        role: u?.role,
      });
    });

  return (
    <>
      {isLoading || deleteUserLoading ? (
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
          {isLoading ? (
            <Loading />
          ) : (
            <Stack
              minHeight={"100vh"}
              flex={1}
              margin="0rem auto 10rem auto"
              spacing={4}
              sx={{
                padding: { xs: "1rem", md: "2rem" },
                paddingLeft: { xs: "1rem", md: `${open ? "300px" : "30px"}` },
              }}
            >
              <AdminMenu
                setOpen={setOpen}
                title={"Users"}
                subtitle={"List of all Users in our store"}
              />
              <Box overflow={"auto"}>
                <DataGrid rows={rows} columns={columns} />
              </Box>
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};

export default AllUsers;
