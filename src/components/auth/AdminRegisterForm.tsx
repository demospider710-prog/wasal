import React, { useState } from 'react';
import { RegistrationPayload } from '../../types/auth';
import { validateEgyptianPhone, validateStaffCode } from '../../utils/registration-logic';
import { School, Governorate, EducationalDirectorate } from '../../types';
import { ShieldAlert, Award, Phone, Mail, Lock, User, AlertCircle, FileText } from 'lucide-react';

interface AdminRegisterFormProps {
  governorate: Governorate;
  directorate: EducationalDirectorate;
  school: School;
  onSubmit: (payload: RegistrationPayload) => void;
  onBack: () => void;
}

export const AdminRegisterForm: React.FC<AdminRegisterFormProps> = ({
  governorate,
  directorate,
  school,
  onSubmit,
  onBack
}) => {
  const [fullName, setFullName] = useState('');
  const [staffCode, setStaffCode] = useState('');
  const [decreeNumber, setDecreeNumber] = useState('');
  const [adminClearanceLevel, setAdminClearanceLevel] = useState('مدير مدرسة معتمد');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!fullName.trim() || fullName.trim().split(/\s+/).length < 3) {
      errors.push('الاسم الكامل يجب أن يكون ثلاثياً أو رباعياً بالعربية');
    }

    const staffCheck = validateStaffCode(staffCode);
    if (!staffCheck.valid) {
      errors.push(staffCheck.error || 'الكود الوظيفي للقيادة التعليمية غير صحيح');
    }

    if (!decreeNumber.trim()) {
      errors.push('رقم القرار الوزاري أو أمر التكليف الرسمي مطلوب للتحقق الأمني');
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
      category: 'directorate_leader',
      governorateId: governorate.id,
      governorateName: governorate.name,
      directorateId: directorate.id,
      directorateName: directorate.name,
      schoolId: school.id,
      schoolName: school.name,
      fullName: fullName.trim(),
      staffCode: staffCode.trim(),
      decreeNumber: decreeNumber.trim(),
      adminClearanceLevel,
      mobile: mobile.trim(),
      email: email.trim() || undefined,
      username: username.trim(),
      password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-slate-400">نطاق التكليف: </span>
          <span className="text-white font-bold">{school.name}</span>
          <span className="text-slate-500 mx-1.5">•</span>
          <span className="text-amber-400 font-semibold">{directorate.name} ({governorate.name})</span>
        </div>
        <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[11px] font-bold">
          بوابة القيادات والمسؤولين الإداريين
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
            الاسم الرباعي الرسمي *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: د. حسام عبد الفتاح الشريف"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            الكود الوظيفي للقيادة التعليمية *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: ADM-2024-91"
            value={staffCode}
            onChange={(e) => setStaffCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            رقم القرار الوزاري أو أمر التكليف الرسمي *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: قرار وزاري رقم 128 لسنة 2024"
            value={decreeNumber}
            onChange={(e) => setDecreeNumber(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            الصفة والصلاحية القيادية *
          </label>
          <select
            value={adminClearanceLevel}
            onChange={(e) => setAdminClearanceLevel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-amber-500"
          >
            <option value="مدير مدرسة معتمد">مدير مدرسة معتمد</option>
            <option value="وكيل مدرسة لشؤون التعليم والطلاب">وكيل مدرسة لشؤون التعليم والطلاب</option>
            <option value="مدير عام بالإدارة التعليمية">مدير عام بالإدارة التعليمية</option>
            <option value="وكيل الإدارة التعليمية">وكيل الإدارة التعليمية</option>
            <option value="مدير مرحلة تعليمية (ابتدائي/إعدادي/ثانوي)">مدير مرحلة تعليمية (ابتدائي/إعدادي/ثانوي)</option>
            <option value="موجه أول إدارة">موجه أول إدارة</option>
            <option value="مسؤول حوكمة ومتابعة ميدانية">مسؤول حوكمة ومتابعة ميدانية</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            رقم الهاتف المحمول المعتمد *
          </label>
          <input
            type="text"
            required
            placeholder="010XXXXXXXX"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            البريد الإلكتروني المؤسسي
          </label>
          <input
            type="email"
            placeholder="leader@rodelgard.edu.eg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">اسم المستخدم للدخول *</label>
          <input
            type="text"
            required
            placeholder="مثال: principal_hossam"
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
          تسجيل حساب القيادة التعليمية والاعتماد
        </button>
      </div>
    </form>
  );
};
