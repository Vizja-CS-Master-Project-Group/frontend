export default {
  guest: [
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Signup",
      path: "/signup",
    },
    {
      name: "Forgot Password",
      path: "/forgot-password",
    },
  ],
  librarian: [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Books",
      path: "/books",
    },
    {
      name: "New Books",
      path: "/books/add",
    },
    {
      name: "Edit Books",
      path: "/books/:id/add",
    },
  ],
};
