import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { db } from "../firebase-serverless-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import AWS from "aws-sdk";
// import Example from './modal';
import { Alert } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const axios = require("axios");

const theme = createTheme();
var error = {};

export default function SignIn() {
  let navigate = useNavigate();
  const [review, setReview] = useState();
  let currentUser = JSON.parse(localStorage.getItem("BB_USER"));

  const handleSubmit = async (event) => {
    if (currentUser) {
      event.preventDefault();

      axios
        .post(
          "https://us-central1-coherent-racer-356519.cloudfunctions.net/function-1",
          {
            user_email: currentUser.email,
            feedback: review,
          }
        )
        .then((res) => {
          console.log(res.body);
          if (res) {
            Swal.fire({
              // title: "Error!",
              text: "Review posted successfully!!",
              icon: "info",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        // title: "Error!",
        text: "Please Login or signup to book tour",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(function () {
        window.location = "/login";
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Provide your feedback
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              rows={3}
              fullWidth
              multiline
              id="email"
              label="Enter review"
              name="email"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Typography type="body2">
              Go back to <a href="/">dashboard</a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
