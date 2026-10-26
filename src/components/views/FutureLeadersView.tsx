import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { FutureLeaderInitiative } from '../../types';
import {
  Award,
  Search,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  Star,
  ShieldCheck,
  X
} from 'lucide-react';

export const FutureLeadersView: React.FC = () => {
  const {
    futureLeaders,
    schools,
    currentUser,
    submitLeaderInitiative,
    updateLeaderStage
  } = useRodFarag();

  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    studentName: currentUser.role === 'student' ? currentUser.name : '',
    schoolId: currentUser.schoolId || 'sch-01',
    grade: 'الصف الأول الثانوي',
    category: 'science_innovation' as FutureLeaderInitiative['category'],
    description: '',
    supervisorTeacher: 'د. ياسمين سامي ربيع',
    isSchoolAmbassador: false
  });

  const filteredInitiatives = futureLeaders.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.schoolName.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === 'all' || item.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === formData.schoolId) || schools[0];
    submitLeaderInitiative({
      title: formData.title,
      studentId: currentUser.studentId || `stu-${Date.now()}`,
      studentName: formData.studentName || currentUser.name,
      schoolId: school.id,
      schoolName: school.name,
      grade: formData.grade,
      category: formData.category,
      stage: 'approved',
      description: formData.description,
      supervisorTeacher: formData.supervisorTeacher,
      awards: ['شهادة تميز مبادرة واعدة'],
      isSchoolAmbassador: formData.isSchoolAmbassador
    });
    setIsSubmitModalOpen(false);
  };

  const getStageBadge = (stage: FutureLeaderInitiative['stage']) => {
    switch (stage) {
      case 'completed':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">مكتملة ومحققة للنتائج</span>;
      case 'in_progress':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold">قيد التنفيذ بالمدرسة</span>;
      case 'approved':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold">معتمدة للتطبيق</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">فكرة جديدة قيد المراجعة</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              منصة قادة المستقبل وسفراء المدارس بروض الفرج
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              رعاية الابتكارات الطلابية والمبادرات البيئية والمجتمعية وبناء المهارات القيادية
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({
              title: '',
              studentName: currentUser.name,
              schoolId: currentUser.schoolId || 'sch-01',
              grade: 'الصف الأول الثانوي',
              category: 'science_innovation',
              description: '',
              supervisorTeacher: 'د. ياسمين سامي ربيع',
              isSchoolAmbassador: false
            });
            setIsSubmitModalOpen(true);
          }}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>تقديم مبادرة طلابية جديدة</span>
        </button>
      </div>

      {/* Guidelines callout */}
      <div className="p-3.5 bg-slate-900 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
        <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <b>ضوابط القيادة الطلابية:</b> تهدف المبادرة إلى تشجيع العمل الجماعي والتفكير الابتكاري وحل المشكلات الحقيقية بحي روض الفرج، ولا يُمنح الطلاب أي سلطات تأديبية على زملائهم لترسيخ الروح التربوية والمساواة.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'approved', label: 'المبادرات المعتمدة' },
          { id: 'in_progress', label: 'قيد التنفيذ' },
          { id: 'completed', label: 'المكتملة بنجاح' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStageFilter(tab.id)}
            className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all ${
              stageFilter === tab.id
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInitiatives.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-400">{item.submissionDate}</span>
                {getStageBadge(item.stage)}
              </div>

              <div className="flex items-center gap-1.5">
                {item.isSchoolAmbassador && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    سفير المدرسة
                  </span>
                )}
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {item.category === 'environmental' ? 'بيئي ومستدام' : item.category === 'science_innovation' ? 'ابتكار علمي وبرمجة' : 'خدمة مجتمعية'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mt-2 leading-snug">{item.title}</h3>
              <p className="text-xs text-amber-400 font-semibold mt-1">
                صاحب المبادرة: الطالب {item.studentName} ({item.grade})
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{item.schoolName}</p>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              <div className="mt-3 p-2 bg-slate-850 rounded-xl text-[11px] space-y-1">
                <div className="text-slate-400">
                  المعلم المشرف: <b className="text-slate-200">{item.supervisorTeacher}</b>
                </div>
                {item.awards.length > 0 && (
                  <div className="text-slate-400">
                    التكريم: <b className="text-amber-300">{item.awards.join(' • ')}</b>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                تحت الإشراف التربوي
              </span>

              {item.stage === 'approved' && (
                <button
                  onClick={() => updateLeaderStage(item.id, 'in_progress')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold"
                >
                  بدء التنفيذ
                </button>
              )}
              {item.stage === 'in_progress' && (
                <button
                  onClick={() => updateLeaderStage(item.id, 'completed', 'شهادة إنجاز متميز')}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold"
                >
                  اعتماد اكتمالها وتكريمها
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                تقديم فكرة مبادرة طلابية جديدة
              </h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان المبادرة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مبادرة تدوير المخلفات المدرسية وتشجير الفناء"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">اسم الطالب أو الفريق</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">مجال المبادرة</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as FutureLeaderInitiative['category'] })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="science_innovation">ابتكار علمي وتكنولوجي</option>
                    <option value="environmental">حماية البيئة وتدوير المخلفات</option>
                    <option value="community_service">خدمة مجتمعية وتراث حي روض الفرج</option>
                    <option value="digital_arts">فنون رقمية وإعلام مدرسي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المعلم المشرف</label>
                  <input
                    type="text"
                    required
                    value={formData.supervisorTeacher}
                    onChange={(e) => setFormData({ ...formData, supervisorTeacher: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">شرح المبادرة وخطة التنفيذ</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="كيف ستفيد المبادرة المدرسة والمجتمع..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="ambassador"
                  checked={formData.isSchoolAmbassador}
                  onChange={(e) => setFormData({ ...formData, isSchoolAmbassador: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="ambassador" className="text-slate-300 text-xs">
                  ترشيح الطالب كسفير للمدرسة في ملتقى قادة المستقبل بروض الفرج
                </label>
              </div>

              <div className="p-3 bg-slate-850 border-t border-slate-800 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow"
                >
                  تقديم المبادرة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
