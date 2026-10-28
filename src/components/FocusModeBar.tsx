import React from 'react';
import {
  Minimize2,
  Type,
  Printer,
  BookOpen,
  Sun,
  Moon,
  Sparkles,
  Palette
} from 'lucide-react';
import { useRodFarag } from '../context/RodFaragContext';

interface FocusModeBarProps {
  onExit: () => void;
}

export const FocusModeBar: React.FC<FocusModeBarProps> = ({ onExit }) => {
  const {
    activeSection,
    readerFontSize,
    setReaderFontSize,
    readerTheme,
    setReaderTheme
  } = useRodFarag();

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'dashboard': return 'لوحة التحكم المركزية';
      case 'schools': return 'دليل مدارس روض الفرج الـ16';
      case 'teachers': return 'سجلات الهيئة التعليمية';
      case 'students': return 'قواعد بيانات الطلاب';
      case 'attendance': return 'رصد الحضور والغياب';
      case 'assessments': return 'التقييمات والنتائج الامتحانية';
      case 'correspondence': return 'المراسلات والمكاتبات الرسمية';
      case 'reports': return 'التقارير الإحصائية والبيانات التحليلية';
      case 'governance': return 'الحوكمة والقرارات الوزارية';
      case 'discipline': return 'لائحة الانضباط المدرسي';
      case 'complaints': return 'منظومة الشكاوى والتظلمات';
      case 'settings': return 'إعدادات النظام والتهيئة';
      default: return 'المستند التعليمي';
    }
  };

  const fontSizes: { id: 'normal' | 'large' | 'xlarge' | 'huge'; label: string; iconSize: string }[] = [
    { id: 'normal', label: 'عادي (100%)', iconSize: 'text-xs' },
    { id: 'large', label: 'متوسط (115%)', iconSize: 'text-sm font-semibold' },
    { id: 'xlarge', label: 'كبير (130%)', iconSize: 'text-base font-bold' },
    { id: 'huge', label: 'أضخم (145%)', iconSize: 'text-lg font-black' }
  ];

  const themes: { id: 'slate' | 'light' | 'sepia' | 'contrast'; label: string; bgClass: string; dotClass: string }[] = [
    { id: 'slate', label: 'داكن ليلي', bgClass: 'bg-slate-900 border-slate-700', dotClass: 'bg-slate-500' },
    { id: 'light', label: 'فاتح نهاري', bgClass: 'bg-slate-100 border-slate-300', dotClass: 'bg-slate-400' },
    { id: 'sepia', label: 'ورق دافئ (سيبيا)', bgClass: 'bg-amber-950/60 border-amber-800/80', dotClass: 'bg-amber-500' },
    { id: 'contrast', label: 'عالي التباين', bgClass: 'bg-black border-white/40', dotClass: 'bg-white' }
  ];

  return (
    <aside
      aria-label="شريط أدوات وضع القراءة والتركيز"
      className="sticky top-3 z-40 max-w-5xl mx-auto w-full px-4 mb-6 transition-all duration-300 print:hidden"
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/30 rounded-2xl p-2.5 sm:px-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-white">
        {/* Left: Mode Badge & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">وضع القراءة والتركيز</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-1.5 py-0.2 rounded font-bold">
                قارئ الوثائق
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              مستعرض: <span className="text-amber-400 font-bold">{getSectionTitle(activeSection)}</span>
            </p>
          </div>
        </div>

        {/* Center: Controls (Font Sizing & Reading Themes) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 p-1 rounded-xl">
            <Type className="w-3.5 h-3.5 text-amber-400 ml-1" />
            {fontSizes.map((fs) => (
              <button
                key={fs.id}
                onClick={() => setReaderFontSize(fs.id)}
                title={`حجم الخط: ${fs.label}`}
                className={`px-2 py-0.5 rounded-lg transition-all text-xs cursor-pointer ${
                  readerFontSize === fs.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-750'
                }`}
              >
                <span className={fs.iconSize}>أ</span>
              </button>
            ))}
          </div>

          {/* Theme Toggles */}
          <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 p-1 rounded-xl">
            <Palette className="w-3.5 h-3.5 text-amber-400 ml-1 hidden sm:inline" />
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setReaderTheme(t.id)}
                title={`نمط العرض: ${t.label}`}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs cursor-pointer transition-all ${
                  readerTheme === t.id
                    ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${t.dotClass}`}></span>
                <span className="hidden md:inline text-[11px]">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Print Current Document */}
          <button
            onClick={() => window.print()}
            title="طباعة التقرير / المستند الحالي"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">طباعة</span>
          </button>
        </div>

        {/* Right: Exit Focus Mode Button with shortcut tooltip */}
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition-all cursor-pointer group"
          title="الخروج من وضع القراءة والعودة للشريط الجانبي (اضغط زر Esc)"
        >
          <Minimize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>خروج من وضع القراءة</span>
          <span className="text-[10px] font-mono bg-rose-950/60 px-1 py-0.2 rounded border border-rose-400/30 text-rose-200">
            Esc
          </span>
        </button>
      </div>
    </aside>
  );
};
