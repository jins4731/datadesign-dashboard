import { useNavigate, useOutletContext, Link } from "react-router";
import { AnimatedGradientText } from "~/common/components/ui/animated-gradient-text";
import FeatureCard from "./featureCard";
import { BlurFade } from "~/common/components/ui/blur-fade";
import { Button } from "~/common/components/ui/button";
import type { TableData } from "~/root";
import { SAMPLE_TABLE_DATA } from "../data/sampleData";
import { LayoutDashboard, Plus, Clock } from "lucide-react";

type SavedDashboard = {
  id: string;
  name: string;
  updatedAt: Date;
};

type Props = {
  savedDashboards: SavedDashboard[];
};

function formatDate(date: Date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return '오늘';
  if (days === 1) return '어제';
  if (days < 7) return `${days}일 전`;
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

export function Welcome({ savedDashboards }: Props) {
  const navigate = useNavigate();
  const { addNode, dataTables } = useOutletContext<{
    addNode: ({ node }: { node: TableData }) => void;
    dataTables: TableData[];
  }>();

  const handleSampleView = () => {
    const alreadyLoaded = dataTables.some(dt => dt.table.id === SAMPLE_TABLE_DATA.table.id);
    if (!alreadyLoaded) {
      addNode({ node: SAMPLE_TABLE_DATA });
    }
    navigate('/visualization');
  };

  return (
    <main className="h-full overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col items-center px-6 py-16 space-y-16 max-w-4xl mx-auto">

        {/* Hero */}
        <header className="text-center space-y-6 w-full">
          <BlurFade delay={0}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              <AnimatedGradientText>Excel을 대시보드로</AnimatedGradientText>
            </h1>
          </BlurFade>
          <BlurFade delay={0.15}>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
              엑셀 파일을 업로드하면<br className="hidden sm:block" />
              차트와 지표가 자동으로 생성됩니다.
            </p>
          </BlurFade>
          <BlurFade delay={0.25}>
            <div className="flex justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl px-6">
                <Link to="/fileupload">
                  <Plus className="h-4 w-4 mr-1.5" />
                  엑셀 업로드
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl px-6" onClick={handleSampleView}>
                샘플 보기
              </Button>
            </div>
          </BlurFade>
        </header>

        {/* Feature Cards */}
        <BlurFade delay={0.35} className="w-full">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <FeatureCard title="엑셀 그대로" description="첫 행을 컬럼으로 인식하여 별도 설정 없이 바로 분석" />
            <FeatureCard title="자동 시각화" description="숫자는 지표로, 텍스트는 차원으로 자동 분류" />
            <FeatureCard title="자유로운 레이아웃" description="차트를 드래그로 배치하고 PNG로 개별 저장" />
          </section>
        </BlurFade>

        <p className="text-xs text-gray-400 dark:text-gray-600">
          ✔ 첫 행은 컬럼명 &nbsp;·&nbsp; ✔ 병합 셀 없음 &nbsp;·&nbsp; ✔ 피벗용 엑셀 형식
        </p>

        {/* 저장된 대시보드 목록 */}
        {savedDashboards.length > 0 && (
          <BlurFade delay={0} className="w-full">
            <section className="w-full space-y-3">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                내 대시보드
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedDashboards.map((d) => (
                  <Link
                    key={d.id}
                    to={`/visualization?dashboardId=${d.id}`}
                    className="group flex items-center gap-3 rounded-xl border bg-white dark:bg-gray-900 px-4 py-3.5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/15 transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{d.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{formatDate(d.updatedAt)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </BlurFade>
        )}
      </div>
    </main>
  );
}
