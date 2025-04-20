// messageConstants.js

const Messages = {

    REGISTER_SUCCESS: "Registration successful!",
    EMAIL_ALREADY_EXISTS: "Email is Already in Use",
    PHONE_ALREADY_EXISTS: "Phone Number is Already in Use",
    USERNAME_ALREADY_EXISTS: "User Name is Already in Use",
    LOGIN_SUCCESS: "Login successful!",
    INVALID_LOGIN: "Invalid Email/Phone or Password",
    FILL_CREDENTIALS: "Please enter Email/Phone and Password",
    ADMIN_NOT_FOUND: "Admin not found",
    INVALID_REFRESH_TOKEN: "Invalid Refresh Token",
    NO_ADMIN_FOUND: "No Admin Found",
    DATABASE_ERROR: "Something Went Wrong In The Database",
    SIGNOUT_SUCCESS: "Signout Successful!",

    // Error Handler Messages
    INTERNAL_SERVER_ERROR: "Internal server error",
    RESOURCE_NOT_FOUND: (path) => `Resource not found, Invalid: ${path}`,
    DUPLICATE_KEY: (key) => `Duplicate ${key} Entered`,
    INVALID_JWT: "Json Web Token is invalid, try again",
    EXPIRED_JWT: "Json Web Token is expired, try again",

    // model Messages
    ENTER_USERNAME: "Please Enter Your Username",
    USERNAME_TOO_LONG: "Username cannot exceed 20 characters",
    USERNAME_TOO_SHORT: "Username Should have more than 4 characters",
    ENTER_EMAIL: "Please Enter Your Email",
    INVALID_EMAIL: "Please Enter a valid Email",
    ENTER_PHONE: "Please Enter Your Phone Number",
    PHONE_TOO_LONG: "Phone Number cannot exceed 10 digits",
    PHONE_TOO_SHORT: "Phone Number should have 10 digits",
    ENTER_PASSWORD: "Please Enter Your Password",
    PASSWORD_TOO_SHORT: "Password Should have more than 8 characters",
};

export default Messages;
