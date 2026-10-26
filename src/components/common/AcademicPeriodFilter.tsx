import React, { useState } from 'react';
import {
  Calendar,
  CalendarRange,
  Clock,
  ArrowUpDown,
  Filter,
  RotateCcw,
  ChevronDown
} from 'lucide-react';

export interface AcademicPeriodOption {
  id: string;
  label: string;
  sublabel: string;
  startDate?: string;
  endDate?: string;
}

export const ACADEMIC_PERIODS: AcademicPeriodOption[] = [
  {
    id: 'all',
    label: 'كافة الفترات الأكاديمية',
    sublabel: 'عرض جميع السجلات دون تقييد زمني'
  },
  {
    id: 'term_1_2026',
    label: 'الفصل الدراسي الأول (الترم الأول 2026/2027)',
    sublabel: 'من 1 سبتمبر 2026 حتى 20 يناير 2027',
    startDate: '2026-09-01',
    endDate: '2027-01-20'
  },
  {
    id: 'term_2_2026',
    label: 'الفصل الدراسي الثاني (الترم الثاني 2026/2027)',
    sublabel: 'من 1 فبراير 2027 حتى 15 يونيو 2027',
    startDate: '2027-02-01',
    endDate: '2027-06-15'
  },
  {
    id: 'current_month',
    label: 'الشهر الحالي (أكتوبر 2026)',
    sublabel: 'من 1 أكتوبر 2026 حتى 31 أكتوبر 2026',
    startDate: '2026-10-01',
    endDate: '2026-10-31'
  },
  {
    id: 'prev_month',
    label: 'الشهر السابق (سبتمبر 2026)',
    sublabel: 'من 1 سبتمبر 2026 حتى 30 سبتمبر 2026',
    startDate: '2026-09-01',
    endDate: '2026-09-30'
  },
  {
    id: 'academic_year_2026',
    label: 'العام الدراسي 2026/2027 كاملاً',
    sublabel: 'من 1 سبتمبر 2026 حتى 30 يونيو 2027',
    startDate: '2026-09-01',
    endDate: '2027-06-30'
  },
  {
    id: 'custom',
    label: 'فترة زمنية مخصصة (تحديد يدوي)',
    sublabel: 'تحديد تاريخي البداية والنهاية'
  }
];

export type SortOrderOption = 'date_desc' | 'date_asc' | 'score_desc' | 'name_asc';

interface AcademicPeriodFilterProps {
  selectedPeriod: string;
  onPeriodChange: (periodId: string, startDate?: string, endDate?: string) => void;
  customStartDate?: string;
  customEndDate?: string;
  onCustomDatesChange?: (start: string, end: string) => void;
  sortOrder?: SortOrderOption;
  onSortOrderChange?: (sort: SortOrderOption) => void;
  showSortOptions?: boolean;
  scoreSortLabel?: string;
  dateSortLabel?: string;
  filteredCount?: number;
  totalCount?: number;
  className?: string;
}

export const AcademicPeriodFilter: React.FC<AcademicPeriodFilterProps> = ({
  selectedPeriod,
  onPeriodChange,
  customStartDate = '2026-09-01',
  customEndDate = '2026-10-31',
  onCustomDatesChange,
  sortOrder = 'date_desc',
  onSortOrderChange,
  showSortOptions = true,
  scoreSortLabel = 'الأعلى تقييماً / معدلاً',
  dateSortLabel = 'تاريخ القيد / التعيين',
  filteredCount,
  totalCount,
  className = ''
}) => {
  const [localStart, setLocalStart] = useState(customStartDate);
  const [localEnd, setLocalEnd] = useState(customEndDate);

  const currentOption = ACADEMIC_PERIODS.find(p => p.id === selectedPeriod) || ACADEMIC_PERIODS[0];

  const handleSelectPeriod = (periodId: string) => {
    const period = ACADEMIC_PERIODS.find(p => p.id === periodId);
    if (!period) return;

    if (period.id === 'custom') {
      onPeriodChange('custom', localStart, localEnd);
    } else {
      onPeriodChange(period.id, period.startDate, period.endDate);
    }
  };

  const handleApplyCustomDates = () => {
    if (onCustomDatesChange) {
      onCustomDatesChange(localStart, localEnd);
    }
    onPeriodChange('custom', localStart, localEnd);
  };

  const handleReset = () => {
    onPeriodChange('all');
    if (onSortOrderChange) {
      onSortOrderChange('date_desc');
    }
  };

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm text-right ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left/Main: Academic Period Dropdown & Details */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <CalendarRange className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">الفترة الأكاديمية والزمنية</span>
              <span className="text-[10px] text-slate-400 block">{currentOption.sublabel}</span>
            </div>
          </div>

          {/* Period Selector Dropdown */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <select
              value={selectedPeriod}
              onChange={(e) => handleSelectPeriod(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl py-2 pr-3 pl-8 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none cursor-pointer"
            >
              {ACADEMIC_PERIODS.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Custom Date Range Pickers (Visible when custom is selected) */}
          {selectedPeriod === 'custom' && (
            <div className="flex flex-wrap items-center gap-2 bg-slate-850 p-1.5 rounded-xl border border-slate-750">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="text-[10px] text-slate-400">من:</span>
                <input
                  type="date"
                  value={localStart}
                  onChange={(e) => setLocalStart(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="text-[10px] text-slate-400">إلى:</span>
                <input
                  type="date"
                  value={localEnd}
                  onChange={(e) => setLocalEnd(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleApplyCustomDates}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                تطبيق الفترة
              </button>
            </div>
          )}
        </div>

        {/* Right/Secondary: Sorting & Active Count */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sorting Dropdown */}
          {showSortOptions && onSortOrderChange && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                الترتيب:
              </span>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => onSortOrderChange(e.target.value as SortOrderOption)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl py-2 pr-3 pl-8 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="date_desc">{dateSortLabel} (الأحدث أولاً)</option>
                  <option value="date_asc">{dateSortLabel} (الأقدم أولاً)</option>
                  <option value="score_desc">{scoreSortLabel}</option>
                  <option value="name_asc">الاسم (أبجدياً أ - ي)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Counts badge */}
          {filteredCount !== undefined && totalCount !== undefined && (
            <div className="text-xs bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1.5 rounded-xl font-medium">
              عرض <span className="font-bold text-amber-400">{filteredCount}</span> من أصل{' '}
              <span className="font-bold text-slate-200">{totalCount}</span>
            </div>
          )}

          {/* Reset Button */}
          {selectedPeriod !== 'all' && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="إعادة تعيين الفلترة الزمنية"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
