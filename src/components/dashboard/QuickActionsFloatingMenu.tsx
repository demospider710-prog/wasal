import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  Zap,
  Plus,
  X,
  GraduationCap,
  Users,
  BellRing,
  Send,
  Mail,
  CalendarCheck,
  Building2,
  Phone,
  CheckCircle2,
  Award,
  AlertCircle
} from 'lucide-react';
import { NotificationItem } from '../../types';

export const QuickActionsFloatingMenu: React.FC = () => {
  const {
    schools,
    addStudent,
    addTeacher,
    broadcastNotification,
    setActiveSection,
    addToast,
    currentUser
  } = useRodFarag();

  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'student' | 'teacher' | 'announcement' | null>(null);

  // Add Student Form State
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
    birthDate: '2010-04-12'
  });

  // Register Teacher Form State
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    internalCode: '',
    schoolId: schools[0]?.id || 'sch-01',
    subject: 'اللغة العربية والتربية الإسلامية',
    assignedClasses: '1/1، 1/2',
    phone: '',
    email: '',
    evaluationScore: 94,
    notes: 'معلم معتمد بالإدارة التعليمية'
  });

  // Broadcast Announcement Form State
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    type: 'administrative' as NotificationItem['type'],
    recipientScope: 'all' as NotificationItem['recipientScope'],
    targetSchoolId: schools[0]?.id || 'sch-01'
  });

  // Handle Add Student
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

    addToast(`تم قيد الطالب "${studentForm.name}" بنجاح في ${school.name}`, 'success');
    setActiveModal(null);
    setIsOpen(false);
    // Reset Form
    setStudentForm({
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
      birthDate: '2010-04-12'
    });
  };

  // Handle Register Teacher
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

    addToast(`تم تسجيل المعلم "${teacherForm.name}" بنجاح في ${school.name}`, 'success');
    setActiveModal(null);
    setIsOpen(false);
    // Reset Form
    setTeacherForm({
      name: '',
      internalCode: '',
      schoolId: schools[0]?.id || 'sch-01',
      subject: 'اللغة العربية والتربية الإسلامية',
      assignedClasses: '1/1، 1/2',
      phone: '',
      email: '',
      evaluationScore: 94,
      notes: 'معلم معتمد بالإدارة التعليمية'
    });
  };

  // Handle Broadcast Announcement
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

    addToast(`تم بث التعميم "${announcementForm.title}" بنجاح للمستفيدين`, 'success');
    setActiveModal(null);
    setIsOpen(false);
    // Reset Form
    setAnnouncementForm({
      title: '',
      message: '',
      type: 'administrative',
      recipientScope: 'all',
      targetSchoolId: schools[0]?.id || 'sch-01'
    });
  };

  return (
    <>
      {/* Backdrop overlay when speed dial is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 transition-opacity animate-in fade-in"
        />
      )}

      {/* Floating Speed Dial Container */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
        {/* Expanded Speed-Dial Menu Items */}
        {isOpen && (
          <div className="flex flex-col gap-2.5 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
            {/* Action 1: Add Student */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setActiveModal('student');
                  setIsOpen(false);
                }}
                className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/40 border border-emerald-400/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                title="إضافة طالب جديد"
              >
                <GraduationCap className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md">
                <span className="text-xs font-bold text-white block">إضافة طالب جديد</span>
                <span className="text-[10px] text-emerald-400">قيد فوري مع بيانات ولي الأمر</span>
              </div>
            </div>

            {/* Action 2: Register Teacher */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setActiveModal('teacher');
                  setIsOpen(false);
                }}
                className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-950/40 border border-blue-400/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                title="تسجيل معلم جديد"
              >
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md">
                <span className="text-xs font-bold text-white block">تسجيل معلم جديد</span>
                <span className="text-[10px] text-blue-400">تخصيص المادة والأنصبة والحصص</span>
              </div>
            </div>

            {/* Action 3: Send Announcement */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setActiveModal('announcement');
                  setIsOpen(false);
                }}
                className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-950/40 border border-amber-300/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                title="إرسال تعميم / إشعار عاجل"
              >
                <BellRing className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md">
                <span className="text-xs font-bold text-white block">إرسال تعميم عاجل</span>
                <span className="text-[10px] text-amber-400">بث فوري للمدارس أو المعلمين أو أولياء الأمور</span>
              </div>
            </div>

            {/* Action 4: Quick Navigation - New Official Memo */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setActiveSection('correspondence');
                  setIsOpen(false);
                }}
                className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-xl border border-slate-600/80 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                title="مراسلة رسمية جديدة"
              >
                <Mail className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </button>
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md">
                <span className="text-xs font-bold text-slate-200 block">مراسلة إدارية</span>
                <span className="text-[10px] text-slate-400">خطاب أو توجيه رسمي للإدارات</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-sm shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-rose-600 hover:bg-rose-500 text-white rotate-0 ring-4 ring-rose-500/30'
              : 'bg-gradient-to-r from-amber-500 via-amber-450 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0'
          }`}
          title="إجراءات سريعة - Quick Actions"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 animate-in spin-in-90 duration-200" />
              <span>إغلاق القائمة</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-slate-950 animate-bounce duration-1000" />
              <span className="tracking-tight">إجراءات سريعة</span>
              <span className="text-[10px] bg-slate-950 text-amber-400 font-mono px-1.5 py-0.5 rounded font-bold">
                1-Click
              </span>
            </>
          )}
        </button>
      </div>

      {/* ================= MODAL 1: ADD STUDENT ================= */}
      {activeModal === 'student' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">إضافة وقيد طالب جديد فوري</h3>
                  <p className="text-xs text-slate-400">تسجيل بيانات الطالب وربطه بالمدرسة ورقم ولي الأمر</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitStudent} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Full Name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    اسم الطالب بالكامل <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="مثال: يوسف محمود حسن الشافعي"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Target School */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    المدرسة المقيد بها <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={studentForm.schoolId}
                    onChange={(e) => setStudentForm({ ...studentForm, schoolId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.stageNameAr})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Internal Code / National ID */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    كود الطالب / الرقم القومي
                  </label>
                  <input
                    type="text"
                    value={studentForm.internalCode}
                    onChange={(e) => setStudentForm({ ...studentForm, internalCode: e.target.value })}
                    placeholder="تلقائي إن ترك فارغاً"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">الصف الدراسي</label>
                  <select
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
                    <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
                    <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
                    <option value="الصف الأول الإعدادي">الصف الأول الإعدادي</option>
                    <option value="الصف الثالث الإعدادي">الصف الثالث الإعدادي</option>
                    <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                    <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                    <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
                  </select>
                </div>

                {/* Classroom */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">الفصل</label>
                  <input
                    type="text"
                    value={studentForm.classroom}
                    onChange={(e) => setStudentForm({ ...studentForm, classroom: e.target.value })}
                    placeholder="مثال: 1/2 أو 2/3 علمي"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Parent Name */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">اسم ولي الأمر</label>
                  <input
                    type="text"
                    value={studentForm.parentName}
                    onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                    placeholder="اسم ولي الأمر"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Parent Mobile */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">هاتف ولي الأمر / الطوارئ</label>
                  <input
                    type="tel"
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد قيد الطالب</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: REGISTER TEACHER ================= */}
      {activeModal === 'teacher' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">تسجيل معلم جديد بالمنظومة</h3>
                  <p className="text-xs text-slate-400">إضافة عضو هيئة تدريس وتعيين المدرسة والتخصص الدراسي</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitTeacher} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Teacher Name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    اسم المعلم بالكامل <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    placeholder="مثال: أ. سامح عبد الفتاح درويش"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Target School */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    المدرسة المعين بها <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={teacherForm.schoolId}
                    onChange={(e) => setTeacherForm({ ...teacherForm, schoolId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Specialization */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    مادة التخصص <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherForm.subject}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    placeholder="مثال: الرياضيات والفيزياء"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Assigned Classes */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">الفصول المسندة</label>
                  <input
                    type="text"
                    value={teacherForm.assignedClasses}
                    onChange={(e) => setTeacherForm({ ...teacherForm, assignedClasses: e.target.value })}
                    placeholder="مثال: 1/1، 1/2، 2/3"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">رقم الهاتف المحمول</label>
                  <input
                    type="tel"
                    value={teacherForm.phone}
                    onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">البريد الإلكتروني المهني</label>
                  <input
                    type="email"
                    value={teacherForm.email}
                    onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                    placeholder="name@rodfarag-edu.gov.eg"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Staff Code */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">كود المعلم / السجل الوظيفي</label>
                  <input
                    type="text"
                    value={teacherForm.internalCode}
                    onChange={(e) => setTeacherForm({ ...teacherForm, internalCode: e.target.value })}
                    placeholder="تلقائي إن ترك فارغاً"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/50 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد تسجيل المعلم</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: BROADCAST ANNOUNCEMENT ================= */}
      {activeModal === 'announcement' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">إرسال تعميم / تنبيه رسمي فوري</h3>
                  <p className="text-xs text-slate-400">بث إعلان رسمي لكافة المدارس أو المعلمين أو أولياء الأمور</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitAnnouncement} className="p-5 space-y-4">
              {/* Scope Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  نطاق المستفيدين من التعميم <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: 'كافة المدارس الـ16' },
                    { id: 'teachers_only', label: 'المعلمون فقط' },
                    { id: 'parents_only', label: 'أولياء الأمور' },
                    { id: 'specific_school', label: 'مدرسة محددة' }
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setAnnouncementForm({ ...announcementForm, recipientScope: sc.id as any })}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        announcementForm.recipientScope === sc.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              {announcementForm.recipientScope === 'specific_school' && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">اختر المدرسة المعنية</label>
                  <select
                    value={announcementForm.targetSchoolId}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, targetSchoolId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Notification Type */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">نوع التعميم</label>
                <select
                  value={announcementForm.type}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="administrative">توجيه إداري / تنظيمي</option>
                  <option value="congratulation">تهنئة وتكريم رسمي</option>
                  <option value="exam">مواعيد امتحانات وتقييمات</option>
                  <option value="attendance">تنبيه انضباط وحضور</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  عنوان التعميم <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="مثال: تعليمات اختبارات شهر نوفمبر والانضباط المدرسي"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Message */}
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

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/50 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>بث التعميم فوراً</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
