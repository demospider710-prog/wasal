import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  School,
  Users,
  GraduationCap,
  CalendarCheck,
  Mail,
  AlertTriangle,
  MessageSquareWarning,
  Award,
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  Clock,
  CheckCircle,
  Building2,
  ChevronLeft,
  Info,
  MapPin,
  Compass,
  Star,
  Sparkles,
  BookOpen,
  UserCheck,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    schools,
    teachers,
    students,
    correspondence,
    complaints,
    discipline,
    assessments,
    setActiveSection,
    setSelectedSchoolFilter,
    auditLogs,
    governorates,
    selectedGovernorateId,
    selectedDirectorateId,
    activeGovernorate,
    activeDirectorate,
    selectGovernorateAndDirectorate,
    setIsGovModalOpen
  } = useRodFarag();

  const [activeGovTab, setActiveGovTab] = useState<string>(selectedGovernorateId || 'cairo');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [studentCategoryFilter, setStudentCategoryFilter] = useState<'all' | 'top' | 'perfect_attendance'>('all');

  const totalStudents = students.reduce((acc, s) => acc + (s.attendanceRate ? 1 : 0), 0);
  const totalClasses = schools.reduce((acc, s) => acc + (s.classesCount || 0), 0);
  const totalTeachers = schools.reduce((acc, s) => acc + (s.teachersCount || 0), 0);
  const totalRegisteredStudents = schools.reduce((acc, s) => acc + (s.studentsCount || 0), 0);

  const overdueMemos = correspondence.filter(c => c.status === 'overdue').length;
  const inProgressMemos = correspondence.filter(c => c.status === 'in_progress').length;
  const openComplaints = complaints.filter(c => ['new', 'under_review', 'info_requested'].includes(c.status)).length;
  const pendingAssessments = assessments.filter(a => a.status === 'under_review').length;

  const currentSelectedGov = governorates.find(g => g.id === activeGovTab) || governorates[0];

  const regions: { id: string; label: string }[] = [
    { id: 'all', label: 'كافة المحافظات الـ27' },
    { id: 'القاهرة الكبرى', label: 'القاهرة الكبرى' },
    { id: 'وجه بحري والدلتا', label: 'الدلتا والبحري' },
    { id: 'القناة وسيناء', label: 'القناة وسيناء' },
    { id: 'شمال الصعيد', label: 'شمال الصعيد' },
    { id: 'وسط وجنوب الصعيد', label: 'وسط وجنوب الصعيد' },
    { id: 'المحافظات الحدودية', label: 'المحافظات الحدودية' }
  ];

  const filteredGovs = governorates.filter(g => {
    return regionFilter === 'all' || g.region === regionFilter;
  });

  const filteredStudents = students.filter(st => {
    if (studentCategoryFilter === 'top') return (st.generalAverage || 0) >= 95;
    if (studentCategoryFilter === 'perfect_attendance') return (st.attendanceRate || 0) >= 98;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Government / Educational Seal */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              لوحة التحكم المركزية لإدارة روض الفرج التعليمية
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              منظومة المتابعة والقيادة التربوية الذكية (16 مدرسة)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              ربط مباشر وموحد بين الإدارة التعليمية ومدارس حي روض الفرج والساحل، لتيسير المراسلات الرسمية والانضباط ومتابعة الطلاب والتقييمات المعتمدة بشفافية تامة.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveSection('correspondence')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>مراسلة رسمية جديدة</span>
            </button>
            <button
              onClick={() => setActiveSection('assessments')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>اعتماد التقييمات</span>
            </button>
            <button
              onClick={() => setActiveSection('reports')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>التقارير المجمعة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Schools KPI */}
        <div
          onClick={() => setActiveSection('schools')}
          className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold text-slate-300">المدارس المسجلة</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <School className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">16 مدرسة</div>
          <div className="text-[11px] text-amber-400/90 mt-1 flex items-center justify-between">
            <span>جميع مدارس الإدارة تامة الربط</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Total Students KPI */}
        <div
          onClick={() => setActiveSection('students')}
          className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold text-slate-300">إجمالي الطلاب المقيدين</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{totalRegisteredStudents.toLocaleString('ar-EG')} طالب</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>في {totalClasses} فصلاً دراسياً</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Total Teachers KPI */}
        <div
          onClick={() => setActiveSection('teachers')}
          className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold text-slate-300">هيئة التدريس</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{totalTeachers.toLocaleString('ar-EG')} معلم</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center justify-between">
            <span>تغطية بنسبة 98.4% للمناهج</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Average Attendance KPI */}
        <div
          onClick={() => setActiveSection('attendance')}
          className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold text-slate-300">متوسط الحضور اليومي</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">96.8%</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>محدث اليوم • انتظام مرتفع</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Operational Status Badges (Correspondence, Complaints, Pending approvals) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div
          onClick={() => setActiveSection('correspondence')}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">المراسلات والمكاتبات</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {correspondence.length} صادرة • {overdueMemos} متأخرة
              </div>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-bold underline">متابعة</span>
        </div>

        <div
          onClick={() => setActiveSection('complaints')}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">منظومة الشكاوى والتظلمات</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {openComplaints} قيد الفحص والرد
              </div>
            </div>
          </div>
          <span className="text-xs text-blue-400 font-bold underline">فحص</span>
        </div>

        <div
          onClick={() => setActiveSection('assessments')}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">اعتماد ونشر نتائج التقييمات</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {pendingAssessments > 0 ? `${pendingAssessments} بانتظار الاعتماد` : 'جميع النتائج معتمدة'}
              </div>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-bold underline">مراجعة</span>
        </div>
      </div>

      {/* 27 Governorates & Educational Directorates Navigator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3.5 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  دليل محافظات جمهورية مصر العربية الـ27 والإدارات التعليمية
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  حدد أي محافظة لاستعراض كافة الإدارات التعليمية التابعة لها والانتقال إليها
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>المحافظة الحالية: <b className="text-white font-bold">{activeGovernorate.name}</b></span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-300 font-bold">{activeDirectorate?.name || 'إدارة روض الفرج'}</span>
            </div>
            <button
              onClick={() => setIsGovModalOpen(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow flex items-center gap-1 cursor-pointer"
            >
              <span>دليل الـ27 محافظة الشامل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setRegionFilter(reg.id)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-semibold ${
                regionFilter === reg.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* 27 Governorates Selector Pills */}
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-950/40 rounded-xl border border-slate-800/80">
          {filteredGovs.map((gov) => {
            const isTabActive = activeGovTab === gov.id;
            const isSystemActive = selectedGovernorateId === gov.id;
            return (
              <button
                key={gov.id}
                onClick={() => setActiveGovTab(gov.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isTabActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : isSystemActive
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{gov.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isTabActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {gov.directorates.length} إدارات
                </span>
                {isSystemActive && !isTabActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Governorate's Educational Directorates Grid */}
        <div className="bg-slate-850/80 border border-slate-750 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
            <div>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                {currentSelectedGov.region}
              </span>
              <h4 className="text-sm font-black text-white mt-1">
                جميع الإدارات التعليمية في {currentSelectedGov.name} ({currentSelectedGov.directorates.length} إدارة تعليمية):
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                العاصمة: {currentSelectedGov.capital} • حوالي {currentSelectedGov.estimatedSchoolsCount.toLocaleString('ar-EG')} مدرسة • {currentSelectedGov.estimatedStudentsCount.toLocaleString('ar-EG')} طالب مقيد
              </p>
            </div>
            <div className="text-xs text-slate-400">
              انقر على أي إدارة تعليمية لتحديدها وتفعيل نطاقها
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto p-1">
            {currentSelectedGov.directorates.map((dir) => {
              const isCurrentActive = selectedGovernorateId === currentSelectedGov.id && selectedDirectorateId === dir.id;
              const isRodElFarag = dir.id === 'cairo_rodelgard';
              return (
                <div
                  key={dir.id}
                  onClick={() => selectGovernorateAndDirectorate(currentSelectedGov.id, dir.id)}
                  className={`p-3 rounded-xl border text-right cursor-pointer transition-all flex flex-col justify-between ${
                    isCurrentActive
                      ? 'bg-amber-500/15 border-amber-500/60 shadow-md ring-1 ring-amber-500/40 text-amber-200'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <h5 className="text-xs font-bold text-white flex items-center gap-1 line-clamp-1">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {dir.name}
                      </h5>
                      {isCurrentActive && (
                        <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded shrink-0">
                          الإدارة النشطة
                        </span>
                      )}
                      {isRodElFarag && !isCurrentActive && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded shrink-0">
                          16 مدرسة كاملة
                        </span>
                      )}
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 bg-slate-950/60 p-1.5 rounded-lg font-mono">
                      <div>
                        المدارس: <span className="text-white font-bold">{dir.schoolsCount}</span>
                      </div>
                      <div>
                        الطلاب: <span className="text-amber-300 font-bold">{dir.studentsCount.toLocaleString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">
                      {isRodElFarag ? 'قاعدة بيانات كاملة' : 'بيانات استعلام وربط'}
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <span>تفعيل الإدارة</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Prominent Student Information Showcase (Honors & Student Dossiers) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                لوحة شؤون ومعلومات الطلاب المتميزين — روض الفرج
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                  {students.length} ملفات طلاب تفصيلية
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                بيانات الدرجات، الترتيب على مستوى الإدارة، نسب الحضور، المواد الدراسية، وأولياء الأمور
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setStudentCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  studentCategoryFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                كافة الطلاب ({students.length})
              </button>
              <button
                onClick={() => setStudentCategoryFilter('top')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  studentCategoryFilter === 'top'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                أوائل الإدارة (95%+)
              </button>
              <button
                onClick={() => setStudentCategoryFilter('perfect_attendance')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  studentCategoryFilter === 'perfect_attendance'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                انتظام كامل (98%+)
              </button>
            </div>

            <button
              onClick={() => setActiveSection('students')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>فتح سجل الطلاب الكامل</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStudents.slice(0, 6).map((st) => (
            <div
              key={st.id}
              onClick={() => setActiveSection('students')}
              className="bg-slate-850/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition-all cursor-pointer text-right flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Header: Student Name & Rank */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                      {st.name}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {st.schoolName} • {st.grade} ({st.classroom})
                    </div>
                  </div>
                  {st.studentRank && (
                    <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold shrink-0 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      {st.studentRank}
                    </span>
                  )}
                </div>

                {/* Key Metrics: GPA, Attendance, Code */}
                <div className="mt-3 grid grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">المعدل العام</span>
                    <span className="text-sm font-black text-amber-300 font-mono">{st.generalAverage}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">نسبة الحضور</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">{st.attendanceRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">السلوك التربوي</span>
                    <span className="text-xs font-bold text-blue-300">{st.behaviorRating || 'ممتاز'}</span>
                  </div>
                </div>

                {/* Academic Subjects Scores (if available) */}
                {st.academicSubjects && st.academicSubjects.length > 0 && (
                  <div className="mt-2.5">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">نتائج المواد المعتمدة:</span>
                    <div className="flex flex-wrap gap-1">
                      {st.academicSubjects.slice(0, 4).map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300 flex items-center gap-1 font-mono"
                        >
                          <span className="text-slate-400 font-sans">{sub.subject}:</span>
                          <b className="text-amber-300">{sub.score}</b>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: Parent info & Student Code */}
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-400">ولي الأمر: </span>
                  <span className="text-slate-300 font-semibold">{st.parentName}</span>
                </div>
                <div className="font-mono text-amber-400/90 text-[10px]">
                  {st.internalCode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: The 16 Schools Snapshot */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              شبكة المدارس الـ16 التابعة لإدارة روض الفرج
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              انقر على أي مدرسة لفلترة كامل بيانات المنظومة إليها أو الاطلاع على تفاصيلها
            </p>
          </div>
          <button
            onClick={() => setActiveSection('schools')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>سجل المدارس الكامل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Schools mini cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {schools.slice(0, 8).map((school) => (
            <div
              key={school.id}
              onClick={() => {
                setSelectedSchoolFilter(school.id);
                setActiveSection('schools');
              }}
              className="p-3 bg-slate-850/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition-all text-right"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  {school.code}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                  <CheckCircle className="w-2.5 h-2.5" />
                  معتمد
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mt-1.5 line-clamp-1">{school.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{school.principalName}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                <span>{school.studentsCount} طالب</span>
                <span>{school.teachersCount} معلم</span>
                <span>{school.classesCount} فصل</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={() => setActiveSection('schools')}
            className="text-xs text-slate-400 hover:text-amber-400 py-1 font-medium transition-colors"
          >
            + عرض باقي المدارس الـ16 (من مدرسة 09 إلى مدرسة 16)
          </button>
        </div>
      </div>

      {/* Bottom Grid: Recent Official Audit Events & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Audit Trail */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              أحدث العمليات الإدارية وسجل التدقيق الفوري
            </h3>
            <button
              onClick={() => setActiveSection('security_audit')}
              className="text-[11px] text-amber-400 hover:underline"
            >
              سجل العمليات الكامل
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 mt-2">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-2.5 text-right flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-200">{log.action}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{log.details}</div>
                  <div className="text-[10px] text-amber-400/80 font-mono mt-1">
                    بواسطة: {log.actorName} • المورد: {log.targetResource}
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono block">{log.timestamp}</span>
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono mt-1 inline-block">
                    {log.integrityHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Leaders & Governance Callout */}
        <div className="space-y-4">
          <div
            onClick={() => setActiveSection('future_leaders')}
            className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-4 cursor-pointer hover:border-amber-500/60 transition-all text-right group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">قسم قادة المستقبل</span>
              <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-xs text-slate-200 font-semibold mt-2">
              مبادرات الابتكار الطلابي وسفراء المدارس بروض الفرج
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              متابعة مشاريع الطلاب المعتمدة وتكريم المتميزين في مجالات البيئة والذكاء الاصطناعي والتراث.
            </p>
            <div className="mt-3 text-[11px] text-amber-300 font-bold flex items-center gap-1">
              <span>عرض المبادرات والسفراء</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setActiveSection('governance')}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 cursor-pointer hover:border-slate-700 transition-all text-right"
          >
            <div className="text-xs font-bold text-slate-300">ميثاق الحقوق والحوكمة المدرسية</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              وثائق حقوق الطلاب وواجباتهم ومسؤوليات الكوادر التربوية وإجراءات منع تضارب المصالح المعتمدة استرشادياً.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-mono bg-slate-800/80 px-2 py-1 rounded inline-block">
              إصدارات العام الدراسي 2026/2027
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
