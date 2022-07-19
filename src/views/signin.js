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
import { db } from "./firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import AWS from "aws-sdk";
// import Example from './modal';
import { Alert } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
const axios = require("axios");
window.Buffer = window.Buffer || require("buffer").Buffer;

const poolData = {
  UserPoolId: "us-east-1_SUWtuJFu8",
  ClientId: "1i89dklc6akcahj5ss1u2njsfr",
};

const UserPool = new CognitoUserPool(poolData);

const theme = createTheme();
var error = {};

export default function SignIn() {
  let navigate = useNavigate();

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  var Question1 = "What’s your favorite Movie?";
  var Question2 = "What’s your favorite Food?";
  var Question3 = "What’s your favorite Person?";
  var CurQuestion = "";
  var RandomNum = Math.floor(Math.random() * (3 - 1)) + 1;
  if (RandomNum === 1) CurQuestion = Question1;
  if (RandomNum === 2) CurQuestion = Question2;
  if (RandomNum === 3) CurQuestion = Question3;
  const [fireuser, getUser] = useState([]);
  const [UserCipher, setUserCipher] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    //  Getting the form Data
    const UserData = new FormData(event.currentTarget);
    const user = new CognitoUser({
      Username: UserData.get("email"),
      Pool: UserPool,
    });
    const userDetails = new AuthenticationDetails({
      Username: UserData.get("email"),
      Password: UserData.get("password"),
    });

    const getusers = async () => {
      const userDoc = collection(db, "userDetails");
      const data = await getDocs(userDoc);
      console.log(data);
      getUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(fireuser);
    };
    user.authenticateUser(userDetails, {
      onSuccess: (data) => {
        getusers();
        fireuser.map((user) => {
          if (user.email === UserData.get("email")) {
            console.log("User Logged");
            console.log(user.ceasercipherKey);
            axios
              .get(
                "https://us-central1-csci5410-assignmnet4.cloudfunctions.net/group-18?" +
                  "text=ABC&" +
                  `key=${user.ceasercipherKey}`,
                config
              )
              .then((resp) => {
                console.log(resp.data.output);
                setUserCipher((data) => resp.data.output);
              });
            console.log(UserCipher.toString());
            if (`Question${RandomNum}` === "Question1") {
              if (
                user.Question1.toString() ===
                  UserData.get("question").toString() &&
                UserData.get("ceaser").toString() === UserCipher.toString()
              ) {
                console.log(UserData.get("ceaser").toString());
                navigate("/dashboard", {
                  state: {
                    cognito_name: data.idToken.payload["cognito:username"],
                    email_id: data.idToken.payload["email"],
                  },
                });
              } else {
                alert("Not a valid answer or cipher is not correct");
              }
            } else if (`Question${RandomNum}` === "Question2") {
              if (
                user.Question2.toString() ===
                  UserData.get("question").toString() &&
                UserData.get("ceaser").toString() === UserCipher.toString()
              ) {
                console.log(UserData.get("ceaser").toString());
                navigate("/dashboard", {
                  state: {
                    cognito_name: data.idToken.payload["cognito:username"],
                    email_id: data.idToken.payload["email"],
                  },
                });
              } else {
                alert("Not a valid answer or cipher is not correct");
              }
            } else {
              if (
                user.Question3.toString() ===
                  UserData.get("question").toString() &&
                UserData.get("ceaser").toString() === UserCipher.toString()
              ) {
                navigate("/dashboard", {
                  state: {
                    cognito_name: data.idToken.payload["cognito:username"],
                    email_id: data.idToken.payload["email"],
                  },
                });
              } else {
                alert("Not a valid answer or cipher is not correct");
              }
            }
          }
        });
      },
      onFailure: (err) => {
        if (
          err.toString() ===
          "NotAuthorizedException: Incorrect username or password."
        ) {
          alert("Incorrect username or password or Email already Exist!");
        }
      },
    });
  };

  const clicked = () => {
    navigate("/login");
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
            Sign in
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
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            {error.email && <p>{error.email}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error.password && <p>{error.password}</p>}

            <TextField
              margin="normal"
              required
              fullWidth
              name="question"
              label={CurQuestion}
              type="text"
              id="question"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="ceaser"
              label="Enter Ceaser cipher of ABC"
              type="text"
              id="ceaser"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Typography type="body2">
              Don't have an account? <a href="/register">Register</a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
