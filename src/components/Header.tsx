import React, { useState } from 'react';
import { useRodFarag } from '../context/RodFaragContext';
import {
  Search,
  Bell,
  Printer,
  UserCheck,
  Building2,
  Menu,
  X,
  ShieldAlert,
  ChevronDown,
  Info,
  MapPin,
  Compass,
  LogOut
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onOpenRoleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onOpenRoleModal
}) => {
  const {
    currentUser,
    schools,
    selectedSchoolFilter,
    setSelectedSchoolFilter,
    searchQuery,
    setSearchQuery,
    notifications,
    setActiveSection,
    activeGovernorate,
    activeDirectorate,
    setIsGovModalOpen,
    logoutUser,
    setShowAuthPortal
  } = useRodFarag();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const getRoleArabicTitle = (role: UserRole) => {
    switch (role) {
      case 'directorate_admin': return 'مسؤول الإدارة التعليمية';
      case 'school_principal': return 'مدير مدرسة';
      case 'student_affairs': return 'مسؤول شؤون الطلاب';
      case 'teacher': return 'المدرس';
      case 'student': return 'الطالب';
      case 'parent': return 'ولي الأمر';
      case 'complaints_officer': return 'مسؤول الشكاوى';
      case 'ip_officer': return 'مسؤول الملكية الفكرية';
      case 'super_admin': return 'مسؤول النظام التقني';
      default: return 'مستخدم المنظومة';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md print:hidden">
      {/* Top Governmental Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between text-slate-300 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-amber-400">جمهورية مصر العربية — وزارة التربية والتعليم</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <button
            onClick={() => setIsGovModalOpen(true)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700/80 hover:border-amber-500/50 px-2.5 py-0.5 rounded-md transition-all font-semibold group cursor-pointer"
            title="انقر لتصفح واختيار أي من الـ27 محافظة وإداراتها التعليمية"
          >
            <MapPin className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold">{activeGovernorate.name}</span>
            <span className="text-slate-400">—</span>
            <span className="text-amber-300">{activeDirectorate?.name || 'إدارة تعليمية'}</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold mr-1">
              تغيير (27 محافظة)
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
            <Info className="w-3 h-3 text-amber-400" />
            بيئة تشغيل معتمدة (16 مدرسة)
          </span>
          <span className="hidden md:inline text-slate-400 font-sans">العام الدراسي: 2026 / 2027</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button & App Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="تبديل القائمة الجانبية"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveSection('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg border border-amber-300/30">
              <span className="font-black text-slate-950 text-base tracking-tighter">RDF</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-tight">
                الإدارة الرقمية لروض الفرج
              </h1>
              <p className="text-[11px] text-amber-400/90 font-medium hidden sm:block">
                Roḍ El Farag Digital Education Management System
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search & School Scope Filter */}
        <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
          {/* School Scoping Dropdown (Directorate Admin can switch schools) */}
          <div className="relative min-w-[200px]">
            <Building2 className="w-4 h-4 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedSchoolFilter}
              onChange={(e) => setSelectedSchoolFilter(e.target.value)}
              disabled={Boolean(currentUser.schoolId)} // Locked if user belongs to a specific school
              className="w-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs rounded-lg py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              title="نطاق المدرسة"
            >
              <option value="all">كل المدارس الـ16 (الإدارة المركزية)</option>
              {schools.map(s => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم، كود المدرسة، رقم الطالب، المراسلة..."
              className="w-full bg-slate-800/90 border border-slate-700 text-slate-200 placeholder-slate-400 text-xs rounded-lg py-2 pr-9 pl-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Governorates, Print, Notifications, Active Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 27 Governorates Quick Selector Button */}
          <button
            onClick={() => setIsGovModalOpen(true)}
            title="دليل الـ27 محافظة والإدارات التعليمية"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline text-slate-200">الـ27 محافظة</span>
          </button>

          {/* Print button */}
          <button
            onClick={handlePrint}
            title="طباعة التقرير / الصفحة"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="الإشعارات والتهنئات"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute left-0 sm:right-auto sm:left-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    مركز الإشعارات والتهنئات
                  </h3>
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(false);
                      setActiveSection('notifications');
                    }}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    عرض الكل ({notifications.length})
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800">
                  {notifications.slice(0, 4).map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        setActiveSection('notifications');
                      }}
                      className="p-3 hover:bg-slate-800/60 transition-colors cursor-pointer text-right"
                    >
                      <div className="text-xs font-semibold text-slate-200 line-clamp-1">{n.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{n.message}</div>
                      <div className="text-[10px] text-amber-400/80 mt-1">{n.createdAt} • {n.sentBy}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher Badge */}
          <button
            onClick={onOpenRoleModal}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-700 border border-amber-500/30 rounded-xl px-2.5 py-1.5 transition-all shadow-sm group"
            title="انقر لتبديل الدور والصلاحيات للتجربة"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white line-clamp-1 flex items-center gap-1">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-amber-400 font-medium">
                {getRoleArabicTitle(currentUser.role)}
              </div>
            </div>
            <div className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-black hidden lg:inline">
              تبديل الدور
            </div>
          </button>

          {/* Logout / Switch to Auth Portal */}
          <button
            onClick={logoutUser}
            className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700/80 hover:border-red-500/40 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="تسجيل الخروج والعودة لبوابة الدخول والتسجيل"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden xl:inline">خروج / بوابة البداية</span>
          </button>
        </div>
      </div>
    </header>
  );
};
