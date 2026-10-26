import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  Download,
  AlertTriangle,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  Calendar,
  Lock,
  Layers
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetAllDemoData,
    exportDatabaseJSON,
    currentUser
  } = useRodFarag();

  const [formData, setFormData] = useState({
    academicYear: settings.academicYear,
    currentTerm: settings.currentTerm,
    allowParentRegistration: settings.allowParentRegistration,
    maintenanceMode: settings.maintenanceMode,
    autoArchiveDelayDays: settings.autoArchiveDelayDays,
    enableAuditDetailedLog: settings.enableAuditDetailedLog,
    directorateContactEmail: settings.directorateContactEmail,
    directoratePhone: settings.directoratePhone
  });

  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <SettingsIcon className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              إعدادات النظام والتهيئة المؤسسية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              إدارة العام الدراسي، معايير الأمان، النسخ الاحتياطي واستعادة البيانات
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* Academic Year Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            بيانات العام الدراسي والتقويم التعليمي
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">العام الدراسي الحالي</label>
              <input
                type="text"
                required
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">الفصل الدراسي</label>
              <select
                value={formData.currentTerm}
                onChange={(e) => setFormData({ ...formData, currentTerm: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="الفصل الدراسي الأول">الفصل الدراسي الأول</option>
                <option value="الفصل الدراسي الثاني">الفصل الدراسي الثاني</option>
                <option value="امتحانات الدور الثاني">امتحانات الدور الثاني</option>
              </select>
            </div>
          </div>
        </div>

        {/* Institutional Contact Information */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Building className="w-4 h-4 text-amber-400" />
            بيانات إدارة روض الفرج التعليمية الرسمية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني للديوان العام</label>
              <input
                type="email"
                required
                value={formData.directorateContactEmail}
                onChange={(e) => setFormData({ ...formData, directorateContactEmail: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">هاتف الاتصال والمتابعة</label>
              <input
                type="text"
                required
                value={formData.directoratePhone}
                onChange={(e) => setFormData({ ...formData, directoratePhone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Security & Operational Parameters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Lock className="w-4 h-4 text-amber-400" />
            ضوابط الأمان والتشغيل
          </h3>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowParentRegistration}
                onChange={(e) => setFormData({ ...formData, allowParentRegistration: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span>السماح بإنشاء حسابات جديدة لأولياء الأمور بعد التحقق من السجل المدني</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enableAuditDetailedLog}
                onChange={(e) => setFormData({ ...formData, enableAuditDetailedLog: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500"
              />
              <span>تفعيل السجل الرقمي المشفر للعمليات الإدارية الحساسة</span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ إعدادات النظام</span>
          </button>
        </div>
      </form>

      {/* Backup and Factory Reset Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <Layers className="w-4 h-4 text-amber-400" />
          النسخ الاحتياطي واستعادة البيانات
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-850 p-4 rounded-xl text-xs">
          <div>
            <div className="font-bold text-white">تصدير قاعدة البيانات بالكامل (JSON Backup)</div>
            <p className="text-slate-400 mt-0.5">
              حفظ نسخة كاملة من سجلات المدارس الـ16 والطلاب والمراسلات والشكاوى والانضباط.
            </p>
          </div>
          <button
            onClick={exportDatabaseJSON}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold rounded-xl flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>تحميل نسخة JSON</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-950/20 border border-rose-500/30 p-4 rounded-xl text-xs">
          <div>
            <div className="font-bold text-rose-300">إعادة ضبط البيانات التجريبية الافتراضية</div>
            <p className="text-slate-400 mt-0.5">
              استعادة الحالات الأصلية للمدارس الـ16 والطلاب والمراسلات وحذف التعديلات المحلية.
            </p>
          </div>
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>استعادة البيانات الافتراضية</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-5 text-right">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              تأكيد استعادة البيانات التجريبية
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              هل أنت متأكد من رغبتك في استعادة البيانات التجريبية الأصلية لإدارة روض الفرج؟ سيتم إرجاع كافة السجلات الـ16 إلى حالتها الأولية.
            </p>
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  resetAllDemoData();
                  setResetConfirmOpen(false);
                }}
                className="px-4 py-1.5 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-500"
              >
                تأكيد الاستعادة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
