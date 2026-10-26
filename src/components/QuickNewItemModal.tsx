import React, { useState } from 'react';
import { useRodFarag } from '../context/RodFaragContext';
import {
  X,
  Plus,
  GraduationCap,
  Users,
  BellRing,
  CheckCircle2,
  Building2,
  Send
} from 'lucide-react';
import { NotificationItem } from '../types';

interface QuickNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'student' | 'teacher' | 'announcement';
}

export const QuickNewItemModal: React.FC<QuickNewItemModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'student'
}) => {
  const {
    schools,
    addStudent,
    addTeacher,
    broadcastNotification,
    addToast
  } = useRodFarag();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'announcement'>(defaultTab);

  // Student Form
  const [studentForm, setStudentForm] = useState({
    name: '',
    internalCode: '',
    schoolId: schools[0]?.id || 'sch-01',
    grade: 'الصف الأول الثانوي',
    classroom: '1/1',
    parentName: '',
    parentPhone: '',
    attendanceRate: 100,
    generalAverage: 90,
    emergencyContact: '',
    birthDate: '2010-05-15'
  });

  // Teacher Form
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    internalCode: '',
    schoolId: schools[0]?.id || 'sch-01',
    subject: 'اللغة العربية والتربية الإسلامية',
    assignedClasses: '1/1، 1/2',
    phone: '',
    email: '',
    evaluationScore: 94,
    notes: 'معلم معتمد'
  });

  // Announcement Form
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    type: 'administrative' as NotificationItem['type'],
    recipientScope: 'all' as NotificationItem['recipientScope'],
    targetSchoolId: schools[0]?.id || 'sch-01'
  });

  if (!isOpen) return null;

  const handleSubmitStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name.trim()) {
      addToast('يرجى إدخال اسم الطالب كاملاً', 'warning');
      return;
    }

    const school = schools.find(s => s.id === studentForm.schoolId) || schools[0];
    const generatedCode = studentForm.internalCode.trim() || `RDF-STU-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    addStudent({
      name: studentForm.name.trim(),
      internalCode: generatedCode,
      schoolId: school.id,
      schoolName: school.name,
      grade: studentForm.grade,
      classroom: studentForm.classroom,
      parentId: `prt-${Date.now()}`,
      parentName: studentForm.parentName.trim() || 'ولي أمر الطالب',
      parentPhone: studentForm.parentPhone.trim() || '01000000000',
      attendanceRate: Number(studentForm.attendanceRate) || 100,
      generalAverage: Number(studentForm.generalAverage) || 90,
      status: 'enrolled',
      birthDate: studentForm.birthDate,
      emergencyContact: studentForm.parentPhone.trim() || '01000000000',
      achievementsCount: 0
    });

    addToast(`(اختصار سريع) تم قيد الطالب "${studentForm.name}" بنجاح في ${school.name}`, 'success');
    onClose();
  };

  const handleSubmitTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name.trim()) {
      addToast('يرجى إدخال اسم المعلم كاملاً', 'warning');
      return;
    }

    const school = schools.find(s => s.id === teacherForm.schoolId) || schools[0];
    const generatedCode = teacherForm.internalCode.trim() || `RDF-TCH-${Math.floor(1000 + Math.random() * 9000)}`;

    addTeacher({
      name: teacherForm.name.trim(),
      internalCode: generatedCode,
      schoolId: school.id,
      schoolName: school.name,
      subject: teacherForm.subject.trim(),
      assignedClasses: teacherForm.assignedClasses.split('،').map(c => c.trim()).filter(Boolean),
      email: teacherForm.email.trim() || `teacher.${Date.now()}@rodfarag-edu.gov.eg`,
      phone: teacherForm.phone.trim() || '01012345678',
      employmentStatus: 'active',
      hireDate: new Date().toISOString().split('T')[0],
      evaluationScore: Number(teacherForm.evaluationScore) || 92,
      notes: teacherForm.notes.trim()
    });

    addToast(`(اختصار سريع) تم تسجيل المعلم "${teacherForm.name}" بنجاح في ${school.name}`, 'success');
    onClose();
  };

  const handleSubmitAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title.trim() || !announcementForm.message.trim()) {
      addToast('يرجى ملء عنوان ونص التعميم بالكامل', 'warning');
      return;
    }

    broadcastNotification({
      title: announcementForm.title.trim(),
      message: announcementForm.message.trim(),
      type: announcementForm.type,
      recipientScope: announcementForm.recipientScope,
      targetSchoolId: announcementForm.recipientScope === 'specific_school' ? announcementForm.targetSchoolId : undefined,
      deliveryStatus: 'delivered',
      readCount: 0,
      externalDispatchNotice: 'تم إرسال التعميم لحظياً لكافة المسجلين بالنطاق المحدد'
    });

    addToast(`(اختصار سريع) تم بث التعميم "${announcementForm.title}" بنجاح`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-right my-8">
        {/* Header with Shortcut Pill */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">إضافة عنصر جديد</h3>
                <span className="text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded">
                  Ctrl + N
                </span>
              </div>
              <p className="text-xs text-slate-400">تنفيذ إجراء سريع فوري من أي شاشة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 p-2 bg-slate-950/50 border-b border-slate-800 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'student'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>طالب جديد</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>معلم جديد</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('announcement')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'announcement'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BellRing className="w-4 h-4" />
            <span>تعميم عاجل</span>
          </button>
        </div>

        {/* Form 1: Student */}
        {activeTab === 'student' && (
          <form onSubmit={handleSubmitStudent} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  اسم الطالب بالكامل <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="مثال: يوسف محمود حسن"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">المدرسة</label>
                <select
                  value={studentForm.schoolId}
                  onChange={(e) => setStudentForm({ ...studentForm, schoolId: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">الصف والفصل</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-2 text-xs"
                    placeholder="الصف"
                  />
                  <input
                    type="text"
                    value={studentForm.classroom}
                    onChange={(e) => setStudentForm({ ...studentForm, classroom: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-2 py-2 text-xs"
                    placeholder="الفصل"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">اسم ولي الأمر</label>
                <input
                  type="text"
                  value={studentForm.parentName}
                  onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                  placeholder="اسم ولي الأمر"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">هاتف ولي الأمر</label>
                <input
                  type="tel"
                  value={studentForm.parentPhone}
                  onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>حفظ وقيد الطالب</span>
              </button>
            </div>
          </form>
        )}

        {/* Form 2: Teacher */}
        {activeTab === 'teacher' && (
          <form onSubmit={handleSubmitTeacher} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  اسم المعلم بالكامل <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  placeholder="مثال: أ. أسامة فاروق الشربيني"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">المدرسة</label>
                <select
                  value={teacherForm.schoolId}
                  onChange={(e) => setTeacherForm({ ...teacherForm, schoolId: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">مادة التخصص</label>
                <input
                  type="text"
                  value={teacherForm.subject}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                  placeholder="مثال: الرياضيات"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  value={teacherForm.phone}
                  onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">الفصول المسندة</label>
                <input
                  type="text"
                  value={teacherForm.assignedClasses}
                  onChange={(e) => setTeacherForm({ ...teacherForm, assignedClasses: e.target.value })}
                  placeholder="1/1، 1/2"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>حفظ وتسجيل المعلم</span>
              </button>
            </div>
          </form>
        )}

        {/* Form 3: Announcement */}
        {activeTab === 'announcement' && (
          <form onSubmit={handleSubmitAnnouncement} className="p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                عنوان التعميم <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={announcementForm.title}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                placeholder="مثال: تعليمات اختبارات شهر نوفمبر"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                نص التعميم والتعليمات <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={announcementForm.message}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                placeholder="اكتب التوجيهات الرسمية هنا بدقة ووضوح..."
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>بث التعميم فوراً</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
