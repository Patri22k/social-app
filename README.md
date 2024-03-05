# Mini Social App

This is a mini social app for learning app development. It features form validation and plans to add chat functionality.

## Project Structure

This project uses [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces), a feature available in npm 7 and later. Workspaces are a set of features to the npm CLI that provide support to managing multiple packages from within a singular top-level, root package.

The project is divided into three main workspaces: `packages/backend`, `packages/frontend`, and `packages/shared`. The `backend` and `frontend` workspaces contain the code for the backend and frontend of the application, respectively. The `shared` workspace contains components that are used in both the backend and frontend.

You can run scripts in the `backend` and `frontend` workspaces using the `-w` or `--workspace` option with `npm run`. For example, to start the backend, you would run `npm run -w packages/backend start`. The `shared` workspace does not need to be started separately as it is used by the other two workspaces.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
* This guide is tailored for Windows users, but the project should run on any operating system that supports Node.js and React.

## How to Use

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Ensure you have npm 7 or later installed. You can check your npm version with `npm -v`. If you need to update npm, you can do so with `npm install -g npm@latest`.
4. Install the required dependencies by running `npm install`.
5. To start the backend, run `npm run -w packages/backend start`. To start the frontend, open a new terminal and run `npm run -w packages/frontend start`.
6. Alternatively, to run both the backend and frontend concurrently, you can use `npm start`.
7. Open your web browser and navigate to `http://localhost:3000` to view the application.
8. To check the backend, you can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to send requests to `http://localhost:5000/auth/login` or `http://localhost:5000/auth/signup`.