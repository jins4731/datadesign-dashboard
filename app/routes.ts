import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("features/home/pages/home.tsx"),
  ...prefix("fileupload", [
    index('features/fileupload/pages/file-upload.tsx')
  ]),
  ...prefix("visualization", [
    index('features/datavisualization/pages/visualization.tsx')
  ])
] satisfies RouteConfig;
