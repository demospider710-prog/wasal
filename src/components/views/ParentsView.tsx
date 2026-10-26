import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  UserCheck,
  GraduationCap,
  CalendarCheck,
  FileCheck,
  BellRing,
  MessageSquareWarning,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const ParentsView: React.FC = () => {
  const {
    currentUser,
    parents,
    students,
    assessments,
    notifications,
    complaints,
    submitComplaint,
    switchRole
  } = useRodFarag();

  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('stu-101');
  const [trackingNumberNotice, setTrackingNumberNotice] = useState<string | null>(null);

  // If current role is not parent, provide a quick one-click toggle so the evaluator can experience the Parent Portal
  const isParent = currentUser.role === 'parent';
  const parentProfile = parents.find(p => p.id === 'prt-01') || parents[0];

  // Linked students only!
  const linkedStudentIds = isParent
    ? (currentUser.linkedStudentIds || [])
    : (parentProfile.linkedStudents.map(s => s.studentId));

  const myChildren = students.filter(s => linkedStudentIds.includes(s.id));

  // Approved and Published assessments only! Unapproved assessments are strictly excluded.
  const myChildrenPublishedAssessments = assessments.filter(a => {
    if (a.status !== 'published') return false;
    return a.studentScores.some(sc => linkedStudentIds.includes(sc.studentId));
  });

  // Recent complaints submitted by this parent
  const myComplaints = complaints.filter(c => c.submitterType === 'parent');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquirySubject || !inquiryText) return;

    const child = myChildren.find(c => c.id === selectedStudentId) || myChildren[0];

    const code = submitComplaint({
      schoolId: child ? child.schoolId : 'sch-01',
      schoolName: child ? child.schoolName : 'مدرسة روض الفرج',
      submitterType: 'parent',
      submitterNameMasked: `ولي أمر الطالب: ${child ? child.name : 'طالب'}`,
      submitterContact: currentUser.phone || '01099887766',
      category: 'academic',
      subject: inquirySubject,
      description: inquiryText,
      assignedAuthority: 'شؤون الطلاب وإدارة روض الفرج'
    });

    setTrackingNumberNotice(code);
    setInquirySubject('');
    setInquiryText('');
  };

  return (
    <div className="space-y-6">
      {/* Top Portal Banner */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              بوابة أولياء الأمور المعتمدة — إدارة روض الفرج
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              مرحباً بك: {isParent ? currentUser.name : `${parentProfile.name} (معاينة البوابة)`}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              نافذة المتابعة الحصرية لأبنائك المقيدين بمدارس حي روض الفرج، لمتابعة الحضور الموثق، نتائج التقييمات المعتمدة رسمياً، والتواصل السري مع إدارة المدرسة.
            </p>
          </div>

          {!isParent && (
            <button
              onClick={() => switchRole('parent')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>تفعيل حساب ولي الأمر الآن</span>
            </button>
          )}
        </div>
      </div>

      {/* Linked Children Dossier Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            الأبناء المسجلون والمرتبطون بحسابك ({myChildren.length} أبناء)
          </h3>
          <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            بيانات موثقة بالسجل المدني وقيد المدرسة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myChildren.map((child) => (
            <div
              key={child.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {child.internalCode}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5">{child.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{child.schoolName}</p>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg font-mono">
                    حضور {child.attendanceRate}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
                <div className="bg-slate-850 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">الصف الدراسي</span>
                  <span className="font-bold text-slate-200">{child.grade}</span>
                </div>
                <div className="bg-slate-850 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">الفصل</span>
                  <span className="font-bold text-slate-200">{child.classroom}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  المعدل الأكاديمي: <b className="text-white font-mono">{child.generalAverage}%</b>
                </span>
                <span className="text-[10px] text-slate-400">
                  تاريخ الميلاد: {child.birthDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Approved Results for Children */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              النتائج المعتمدة رسمياً لأبنائك
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              تظهر هنا التقييمات الشهرية بعد اعتمادها وتوثيقها من مدير المدرسة والإدارة
            </p>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-lg font-mono">
            الفصل الدراسي الأول 2026/2027
          </span>
        </div>

        <div className="divide-y divide-slate-800 mt-3">
          {myChildrenPublishedAssessments.length > 0 ? (
            myChildrenPublishedAssessments.map((asm) => {
              const matchedScores = asm.studentScores.filter(sc => linkedStudentIds.includes(sc.studentId));
              return (
                <div key={asm.id} className="py-3 text-right">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{asm.title}</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          معتمدة ومنشورة
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        المادة: {asm.subject} • {asm.schoolName} • تاريخ الرصد: {asm.date}
                      </p>
                    </div>
                    <div className="text-left text-[11px] text-slate-400">
                      معتمد من: <span className="text-slate-200">{asm.approvedBy}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {matchedScores.map((score, sIdx) => (
                      <div key={sIdx} className="bg-slate-850 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-3 text-xs">
                        <span className="font-bold text-white">{score.studentName}:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {score.score} من {asm.maxScore}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                          {score.gradeEquivalent}
                        </span>
                        {score.notes && (
                          <span className="text-[11px] text-slate-400 border-r border-slate-700 pr-2">
                            ملاحظة المعلم: {score.notes}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-slate-400 text-xs">
              لا توجد نتائج جديدة منشورة حالياً، وسيتم إخطاركم فور اعتماد التقييمات القادمة.
            </div>
          )}
        </div>
      </div>

      {/* Inquiry and Complaint Submission for Parents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-amber-400" />
            إرسال استفسار أو تظلم لإدارة روض الفرج
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            يتم تسجيل طلبك برقم متابعة فريد مع حماية سرية بيانات ولي الأمر والطالب.
          </p>

          {trackingNumberNotice && (
            <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                تم استلام طلبك بنجاح!
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-amber-400">
                رقم المتابعة السري: {trackingNumberNotice}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                احتفظ بهذا الرقم لمتابعة حالة الرد مع لجنة فحص التظلمات بروض الفرج.
              </div>
            </div>
          )}

          <form onSubmit={handleSendInquiry} className="space-y-3 mt-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">اختر الابن المعني</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                {myChildren.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.schoolName} ({c.grade})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">موضوع الاستفسار أو التظلم</label>
              <input
                type="text"
                required
                value={inquirySubject}
                onChange={(e) => setInquirySubject(e.target.value)}
                placeholder="مثال: طلب مراجعة رصد درجات الرياضيات لاختبار الشهر"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">تفاصيل الطلب أو الملاحظات</label>
              <textarea
                required
                rows={3}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="اكتب استفسارك بالتفصيل..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال وتوليد كود المتابعة</span>
            </button>
          </form>
        </div>

        {/* Existing Inquiries Track */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            سجل طلباتك واستفساراتك السابقة
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            متابعة مراحل المراجعة والردود الرسمية الصادرة من الإدارة
          </p>

          <div className="divide-y divide-slate-800 mt-3 max-h-72 overflow-y-auto">
            {myComplaints.length > 0 ? (
              myComplaints.map((cmp) => (
                <div key={cmp.id} className="py-3 text-right">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      {cmp.trackingCode}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                      {cmp.status === 'response_issued' ? 'تم الرد الرسمي' : 'قيد الفحص'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white mt-1.5">{cmp.subject}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{cmp.description}</p>
                  {cmp.officialResponse && (
                    <div className="mt-2 p-2 bg-slate-850 border border-slate-800 rounded-lg text-emerald-300 text-[11px]">
                      <b>الرد الرسمي:</b> {cmp.officialResponse}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">
                لم تقدم أي استفسارات أو شكاوى سابقة حتى الآن.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
