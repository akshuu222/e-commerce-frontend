import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllOrdersQuery, useUpdateOrderMutation } from "../api/order";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import AdminSidebar from "./AdminSidebar";
import AdminMenu from "./AdminMenu";

const EditOrder = () => {
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { order } = useGetAllOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      order: data?.orders?.find((o) => o._id === id),
    }),
  });

  const [orderApi, { isLoading }] = useUpdateOrderMutation();

  const [processOrder, setProcessOrder] = useState("");

  const address = `${order?.shippingInfo.address} ${order?.shippingInfo.city} ${order?.shippingInfo.state} ${order?.shippingInfo.country} ${order?.shippingInfo.pinCode}`;

  const theme = useTheme();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await orderApi({
        id: order._id,
        status: processOrder,
      }).unwrap();
      toast.success(res.message);
      navigate("/admin/orders");
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
            spacing={4}
            sx={{
              padding: { xs: "1rem", md: "2rem" },
              paddingLeft: { xs: "1rem", md: `${open ? "300px" : "30px"}` },
            }}
          >
            <AdminMenu
              setOpen={setOpen}
              title={"Edit Orders"}
              subtitle={"Dispatch the orders"}
            />
            <OuterContainer
              sx={{
                display: { xs: "flex", md: "grid" },
                
                flexDirection: { xs: "column", lg: "none" },
              }}
            >
              <Stack p={1} spacing={5}>
                <Stack width={"100%"}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    fontWeight={600}
                    color={"primary"}
                  >
                    Shipping Info
                  </Typography>
                  <Stack pl={0}>
                    <Stack
                      width={"100%"}
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                    >
                      <Typography variant={"subtitle1"}>Name :</Typography>
                      <Typography
                        fontWeight={"600"}
                        color={"primary"}
                        variant="subtitle1"
                      >
                        {order?.user?.name?.toUpperCase()}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      <Typography variant="subtitle1">Phone :</Typography>
                      <Typography
                        fontWeight={"600"}
                        color={"primary"}
                        variant="subtitle1"
                      >
                        {order?.shippingInfo?.phoneNo}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      <Typography variant="subtitle1">Address :</Typography>
                      <Typography
                        fontWeight={"600"}
                        color={"primary"}
                        variant="subtitle1"
                      >
                        {address}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack>
                  <Typography
                    gutterBottom
                    fontWeight={600}
                    variant="h4"
                    color={"primary"}
                  >
                    Payment
                  </Typography>

                  {order?.paymentInfo?.status ? (
                    <Typography gutterBottom variant={"h4"} color={"green"}>
                      Paid
                    </Typography>
                  ) : (
                    <Typography gutterBottom variant={"h4"} color={"red"}>
                      Not Paid
                    </Typography>
                  )}
                  <Typography variant="h4">
                    Amount : {order?.totalPrice}
                  </Typography>
                </Stack>

                <Stack>
                  <Typography
                    gutterBottom
                    fontWeight={600}
                    variant="h4"
                    color={"primary"}
                  >
                    Your Cart Items
                  </Typography>
                  {order?.orderStatus === "Delivered" && (
                    <Typography variant="h4" color={"green"}>
                      Delivered
                    </Typography>
                  )}
                  {order?.orderStatus === "Shipped" && (
                    <Typography variant="h4" color={"red"}>
                      Shipped
                    </Typography>
                  )}
                  {order?.orderStatus === "Processing" && (
                    <Typography variant="h4" color={"red"}>
                      Processing
                    </Typography>
                  )}
                </Stack>

                <Stack>
                  <Typography
                    gutterBottom
                    fontWeight={600}
                    variant="h4"
                    color={"primary"}
                  >
                    Your Cart Items
                  </Typography>
                  <Stack spacing={2} p={2} justifyContent={"center"}>
                    {order?.orderItems.map((item, index) => (
                      <Stack
                        key={index}
                        sx={{ flexDirection: { xs: "column", lg: "row" } }}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <Stack
                          sx={{ flexDirection: { xs: "column", lg: "row" } }}
                          alignItems={"center"}
                          flex={2}
                          justifyContent={"space-between"}
                          spacing={2}
                        >
                          <img
                            src={item?.image?.url}
                            alt="shoes"
                            style={{
                              width: "300px",
                              height: "200px",
                              objectFit: "contain",
                              border: `1px solid ${theme.palette.primary.main}`,
                              borderRadius: "15px",
                            }}
                          />
                          <Typography
                            variant="h5"
                            color={"primary"}
                            fontWeight={600}
                          >
                            {item.name}
                          </Typography>
                        </Stack>
                        <Stack flex={1} alignItems={"flex-end"}>
                          <Typography
                            variant={"subtitle1"}
                            color={"primary"}
                            fontWeight={600}
                          >
                            {item.quantity}X{item.price} = $
                            {item.quantity * item.price}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              {/* 2nd */}
              <Stack
                pt={2}
                alignItems={"center"}
                justifyContent={"center"}
                borderLeft={"2px solid black"}
                sx={{
                  position: { xs: "static", md: "sticky" },
                  borderTop: { xs: "2px solid black", md: "none" },
                  borderLeft: { xs: "none", md: "2px solid black" },
                }}
                top={"13%"}
                maxHeight={"370px"}
              >
                {order?.orderStatus === "Delivered" ? (
                  <Typography
                    variant="h4"
                    fontWeight={500}
                    color={theme.palette.primary.main}
                  >
                    Order Delivered Successfully
                  </Typography>
                ) : (
                  <Stack gap={5} component={"form"} onSubmit={handlesubmit}>
                    <Typography
                      variant="h2"
                      fontWeight={600}
                      textAlign={"center"}
                      color={theme.palette.primary.main}
                    >
                      Select Type
                    </Typography>
                    <TextField
                      value={processOrder}
                      onChange={(e) => setProcessOrder(e.target.value)}
                      fullWidth
                      select
                      label={"edit Processing"}
                    >
                      <MenuItem value="">Select order</MenuItem>
                      {order?.orderStatus === "Processing" && (
                        <MenuItem value="Shipped">Shipped</MenuItem>
                      )}
                      {order?.orderStatus === "Shipped" && (
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </TextField>
                    <Button
                      disabled={processOrder ? false : true || isLoading}
                      type={"submit"}
                      variant={"contained"}
                    >
                      Submit
                    </Button>
                  </Stack>
                )}
              </Stack>
            </OuterContainer>
          </Stack>
        </Box>
      )}
    </>
  );
};

const OuterContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "1rem",
  margin: "1rem 0",
  display: "grid",
  gridTemplateColumns: "6fr 3fr",
  gap: "1rem",
}));

export default EditOrder;
