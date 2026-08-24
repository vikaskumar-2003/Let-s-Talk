import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useState } from "react";
import { VisuallyHidden } from "../component/styles/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../lib/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(!isLogin);

  const name=useInputValidation("")
  const username=useInputValidation("",usernameValidator)
  const bio=useInputValidation("")
  const password=useInputValidation("")
  const avatar=useFileHandler("single",)

  const handleLogin=(e)=>{e.preventDefault()}
  const handleSignup=(e)=>{e.preventDefault()}

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            {" "}
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleLogin} style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              <TextField
                required
                fullWidth
                
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />

              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
              <Typography
                sx={{
                  mt: "1rem",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                OR
              </Typography>
              <Button
                sx={{
                  marginTop: "0.5rem",
                }}
                variant="text"
                fullWidth
                onClick={toggleLogin}
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          //sign up
          <span>
            <Typography
              sx={{ width: "100%", textAlign: "center" }}
              variant="h5"
            >
              Sign UP
            </Typography>
            <form onSubmit={handleSignup} style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Name"
                value={name.value}
                onChange={name.changeHandler}
                margin="normal"
                variant="outlined"
              />

              <TextField
                required
                fullWidth
                label="Username"
                value={username.value}
                onChange={username.changeHandler}
                margin="normal"
                variant="outlined"
              />

              { username.error&&(

                  <Typography color="error" variant="caption">
                    enter only number and alphabets
                  </Typography>

              )}
               
                <TextField
                required
                fullWidth
                label="Bio"
                value={bio.value}
                onChange={bio.changeHandler}
                margin="normal"
                variant="outlined"
              />

              <Stack
                position="relative"
                width="10rem"
                height="10rem"
                margin="auto"
              >
               <Box
  sx={{
    position: "relative",
    width: "10rem",
    height: "10rem",
    margin: "auto",
  }}
>
  <Avatar
    sx={{
      width: "100%",
      height: "100%",
      
    }}
    src={avatar.preview}
  />


    { avatar.error&&(

                  <Typography m={"1rem"} color="error" variant="caption">
                  {avatar.error}
                  </Typography>

              )}


  <IconButton
    component="label"
    sx={{
      position: "absolute",
      bottom: 0,
      right: 0,
      color:"white",
      transform: "translate(25%, 25%)",
      bgcolor: "rgba(0,0,0,0.4)",
      "&:hover":{
        bgcolor:"rgba(0, 0, 0, 0.75)"
      },
      boxShadow: 2,
      zIndex: 10,
    }}
  >
    <CameraAltIcon />
    <VisuallyHidden type="file" accept="image/*" onChange={avatar.changeHandler} />
  </IconButton>
</Box>
              </Stack>

              <TextField
                required
                fullWidth
                value={password.value}
                onChange={password.changeHandler}
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />

             

              <Button
                sx={{
                  marginTop: "1rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign UP
              </Button>
              <Typography
                sx={{
                  mt: "1rem",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                OR
              </Typography>
              <Button
                sx={{
                  marginTop: "0.5rem",
                }}
                variant="text"
                fullWidth
                onClick={toggleLogin}
              >
                Login
              </Button>
            </form>
          </span>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
