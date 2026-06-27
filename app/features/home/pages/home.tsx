import { useLoaderData } from "react-router";
import { Welcome } from "../components/welcome";
import { getOptionalUser } from "~/server/auth.server";
import { listDashboards } from "~/server/dashboard.server";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Excel to BI Dashboard" },
    { name: "description", content: "엑셀 업로드만 으로 바로 대시보드를 만들어보세요." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await getOptionalUser(request);
  if (!user) return { savedDashboards: [] };

  const savedDashboards = await listDashboards(user.id);
  return { savedDashboards };
}

export default function Home() {
  const { savedDashboards } = useLoaderData<typeof loader>();
  return <Welcome savedDashboards={savedDashboards} />;
}
