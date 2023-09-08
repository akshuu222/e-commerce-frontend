import { Button, Icon, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { icons } from "../components/Footer";

const Contact = () => {
  return (
    <Stack
      maxWidth={"400px"}
      padding={"2rem"}
      sx={{
        margin: { xs: "5rem auto 1rem auto", md: "6rem auto 10rem auto" },
      }}
      gap={"1rem"}
    >
      <Typography
        textAlign={"center"}
        variant={"h3"}
        fontWeight={600}
        color={"primary"}
        gutterBottom
      >
        Contact Form
      </Typography>
      <Stack gap={2}>
        <TextField label={"Name"} />
        <TextField label={"Email"} />
        <TextField label={"Phone"} />
        <TextField label={"Query"} />
        <Button variant={"contained"}>Submit</Button>
        <Typography variant={"h4"} fontWeight={500}>
          My Links
        </Typography>
        <Stack direction={"row"} spacing={4}>
          {icons?.map((i, index) => (
            <a href={i.link} key={index}>
              <Icon sx={{ cursor: "pointer" }}>{i.icon}</Icon>
            </a>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contact;
