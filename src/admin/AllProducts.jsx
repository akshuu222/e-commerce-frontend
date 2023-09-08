import { Box, Icon, IconButton, Stack } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../api/productsapi";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useGetAllProductsQuery();

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const handleClick = async (id) => {
    try {
      const res = await deleteProduct(id).unwrap()
      toast.success(res.message)
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, flex: 1 },
    {
      field: "name",
      headerName: "Product Name",
      editable: true,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "XYZ",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={2} >
            <Link to={`/admin/editproduct/${params.row.id}`}>
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
    data.products.forEach((p) => {
      rows.push({
        id: p._id,
        name: p.name,
        price: p.price,
        stock: p.stock,
      });
    });

  return (
    <>
      {isLoading || deleteLoading ? (
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
                title={"Products"}
                subtitle={"List of all product in our store"}
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

export default AllProducts;
