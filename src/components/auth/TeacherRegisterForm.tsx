import React, { useState } from 'react';
import { TEACHER_JOB_TITLES, TEACHING_SPECIALIZATIONS, TeacherJobTitle, RegistrationPayload } from '../../types/auth';
import { validateEgyptianPhone, validateStaffCode } from '../../utils/registration-logic';
import { School, Governorate, EducationalDirectorate } from '../../types';
import { UserCheck, Shield, Phone, Mail, Lock, User, Briefcase, BookOpen, AlertCircle } from 'lucide-react';

interface TeacherRegisterFormProps {
  governorate: Governorate;
  directorate: EducationalDirectorate;
  school: School;
  onSubmit: (payload: RegistrationPayload) => void;
  onBack: () => void;
}

export const TeacherRegisterForm: React.FC<TeacherRegisterFormProps> = ({
  governorate,
  directorate,
  school,
  onSubmit,
  onBack
}) => {
  const [fullName, setFullName] = useState('');
  const [staffCode, setStaffCode] = useState('');
  const [jobTitle, setJobTitle] = useState<TeacherJobTitle>('معلم');
  const [specialization, setSpecialization] = useState(TEACHING_SPECIALIZATIONS[0]);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    // Validation
    if (!fullName.trim() || fullName.trim().split(/\s+/).length < 3) {
      errors.push('الاسم الكامل يجب أن يكون ثلاثياً أو رباعياً على الأقل باللغة العربية');
    }

    const staffCheck = validateStaffCode(staffCode);
    if (!staffCheck.valid) {
      errors.push(staffCheck.error || 'الكود الوظيفي للمعلم غير صحيح');
    }

    const phoneCheck = validateEgyptianPhone(mobile);
    if (!phoneCheck.valid) {
      errors.push(phoneCheck.error || 'رقم المحمول غير صحيح');
    }

    if (!username.trim() || username.trim().length < 4) {
      errors.push('اسم المستخدم يجب ألا يقل عن 4 أحرف');
    }

    if (!password || password.length < 6) {
      errors.push('كلمة المرور يجب أن تتكون من 6 خانات على الأقل');
    }

    if (password !== confirmPassword) {
      errors.push('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    onSubmit({
      category: 'teacher_staff',
      governorateId: governorate.id,
      governorateName: governorate.name,
      directorateId: directorate.id,
      directorateName: directorate.name,
      schoolId: school.id,
      schoolName: school.name,
      fullName: fullName.trim(),
      staffCode: staffCode.trim(),
      jobTitle,
      specialization,
      mobile: mobile.trim(),
      email: email.trim() || undefined,
      username: username.trim(),
      password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Selected Scope Banner */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-slate-400">نطاق التكليف المختار: </span>
          <span className="text-white font-bold">{school.name}</span>
          <span className="text-slate-500 mx-1.5">•</span>
          <span className="text-amber-400 font-semibold">{directorate.name} ({governorate.name})</span>
        </div>
        <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold">
          كادر المعلمين والوظائف التعليمية
        </span>
      </div>

      {formErrors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-red-400">
            <AlertCircle className="w-4 h-4" />
            يرجى تصحيح الملاحظات التالية قبل المتابعة:
          </div>
          <ul className="list-disc list-inside space-y-0.5 mr-2">
            {formErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-400" />
            الاسم الكامل (ثلاثي أو رباعي بالعربية) *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: أحمد عبد الرحمن محمود علي"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            الكود الوظيفي للمعلم (كود الوزارة) *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: T-90842"
            value={staffCode}
            onChange={(e) => setStaffCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            المسمى الوظيفي المعتمد *
          </label>
          <select
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value as TeacherJobTitle)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-amber-500"
          >
            {TEACHER_JOB_TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            مادة التخصص أو المجال *
          </label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-amber-500"
          >
            {TEACHING_SPECIALIZATIONS.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            رقم الهاتف المحمول (يبدأ بـ 010 أو 011 أو 012 أو 015) *
          </label>
          <input
            type="text"
            required
            placeholder="01012345678"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            البريد الإلكتروني (المؤسسي أو الشخصي)
          </label>
          <input
            type="email"
            placeholder="teacher@rodelgard.edu.eg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        {/* Credentials */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            اسم المستخدم للدخول *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: ahmed_teacher"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            كلمة المرور (6 خانات على الأقل) *
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            تأكيد كلمة المرور *
          </label>
          <input
            type="password"
            required
            placeholder="أعد إدخال كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold cursor-pointer"
        >
          الرجوع للخطوة السابقة
        </button>

        <button
          type="submit"
          className="px-7 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          إتمام التسجيل والدخول المباشر
        </button>
      </div>
    </form>
  );
};
