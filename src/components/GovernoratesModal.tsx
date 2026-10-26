import React, { useState } from 'react';
import { useRodFarag } from '../context/RodFaragContext';
import { Governorate, EducationalDirectorate } from '../types';
import {
  MapPin,
  Building,
  School,
  Users,
  Search,
  CheckCircle2,
  ChevronLeft,
  X,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface GovernoratesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernoratesModal: React.FC<GovernoratesModalProps> = ({ isOpen, onClose }) => {
  const {
    governorates,
    selectedGovernorateId,
    selectedDirectorateId,
    selectGovernorateAndDirectorate,
    setActiveSection
  } = useRodFarag();

  const [activeGovTabId, setActiveGovTabId] = useState<string>(selectedGovernorateId);
  const [govSearch, setGovSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  if (!isOpen) return null;

  const currentGov = governorates.find(g => g.id === activeGovTabId) || governorates[0];

  const regions: { id: string; label: string }[] = [
    { id: 'all', label: 'كافة المحافظات الـ27' },
    { id: 'القاهرة الكبرى', label: 'القاهرة الكبرى' },
    { id: 'وجه بحري والدلتا', label: 'الدلتا والبحري' },
    { id: 'القناة وسيناء', label: 'مدن القناة وسيناء' },
    { id: 'شمال الصعيد', label: 'شمال الصعيد' },
    { id: 'وسط وجنوب الصعيد', label: 'وسط وجنوب الصعيد' },
    { id: 'المحافظات الحدودية', label: 'المحافظات الحدودية' }
  ];

  const filteredGovs = governorates.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(govSearch.toLowerCase()) ||
      g.capital.toLowerCase().includes(govSearch.toLowerCase());
    const matchesRegion = regionFilter === 'all' || g.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const handleSelectDirectorate = (dir: EducationalDirectorate) => {
    selectGovernorateAndDirectorate(currentGov.id, dir.id);
    if (dir.id === 'cairo_rodelgard') {
      setActiveSection('dashboard');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                دليل محافظات جمهورية مصر العربية الـ27 والإدارات التعليمية
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                اختر أي محافظة لعرض كافة الإدارات التعليمية التابعة لها والانتقال إليها
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Region Filter & Search */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-col md:flex-row gap-2.5 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={govSearch}
              onChange={(e) => setGovSearch(e.target.value)}
              placeholder="ابحث عن المحافظة أو العاصمة..."
              className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-lg py-1.5 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setRegionFilter(reg.id)}
                className={`px-2.5 py-1 text-[11px] rounded-lg transition-colors font-semibold ${
                  regionFilter === reg.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body Layout: 2 Columns (Right: 27 Governorates List, Left: Selected Governorate's Directorates) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Right Column: 27 Governorates List */}
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-l border-slate-800 p-3 overflow-y-auto space-y-1.5 max-h-56 lg:max-h-none bg-slate-950/40">
            <div className="text-[11px] font-bold text-slate-400 px-2 pb-1 flex items-center justify-between">
              <span>المحافظات ({filteredGovs.length} محافظة)</span>
              <span className="text-[10px] text-amber-400">انقر للاختيار</span>
            </div>

            {filteredGovs.map((gov) => {
              const isSelected = activeGovTabId === gov.id;
              const isCurrentActive = selectedGovernorateId === gov.id;
              return (
                <div
                  key={gov.id}
                  onClick={() => setActiveGovTabId(gov.id)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all border text-right flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                      : 'bg-slate-850/60 border-slate-800/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{gov.name}</span>
                        {isCurrentActive && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                            نشطة
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {gov.directorates.length} إدارات تعليمية • {gov.region}
                      </div>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>

          {/* Left Column: Educational Directorates in Selected Governorate */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900">
            {/* Selected Governorate Banner */}
            <div className="bg-gradient-to-l from-slate-850 to-slate-900 border border-slate-700/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
              <div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md font-bold">
                  {currentGov.region}
                </span>
                <h3 className="text-base font-black text-white mt-1">
                  {currentGov.name} (العاصمة: {currentGov.capital})
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  تضم {currentGov.directorates.length} إدارة تعليمية، وحوالي {currentGov.estimatedSchoolsCount.toLocaleString('ar-EG')} مدرسة، وأكثر من {currentGov.estimatedStudentsCount.toLocaleString('ar-EG')} طالب مقيد.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>ربط إلكتروني مركزي</span>
              </div>
            </div>

            {/* List of Directorates */}
            <div>
              <div className="text-xs font-bold text-slate-300 mb-2.5 flex items-center justify-between">
                <span>الإدارات التعليمية التابعة لـ {currentGov.name}:</span>
                <span className="text-[11px] text-amber-400">انقر على الإدارة لتفعيل نطاقها والاطلاع على طلابها</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentGov.directorates.map((dir) => {
                  const isCurrentDir = selectedGovernorateId === currentGov.id && selectedDirectorateId === dir.id;
                  const isRodElFarag = dir.id === 'cairo_rodelgard';
                  return (
                    <div
                      key={dir.id}
                      onClick={() => handleSelectDirectorate(dir)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-right flex flex-col justify-between ${
                        isCurrentDir
                          ? 'bg-amber-500/15 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                          : 'bg-slate-850/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            {dir.name}
                          </h4>
                          {isCurrentDir && (
                            <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black shrink-0">
                              الإدارة المحددة
                            </span>
                          )}
                          {isRodElFarag && !isCurrentDir && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold shrink-0 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              16 مدرسة كاملة
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg">
                          <div>
                            <span>المدارس: </span>
                            <b className="text-white font-mono">{dir.schoolsCount} مدرسة</b>
                          </div>
                          <div>
                            <span>الطلاب: </span>
                            <b className="text-amber-300 font-mono">{dir.studentsCount.toLocaleString('ar-EG')} طالب</b>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          {isRodElFarag ? 'قاعدة بيانات متكاملة بالطلاب' : 'نظام إحصائي واستعلام'}
                        </span>
                        <button className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                          <span>اختيار الإدارة</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            جمهورية مصر العربية — 27 محافظة • أكثر من 290 إدارة تعليمية
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
