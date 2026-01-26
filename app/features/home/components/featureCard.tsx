import { BorderBeam } from "~/common/components/ui/border-beam";
import { BarChart3 } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    // 1️⃣ Border 영역 (살짝 더 큼)
    <div className="relative rounded-2xl p-[1px]">
      {/* 2️⃣ Border beam (장식 레이어) */}
      <BorderBeam
        size={260}
        duration={10}
        delay={2} 
        colorFrom={'#A78BFA'} // violet-400
        colorTo={'#6D28D9'} // violet-700
      />

      {/* 3️⃣ Content 영역 (조금 작게) */}
      <div
        className="
          relative
          h-full
          rounded-[15px]
          bg-white dark:bg-gray-900
          border border-gray-200/60 dark:border-gray-800/60
          p-6
          text-left
          transition-transform
          hover:-translate-y-1
        "
      >
        <div className="flex flex-col gap-3">
          <BarChart3 className="h-6 w-6 text-blue-600" />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
