import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("features/home/pages/home.tsx"),

  ...prefix("auth", [
    route("login",  "features/auth/pages/login.tsx"),
    route("signup", "features/auth/pages/signup.tsx"),
    route("logout", "features/auth/pages/logout.tsx"),
  ]),

  ...prefix("fileupload", [
    index("features/fileupload/pages/file-upload.tsx"),
  ]),

  ...prefix("visualization", [
    index("features/datavisualization/pages/visualization.tsx"),
  ]),
] satisfies RouteConfig;
