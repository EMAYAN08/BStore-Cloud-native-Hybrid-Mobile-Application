import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ca-central-1_FmSU6JsMf',
  ClientId: '1qve54h4pl6she9a78duqgvcqi',
  Domain: 'https://bstoreuserauthentication.auth.ca-central-1.amazoncognito.com',
};

export const userPool = new CognitoUserPool(poolData);

export const registerUser = (username, email, password) => {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
    new CognitoUserAttribute({ Name: 'name', Value: username }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        switch (err.code) {
          case 'InvalidParameterException':
            console.error('Error during registration:', err);
            reject(new Error('Invalid input parameters'));
            break;
          case 'InvalidPasswordException':
            reject(new Error('Invalid password'));
            break;
          case 'UsernameExistsException':
            reject(new Error('Username already exists'));
            break;
          default:
            reject(new Error('Something went wrong during registration'));
            break;
        }
      } else {
        resolve(result.user);
      }
    });
  });
};

export const loginUser = (email, password) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result.getIdToken().getJwtToken());
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const resetPassword = (email) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const confirmPasswordReset = (email, verificationCode, newPassword) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

