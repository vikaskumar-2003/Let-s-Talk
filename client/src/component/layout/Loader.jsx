import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const LayoutLoader = () => {
  return (
    <>
      <Grid
        container
        sx={{
          height: "calc(100vh - 4rem)",
        }}
        spacing={"1rem"}
      >
        <Grid size={3} sx={{ display: { sm: "block", xs: "none" } }}>
          <Skeleton variant="rectangular" height={"100%"} />
        </Grid>

        <Grid size={7}>
          <Stack spacing={"1rem"}>

              {Array.from({length:10}).map((_,index)=>(
           <Skeleton key={index} variant="rectangular" height={"5rem"} />
        ))}

          </Stack>
       
        </Grid>

        <Grid size={2} sx={{ display: { md: "block", xs: "none" } }}>
          <Skeleton variant="rectangular" height={"100%"} />
        </Grid>
      </Grid>
    </>
  );
};

export default LayoutLoader;
