import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { School, EducationStage } from '../../types';
import {
  School as SchoolIcon,
  Search,
  Filter,
  Plus,
  Edit3,
  Archive,
  Phone,
  Mail,
  MapPin,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  X,
  FileSpreadsheet
} from 'lucide-react';

export const SchoolsView: React.FC = () => {
  const { schools, currentUser, addSchool, updateSchool, setSelectedSchoolFilter } = useRodFarag();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit / Add Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    stage: 'secondary' as EducationStage,
    stageNameAr: 'المرحلة الثانوية العامة',
    address: '',
    phone: '',
    email: '',
    principalName: '',
    authorizedOfficers: '',
    studentsCount: 1000,
    teachersCount: 50,
    classesCount: 25,
    status: 'active' as School['status'],
    accreditationStatus: 'accredited' as School['accreditationStatus'],
    establishedYear: 1980
  });

  const canManageSchools = currentUser.role === 'directorate_admin' || currentUser.role === 'super_admin';

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.code.toLowerCase().includes(search.toLowerCase()) ||
      school.principalName.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === 'all' || school.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const openAddModal = () => {
    setFormData({
      code: `RDF-SCH-${String(schools.length + 1).padStart(2, '0')}`,
      name: '',
      stage: 'secondary',
      stageNameAr: 'المرحلة الثانوية العامة',
      address: 'حي روض الفرج، القاهرة',
      phone: '02-245891' + String(schools.length + 1).padStart(2, '0'),
      email: `sch${schools.length + 1}@rodfarag-edu.gov.eg`,
      principalName: '',
      authorizedOfficers: 'وكيل شؤون الطلاب، مسؤول التطوير التكنولوجي',
      studentsCount: 900,
      teachersCount: 45,
      classesCount: 22,
      status: 'active',
      accreditationStatus: 'accredited',
      establishedYear: 2000
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (school: School) => {
    setSelectedSchool(school);
    setFormData({
      code: school.code,
      name: school.name,
      stage: school.stage,
      stageNameAr: school.stageNameAr,
      address: school.address,
      phone: school.phone,
      email: school.email,
      principalName: school.principalName,
      authorizedOfficers: school.authorizedOfficers.join('، '),
      studentsCount: school.studentsCount,
      teachersCount: school.teachersCount,
      classesCount: school.classesCount,
      status: school.status,
      accreditationStatus: school.accreditationStatus,
      establishedYear: school.establishedYear
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addSchool({
      code: formData.code,
      name: formData.name,
      stage: formData.stage,
      stageNameAr: formData.stageNameAr,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      principalName: formData.principalName,
      authorizedOfficers: formData.authorizedOfficers.split('،').map(s => s.trim()).filter(Boolean),
      studentsCount: Number(formData.studentsCount),
      teachersCount: Number(formData.teachersCount),
      classesCount: Number(formData.classesCount),
      status: formData.status,
      accreditationStatus: formData.accreditationStatus,
      establishedYear: Number(formData.establishedYear)
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchool) return;
    updateSchool(selectedSchool.id, {
      name: formData.name,
      principalName: formData.principalName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      studentsCount: Number(formData.studentsCount),
      teachersCount: Number(formData.teachersCount),
      classesCount: Number(formData.classesCount),
      accreditationStatus: formData.accreditationStatus,
      status: formData.status,
      authorizedOfficers: formData.authorizedOfficers.split('،').map(s => s.trim()).filter(Boolean)
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                سجل المدارس الـ16 التابعة لإدارة روض الفرج
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                إدارة مركزية لجميع المدارس الحكومية والتجريبية والخاصة المعتمدة بالحي
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canManageSchools ? (
            <button
              onClick={openAddModal}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مدرسة جديدة</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 bg-slate-850 border border-slate-800 px-3 py-1.5 rounded-xl">
              تعديل السجلات مقيد بإدارة روض الفرج المركزية
            </span>
          )}
        </div>
      </div>

      {/* Search and Stage Filters */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث باسم المدرسة، الكود، اسم المدير..."
            className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            المرحلة:
          </span>
          {[
            { id: 'all', label: 'الكل (16)' },
            { id: 'secondary', label: 'ثانوي عام/عسكري' },
            { id: 'preparatory', label: 'إعدادي' },
            { id: 'primary', label: 'ابتدائي' },
            { id: 'experimental_languages', label: 'تجريبي لغات' },
            { id: 'vocational', label: 'فني صناعي' }
          ].map((stg) => (
            <button
              key={stg.id}
              onClick={() => setStageFilter(stg.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors font-semibold ${
                stageFilter === stg.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {stg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between shadow-sm transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold">
                  {school.code}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    school.accreditationStatus === 'accredited'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {school.accreditationStatus === 'accredited' ? 'معتمدة جودة' : 'قيد الاعتماد'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mt-2 leading-snug">{school.name}</h3>
              <p className="text-xs text-amber-300/90 font-medium mt-0.5">{school.stageNameAr}</p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-slate-200">المدير: {school.principalName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{school.address}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] pt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {school.phone}
                  </span>
                  <span className="flex items-center gap-1 truncate font-mono">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {school.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="grid grid-cols-3 text-center gap-1 bg-slate-850/60 p-2 rounded-xl text-xs mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">الطلاب</span>
                  <span className="font-bold text-white">{school.studentsCount}</span>
                </div>
                <div className="border-r border-l border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block">المعلمون</span>
                  <span className="font-bold text-white">{school.teachersCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">الفصول</span>
                  <span className="font-bold text-white">{school.classesCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedSchoolFilter(school.id);
                  }}
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors text-center"
                >
                  تحديد كنطاق عمل
                </button>
                {canManageSchools && (
                  <button
                    onClick={() => openEditModal(school)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="تعديل بيانات المدرسة"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit School Modal */}
      {isEditModalOpen && selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                تعديل سجل: {selectedSchool.name}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-4 overflow-y-auto space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم المدرسة الرسمي</label>
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
                  <label className="block text-slate-300 font-bold mb-1">اسم مدير المدرسة</label>
                  <input
                    type="text"
                    required
                    value={formData.principalName}
                    onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">رقم الهاتف الرسمي</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">العنوان الجغرافي بالحي</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">عدد الطلاب</label>
                  <input
                    type="number"
                    value={formData.studentsCount}
                    onChange={(e) => setFormData({ ...formData, studentsCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">عدد المعلمين</label>
                  <input
                    type="number"
                    value={formData.teachersCount}
                    onChange={(e) => setFormData({ ...formData, teachersCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">عدد الفصول</label>
                  <input
                    type="number"
                    value={formData.classesCount}
                    onChange={(e) => setFormData({ ...formData, classesCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">المسؤولون المخولون (مفصولون بفواصل)</label>
                <input
                  type="text"
                  value={formData.authorizedOfficers}
                  onChange={(e) => setFormData({ ...formData, authorizedOfficers: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add School Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                تسجيل مدرسة جديدة في إدارة روض الفرج
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="p-4 overflow-y-auto space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">كود المدرسة الإداري</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المرحلة التعليمية</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => {
                      const stg = e.target.value as EducationStage;
                      const names: Record<EducationStage, string> = {
                        secondary: 'المرحلة الثانوية العامة',
                        preparatory: 'المرحلة الإعدادية',
                        primary: 'المرحلة الابتدائية',
                        experimental_languages: 'الرسمية التجريبية لغات',
                        vocational: 'التعليم الفني والصناعي'
                      };
                      setFormData({ ...formData, stage: stg, stageNameAr: names[stg] });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="secondary">المرحلة الثانوية العامة</option>
                    <option value="preparatory">المرحلة الإعدادية</option>
                    <option value="primary">المرحلة الابتدائية</option>
                    <option value="experimental_languages">الرسمية التجريبية لغات</option>
                    <option value="vocational">التعليم الفني والصناعي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم المدرسة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مدرسة روض الفرج الجديدة"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم مدير المدرسة</label>
                  <input
                    type="text"
                    required
                    value={formData.principalName}
                    onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">هاتف المدرسة</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">العنوان</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
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
                  تسجيل المدرسة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
