import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { Teacher } from '../../types';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  GraduationCap,
  Award,
  Phone,
  Mail,
  Building,
  CheckCircle,
  X
} from 'lucide-react';
import { AcademicPeriodFilter, SortOrderOption } from '../common/AcademicPeriodFilter';

export const TeachersView: React.FC = () => {
  const { teachers, schools, currentUser, addTeacher, selectedSchoolFilter } = useRodFarag();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Date-range and Academic Period Filter State
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [periodStartDate, setPeriodStartDate] = useState<string | undefined>();
  const [periodEndDate, setPeriodEndDate] = useState<string | undefined>();
  const [customStart, setCustomStart] = useState<string>('2020-01-01');
  const [customEnd, setCustomEnd] = useState<string>('2026-10-31');
  const [sortOrder, setSortOrder] = useState<SortOrderOption>('date_desc');

  const [formData, setFormData] = useState({
    internalCode: '',
    name: '',
    schoolId: 'sch-01',
    subject: 'اللغة العربية والتربية الإسلامية',
    assignedClasses: '1/1، 1/2',
    email: '',
    phone: '',
    employmentStatus: 'active' as const,
    hireDate: '2020-09-01',
    evaluationScore: 95,
    notes: ''
  });

  const canManageTeachers = ['super_admin', 'directorate_admin', 'school_principal'].includes(currentUser.role);

  const filteredTeachers = teachers.filter((t) => {
    // School scoping: if user is school-scoped, only show their school
    if (currentUser.schoolId && t.schoolId !== currentUser.schoolId) return false;
    if (selectedSchoolFilter !== 'all' && t.schoolId !== selectedSchoolFilter) return false;

    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.internalCode.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());

    const matchesSubject = subjectFilter === 'all' || t.subject.includes(subjectFilter);

    // Academic Period / Date Range check on hireDate
    let matchesPeriod = true;
    if (periodStartDate && periodEndDate) {
      matchesPeriod = t.hireDate >= periodStartDate && t.hireDate <= periodEndDate;
    }

    return matchesSearch && matchesSubject && matchesPeriod;
  });

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (sortOrder === 'date_desc') {
      return b.hireDate.localeCompare(a.hireDate);
    }
    if (sortOrder === 'date_asc') {
      return a.hireDate.localeCompare(b.hireDate);
    }
    if (sortOrder === 'score_desc') {
      return b.evaluationScore - a.evaluationScore;
    }
    if (sortOrder === 'name_asc') {
      return a.name.localeCompare(b.name, 'ar');
    }
    return 0;
  });

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    addTeacher({
      internalCode: formData.internalCode || `RDF-TCH-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      schoolId: school.id,
      schoolName: school.name,
      subject: formData.subject,
      assignedClasses: formData.assignedClasses.split('،').map(c => c.trim()).filter(Boolean),
      email: formData.email,
      phone: formData.phone,
      employmentStatus: formData.employmentStatus,
      hireDate: formData.hireDate,
      evaluationScore: Number(formData.evaluationScore),
      notes: formData.notes
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              شؤون المعلمين وهيئة التدريس
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              قاعدة بيانات الكوادر التعليمية، التخصصات، الفصول المسندة وتقييم الأداء
            </p>
          </div>
        </div>

        {canManageTeachers && (
          <button
            onClick={() => {
              setFormData({
                internalCode: `RDF-TCH-${Math.floor(1000 + Math.random() * 9000)}`,
                name: '',
                schoolId: currentUser.schoolId || 'sch-01',
                subject: 'اللغة العربية والتربية الإسلامية',
                assignedClasses: '1/1، 1/2',
                email: '',
                phone: '',
                employmentStatus: 'active',
                hireDate: '2022-09-01',
                evaluationScore: 92,
                notes: 'معلم معتمد'
              });
              setIsAddModalOpen(true);
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل معلم جديد</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، الكود، التخصص..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            التخصص:
          </span>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'العربية', label: 'لغة عربية' },
            { id: 'الرياضيات', label: 'رياضيات' },
            { id: 'العلوم', label: 'علوم وفيزياء' },
            { id: 'الإنجليزية', label: 'لغة إنجليزية' },
            { id: 'الدراسات', label: 'دراسات اجتماعية' }
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSubjectFilter(sub.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors font-semibold ${
                subjectFilter === sub.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range and Academic Period Filter */}
      <AcademicPeriodFilter
        selectedPeriod={selectedPeriod}
        onPeriodChange={(periodId, start, end) => {
          setSelectedPeriod(periodId);
          setPeriodStartDate(start);
          setPeriodEndDate(end);
        }}
        customStartDate={customStart}
        customEndDate={customEnd}
        onCustomDatesChange={(s, e) => {
          setCustomStart(s);
          setCustomEnd(e);
        }}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        scoreSortLabel="الأعلى تقييماً ودرجات"
        dateSortLabel="تاريخ التعيين والتعاقد"
        filteredCount={sortedTeachers.length}
        totalCount={teachers.length}
      />

      {/* Teachers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">الكود الداخلي</th>
                <th className="p-3.5">اسم المعلم</th>
                <th className="p-3.5">المدرسة التابع لها</th>
                <th className="p-3.5">التخصص والمادة</th>
                <th className="p-3.5">تاريخ التعيين</th>
                <th className="p-3.5">الفصول المسندة</th>
                <th className="p-3.5">بيانات التواصل</th>
                <th className="p-3.5">تقييم الكفاءة</th>
                <th className="p-3.5">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {sortedTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="p-3.5 font-mono text-amber-400 font-bold">{t.internalCode}</td>
                  <td className="p-3.5 font-bold text-white">{t.name}</td>
                  <td className="p-3.5 text-slate-300">{t.schoolName}</td>
                  <td className="p-3.5 text-amber-300 font-medium">{t.subject}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">{t.hireDate}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {t.assignedClasses.map((cls, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">
                    <div>{t.phone}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{t.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                      {t.evaluationScore} / 100
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      على رأس العمل
                    </span>
                  </td>
                </tr>
              ))}
              {sortedTeachers.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    لا يوجد معلمين مطابقين للبحث أو نطاق المدرسة المحدد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                تسجيل معلم جديد بالمنظومة
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم المعلم رباعي</label>
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
                  <label className="block text-slate-300 font-bold mb-1">التخصص الأكاديمي</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الفصول المسندة (مفصولة بفواصل)</label>
                <input
                  type="text"
                  required
                  value={formData.assignedClasses}
                  onChange={(e) => setFormData({ ...formData, assignedClasses: e.target.value })}
                  placeholder="مثال: 1/1، 1/2، 2/3"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">رقم الهاتف</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني المهني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  حفظ وتسجيل المعلم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
