import { Box, Stack, Typography } from "@mui/material";
import React, { useLayoutEffect } from "react";
import CommentsCard from "./CommentsCard";

const About = () => {
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Box
      maxWidth={"1100px"}
      padding={"2rem"}
      sx={{
        margin: { xs: "5rem auto 1rem auto", md: "6rem auto 10rem auto" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "1rem",
        minHeight: "50vh",
      }}
    >
      <Stack width={"100%"} gap={"2rem"}>
        <Stack width={"100%"}>
          <Typography variant={"h3"} fontWeight={600} gutterBottom>
            OUR COMPANY
          </Typography>
          <Typography
            variant={"h4"}
            gutterBottom
            color={"primary"}
            fontWeight={600}
          >
            We are Building The Destination For Getting Things Done
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
            deserunt voluptas rem at, consequatur quas rerum? Iure velit, saepe
            doloremque perspiciatis provident molestias at suscipit quas animi
            tempora corporis quasi, deleniti dignissimos. Pariatur impedit enim
            error voluptates totam voluptatum possimus iure commodi? Ullam fuga
            ratione, suscipit sequi nam, quibusdam temporibus fugiat animi culpa
            beatae optio vel! Est iste ut nostrum quos a? Voluptatibus possimus
            sint modi nihil amet beatae, nemo dolores accusantium nulla qui ex
            doloremque exercitationem unde nobis inventore iste fugit mollitia!
            Nisi ex dolorem blanditiis excepturi, error culpa molestias sunt
            iste? Quo, ad velit consequatur voluptate saepe maiores cupiditate
            dolor facilis asperiores necessitatibus, officia fuga, temporibus
            harum laudantium. Exercitationem in tempore accusamus mollitia quis
            autem, delectus molestiae sapiente facere consequuntur nisi,
            pariatur voluptatem rerum natus perspiciatis dolore sequi vero
            deserunt alias quos possimus esse. Similique impedit molestias
            repellat. Tempora sunt quae accusantium reprehenderit, error
            deleniti excepturi esse similique aut voluptates veritatis ipsam
            iure eum beatae? Molestiae, natus odit error aut accusamus deleniti
            autem sint unde nulla ipsa numquam voluptatem quidem velit, quisquam
            hic nostrum molestias corrupti earum eveniet aspernatur, doloribus
            sequi! Natus sint et minima quod quo? Accusamus veritatis ea iure in
            id consequuntur similique rem! Vero, consequuntur.
          </Typography>
        </Stack>
        <Stack>
          <Typography
            gutterBottom
            variant={"h3"}
            fontWeight={600}
            color={"primary"}
          >
            People About Us
          </Typography>
          <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
            <CommentsCard />
            <CommentsCard />
            <CommentsCard />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default About;
