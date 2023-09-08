import { Box, Icon, IconButton, Stack } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useDeleteOrdersMutation, useGetAllOrdersQuery } from "../api/order";

const AllOrders = () => {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useGetAllOrdersQuery();
  const [deleteApi, { isLoading: deleteOrder }] = useDeleteOrdersMutation();

  const handleClick = async (id) => {
    try {
      const res = await deleteApi(id).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => {
        return {
          delivered: params.row.status === "Delivered",
          notDelivered: params.row.status !== "Delivered",
        };
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "itemsQuantity",
      headerName: "Items Quantity",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "Manage Orders",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Link to={`/admin/order/${params.row.id}`}>
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
    data.orders.forEach((o) => {
      rows.push({
        id: o._id,
        price: o.totalPrice,
        status: o.orderStatus,
        itemsQuantity: o.orderItems.length,
      });
    });

  return (
    <>
      {isLoading || deleteOrder ? (
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
              border={"1px solid red"}
              spacing={4}
              sx={{
                padding: { xs: "1rem", md: "2rem" },
                paddingLeft: { xs: "1rem", md: `${open ? "300px" : "30px"}` },
              }}
            >
              <AdminMenu
                setOpen={setOpen}
                title={"Orders"}
                subtitle={"List of all of our Orders"}
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

export default AllOrders;
