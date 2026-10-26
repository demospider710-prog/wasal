import React, { useState } from 'react';
import { RegistrationPayload } from '../../types/auth';
import { validateEgyptianPhone, validateEgyptianNationalId } from '../../utils/registration-logic';
import { School, Governorate, EducationalDirectorate } from '../../types';
import { HeartHandshake, Shield, Phone, Lock, User, AlertCircle, Link } from 'lucide-react';

interface ParentRegisterFormProps {
  governorate: Governorate;
  directorate: EducationalDirectorate;
  school: School;
  onSubmit: (payload: RegistrationPayload) => void;
  onBack: () => void;
}

export const ParentRegisterForm: React.FC<ParentRegisterFormProps> = ({
  governorate,
  directorate,
  school,
  onSubmit,
  onBack
}) => {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [relationship, setRelationship] = useState<'أب' | 'أم' | 'ولي أمر شرعي'>('أب');
  const [linkedStudentIdentifier, setLinkedStudentIdentifier] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!fullName.trim() || fullName.trim().split(/\s+/).length < 3) {
      errors.push('الاسم الكامل لولي الأمر يجب أن يكون ثلاثياً على الأقل بالعربية');
    }

    const nidCheck = validateEgyptianNationalId(nationalId);
    if (!nidCheck.valid) {
      errors.push(nidCheck.error || 'الرقم القومي لولي الأمر غير صحيح');
    }

    const phoneCheck = validateEgyptianPhone(mobile);
    if (!phoneCheck.valid) {
      errors.push(phoneCheck.error || 'رقم المحمول غير صحيح');
    }

    if (!linkedStudentIdentifier.trim()) {
      errors.push('يرجى إدخال كود الطالب أو اسم الطالب التابع للمتابعة');
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
      category: 'parent',
      governorateId: governorate.id,
      governorateName: governorate.name,
      directorateId: directorate.id,
      directorateName: directorate.name,
      schoolId: school.id,
      schoolName: school.name,
      fullName: fullName.trim(),
      nationalId: nationalId.trim(),
      relationship,
      linkedStudentIdentifier: linkedStudentIdentifier.trim(),
      mobile: mobile.trim(),
      username: username.trim(),
      password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-slate-400">مدرسة الطالب التابع: </span>
          <span className="text-white font-bold">{school.name}</span>
          <span className="text-slate-500 mx-1.5">•</span>
          <span className="text-amber-400 font-semibold">{directorate.name}</span>
        </div>
        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-bold">
          بوابة أولياء الأمور والمتابعة المباشرة
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
            اسم ولي الأمر بالكامل *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: محمد عبد الله إبراهيم"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            الرقم القومي لولي الأمر (14 رقم) *
          </label>
          <input
            type="text"
            required
            maxLength={14}
            placeholder="280XXXXXXXXXXX"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono text-left"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            صلة القرابة بالطالب *
          </label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:ring-2 focus:ring-amber-500"
          >
            <option value="أب">أب</option>
            <option value="أم">أم</option>
            <option value="ولي أمر شرعي">ولي أمر شرعي / وصي قانوني</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Link className="w-3.5 h-3.5 text-amber-400" />
            كود الطالب بالوزارة أو اسمه الثلاثي *
          </label>
          <input
            type="text"
            required
            placeholder="مثال: RDF-STU-001 أو كريم محمد عبد الله"
            value={linkedStudentIdentifier}
            onChange={(e) => setLinkedStudentIdentifier(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            رقم الهاتف المحمول المسجل *
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
          <label className="block text-slate-300 font-semibold mb-1">اسم المستخدم للدخول *</label>
          <input
            type="text"
            required
            placeholder="مثال: parent_mohamed"
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

        <div>
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
          تسجيل حساب ولي الأمر ومتابعة الأبناء
        </button>
      </div>
    </form>
  );
};
