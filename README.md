# Task Management App

## Introduction
The Task Management App is a web application built using Next.js, Redux, Redux Toolkit, Tailwind CSS, and React Icons. It provides a comprehensive platform for managing tasks with features like user authentication, task creation, task summary, and responsive design for both desktop and mobile devices.

**Live URL**: [https://taskmanager-by-abhishek.vercel.app/](https://taskmanager-by-abhishek.vercel.app/)


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
- **Authentication Middleware**: Ensures users are authenticated before accessing the dashboard, redirecting unauthenticated users to the login page.
- **User Authentication**: Includes login and signup functionality with validations.
- **Task Dashboard**: Displays a summary of tasks, including total, in-progress, and completed tasks.
- **Task Management**: Allows users to create, view, edit, delete, and filter tasks.
- **Responsive Design**: Optimized for both desktop and mobile devices, displaying tasks in table format on desktop and card format on mobile.
- **Bulk Delete**: Supports bulk deletion of tasks with a confirmation popup.
- **Security**: Utilizes bcrypt for password encryption and environment variables for sensitive data.

## Pages 📄

1. **Login**: User authentication page.
2. **Signup**: User registration page with username and password validations.
3. **Dashboard**: Main task management interface, accessible only to authenticated users.


## Signup Form Validation 📝

- **Username**: Must be at least 6 characters long. If the username already exists, a 409 status code is returned, prompting the user to choose another username.
- **Password**: Must meet the following criteria:
  - At least 8 characters long
  - Contains at least one uppercase letter
  - Contains at least one lowercase letter
  - Contains at least one digit
  - Contains at least one special character

## How It Works ⚙️

1. **Authentication**: The app includes middleware to check user authentication status. Unauthenticated users are redirected to the login page.
2. **Task Management**: Users can create, view, edit, delete, and filter tasks. Tasks can be displayed in a table or card format depending on the device.
3. **Bulk Operations**: Users can perform bulk deletions with a confirmation popup to prevent accidental deletions.
4. **Responsive Design**: The application adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.

## Installation
To install and run the Task Management App locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/abmaurya07/taskmanager-by-abhishek
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

### Task Dashboard Features
- Upon successful login, you will be redirected to the `/dashboard`.
- Task Summary: Displays a summary of total tasks,todo tasks, in-progress tasks, and completed tasks.
- Task Creation: Users can add new tasks with a title, description, date, and status.
- Task Viewing and Editing: Users can view and edit task details.
- Task Deletion: Single and bulk deletion of tasks with confirmation popups.
- Task Filtering: Filter tasks based on their status.
- Task Layout: On desktop, tasks are displayed in a table format, while on mobile, they are displayed as cards.

## Configuration
Sensitive data and configuration values are stored in environment variables. For the Next.js application, create a `.env.local` file in the root directory and add your configuration values.

Example `.env.local` file:
```plaintext
NEXT_PUBLIC_API_URL=http://localhost:5000
```
## Technologies Used
- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios]

## Security
- Password Encryption: Passwords are encrypted using bcrypt on the backend.
- Environment Variables: Sensitive data is stored in environment variables to keep it secure.


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
