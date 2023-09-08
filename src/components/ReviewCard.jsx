import {
  Avatar,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const ReviewCard = ({review}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        minWidth: "350px",
        maxWidth: "400px",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <Stack gap={2} alignItems={"flex-start"}>
          <Stack direction={"row"} spacing={2}>
            <Avatar>{review?.name[0]}</Avatar>
            <Stack>
              <Typography>{review?.name}</Typography>
              <Typography>{new Date(review?.postedon)?.toDateString()}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Rating readOnly value={Number(review?.rating)} />
          </Stack>
          <Stack>
            {review?.comment}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
