import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import AdminSidebar from "./AdminSidebar";
import TotalCounts from "./TotalCounts";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useState } from "react";
import GeoChart from "./GeoChart";
import AdminMenu from "./AdminMenu";
import { useGetAllProductsQuery } from "../api/productsapi";
import { useGetAllOrdersQuery } from "../api/order";
import { useGetAllUsersQuery } from "../api/adminUsers";
import Loading from "../components/Loading";
import { useTheme } from "@mui/material/styles";

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);

  const theme = useTheme();

  const { data: products, isLoading: productLoading } =
    useGetAllProductsQuery();
  const { data: orders, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();

  const ismd = useMediaQuery(theme.breakpoints.down("md"));
  console.log(ismd);

  return (
    <>
      {productLoading || ordersLoading || usersLoading ? (
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
            margin="0rem auto 1rem auto"
            spacing={10}
            sx={{
              padding: { xs: "0.5rem", md: "2rem" },
              paddingLeft: { xs: "1rem", md: `${open ? "300px" : "30px"}` },
            }}
          >
            <AdminMenu
              setOpen={setOpen}
              title={"Hello admin"}
              subtitle={"Here's what's happening in your store today"}
            />
            <TotalCounts
              products={products?.products?.length}
              orders={orders?.orders?.length}
              users={users?.users?.length}
              earned={orders?.totalAmount}
            />
            <Box
              height={ismd ? "35vh" : "60vh"}
              width={"100%"}
              sx={{
                padding: { xs: "0", md: "3rem" },
              }}
            >
              <Typography
                variant={"h4"}
                fontWeight={600}
                color={"primary"}
                gutterBottom
              >
                Number of orders in last 7 days
              </Typography>
              <LineChart ismd={ismd} orders={orders?.noOfOrdersByDate} />
            </Box>
            <Box
              height={ismd ? "45vh" : "60vh"}
              width={"100%"}
              mt={5}
              sx={{
                padding: { xs: "0", md: "3rem" },
              }}
            >
              <PieChart ismd={ismd} products={products?.cat} />
            </Box>
            <Box
              height={ismd ? "50vh" : "80vh"}
              width={"100%"}
              mt={5}
              sx={{
                padding: { xs: "0", md: "0rem" },
              }}
              overflow={"auto"}
            >
              <Typography
                variant={"h4"}
                fontWeight={600}
                color={"primary"}
                gutterBottom
              >
                Number of orders across globe
              </Typography>
              <GeoChart orders={orders?.groupByCountry} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default AdminDashboard;
