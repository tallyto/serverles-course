const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { buildIAMPolicy } = require("./lib/util");
const myRoles = {
  "heroes:list": "private",
};
const authorizeUser = (userScopes, methodArn) => {
  return userScopes.find((scope) => ~methodArn.indexOf(myRoles[scope]));
};
exports.handler = async (event) => {
  const token = event.authorizationToken;

  try {
    const decodedUser = jwt.verify(token, JWT_KEY);
    const { user } = decodedUser;
    const userId = user.username;
    const isAllowed = authorizeUser(user.scopes, event.methodArn);
    console.log("user", { user });
    const authorizerContext = {
      // dado que ira nas requests
      user: JSON.stringify(user),
    };
    const policyDocument = buildIAMPolicy(
      userId,
      isAllowed ? "Allow" : "Deny",
      event.methodArn,
      authorizerContext
    );
    return policyDocument;
  } catch (error) {
    console.log("auth error**", error.stack);
    return {
      // 401 -> token invalido
      // 403 -> token sem permissao para acessar a funcao!

      statusCode: 401,
      body: "Unauthorized",
    };
  }
};
