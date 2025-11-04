# Todolist Fullstack (T3 Stack)

A full-stack todo list application built with the T3 stack (Next.js, tRPC, Prisma, Tailwind). This project is my first fullstack application, featuring secure authentication, a typesafe API, and optimistic UI updates for a fast, modern user experience.

*(Sangat disarankan tambahkan screenshot atau GIF demo di sini!)*
``

## ✨ Features

* **Secure User Authentication**: Sign-up and login functionality using NextAuth.js.
* **Full CRUD Operations**: Users can create, read, update, and delete their own private todos.
* **Optimistic UI Updates**: The interface updates instantly for a seamless user experience, without waiting for the server response.
* **Typesafe API**: End-to-end typesafety between the client and server guaranteed by tRPC and Zod.
* **Task Filtering**: Clean separation between pending and completed tasks.
* **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile.

## 🛠️ Tech Stack

* **[Next.js](https://nextjs.org/)**: React framework
* **[tRPC](https://trpc.io/)**: Typesafe API layer
* **[Prisma](https://www.prisma.io/)**: Next-generation ORM
* **[NextAuth.js](https://next-auth.js.org/)**: Authentication
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
* **[Zod](https://zod.dev/)**: Schema declaration and validation

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js & npm
* PostgreSQL database

### Installation

1.  Clone the repo:
    ```sh
    git clone [https://github.com/your_username_/Project-Name.git](https://github.com/your_username_/Project-Name.git)
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env` file and add the required environment variables (see `.env.example`).
4.  Start the development server:
    ```sh
    npm run dev
    ```

## Environment Variables

You will need to add the following variables to your `.env` file:

* `DATABASE_URL`: Your PostgreSQL connection string.
* `NEXTAUTH_SECRET`: A random secret key for NextAuth.js.
* `NEXTAUTH_URL`: The base URL of your application (e.g., `http://localhost:3000`).

## Database

This project uses PostgreSQL.

1.  If you have a local `start-database.sh` script (from the original T3 template), run it:
    ```sh
    ./start-database.sh
    ```
2.  Apply the database schema:
    ```sh
    npm run db:push
    ```

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Runs the app in development mode. |
| `npm run build` | Builds the app for production. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Lints the code. |
| `npm run format:write` | Formats the code. |
| `npm run db:push` | Pushes the schema to the database. |
| `npm run db:studio` | Starts Prisma Studio (GUI for your db). |