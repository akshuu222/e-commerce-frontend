import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";
import { useGetMyOrderQuery } from "../api/order";

const MyOrders = () => {
  const { data, isLoading } = useGetMyOrderQuery();

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
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          maxWidth={"1300px"}
          padding={"0.5rem"}
          p={2}
          sx={{
            margin: { xs: "4rem auto 1rem auto", md: "7rem auto 2rem auto" },
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <Stack
              minHeight={"100vh"}
              flex={1}
              margin="0rem auto 10rem auto"
              spacing={4}
            >
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

export default MyOrders;
