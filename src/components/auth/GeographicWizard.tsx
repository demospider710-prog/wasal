import React, { useState, useMemo } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { Governorate, EducationalDirectorate, School } from '../../types';
import { AccountCategory, RegistrationPayload } from '../../types/auth';
import { TeacherRegisterForm } from './TeacherRegisterForm';
import { StudentRegisterForm } from './StudentRegisterForm';
import { ParentRegisterForm } from './ParentRegisterForm';
import { AdminRegisterForm } from './AdminRegisterForm';
import { RequestSchoolModal } from './RequestSchoolModal';
import {
  MapPin,
  Building,
  School as SchoolIcon,
  Users,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  HeartHandshake,
  UserCog,
  BookOpen,
  PlusCircle,
  Sparkles,
  Info
} from 'lucide-react';

interface GeographicWizardProps {
  onCancel: () => void;
}

export const GeographicWizard: React.FC<GeographicWizardProps> = ({ onCancel }) => {
  const {
    governorates,
    schools: allSchools,
    registerUserAccount,
    addToast
  } = useRodFarag();

  // Wizard Step (1: Gov, 2: Directorate, 3: School, 4: Category, 5: Role Form)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedGov, setSelectedGov] = useState<Governorate | null>(() => {
    return governorates.find(g => g.id === 'cairo') || null;
  });
  const [selectedDir, setSelectedDir] = useState<EducationalDirectorate | null>(() => {
    const cairo = governorates.find(g => g.id === 'cairo');
    return cairo?.directorates.find(d => d.id === 'cairo_rodelgard') || null;
  });
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AccountCategory | null>(null);

  // Search queries per step
  const [govSearch, setGovSearch] = useState('');
  const [dirSearch, setDirSearch] = useState('');
  const [schoolSearch, setSchoolSearch] = useState('');

  // Request School Modal State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Filtered Governorates
  const filteredGovernorates = useMemo(() => {
    if (!govSearch.trim()) return governorates;
    return governorates.filter(g =>
      g.name.includes(govSearch.trim()) ||
      g.capital.includes(govSearch.trim()) ||
      g.region.includes(govSearch.trim())
    );
  }, [governorates, govSearch]);

  // Filtered Directorates based on chosen Governorate
  const availableDirectorates = useMemo(() => {
    if (!selectedGov) return [];
    if (!dirSearch.trim()) return selectedGov.directorates;
    return selectedGov.directorates.filter(d =>
      d.name.includes(dirSearch.trim())
    );
  }, [selectedGov, dirSearch]);

  // Filtered Schools based on chosen Directorate
  const availableSchools = useMemo(() => {
    if (!selectedDir) return [];
    let list: School[] = [];
    if (selectedDir.id === 'cairo_rodelgard') {
      list = allSchools;
    } else {
      // Sample schools for non-Rod El Farag directorate
      list = allSchools.filter(s => (s as any).directorateId === selectedDir.id);
      if (list.length === 0) {
        // Provide sample accredited schools for this directorate
        list = [
          {
            id: `${selectedDir.id}-sch1`,
            code: `${selectedDir.id.toUpperCase().slice(0, 6)}-01`,
            name: `مدرسة ${selectedDir.name.replace('إدارة ', '')} الثانوية المشتركة`,
            stage: 'secondary',
            stageNameAr: 'المرحلة الثانوية العامة',
            address: `نطاق ${selectedDir.name}، ${selectedGov?.name}`,
            phone: '02-23990001',
            email: `school@${selectedDir.id}.edu.eg`,
            principalName: 'مدير المدرسة المعتمد',
            authorizedOfficers: ['وكيل شؤون الطلاب'],
            studentsCount: 950,
            teachersCount: 54,
            classesCount: 22,
            status: 'active',
            accreditationStatus: 'accredited',
            establishedYear: 1985,
            createdAt: '2020-09-01',
            updatedAt: '2026-10-20'
          },
          {
            id: `${selectedDir.id}-sch2`,
            code: `${selectedDir.id.toUpperCase().slice(0, 6)}-02`,
            name: `مدرسة الشهيد الرسمية التجريبية لغات`,
            stage: 'experimental_languages',
            stageNameAr: 'الرسمية لغات (تجريبي)',
            address: `شارع المدارس، ${selectedDir.name}`,
            phone: '02-23990002',
            email: `exp@${selectedDir.id}.edu.eg`,
            principalName: 'أ. مروة الشاذلي',
            authorizedOfficers: ['مسؤول التطوير'],
            studentsCount: 1120,
            teachersCount: 62,
            classesCount: 26,
            status: 'active',
            accreditationStatus: 'accredited',
            establishedYear: 2004,
            createdAt: '2020-09-01',
            updatedAt: '2026-10-20'
          }
        ];
      }
    }

    if (!schoolSearch.trim()) return list;
    return list.filter(s =>
      s.name.includes(schoolSearch.trim()) ||
      s.code.toLowerCase().includes(schoolSearch.trim().toLowerCase()) ||
      s.stageNameAr.includes(schoolSearch.trim())
    );
  }, [selectedDir, selectedGov, allSchools, schoolSearch]);

  // Handle Form Submission
  const handlePayloadSubmit = (payload: RegistrationPayload) => {
    registerUserAccount(payload);
  };

  const stepsConfig = [
    { num: 1, title: 'المحافظة', desc: 'الـ27 محافظة' },
    { num: 2, title: 'الإدارة التعليمية', desc: 'المديريات والإدارات' },
    { num: 3, title: 'المدرسة', desc: 'المؤسسة التعليمية' },
    { num: 4, title: 'نوع الحساب', desc: 'الفئة والصلاحيات' },
    { num: 5, title: 'نموذج التسجيل', desc: 'البيانات والاعتماد' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-100 max-w-4xl mx-auto">
      {/* Top Header & Breadcrumbs */}
      <div className="border-b border-slate-800 pb-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
              منظومة التسجيل الإلكتروني المتدرج
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              إنشاء حساب جديد في منظومة الإدارة التعليمية
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            إلغاء والعودة للرئيسية
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {stepsConfig.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                className={`relative p-2 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : isCompleted
                    ? 'bg-slate-800/80 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {s.num}
                    </span>
                  )}
                  <span className="text-xs font-bold hidden md:inline">{s.title}</span>
                </div>
                <div className="text-[10px] hidden sm:block truncate opacity-80">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SELECT GOVERNORATE */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                الخطوة 1: اختيار المحافظة (الـ27 محافظة مصرية)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                اختر المحافظة التابع لها لعرض الإدارات والمدارس المعتمدة بنطاقها الجغرافي
              </p>
            </div>

            {/* Governorate Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="ابحث عن اسم المحافظة..."
                value={govSearch}
                onChange={(e) => setGovSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Governorates Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-[380px] overflow-y-auto p-1">
            {filteredGovernorates.map((gov) => {
              const isSelected = selectedGov?.id === gov.id;
              const isCairo = gov.id === 'cairo';

              return (
                <button
                  key={gov.id}
                  onClick={() => {
                    setSelectedGov(gov);
                    // Reset subordinate selections
                    if (gov.directorates.length > 0) {
                      setSelectedDir(gov.id === 'cairo' ? gov.directorates.find(d => d.id === 'cairo_rodelgard') || gov.directorates[0] : gov.directorates[0]);
                    } else {
                      setSelectedDir(null);
                    }
                    setSelectedSchool(null);
                  }}
                  className={`text-right p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {isCairo && (
                    <span className="absolute top-2 left-2 text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black">
                      مفعّل
                    </span>
                  )}
                  <div className="font-bold text-xs text-white mb-1 flex items-center justify-between">
                    <span>{gov.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mb-1">عاصمة: {gov.capital}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <span>{gov.region}</span>
                    <span className="font-mono text-amber-400/80 font-bold">{gov.totalDirectoratesCount} إدارة</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              المحافظة المحددة حاليًا:{' '}
              <strong className="text-amber-400">{selectedGov?.name || 'لم تحدد بعد'}</strong>
            </span>
            <button
              onClick={() => {
                if (!selectedGov) {
                  addToast('يرجى اختيار المحافظة أولاً', 'error');
                  return;
                }
                setCurrentStep(2);
              }}
              disabled={!selectedGov}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>متابعة لاختيار الإدارة التعليمية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT EDUCATIONAL DIRECTORATE */}
      {currentStep === 2 && selectedGov && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                الخطوة 2: اختيار الإدارة التعليمية التابعة لـ ({selectedGov.name})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تُعرض فقط الإدارات التابعة للمحافظة المختارة وفق الهيكل الإداري الرسمي
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="ابحث باسم الإدارة التعليمية..."
                value={dirSearch}
                onChange={(e) => setDirSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Official Governmental Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-3 text-amber-200 text-xs">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-bold mb-0.5">
                تنبيه الإدارة العامة للإحصاء والتخطيط:
              </strong>
              بيانات المؤسسات والمدارس تخضع للمراجعة والتدقيق والاعتماد الدوري. «إدارة روض الفرج التعليمية» مفعلة بكافة مدارسها الـ16 وبياناتها المعتمدة في هذه النسخة.
            </div>
          </div>

          {/* Directorates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto p-1">
            {availableDirectorates.map((dir) => {
              const isSelected = selectedDir?.id === dir.id;
              const isRodElFarag = dir.id === 'cairo_rodelgard';

              return (
                <button
                  key={dir.id}
                  onClick={() => {
                    setSelectedDir(dir);
                    setSelectedSchool(null);
                  }}
                  className={`text-right p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30'
                      : isRodElFarag
                      ? 'bg-slate-950 border-amber-500/50 hover:border-amber-400'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {isRodElFarag && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-2 py-0.5 rounded font-black flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      16 مدرسة معتمدة
                    </span>
                  )}
                  <div className="font-bold text-xs text-white mb-1.5 flex items-center justify-between">
                    <span>{dir.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3">
                    <span>المدارس: <strong className="text-slate-200">{dir.schoolsCount}</strong></span>
                    <span>الطلاب: <strong className="text-slate-200">{dir.studentsCount.toLocaleString('ar-EG')}</strong></span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>رجوع لاختيار المحافظة</span>
            </button>

            <button
              onClick={() => {
                if (!selectedDir) {
                  addToast('يرجى اختيار الإدارة التعليمية للمتابعة', 'error');
                  return;
                }
                setCurrentStep(3);
              }}
              disabled={!selectedDir}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>متابعة لاختيار المدرسة ({selectedDir?.name})</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELECT SCHOOL */}
      {currentStep === 3 && selectedDir && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <SchoolIcon className="w-5 h-5 text-amber-400" />
                الخطوة 3: اختيار المدرسة التابعة لـ ({selectedDir.name})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تصفح قائمة المدارس المعتمدة بكود المدرسة والمرحلة وحالة الاعتماد
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="بحث باسم أو كود المدرسة..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pr-9 pl-3 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Request New School Addition Button */}
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 hover:border-amber-400 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                title="إذا لم تجد مدرستك مسجلة، قدم طلب اعتماد رسمي"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>طلب إضافة مدرسة</span>
              </button>
            </div>
          </div>

          {/* Schools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto p-1">
            {availableSchools.map((sch) => {
              const isSelected = selectedSchool?.id === sch.id;

              return (
                <button
                  key={sch.id}
                  onClick={() => setSelectedSchool(sch)}
                  className={`text-right p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mb-1">
                        {sch.code}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{sch.name}</h4>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold shrink-0">
                        معتمدة
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                    <div>المرحلة: <span className="text-slate-200 font-medium">{sch.stageNameAr}</span></div>
                    <div>الطلاب: <span className="text-slate-200 font-mono font-bold">{sch.studentsCount}</span></div>
                    <div className="col-span-2 text-slate-500 truncate text-[10px]">
                      {sch.address}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Missing School Banner */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="text-slate-300">
              لم تجد اسم مدرستك في قائمة مدارس {selectedDir.name}؟
            </div>
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
            >
              انقر لتقديم «طلب إضافة مدرسة جديدة للاعتماد»
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>رجوع لاختيار الإدارة</span>
            </button>

            <button
              onClick={() => {
                if (!selectedSchool) {
                  addToast('يرجى تحديد المدرسة للمتابعة', 'error');
                  return;
                }
                setCurrentStep(4);
              }}
              disabled={!selectedSchool}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>متابعة لاختيار نوع الحساب</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SELECT ACCOUNT CATEGORY */}
      {currentStep === 4 && selectedSchool && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              الخطوة 4: اختيار نوع الحساب والفئة المسجلة
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              حدد فئتك بالمنظومة لفتح استمارة التسجيل المخصصة والصلاحيات المقررة
            </p>
          </div>

          {/* Selected School Pill */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400">المؤسسة التعليمية المحددة: </span>
              <strong className="text-white">{selectedSchool.name}</strong>
              <span className="text-amber-400 text-[11px] mr-2">({selectedSchool.code})</span>
            </div>
            <button
              onClick={() => setCurrentStep(3)}
              className="text-[11px] text-amber-400 hover:underline"
            >
              تغيير المدرسة
            </button>
          </div>

          {/* 4 Interactive Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Teacher & Staff */}
            <button
              type="button"
              onClick={() => setSelectedCategory('teacher_staff')}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedCategory === 'teacher_staff'
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">مدرس أو مسؤول تعليمي</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  للمعلمين، الموجهين، الإداريين، مسؤولي شؤون الطلاب، والأخصائيين الاجتماعيين.
                </p>
              </div>
              <div className="text-[11px] text-amber-400 font-semibold flex items-center justify-between border-t border-slate-800/80 pt-2">
                <span>يتطلب: الكود الوظيفي والمسمى المعتمد</span>
                {selectedCategory === 'teacher_staff' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
              </div>
            </button>

            {/* 2. Student */}
            <button
              type="button"
              onClick={() => setSelectedCategory('student')}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedCategory === 'student'
                  ? 'bg-blue-500/15 border-blue-500 ring-2 ring-blue-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">طالب نظامي</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  للطلاب المقيدين بالمدارس الرسمية، لمتابعة الحضور، التقييمات، الجداول، والأنشطة.
                </p>
              </div>
              <div className="text-[11px] text-blue-400 font-semibold flex items-center justify-between border-t border-slate-800/80 pt-2">
                <span>يتطلب: الرقم القومي وكود الطالب بوزارة التعليم</span>
                {selectedCategory === 'student' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
              </div>
            </button>

            {/* 3. Parent */}
            <button
              type="button"
              onClick={() => setSelectedCategory('parent')}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedCategory === 'parent'
                  ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">ولي أمر</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  لمتابعة غياب وحضور الأبناء، الدرجات الشهرية، السلوك المدرسي، والشكاوى والمقترحات.
                </p>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-between border-t border-slate-800/80 pt-2">
                <span>يتطلب: الرقم القومي وكود الطالب التابع</span>
                {selectedCategory === 'parent' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
            </button>

            {/* 4. Leader / Principal */}
            <button
              type="button"
              onClick={() => setSelectedCategory('directorate_leader')}
              className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between ${
                selectedCategory === 'directorate_leader'
                  ? 'bg-purple-500/15 border-purple-500 ring-2 ring-purple-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-3">
                  <UserCog className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">مسؤول إدارة أو مدير مدرسة</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  للقيادات التعليمية، مديري المدارس، الوكلاء، والموجهين الأوائل بديوان الإدارة.
                </p>
              </div>
              <div className="text-[11px] text-purple-400 font-semibold flex items-center justify-between border-t border-slate-800/80 pt-2">
                <span>يتطلب: رقم القرار الوزاري وأمر التكليف الرسمي</span>
                {selectedCategory === 'directorate_leader' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(3)}
              className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>رجوع لاختيار المدرسة</span>
            </button>

            <button
              onClick={() => {
                if (!selectedCategory) {
                  addToast('يرجى تحديد نوع الحساب أولاً', 'error');
                  return;
                }
                setCurrentStep(5);
              }}
              disabled={!selectedCategory}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <span>فتح نموذج تسجيل البيانات</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: ROLE-TAILORED REGISTRATION FORM */}
      {currentStep === 5 && selectedGov && selectedDir && selectedSchool && selectedCategory && (
        <div className="space-y-4">
          {selectedCategory === 'teacher_staff' && (
            <TeacherRegisterForm
              governorate={selectedGov}
              directorate={selectedDir}
              school={selectedSchool}
              onSubmit={handlePayloadSubmit}
              onBack={() => setCurrentStep(4)}
            />
          )}

          {selectedCategory === 'student' && (
            <StudentRegisterForm
              governorate={selectedGov}
              directorate={selectedDir}
              school={selectedSchool}
              onSubmit={handlePayloadSubmit}
              onBack={() => setCurrentStep(4)}
            />
          )}

          {selectedCategory === 'parent' && (
            <ParentRegisterForm
              governorate={selectedGov}
              directorate={selectedDir}
              school={selectedSchool}
              onSubmit={handlePayloadSubmit}
              onBack={() => setCurrentStep(4)}
            />
          )}

          {selectedCategory === 'directorate_leader' && (
            <AdminRegisterForm
              governorate={selectedGov}
              directorate={selectedDir}
              school={selectedSchool}
              onSubmit={handlePayloadSubmit}
              onBack={() => setCurrentStep(4)}
            />
          )}
        </div>
      )}

      {/* Request School Modal */}
      <RequestSchoolModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        preselectedGovId={selectedGov?.id}
        preselectedDirId={selectedDir?.id}
      />
    </div>
  );
};
