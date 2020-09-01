export const constants = {
  "api-host":
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/cp/api"
      : "/cp/api",
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
};
