# Task Management App

## Introduction
The Task Management App is a web application built using Next.js, Redux, Redux Toolkit, Tailwind CSS, and React Icons. It provides a comprehensive platform for managing tasks with features like user authentication, task creation, task summary, and responsive design for both desktop and mobile devices.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Features
- User authentication with JWT tokens stored in cookies.
- User signup with password encryption using bcrypt.
- Task creation with title, description, date, and status.
- Task summary displaying total tasks, in-progress tasks, and completed tasks.
- Responsive design: tasks displayed in a table on desktop and as cards on mobile.
- Task filtering by status.
- Task editing and deletion with confirmation dialogs.
- Bulk task deletion functionality.
- Middleware for authentication checking, redirecting to login if the user is not authenticated.

## Installation
To install and run the Task Management App locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd task-management-app
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env.local` file in the root directory and add the following:
    ```plaintext
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
### Signup
- Navigate to the `/signup` page.
- Enter a username and password that meets the specified requirements.
- If the username already exists, a 409 status will be returned and a message will be displayed.

### Login
- Navigate to the `/login` page.
- Enter your username and password to log in.

### Dashboard
- Upon successful login, you will be redirected to the `/dashboard`.
- The dashboard displays a summary of your tasks, including total tasks, in-progress tasks, and completed tasks.
- You can create new tasks, view task details, edit tasks, and delete tasks.
- Tasks can be filtered by status.
- On desktop, tasks are displayed in a table format, while on mobile, they are displayed as cards.

## Configuration
Sensitive data and configuration values are stored in environment variables. For the Next.js application, create a `.env.local` file in the root directory and add your configuration values.

Example `.env.local` file:
```plaintext
NEXT_PUBLIC_API_URL=http://localhost:5000
```
## Dependencies
- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## API Endpoints
The backend API endpoints used in this project include:
- `POST /api/login`: User login.
- `POST /api/logout`: User logout.
- `POST /api/refreshToken`: Refresh JWT token.
- `POST /api/tasks/addTask`: Add a new task.
- `POST /api/tasks/bulkDelete`: Bulk delete tasks.
- `DELETE /api/tasks/deleteTask`: Delete a task.
- `GET /api/tasks/fetchTasks`: Fetch all tasks.
- `GET /api/tasks/taskSummary`: Get task summary.
- `PUT /api/tasks/updateTask`: Update a task.
- `PUT /api/tasks/updateTaskStatus`: Update task status.

## Troubleshooting
- Ensure all environment variables are correctly set in the `.env.local` file.
- Make sure the backend server is running and accessible at the URL specified in the environment variables.
- Verify that all required dependencies are installed by running `npm install`.

## Contributors
- [Abhishek Maurya](https://github.com/abmaurya07)
