import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { Student } from '../../types';
import { canViewStudent } from '../../utils/rod-farag-logic';
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  Phone,
  UserCheck,
  Award,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Eye,
  Star,
  MapPin,
  Calendar,
  Building,
  User,
  Printer,
  Compass,
  LayoutGrid,
  List
} from 'lucide-react';

export const StudentsView: React.FC = () => {
  const {
    students,
    schools,
    currentUser,
    addStudent,
    selectedSchoolFilter,
    activeGovernorate,
    activeDirectorate,
    setIsGovModalOpen
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'top' | 'attendance'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    internalCode: '',
    name: '',
    schoolId: 'sch-01',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    parentId: 'prt-01',
    parentName: '',
    parentPhone: '',
    attendanceRate: 98,
    generalAverage: 92,
    status: 'enrolled' as const,
    birthDate: '2010-05-15',
    emergencyContact: ''
  });

  const canManageStudents = ['super_admin', 'directorate_admin', 'school_principal', 'student_affairs'].includes(currentUser.role);

  // Filter students based on permissions & school scoping & search
  const visibleStudents = students.filter((student) => {
    // Permission check
    if (!canViewStudent(currentUser, student)) return false;

    // School filter dropdown check
    if (selectedSchoolFilter !== 'all' && student.schoolId !== selectedSchoolFilter) return false;

    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.internalCode.toLowerCase().includes(search.toLowerCase()) ||
      student.parentName.toLowerCase().includes(search.toLowerCase());

    const matchesGrade = gradeFilter === 'all' || student.grade.includes(gradeFilter);

    const matchesCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'top' && (student.generalAverage || 0) >= 95) ||
      (categoryFilter === 'attendance' && (student.attendanceRate || 0) >= 98);

    return matchesSearch && matchesGrade && matchesCategory;
  });

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    addStudent({
      internalCode: formData.internalCode || `RDF-STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      schoolId: school.id,
      schoolName: school.name,
      grade: formData.grade,
      classroom: formData.classroom,
      parentId: formData.parentId,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      attendanceRate: Number(formData.attendanceRate),
      generalAverage: Number(formData.generalAverage),
      status: formData.status,
      birthDate: formData.birthDate,
      emergencyContact: formData.emergencyContact || formData.parentPhone,
      achievementsCount: 0
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Governorate & Directorate Context Banner */}
      <div className="bg-gradient-to-l from-slate-900 to-slate-850 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">النطاق الإداري الحالي للطلاب:</span>
          <span className="font-bold text-white">{activeGovernorate.name}</span>
          <span className="text-slate-600">—</span>
          <span className="font-bold text-amber-300">{activeDirectorate?.name || 'إدارة روض الفرج التعليمية'}</span>
        </div>
        <button
          onClick={() => setIsGovModalOpen(true)}
          className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer bg-slate-800 hover:bg-slate-750 px-2.5 py-1 rounded-lg border border-slate-700"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>تغيير المحافظة والإدارة (27 محافظة)</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              شؤون الطلاب وقيد الدارسين
              <span className="text-xs bg-amber-500/15 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                {visibleStudents.length} طالب
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              الملفات التعليمية الشاملة، الدرجات، نسب الحضور، الفصول، وبيانات أولياء الأمور
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Cards vs Table */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold transition-colors ${
                viewMode === 'cards' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="عرض الكروت التفصيلية"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">كروت</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold transition-colors ${
                viewMode === 'table' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="عرض الجدول المجمع"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">جدول</span>
            </button>
          </div>

          {canManageStudents && (
            <button
              onClick={() => {
                setFormData({
                  internalCode: `RDF-STU-2026-${Math.floor(100 + Math.random() * 900)}`,
                  name: '',
                  schoolId: currentUser.schoolId || 'sch-01',
                  grade: 'الصف الأول الثانوي',
                  classroom: '1/2',
                  parentId: 'prt-01',
                  parentName: '',
                  parentPhone: '',
                  attendanceRate: 98,
                  generalAverage: 90,
                  status: 'enrolled',
                  birthDate: '2010-05-15',
                  emergencyContact: ''
                });
                setIsAddModalOpen(true);
              }}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>تسجيل طالب جديد</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث باسم الطالب، الكود، ولي الأمر..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'top', label: 'أوائل الإدارة (95%+)' },
            { id: 'attendance', label: 'انتظام الحضور (98%+)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-semibold ${
                categoryFilter === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Grade Filters */}
          {[
            { id: 'all', label: 'كافة المراحل' },
            { id: 'الثانوي', label: 'الثانوي' },
            { id: 'الإعدادي', label: 'الإعدادي' },
            { id: 'الابتدائي', label: 'الابتدائي' }
          ].map((grd) => (
            <button
              key={grd.id}
              onClick={() => setGradeFilter(grd.id)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors font-semibold ${
                gradeFilter === grd.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {grd.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Cards View or Table View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {visibleStudents.map((st) => (
            <div
              key={st.id}
              onClick={() => setSelectedStudent(st)}
              className="bg-slate-900 hover:bg-slate-850/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 transition-all cursor-pointer text-right flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Header: Student Name & Rank */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                      {st.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {st.schoolName}
                    </div>
                  </div>
                  {st.studentRank && (
                    <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold shrink-0 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      {st.studentRank}
                    </span>
                  )}
                </div>

                {/* Grade & Class Badges */}
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                    {st.grade}
                  </span>
                  <span className="text-[11px] bg-slate-800 font-mono px-2 py-0.5 rounded text-amber-400">
                    فصل: {st.classroom}
                  </span>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded">
                    مقيد منتظم
                  </span>
                </div>

                {/* Metrics Box: GPA, Attendance, Behavior */}
                <div className="mt-3 grid grid-cols-3 gap-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-center">
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
                  <div className="mt-3">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">المواد والدرجات المعتمدة:</span>
                    <div className="flex flex-wrap gap-1">
                      {st.academicSubjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/80 text-slate-300 flex items-center gap-1 font-mono"
                        >
                          <span className="text-slate-400 font-sans">{sub.subject}:</span>
                          <b className="text-amber-300">{sub.score}</b>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  <span className="text-slate-400">ولي الأمر: </span>
                  <span className="text-slate-200 font-semibold">{st.parentName}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStudent(st);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>الملف الأكاديمي</span>
                </button>
              </div>
            </div>
          ))}

          {visibleStudents.length === 0 && (
            <div className="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
              لا يوجد طلاب مسجلين وفق محددات البحث الحالية
            </div>
          )}
        </div>
      ) : (
        /* Students Table */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">كود الطالب</th>
                  <th className="p-3.5">اسم الطالب</th>
                  <th className="p-3.5">المدرسة</th>
                  <th className="p-3.5">الصف والفصل</th>
                  <th className="p-3.5">ولي الأمر المعتمد</th>
                  <th className="p-3.5">نسبة الحضور</th>
                  <th className="p-3.5">المعدل العام</th>
                  <th className="p-3.5">الجوائز والأنشطة</th>
                  <th className="p-3.5">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {visibleStudents.map((st) => (
                  <tr
                    key={st.id}
                    onClick={() => setSelectedStudent(st)}
                    className="hover:bg-slate-850/60 transition-colors cursor-pointer"
                  >
                    <td className="p-3.5 font-mono text-amber-400 font-bold">{st.internalCode}</td>
                    <td className="p-3.5 font-bold text-white">
                      <div className="flex items-center gap-1.5">
                        <span>{st.name}</span>
                        {st.studentRank && (
                          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                            {st.studentRank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300">{st.schoolName}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-200">{st.grade}</span>
                      <span className="text-amber-400 font-mono text-[11px] block">فصل: {st.classroom}</span>
                    </td>
                    <td className="p-3.5 text-slate-300">
                      <div className="font-semibold text-slate-200">{st.parentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{st.parentPhone}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-emerald-400 font-mono">
                        {st.attendanceRate}%
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-amber-300 font-mono">
                        {st.generalAverage}%
                      </span>
                    </td>
                    <td className="p-3.5">
                      {st.achievementsCount > 0 ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          <Award className="w-3 h-3 text-amber-400" />
                          {st.achievementsCount} تكريمات
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">—</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudent(st);
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 rounded-lg font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>فتح الملف</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleStudents.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-400">
                      لا يوجد طلاب متاحين وفق محددات البحث وصلاحية الحساب الحالية
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comprehensive Student Academic Dossier Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    الملف الأكاديمي وبطاقة بيانات الطالب
                    {selectedStudent.studentRank && (
                      <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                        {selectedStudent.studentRank}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    وزارة التربية والتعليم — {activeGovernorate.name} • {selectedStudent.directorateName || activeDirectorate?.name || 'إدارة روض الفرج التعليمية'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Student Identity Card */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <div className="text-[10px] text-amber-400 font-mono font-bold">
                    كود الطالب: {selectedStudent.internalCode}
                  </div>
                  <h4 className="text-lg font-black text-white mt-1">
                    {selectedStudent.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedStudent.schoolName} — {selectedStudent.grade} (فصل {selectedStudent.classroom})
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center min-w-[120px]">
                  <span className="text-[10px] text-slate-400 block">المعدل التراكمي</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    {selectedStudent.generalAverage}%
                  </span>
                  <span className="text-[10px] text-emerald-400 block font-bold mt-0.5">
                    التقدير: ممتاز
                  </span>
                </div>
              </div>

              {/* Personal & Demographic Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block">الرقم القومي</span>
                  <span className="text-xs font-mono text-white font-bold">{selectedStudent.nationalIdMasked || '3100515******'}</span>
                </div>
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block">تاريخ الميلاد</span>
                  <span className="text-xs font-mono text-white font-bold">{selectedStudent.birthDate}</span>
                </div>
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block">النوع</span>
                  <span className="text-xs text-white font-bold">{selectedStudent.gender || 'ذكر'}</span>
                </div>
                <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block">نوع القيد</span>
                  <span className="text-xs text-white font-bold">{selectedStudent.enrollmentType || 'رسمي عربي'}</span>
                </div>
              </div>

              {/* Academic Subjects Breakdown Table */}
              <div className="bg-slate-850 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-3 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
                  <span className="font-bold text-white text-xs">
                    كشف درجات المواد للفصل الدراسي الحالي (معتمد رسمياً)
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    العام الدراسي 2026/2027
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">المادة الدراسية</th>
                        <th className="p-2.5">الدرجة العظمى</th>
                        <th className="p-2.5">درجة الطالب</th>
                        <th className="p-2.5">النسبة المئوية</th>
                        <th className="p-2.5">التقدير</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {(selectedStudent.academicSubjects || [
                        { subject: 'اللغة العربية', score: 98, maxScore: 100, grade: 'ممتاز' },
                        { subject: 'الرياضيات', score: 100, maxScore: 100, grade: 'ممتاز' },
                        { subject: 'العلوم', score: 97, maxScore: 100, grade: 'ممتاز' },
                        { subject: 'اللغة الإنجليزية', score: 99, maxScore: 100, grade: 'ممتاز' },
                        { subject: 'الدراسات الاجتماعية', score: 96, maxScore: 100, grade: 'ممتاز' }
                      ]).map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="p-2.5 font-bold text-white">{sub.subject}</td>
                          <td className="p-2.5 font-mono text-slate-400">{sub.maxScore}</td>
                          <td className="p-2.5 font-mono font-bold text-amber-300">{sub.score}</td>
                          <td className="p-2.5 font-mono text-emerald-400">
                            {Math.round((sub.score / sub.maxScore) * 100)}%
                          </td>
                          <td className="p-2.5">
                            <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-bold">
                              {sub.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance and Behavior */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                    <span>سجل الحضور والانضباط</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedStudent.attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2.5 rounded-full"
                      style={{ width: `${selectedStudent.attendanceRate}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
                    <span>نسبة الغياب: {100 - selectedStudent.attendanceRate}%</span>
                    <span>سلوك الطالب: {selectedStudent.behaviorRating || 'ممتاز ومثالي'}</span>
                  </div>
                </div>

                <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                    <span>ولي الأمر المرتبط بالحساب</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                      تم التحقق
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200">{selectedStudent.parentName}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    هاتف: {selectedStudent.parentPhone}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    حساب ولي الأمر مفعل ويمكنه متابعة نتائج هذا الطالب حصرياً.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-850 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>طباعة شهادة قيد ودرجات الطالب</span>
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                تسجيل طالب جديد بسجلات روض الفرج
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم الطالب رباعي</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المدرسة</label>
                  <select
                    value={formData.schoolId}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">الصف والفصل</label>
                  <input
                    type="text"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم ولي الأمر</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">هاتف ولي الأمر</label>
                  <input
                    type="text"
                    required
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  حفظ وتسجيل الطالب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
