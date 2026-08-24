import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FFE4EC, #FFF5F8)",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          p: 5,
          borderRadius: "24px",
          bgcolor: "#FFF0F5",
          boxShadow: "0 10px 30px rgba(255, 105, 180, 0.15)",
          border: "1px solid #FFD6E7",
        }}
      >
       <Typography
  sx={{
    fontSize: "70px",
    mb: 2,
  }}
>
  💖
</Typography>

        <Typography
          sx={{
            fontSize: { xs: "4.5rem", md: "6rem" },
            fontWeight: 700,
            color: "#E91E63",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#C2185B",
            mt: 2,
          }}
        >
          Oops! Page Not Found
        </Typography>

        <Typography
          sx={{
            mt: 2,
            mb: 4,
            color: "#8E5A70",
            fontSize: "1rem",
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#EC407A",
            color: "#fff",
            px: 4,
            py: 1.2,
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#D81B60",
            },
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;