# React Application with JWT + RefreshToken

## Introduction

This project is a React application that serves as a front-end interface for a REST API built with Express.js. The application includes user authentication, displays user data, and provides an admin interface for managing users.

## Features

- User Authentication (Signup, Login, Logout)
- Fetch and display current user information
- Admin interface for managing users
- Secure routes and data handling
- JWT authentication with refresh tokens

## Installation

Clone the repository and install dependencies. Set up the required environment variables and start the development server.

## Usage

To use the application, open your browser and navigate to `http://localhost:3000`. You can then interact with the user interface to sign up, log in, view user data, and manage users (if you have admin privileges).

## Authentication Mechanism

### JWT and Refresh Token Strategy

- **Login**: When a user logs in, the application stores the JWT in the React state and the refresh token in an HTTP-only cookie for enhanced security.

- **Page Refresh**: When the user refreshes the page, the application uses a custom hook called `useAuthCheck` to check if the user is authenticated. This hook makes an API call to verify the user's session and, if necessary, obtain new access and refresh tokens.

- **useAuthCheck Hook**: This hook is executed when the application loads or when the user refreshes the page. It checks the authentication status by calling an endpoint that returns a new access token if the refresh token is valid. The new tokens are then stored in the React state and HTTP-only cookies respectively.

- **Token Expiry Handling**: When the access token expires during an API call, the `useAxiosPrivate` hook is used to intercept the request. This hook attempts to get a new access token using the refresh token stored in the cookie. If successful, the new access token is used to retry the failed request.

- **Protected Routes**: Secure routes in the application require a valid access token. The `useAuthCheck` hook ensures that a fresh access token is available before the user accesses these routes.

### Workflow Summary

1. **User logs in**: Access token is stored in the React state, and refresh token is stored in an HTTP-only cookie.
2. **Page refresh or initial load**: `useAuthCheck` hook checks authentication status and refreshes tokens if needed.
3. **Access token expires**: `useAxiosPrivate` intercepts API calls, refreshes the access token using the refresh token, and retries the request.
4. **Protected routes**: Access to secure routes is controlled by the presence and validity of the access token.

This mechanism ensures secure and seamless authentication, maintaining a smooth user experience even when tokens expire or the page is refreshed.

## Screenshots

### Login Page
![Login](https://github.com/sampath-ops/React-JWT-RefreshToken/blob/master/public/OutputImages/Login.png)

### SignUp Page
![SignUp](https://github.com/sampath-ops/React-JWT-RefreshToken/blob/master/public/OutputImages/SignUp.png)

### Admin Page
![AdminPage](https://github.com/sampath-ops/React-JWT-RefreshToken/blob/master/public/OutputImages/AdminPage.png)
