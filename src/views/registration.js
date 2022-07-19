import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Number from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";
import AWS from "aws-sdk";
import { Alert } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import AWS_CONFIG from "../config";
import axios from "axios";
window.Buffer = window.Buffer || require("buffer").Buffer;

AWS.config.update({
  region: AWS_CONFIG.region,
  credentials: new AWS.Credentials(AWS_CONFIG.accessKeyId, AWS_CONFIG.secretAccessKey, AWS_CONFIG.sessionToken),
});

const poolData = {
  UserPoolId: "us-east-1_SUWtuJFu8",
  ClientId: "1i89dklc6akcahj5ss1u2njsfr",
};

const UserPool = new CognitoUserPool(poolData);

const theme = createTheme();
var error = {};

export default function Registration() {
  let navigate = useNavigate();
  const validateFields = (values) => {
    const errors = {};

    if (values.get("firstName") === "") {
      errors.firstname = "First name Required!";
    } else if (!/^[A-Za-z]+$/.test(values.get("firstName"))) {
      errors.firstname = "First name can only have characters!";
    }
    if (values.get("lastName") === "") {
      errors.lastname = "Last name Required!";
    } else if (!/^[A-Za-z]+$/.test(values.get("lastName"))) {
      errors.lastname = "Last name can only have characters!";
    }
    if (values.get("email") === "") {
      errors.email = "Email Required! ";
    }
    // else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.get("email"))){
    //     errors.email = "Email address is invalid! "
    // }
    if (values.get("password") === "") {
      errors.password = "password is required";
    } else if (values.get("password").length < 8) {
      errors.password = "password length is less then 8";
    } else if (!/^[ A-Za-z0-9_@./#&+-]*$/.test(values.get("password"))) {
      errors.password = "Only special characters and alphanumeric is allowed!";
    }
    if (values.get("confirmPassword") !== values.get("password")) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!/^[A-Za-z0-9]+$/.test(values.get("SecurityAnswerOne"))) {
      errors.answer1 = "Only Alphanumeric is allowed";
    }

    if (!/^[A-Za-z0-9]+$/.test(values.get("SecurityAnswerTwo"))) {
      errors.answer2 = "Only Alphanumeric is allowed";
    }

    if (!/^[A-Za-z0-9]+$/.test(values.get("SecurityAnswerThree"))) {
      errors.answer3 = "Only Alphanumeric is allowed";
    }

    if (!/^[0-9]+$/.test(values.get("ceasercipher"))) {
      errors.caesarcipher = "Only Numeric values are allowed";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //  Getting the form Data
    const UserData = new FormData(event.currentTarget);
    error = validateFields(UserData);

    if (Object.keys(error).length !== 0) {
      console.log(error);

      return null;
    }

    //  User Registration in Cognito
    UserPool.signUp(UserData.get("email"), UserData.get("password"), [], null, (err, data) => {
      if (err) {
        Alert("Either Email is already valid or password is not in valid format!");
        return null;
      }
    });

    // Storing the infromation in firbase
    const userCol = collection(db, "userDetails");
    console.log(userCol);
    var ceaserKey = parseInt(UserData.get("ceasercipher")) % 26;
    console.log(UserData.get("SecurityAnswerOne"));
    console.log(UserData.get("SecurityAnswerTwo"));
    console.log(UserData.get("SecurityAnswerThree"));
    addDoc(userCol, {
      email: UserData.get("email"),
      Question1: UserData.get("SecurityAnswerOne"),
      Question2: UserData.get("SecurityAnswerTwo"),
      Question3: UserData.get("SecurityAnswerThree"),
      ceasercipherKey: ceaserKey,
    });

    // Storing in DynamoDB
    var dynamo = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    var Dynamo_Params = {
      TableName: "UserRegistration",
      Item: {
        email: { S: UserData.get("email") },
        First_Name: { S: UserData.get("firstName") },
        Last_Name: { S: UserData.get("lastName") },
        Password: { S: UserData.get("password") },
        Phone: { N: UserData.get("Phone") },
      },
    };

    dynamo.putItem(Dynamo_Params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    navigate("/login");
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
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth name="firstName" label="First Name" type="firstName" id="firstName" />

            {error.firstname && <p>{error.firstname}</p>}
            <TextField margin="normal" required fullWidth name="lastName" label="Last Name" type="lastName" id="lastName" />

            {error.lastname && <p>{error.lastname}</p>}
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus />

            {error.email && <p>{error.email}</p>}
            <TextField margin="normal" required fullWidth name="Phone" label="Phone" type="Phone" id="Phone" />

            {error.phone && <p>{error.phone}</p>}
            <TextField margin="normal" required fullWidth name="SecurityAnswerOne" label="What’s your favorite movie? (Security Question 1)" type="SecurityAnswerOne" id="SecurityAnswerOne" />
            {error.answer1 && <p>{error.answer1}</p>}

            <TextField margin="normal" required fullWidth name="SecurityAnswerTwo" label="What’s your favorite Food? (Security Question 2)" type="SecurityAnswerTwo" id="SecurityAnswerTwo" />
            {error.answer2 && <p>{error.answer2}</p>}

            <TextField margin="normal" required fullWidth name="SecurityAnswerThree" label="What’s your favorite person? (Security Question 3)" type="SecurityAnswerThree" id="SecurityAnswerThree" />

            {error.answer3 && <p>{error.answer3}</p>}
            <Number margin="normal" required fullWidth name="ceasercipher" label="ceasercipher key" type="ceasercipher" id="ceasercipher" />
            {error.ceaser && <p>{error.ceaser}</p>}

            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            {error.password && <p>{error.password}</p>}

            <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="current-password" />
            {error.confirmPassword && <p>{error.confirmPassword}</p>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Typography type="body2">
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
