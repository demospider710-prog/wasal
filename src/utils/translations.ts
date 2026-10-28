export type Language = 'ar' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Branding & Header
    app_title: 'روض الفرج',
    app_full_title: 'الإدارة الرقمية لروض الفرج',
    app_sub_title: 'المنظومة الرقمية الموحدة',
    republic_ministry: 'جمهورية مصر العربية — وزارة التربية والتعليم',
    academic_year_label: 'العام الدراسي: 2026 / 2027',
    accredited_env: 'بيئة تشغيل معتمدة (16 مدرسة)',
    all_schools_central: 'كل المدارس الـ16 (المركزية)',
    change_gov: 'تغيير',
    gov_modal_title: 'دليل الـ27 محافظة والإدارات التعليمية',
    
    // Quick Actions & Top Bar Tooltips
    quick_new: 'إضافة عنصر جديد',
    quick_new_desc: 'طالب، معلم، مدرسة، معاملة',
    dark_mode_on: 'التبديل إلى المظهر الفاتح',
    dark_mode_off: 'التبديل إلى المظهر الداكن',
    theme_sublabel: 'النمط اللوني للمنظومة',
    lang_toggle: 'Switch to English',
    lang_sublabel: 'English / العربية',
    onboarding_tour: 'الجولة التعريفية التفاعلية',
    onboarding_tour_desc: 'استعراض معالم المنظومة خطوة بخطوة',
    user_guide: 'دليل المستخدم ومراجع التشغيل',
    user_guide_desc: 'الكتيب الإرشادي الشامل',
    shortcuts_guide: 'دليل اختصارات لوحة المفاتيح',
    governorates_guide: 'دليل الـ27 محافظة المصرية',
    focus_mode: 'وضع القراءة والتركيز',
    focus_mode_desc: 'إخفاء القوائم وتوسيع المستندات',
    print_page: 'طباعة الصفحة / التقرير',
    notifications_center: 'مركز الإشعارات والتنبيهات',
    logout_btn: 'تسجيل الخروج والعودة لبوابة الدخول',
    switch_role: 'تبديل الصلاحية والدور',
    global_search_placeholder: 'بحث شامل عن طالب، معلم، أو مدرسة...',

    // Sidebar Navigation Groups & Items
    nav_group_admin: 'الإدارة والبيانات المدرسية',
    nav_group_learning: 'العمليات التعليمية والتقييم',
    nav_group_governance: 'الانضباط والحوكمة والابتكار',
    nav_group_system: 'التقارير وتهيئة النظام',

    nav_dashboard: 'الرئيسية ولوحة الإحصائيات',
    nav_schools: 'إدارة المدارس الـ16',
    nav_teachers: 'شؤون المدرسين',
    nav_students: 'شؤون الطلاب',
    nav_parents: 'بوابة أولياء الأمور',
    nav_attendance: 'الحضور والغياب',
    nav_assessments: 'الامتحانات والتقييمات',
    nav_correspondence: 'المراسلات الإلكترونية',
    nav_notifications: 'مركز الإشعارات والتهنئات',
    nav_discipline: 'الانضباط المدرسي والمخالفات',
    nav_complaints: 'منظومة الشكاوى والتظلمات',
    nav_governance: 'الحوكمة والقرارات المدرسية',
    nav_intellectual_property: 'الملكية الفكرية والمحتوى',
    nav_future_leaders: 'قادة المستقبل والمبادرات',
    nav_reports: 'التقارير والإحصائيات',
    nav_users_roles: 'المستخدمون والأدوار',
    nav_security_audit: 'سجل الأمان والعمليات (Audit)',
    nav_settings: 'إعدادات المنظومة',

    // Role Titles
    role_directorate_admin: 'مسؤول الإدارة التعليمية',
    role_school_principal: 'مدير مدرسة',
    role_student_affairs: 'مسؤول شؤون الطلاب',
    role_teacher: 'المدرس',
    role_student: 'الطالب',
    role_parent: 'ولي الأمر',
    role_complaints_officer: 'مسؤول الشكاوى',
    role_ip_officer: 'مسؤول الملكية الفكرية',
    role_super_admin: 'مسؤول النظام التقني',
    role_default: 'مستخدم المنظومة',

    // Academic Calendar Component
    cal_title: 'التقويم التعليمي والفعاليات المدرسية',
    cal_subtitle: 'متابعة مواعيد الامتحانات الرسمية، الإجازات، والأنشطة الأكاديمية لعام 2026/2027',
    cal_filter_all: 'كافة الفعاليات',
    cal_filter_exams: 'الامتحانات والتقييمات',
    cal_filter_holidays: 'الإجازات الرسمية',
    cal_filter_milestones: 'محطات العام الدراسي',
    cal_filter_activities: 'الأنشطة والمسابقات',
    cal_type_exam: 'امتحان رسمي',
    cal_type_holiday: 'عطلة رسمية',
    cal_type_milestone: 'محطة دراسية',
    cal_type_activity: 'فعالية مدرسية',
    cal_audience_all: 'الجميع',
    cal_audience_teachers: 'المعلمون',
    cal_audience_students: 'الطلاب',
    cal_audience_parents: 'أولياء الأمور',
    cal_audience_administrators: 'الإدارة المدرسية',
    cal_upcoming: 'الفعاليات القادمة',
    cal_all_events: 'جدول الفعاليات الزمني',
    cal_today: 'اليوم',
    cal_in_days: 'خلال {days} يوم',
    cal_days_ago: 'انقضت منذ {days} يوم',
    cal_add_event: 'إضافة فعالية للتقويم',
    cal_export_ical: 'تصدير التقويم (iCal)',
    cal_empty: 'لا توجد فعاليات مطابقة في هذا التصنيف',
    cal_important: 'هام ورسمي',

    // Common Buttons & Actions
    btn_details: 'عرض التفاصيل',
    btn_close: 'إغلاق',
    btn_save: 'حفظ',
    btn_cancel: 'إلغاء',
    btn_retry: 'إعادة المحاولة',
    btn_search: 'بحث',
    btn_filter: 'تصفية',
    btn_export: 'تصدير',
    btn_refresh: 'تحديث'
  },
  en: {
    // Branding & Header
    app_title: 'Rod El Farag',
    app_full_title: 'Rod El Farag Digital Education Administration',
    app_sub_title: 'Unified Digital Management System',
    republic_ministry: 'Arab Republic of Egypt — Ministry of Education',
    academic_year_label: 'Academic Year: 2026 / 2027',
    accredited_env: 'Accredited Operations (16 Schools)',
    all_schools_central: 'All 16 Schools (Central Directorate)',
    change_gov: 'Change',
    gov_modal_title: 'Directory of 27 Governorates & Educational Directorates',

    // Quick Actions & Top Bar Tooltips
    quick_new: 'New Item',
    quick_new_desc: 'Student, Teacher, School, Record',
    dark_mode_on: 'Switch to Light Mode',
    dark_mode_off: 'Switch to Dark Mode',
    theme_sublabel: 'Visual appearance theme',
    lang_toggle: 'التبديل إلى العربية',
    lang_sublabel: 'Arabic / English',
    onboarding_tour: 'Interactive Onboarding Tour',
    onboarding_tour_desc: 'Step-by-step guided exploration',
    user_guide: 'Comprehensive User Guide',
    user_guide_desc: 'Complete reference handbook',
    shortcuts_guide: 'Keyboard Shortcuts Cheatsheet',
    governorates_guide: 'Egypt 27 Governorates Directory',
    focus_mode: 'Focus & Reader Mode',
    focus_mode_desc: 'Hide sidebars and expand reading workspace',
    print_page: 'Print Document / Report',
    notifications_center: 'Notifications & Alerts Hub',
    logout_btn: 'Sign Out & Return to Portal',
    switch_role: 'Switch Role & Permissions',
    global_search_placeholder: 'Global search for students, teachers, or schools...',

    // Sidebar Navigation Groups & Items
    nav_group_admin: 'Administration & School Data',
    nav_group_learning: 'Educational Operations & Assessment',
    nav_group_governance: 'Discipline, Governance & Innovation',
    nav_group_system: 'Reports & System Configuration',

    nav_dashboard: 'Overview & Statistics Dashboard',
    nav_schools: '16 Schools Directory',
    nav_teachers: 'Teacher Affairs',
    nav_students: 'Student Affairs',
    nav_parents: 'Parents Portal',
    nav_attendance: 'Attendance & Absence',
    nav_assessments: 'Exams & Assessments',
    nav_correspondence: 'Official Correspondence',
    nav_notifications: 'Notifications & Announcements',
    nav_discipline: 'School Discipline & Violations',
    nav_complaints: 'Grievances & Complaints Hub',
    nav_governance: 'Governance & Ministerial Bylaws',
    nav_intellectual_property: 'Intellectual Property & Content',
    nav_future_leaders: 'Future Leaders & Initiatives',
    nav_reports: 'Statistical Reports & Analytics',
    nav_users_roles: 'Users & Roles Management',
    nav_security_audit: 'Security Audit & Operation Logs',
    nav_settings: 'System Configuration',

    // Role Titles
    role_directorate_admin: 'Directorate Administrator',
    role_school_principal: 'School Principal',
    role_student_affairs: 'Student Affairs Officer',
    role_teacher: 'Teacher',
    role_student: 'Student',
    role_parent: 'Parent / Guardian',
    role_complaints_officer: 'Complaints Officer',
    role_ip_officer: 'IP & Copyright Officer',
    role_super_admin: 'Technical Super Admin',
    role_default: 'System User',

    // Academic Calendar Component
    cal_title: 'Academic Calendar & School Events',
    cal_subtitle: 'Official examination dates, national holidays, and school activities for 2026/2027',
    cal_filter_all: 'All Events',
    cal_filter_exams: 'Exams & Tests',
    cal_filter_holidays: 'Official Holidays',
    cal_filter_milestones: 'Academic Milestones',
    cal_filter_activities: 'School Activities',
    cal_type_exam: 'Official Exam',
    cal_type_holiday: 'Public Holiday',
    cal_type_milestone: 'Term Milestone',
    cal_type_activity: 'School Activity',
    cal_audience_all: 'All',
    cal_audience_teachers: 'Teachers',
    cal_audience_students: 'Students',
    cal_audience_parents: 'Parents',
    cal_audience_administrators: 'Administrators',
    cal_upcoming: 'Upcoming Highlights',
    cal_all_events: 'Chronological Timeline',
    cal_today: 'Today',
    cal_in_days: 'In {days} days',
    cal_days_ago: '{days} days ago',
    cal_add_event: 'Add Event to Calendar',
    cal_export_ical: 'Export Calendar (iCal)',
    cal_empty: 'No events match the selected category',
    cal_important: 'Important & Official',

    // Common Buttons & Actions
    btn_details: 'View Details',
    btn_close: 'Close',
    btn_save: 'Save',
    btn_cancel: 'Cancel',
    btn_retry: 'Retry',
    btn_search: 'Search',
    btn_filter: 'Filter',
    btn_export: 'Export',
    btn_refresh: 'Refresh'
  }
};

/**
 * Translation helper function
 */
export function translate(lang: Language, key: string, fallback?: string): string {
  const dictionary = translations[lang] || translations.ar;
  if (dictionary[key]) {
    return dictionary[key];
  }
  // Try fallback in Arabic if not found in English
  if (translations.ar[key]) {
    return translations.ar[key];
  }
  return fallback || key;
}
