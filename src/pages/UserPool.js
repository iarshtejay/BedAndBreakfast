import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_4vcLJJMLE",
  ClientId: "6s2m8e8ou784441e9pbtkjm0in",
};

export default new CognitoUserPool(poolData);
