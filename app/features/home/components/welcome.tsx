import { AnimatedGradientText } from "~/common/components/ui/animated-gradient-text";
import FeatureCard from "./featureCard";
import { BlurFade } from "~/common/components/ui/blur-fade";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl text-center space-y-12">
        {/* Hero Section */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            <AnimatedGradientText>
              Excel을 BI 대시보드로
            </AnimatedGradientText>
          </h1>

          <BlurFade delay={0.2}>  
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              엑셀 파일을 업로드하면  
              <br className="hidden sm:block" />
              차트와 지표가 자동으로 생성됩니다.
            </p>
          </BlurFade>
        </header>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="엑셀 그대로"
            description="첫 행을 컬럼으로 인식하여 별도 설정 없이 바로 분석"
          />
          <FeatureCard
            title="자동 시각화"
            description="숫자는 지표로, 텍스트는 차원으로 자동 분류"
          />
          <FeatureCard
            title="빠른 공유"
            description="대시보드를 링크로 공유하거나 저장"
          />
        </section>

        {/* CTA */}
        <div className="flex justify-center gap-4">
          <Button
            variant={'default'}
            onClick={() => {

            }}
          >
            <Link to={'/fileupload'}>
              엑셀 업로드
            </Link>
          </Button>
          <Button
            variant={'outline'}
          >
            샘플 보기
          </Button>
        </div>

        {/* Guide */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ✔ 첫 행은 컬럼명 &nbsp;·&nbsp; ✔ 병합 셀 없음 &nbsp;·&nbsp; ✔ 피벗용 엑셀 형식
        </p>
      </div>
    </main>
  );
}
