import React, { useState } from 'react';
import {
  Compass,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Activity,
  Zap,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Building2
} from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  highlightTip: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'مرحباً بك في منظومة روض الفرج الرقمية',
    subtitle: 'الربط الموحد لـ 16 مدرسة بإدارة روض الفرج التعليمية',
    description: 'توفر المنظومة مركز قيادة رقمي متكامل لمتابعة شؤون الطلاب، الكوادر التعليمية، الانضباط المدرسي، والمراسلات الرسمية المعتمدة وفق أعلى معايير الشفافية والحوكمة.',
    badge: 'الخطوة 1 من 5: نظرة عامة',
    icon: Building2,
    highlightTip: 'يمكنك التبديل بين الـ27 محافظة وإداراتها من الشريط العلوي في أي وقت.'
  },
  {
    title: 'شريط البحث الشامل الفوري (Ctrl + K)',
    subtitle: 'بحث لحظي عبر كافة المدارس والطلاب والمعلمين',
    description: 'ابحث عن أي طالب بالاسم أو الرقم القومي، أو استعلم عن كادر تدريسي بتخصصه ومدرسته، أو استعرض بيانات أي مدرسة بنقرة واحدة.',
    badge: 'الخطوة 2 من 5: البحث والوصول',
    icon: Search,
    highlightTip: 'استخدم الاختصار Ctrl + K أو ⌘K في أي وقت لفتح البحث السريع.'
  },
  {
    title: 'مؤشرات الأداء الرئيسية اللحظية (Real-Time KPIs)',
    subtitle: 'بيانات حية ومحدثة من قواعد بيانات الفصول',
    description: 'تعرض لوحة التحكم نسب الحضور اللحظية للطلاب، الشكاوى المعلقة التي تتطلب تدخلاً، إجمالي الطلاب المقيدين، ومؤشرات كفاءة الكادر التعليمي محدثة آنياً.',
    badge: 'الخطوة 3 من 5: مؤشرات الأداء',
    icon: Activity,
    highlightTip: 'انقر على أي مؤشر للانتقال الفوري للشاشة التفصيلية التابعة له.'
  },
  {
    title: 'الإجراءات السريعة بنقرة واحدة (Ctrl + N)',
    subtitle: 'تسجيل وقيد وإرسال تعميمات في ثوانٍ معدودة',
    description: 'يتيح لك الزر العائم أو اختصار Ctrl + N تسجيل طالب جديد، قيد معلم وتخصيص فصوله، أو بث تعميم رسمي عاجل للمدارس وأولياء الأمور دون مغادرة صفحتك.',
    badge: 'الخطوة 4 من 5: الإجراءات السريعة',
    icon: Zap,
    highlightTip: 'القائمة العائمة أسفل الشاشة تختصر عليك الوقت والخطوات المتكررة.'
  },
  {
    title: 'تصدير التقارير والعمل في وضع عدم الاتصال (Offline)',
    subtitle: 'تصدير Excel وPDF موثوق، واستمرارية العمل دون إنترنت',
    description: 'حمّل إحصائياتك بصيغ Excel (.xlsx) تدعم اللغة العربية بالكامل أو مستندات PDF رسمية. بفضل تقنية Service Worker والتخزين المحلي، تظل بياناتك متاحة حتى لو انقطع اتصال الإنترنت.',
    badge: 'الخطوة 5 من 5: التصدير والاستمرارية',
    icon: FileSpreadsheet,
    highlightTip: 'أنت الآن جاهز تماماً للاستفادة من كافة إمكانيات المنظومة الرقمية!'
  }
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('rod_farag_tour_completed', 'true');
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-right my-8 relative">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-5 bg-slate-850/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{step.badge}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="تخطي الجولة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-7 space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg">
            <Icon className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-black text-white">{step.title}</h3>
            <p className="text-xs text-amber-400/90 font-medium mt-1">{step.subtitle}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {step.description}
          </p>

          {/* Highlight Tip Card */}
          <div className="bg-slate-850/80 p-3.5 rounded-2xl border border-slate-750 flex items-center gap-2.5 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>تلميح ذكي:</strong> {step.highlightTip}</span>
          </div>
        </div>

        {/* Progress Dots & Navigation Footer */}
        <div className="p-5 bg-slate-850/90 border-t border-slate-800 flex items-center justify-between">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-6 bg-amber-500'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                السابق
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isLast ? 'ابدأ العمل الآن' : 'التالي'}</span>
              {!isLast && <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
