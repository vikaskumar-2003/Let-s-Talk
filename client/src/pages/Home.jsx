import React from "react";
import AppLayout from "../component/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constant/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant="h5" sx={{textAlign:"center"}}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);