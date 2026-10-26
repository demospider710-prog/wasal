import React, { useState } from 'react';
import { useRodFarag } from '../../context/RodFaragContext';
import { UserRole, UserProfile } from '../../types';
import {
  KeyRound,
  ShieldCheck,
  Check,
  X as CloseIcon,
  UserCheck,
  Building,
  GraduationCap,
  Users,
  MessageSquareWarning,
  Copyright,
  Laptop
} from 'lucide-react';

export const UsersRolesView: React.FC = () => {
  const { demoUsers, currentUser, switchRole } = useRodFarag();

  const permissionsMatrix: {
    permissionLabel: string;
    superAdmin: boolean;
    directorateAdmin: boolean;
    principal: boolean;
    studentAffairs: boolean;
    teacher: boolean;
    parent: boolean;
    student: boolean;
    complaintsOfficer: boolean;
    ipOfficer: boolean;
  }[] = [
    {
      permissionLabel: 'الوصول لبيانات جميع المدارس الـ16',
      superAdmin: true,
      directorateAdmin: true,
      principal: false,
      studentAffairs: false,
      teacher: false,
      parent: false,
      student: false,
      complaintsOfficer: true,
      ipOfficer: true
    },
    {
      permissionLabel: 'إضافة وتعديل سجلات المدارس',
      superAdmin: true,
      directorateAdmin: true,
      principal: false,
      studentAffairs: false,
      teacher: false,
      parent: false,
      student: false,
      complaintsOfficer: false,
      ipOfficer: false
    },
    {
      permissionLabel: 'اعتماد نتائج الامتحانات ونشرها رسمياً',
      superAdmin: true,
      directorateAdmin: true,
      principal: true,
      studentAffairs: false,
      teacher: false,
      parent: false,
      student: false,
      complaintsOfficer: false,
      ipOfficer: false
    },
    {
      permissionLabel: 'إصدار وتعميم المراسلات الرسمية',
      superAdmin: true,
      directorateAdmin: true,
      principal: true,
      studentAffairs: false,
      teacher: false,
      parent: false,
      student: false,
      complaintsOfficer: false,
      ipOfficer: false
    },
    {
      permissionLabel: 'فحص الشكاوى والتظلمات والرد عليها',
      superAdmin: true,
      directorateAdmin: true,
      principal: false,
      studentAffairs: false,
      teacher: false,
      parent: false,
      student: false,
      complaintsOfficer: true,
      ipOfficer: false
    },
    {
      permissionLabel: 'إيداع وتدقيق الملكية الفكرية',
      superAdmin: true,
      directorateAdmin: true,
      principal: false,
      studentAffairs: false,
      teacher: true,
      parent: false,
      student: true,
      complaintsOfficer: false,
      ipOfficer: true
    },
    {
      permissionLabel: 'رصد الحضور اليومي للفصول',
      superAdmin: true,
      directorateAdmin: true,
      principal: true,
      studentAffairs: true,
      teacher: true,
      parent: false,
      student: false,
      complaintsOfficer: false,
      ipOfficer: false
    },
    {
      permissionLabel: 'رؤية ملفات الطلاب (محكوم بالنطاق)',
      superAdmin: true,
      directorateAdmin: true,
      principal: true,
      studentAffairs: true,
      teacher: true,
      parent: false, // Only linked kids
      student: false, // Only self
      complaintsOfficer: false,
      ipOfficer: false
    },
    {
      permissionLabel: 'الاطلاع على سجل العمليات والتدقيق الأمني المشفر',
      superAdmin: true,
      directorateAdmin: true,
      principal: false,
      studentAffairs: false,
      teacher: false,
      parent: false,
      student: false,
      complaintsOfficer: false,
      ipOfficer: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <KeyRound className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              منظومة المستخدمين وصلاحيات الأدوار (RBAC Engine)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              تطبيق مبدأ أقل امتياز وفصل الصلاحيات بين الإدارة والمدارس وأولياء الأمور
            </p>
          </div>
        </div>
      </div>

      {/* Role Switcher Action Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-amber-400" />
          اختيار الدور لتجربة صلاحيات الواجهة والعمليات:
        </h3>
        <div className="flex flex-wrap gap-2">
          {demoUsers.map((user) => {
            const isSelected = currentUser.role === user.role;
            return (
              <button
                key={user.role}
                onClick={() => switchRole(user.role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{user.name}</span>
                {isSelected && <span className="text-[10px] bg-slate-950 text-amber-400 px-1.5 rounded">مفعل</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-850 border-b border-slate-800">
          <h3 className="text-xs font-bold text-white">مصفوفة الصلاحيات المعتمدة للأدوار الـ9:</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            يتم فحص الصلاحيات والتحقق منها برمجياً على مستوى منطق المعالجة وليس مجرد إخفاء الأزرار.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">العملية / الصلاحية</th>
                <th className="p-2.5 text-center">الإدارة التعليمية</th>
                <th className="p-2.5 text-center">مدير المدرسة</th>
                <th className="p-2.5 text-center">شؤون الطلاب</th>
                <th className="p-2.5 text-center">المعلم</th>
                <th className="p-2.5 text-center">ولي الأمر</th>
                <th className="p-2.5 text-center">مسؤول الشكاوى</th>
                <th className="p-2.5 text-center">مسؤول الملكية</th>
                <th className="p-2.5 text-center">مسؤول النظام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/60">
                  <td className="p-3 font-semibold text-white">{row.permissionLabel}</td>
                  <td className="p-2.5 text-center">{row.directorateAdmin ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.principal ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.studentAffairs ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.teacher ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.parent ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.complaintsOfficer ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.ipOfficer ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                  <td className="p-2.5 text-center">{row.superAdmin ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <CloseIcon className="w-3.5 h-3.5 text-slate-400 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
