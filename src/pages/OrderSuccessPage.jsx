import { Button, Container, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const OrderSuccess = () => {
  return (
    <Container maxWidth={"xl"} sx={{ height: "100vh",display:"flex",alignItems:"center",justifyContent:"center" }}>
      <Stack alignItems={"center"} spacing={1}>
        <Icon sx={{ width: "200px", height: "200px", display:"flex" , alignItems:"center",justifyContent:"center" }}>
          <CheckCircleOutlineIcon color="primary" sx={{fontSize:"13rem"}} />
        </Icon>
        <Typography textAlign={"center"} color={"primary"} fontWeight={800}  variant="h4"  >Your Order Has Been Placed Successfully!</Typography>
        <Link to={"/myorders"} style={{marginTop:"1.5rem"}} >
          <Button size={"large"} variant="contained" >View Your Orders</Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default OrderSuccess;
