import FeatureCard from "./featureCard";

export function Welcome() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl text-center space-y-12">
        {/* Hero Section */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Excel을 <span className="text-blue-600">BI 대시보드</span>로
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            엑셀 파일을 업로드하면  
            <br className="hidden sm:block" />
            차트와 지표가 자동으로 생성됩니다.
          </p>
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
          <button className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition">
            엑셀 업로드
          </button>
          <button className="rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            샘플 보기
          </button>
        </div>

        {/* Guide */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ✔ 첫 행은 컬럼명 &nbsp;·&nbsp; ✔ 병합 셀 없음 &nbsp;·&nbsp; ✔ 피벗용 엑셀 형식
        </p>
      </div>
    </main>
  );
}
