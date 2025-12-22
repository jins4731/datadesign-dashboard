import type { ChartType } from "~/engine/types/chart-config.types";

const SeriesOptions = ({ type }: { type?: ChartType }) => {
  if (type === "pie") {
    return <div>파이 차트 전용 옵션</div>;
  }

  return <div>막대/라인 시리즈 옵션</div>;
};

export default SeriesOptions;
