import { Welcome } from "../components/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Excel to BI Dashboard" },
    { 
      name: "description",
      content: "엑셀 업로드만 으로 바로 대시보드를 만들어보세요."
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
