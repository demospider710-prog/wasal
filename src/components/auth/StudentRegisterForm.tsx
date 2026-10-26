import React, { useState } from 'react';
import { RegistrationPayload } from '../../types/auth';
import { validateEgyptianPhone, validateEgyptianNationalId, validateStudentCode } from '../../utils/registration-logic';
import { School, Governorate, EducationalDirectorate } from '../../types';
import { GraduationCap, Shield, Phone, Lock, User, AlertCircle, Calendar, Hash } from 'lucide-react';

interface StudentRegisterFormProps {
  governorate: Governorate;
  directorate: EducationalDirectorate;
  school: School;
  onSubmit: (payload: RegistrationPayload) => void;
  onBack: () => void;
}

export const StudentRegisterForm: React.FC<StudentRegisterFormProps> = ({
  governorate,
  directorate,
  school,
  onSubmit,
  onBack
}) => {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [grade, setGrade] = useState('الصف الأول الثانوي');
  const [classroom, setClassroom] = useState('1/1');
  const [parentPhone, setParentPhone] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Derived state from National ID
  const nidValidation = nationalId.length === 14 ? validateEgyptianNationalId(nationalId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!fullName.trim() || fullName.trim().split(/\s+/).length < 3) {
      errors.push('الاسم الكامل يجب أن يكون ثلاثياً أو رباعياً على الأقل باللغة العربية');
    }

    const nidCheck = validateEgyptianNationalId(nationalId);
    if (!nidCheck.valid) {
      errors.push(nidCheck.error || 'الرقم القومي غير صحيح (14 رقم)');
    }

    const codeCheck = validateStudentCode(studentCode);
    if (!codeCheck.valid) {
      errors.push(codeCheck.error || 'كود الطالب بالوزارة غير صحيح');
    }

    const parentPhoneCheck = validateEgyptianPhone(parentPhone);
    if (!parentPhoneCheck.valid) {
      errors.push(`رقم هاتف ولي الأمر: ${parentPhoneCheck.error}`);
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
      category: 'student',
      governorateId: governorate.id,
      governorateName: governorate.name,
      directorateId: directorate.id,
      directorateName: directorate.name,
      schoolId: school.id,
      schoolName: school.name,
      fullName: fullName.trim(),
      nationalId: nationalId.trim(),
      studentCode: studentCode.trim(),
      grade,
      classroom,
      parentPhone: parentPhone.trim(),
      mobile: studentPhone.trim() || parentPhone.trim(),
      username: username.trim(),
      password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-slate-400">المدرسة المقيد بها: </span>
          <span className="text-white font-bold">{school.name}</span>
          <span className="text-slate-500 mx-1.5">•</span>
          <span className="text-amber-400 font-semibold">{directorate.name} ({governorate.name})</span>
        </div>
        <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[11px] font-bold">
          تسجيل حساب طالب نظامي
        </span>
      </div>

      {formErrors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-red-400">
            <AlertCircle className="w-4 h-4" />
            يرجى مراجعة البيانات الآتية:
          </div>
          <ul className="list-disc list-inside space-y-0.5 mr-2">
            {formErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-400" />
            اسم الطالب رباعي كما في شهادة الميلاد *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: يوسف إبراهيم محمد حسن"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            الرقم القومي للطالب (14 رقم) *
          </label>
          <input
            type="text"
            required
            maxLength={14}
            placeholder="3010XXXXXXXXXX"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
          {nidValidation?.valid && (
            <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              تاريخ الميلاد المحسوب: {nidValidation.birthDate} ({nidValidation.gender})
            </div>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-amber-400" />
            كود الطالب بالوزارة (MOE Code) *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: 49201948"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            المرحلة والصف الدراسي *
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-amber-500"
          >
            <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
            <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
            <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
            <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
            <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
            <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
            <option value="الصف الأول الإعدادي">الصف الأول الإعدادي</option>
            <option value="الصف الثاني الإعدادي">الصف الثاني الإعدادي</option>
            <option value="الصف الثالث الإعدادي">الصف الثالث الإعدادي</option>
            <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
            <option value="الصف الثاني الثانوي (علمي)">الصف الثاني الثانوي (علمي)</option>
            <option value="الصف الثاني الثانوي (أدبي)">الصف الثاني الثانوي (أدبي)</option>
            <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">الفصل (الشعبة) *</label>
          <input
            type="text"
            required
            placeholder="مثال: 1/1 أو 1/2"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            رقم هاتف ولي الأمر للطوارئ *
          </label>
          <input
            type="text"
            required
            placeholder="010XXXXXXXX"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">اسم المستخدم للدخول *</label>
          <input
            type="text"
            required
            placeholder="مثال: youssef_std"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            كلمة المرور *
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
            placeholder="أعد كتابة كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

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
          تسجيل حساب الطالب ودخول المنظومة
        </button>
      </div>
    </form>
  );
};
