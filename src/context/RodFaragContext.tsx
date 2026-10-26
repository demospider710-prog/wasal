import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  UserProfile,
  UserRole,
  School,
  Teacher,
  Student,
  Parent,
  AttendanceRecord,
  Assessment,
  Correspondence,
  NotificationItem,
  DisciplineIncident,
  Complaint,
  SchoolGovernanceDoc,
  IntellectualPropertyAsset,
  FutureLeaderInitiative,
  AuditLogEntry,
  SystemSettings
} from '../types';
import {
  INITIAL_SCHOOLS,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_PARENTS,
  INITIAL_ATTENDANCE,
  INITIAL_ASSESSMENTS,
  INITIAL_CORRESPONDENCE,
  INITIAL_NOTIFICATIONS,
  INITIAL_DISCIPLINE,
  INITIAL_COMPLAINTS,
  INITIAL_GOVERNANCE_DOCS,
  INITIAL_IP_ASSETS,
  INITIAL_LEADERS,
  DEMO_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SETTINGS
} from '../data/seedData';
import {
  EGYPT_27_GOVERNORATES,
  Governorate,
  EducationalDirectorate
} from '../data/governoratesData';
import {
  canAccessSchool,
  canViewStudent,
  canPublishAssessment,
  validateDisciplineSanction,
  canManageComplaint,
  createAuditLog
} from '../utils/rod-farag-logic';
import {
  AccountCategory,
  RegistrationPayload,
  SchoolAdditionRequest
} from '../types/auth';
import {
  validateRegistrationPayload,
  createSchoolAdditionRequest
} from '../utils/registration-logic';

export type SectionKey =
  | 'dashboard'
  | 'schools'
  | 'teachers'
  | 'students'
  | 'parents'
  | 'attendance'
  | 'assessments'
  | 'correspondence'
  | 'notifications'
  | 'discipline'
  | 'complaints'
  | 'governance'
  | 'intellectual_property'
  | 'future_leaders'
  | 'reports'
  | 'users_roles'
  | 'security_audit'
  | 'settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface RodFaragContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchRole: (role: UserRole) => void;
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
  selectedSchoolFilter: string; // 'all' or schoolId
  setSelectedSchoolFilter: (schoolId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // 27 Governorates & Directorates
  governorates: Governorate[];
  selectedGovernorateId: string;
  setSelectedGovernorateId: (id: string) => void;
  selectedDirectorateId: string;
  setSelectedDirectorateId: (id: string) => void;
  activeGovernorate: Governorate;
  activeDirectorate?: EducationalDirectorate;
  availableDirectorates: EducationalDirectorate[];
  selectGovernorateAndDirectorate: (govId: string, dirId: string) => void;
  isGovModalOpen: boolean;
  setIsGovModalOpen: (open: boolean) => void;
  
  // Data stores
  schools: School[];
  teachers: Teacher[];
  students: Student[];
  parents: Parent[];
  attendance: AttendanceRecord[];
  assessments: Assessment[];
  correspondence: Correspondence[];
  notifications: NotificationItem[];
  discipline: DisciplineIncident[];
  complaints: Complaint[];
  governanceDocs: SchoolGovernanceDoc[];
  ipAssets: IntellectualPropertyAsset[];
  futureLeaders: FutureLeaderInitiative[];
  auditLogs: AuditLogEntry[];
  settings: SystemSettings;
  demoUsers: UserProfile[];
  
  // Actions
  addSchool: (school: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSchool: (id: string, updates: Partial<School>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  recordAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  
  // Assessments
  createAssessment: (assessment: Omit<Assessment, 'id'>) => void;
  approveAssessment: (id: string) => { success: boolean; error?: string };
  publishAssessment: (id: string) => { success: boolean; error?: string };
  
  // Correspondence
  createCorrespondence: (item: Omit<Correspondence, 'id' | 'auditTrail'>) => void;
  updateCorrespondenceStatus: (id: string, newStatus: Correspondence['status']) => void;
  replyToCorrespondence: (id: string, replyText: string) => void;
  
  // Notifications
  broadcastNotification: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'sentBy'>) => void;
  
  // Discipline
  reportDisciplineIncident: (incident: Omit<DisciplineIncident, 'id' | 'incidentNumber'>) => void;
  updateDisciplineHearing: (id: string, hearingStatus: DisciplineIncident['hearingStatus']) => void;
  approveDisciplineDecision: (id: string, sanctionText: string) => { success: boolean; error?: string };
  
  // Complaints
  submitComplaint: (complaint: Omit<Complaint, 'id' | 'trackingCode' | 'submittedDate' | 'status'>) => string;
  updateComplaintStatus: (id: string, status: Complaint['status'], officialResponse?: string) => void;
  
  // Intellectual Property
  registerIpAsset: (asset: Omit<IntellectualPropertyAsset, 'id' | 'createdDate' | 'infringementReportsCount'>) => void;
  reportIpInfringement: (id: string, reportNote: string) => void;
  
  // Future Leaders
  submitLeaderInitiative: (initiative: Omit<FutureLeaderInitiative, 'id' | 'submissionDate'>) => void;
  updateLeaderStage: (id: string, stage: FutureLeaderInitiative['stage'], award?: string) => void;
  
  // System & Settings
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  resetAllDemoData: () => void;
  exportDatabaseJSON: () => void;
  
  // Authentication & Onboarding
  isLoggedIn: boolean;
  showAuthPortal: boolean;
  setShowAuthPortal: (show: boolean) => void;
  authPortalTab: 'landing' | 'login' | 'register' | 'verify';
  setAuthPortalTab: (tab: 'landing' | 'login' | 'register' | 'verify') => void;
  loginUser: (user: UserProfile) => void;
  logoutUser: () => void;
  schoolAdditionRequests: SchoolAdditionRequest[];
  addSchoolAdditionRequest: (data: Omit<SchoolAdditionRequest, 'id' | 'trackingNumber' | 'createdAt' | 'status'>) => SchoolAdditionRequest;
  registerUserAccount: (payload: RegistrationPayload) => { success: boolean; user?: UserProfile; errors?: string[] };

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const RodFaragContext = createContext<RodFaragContextType | undefined>(undefined);

const STORAGE_PREFIX = 'rod_farag_edu_v1_';

export const RodFaragProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Active User & Section
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    return DEMO_USERS[0]; // Default: Directorate General Admin
  });
  const [activeSection, setActiveSection] = useState<SectionKey>('dashboard');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 27 Governorates & Directorates
  const [selectedGovernorateId, setSelectedGovernorateId] = useState<string>('cairo');
  const [selectedDirectorateId, setSelectedDirectorateId] = useState<string>('cairo_rodelgard');
  const [isGovModalOpen, setIsGovModalOpen] = useState<boolean>(false);

  // Authentication & Smart Multi-Level Onboarding
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}isLoggedIn`) === 'true';
  });
  const [showAuthPortal, setShowAuthPortal] = useState<boolean>(() => {
    return localStorage.getItem(`${STORAGE_PREFIX}isLoggedIn`) !== 'true';
  });
  const [authPortalTab, setAuthPortalTab] = useState<'landing' | 'login' | 'register' | 'verify'>('landing');

  const [schoolAdditionRequests, setSchoolAdditionRequests] = useState<SchoolAdditionRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}school_addition_requests`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'req-sample-1',
        trackingNumber: 'RDF-REQ-2026-8104',
        schoolName: 'مدرسة روض الفرج للغات الحديثة التجريبية',
        governorateId: 'cairo',
        governorateName: 'محافظة القاهرة',
        directorateId: 'cairo_rodelgard',
        directorateName: 'إدارة روض الفرج التعليمية',
        stage: 'secondary',
        stageNameAr: 'المرحلة الثانوية',
        educationType: 'تجريبي لغات رسمية',
        address: 'شارع شبرا الرئيسي، روض الفرج',
        ministerialDecreeNumber: 'قرار وزاري 341 لسنة 2024',
        requesterName: 'د. عادل توفيق غطاس',
        requesterPhone: '01012348899',
        requesterRole: 'مدير مدرسة تحت الاعتماد',
        notes: 'مبنى مستوفٍ لكافة اشتراطات هيئة الأبنية التعليمية',
        status: 'pending_audit',
        createdAt: '2026-10-18T10:00:00.000Z'
      }
    ];
  });

  const activeGovernorate = useMemo(() => {
    return EGYPT_27_GOVERNORATES.find(g => g.id === selectedGovernorateId) || EGYPT_27_GOVERNORATES[0];
  }, [selectedGovernorateId]);

  const availableDirectorates = useMemo(() => {
    return activeGovernorate.directorates;
  }, [activeGovernorate]);

  const activeDirectorate = useMemo(() => {
    return availableDirectorates.find(d => d.id === selectedDirectorateId) || availableDirectorates[0];
  }, [availableDirectorates, selectedDirectorateId]);

  const selectGovernorateAndDirectorate = (govId: string, dirId: string) => {
    setSelectedGovernorateId(govId);
    setSelectedDirectorateId(dirId);
    const targetGov = EGYPT_27_GOVERNORATES.find(g => g.id === govId);
    const targetDir = targetGov?.directorates.find(d => d.id === dirId);
    addToast(`تم الانتقال إلى ${targetGov?.name || ''} — ${targetDir?.name || ''}`, 'info');
  };

  // State Stores with initial seed
  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}schools`);
    return saved ? JSON.parse(saved) : INITIAL_SCHOOLS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}teachers`);
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [parents, setParents] = useState<Parent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}parents`);
    return saved ? JSON.parse(saved) : INITIAL_PARENTS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}attendance`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [assessments, setAssessments] = useState<Assessment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}assessments`);
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS;
  });

  const [correspondence, setCorrespondence] = useState<Correspondence[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}correspondence`);
    return saved ? JSON.parse(saved) : INITIAL_CORRESPONDENCE;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [discipline, setDiscipline] = useState<DisciplineIncident[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}discipline`);
    return saved ? JSON.parse(saved) : INITIAL_DISCIPLINE;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}complaints`);
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [governanceDocs] = useState<SchoolGovernanceDoc[]>(INITIAL_GOVERNANCE_DOCS);

  const [ipAssets, setIpAssets] = useState<IntellectualPropertyAsset[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}ipAssets`);
    return saved ? JSON.parse(saved) : INITIAL_IP_ASSETS;
  });

  const [futureLeaders, setFutureLeaders] = useState<FutureLeaderInitiative[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}futureLeaders`);
    return saved ? JSON.parse(saved) : INITIAL_LEADERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}auditLogs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}schools`, JSON.stringify(schools));
      localStorage.setItem(`${STORAGE_PREFIX}teachers`, JSON.stringify(teachers));
      localStorage.setItem(`${STORAGE_PREFIX}students`, JSON.stringify(students));
      localStorage.setItem(`${STORAGE_PREFIX}parents`, JSON.stringify(parents));
      localStorage.setItem(`${STORAGE_PREFIX}attendance`, JSON.stringify(attendance));
      localStorage.setItem(`${STORAGE_PREFIX}assessments`, JSON.stringify(assessments));
      localStorage.setItem(`${STORAGE_PREFIX}correspondence`, JSON.stringify(correspondence));
      localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_PREFIX}discipline`, JSON.stringify(discipline));
      localStorage.setItem(`${STORAGE_PREFIX}complaints`, JSON.stringify(complaints));
      localStorage.setItem(`${STORAGE_PREFIX}ipAssets`, JSON.stringify(ipAssets));
      localStorage.setItem(`${STORAGE_PREFIX}futureLeaders`, JSON.stringify(futureLeaders));
      localStorage.setItem(`${STORAGE_PREFIX}auditLogs`, JSON.stringify(auditLogs));
      localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(settings));
    } catch {
      // Storage quota or sandboxed fallback
    }
  }, [schools, teachers, students, parents, attendance, assessments, correspondence, notifications, discipline, complaints, ipAssets, futureLeaders, auditLogs, settings]);

  // Toast Helper
  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Audit Log Helper
  const recordAudit = (action: string, targetResource: string, details: string) => {
    const log = createAuditLog(currentUser, action, targetResource, details);
    setAuditLogs(prev => [log, ...prev]);
  };

  // Role Switcher Helper
  const switchRole = (role: UserRole) => {
    const targetUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setCurrentUser(targetUser);
    // If user is scoped to a school, auto set selectedSchoolFilter to their school
    if (targetUser.schoolId) {
      setSelectedSchoolFilter(targetUser.schoolId);
    } else {
      setSelectedSchoolFilter('all');
    }
    recordAudit('تبديل جلسة المستخدم والصلاحية', `User/${targetUser.id}`, `تم التحويل إلى دور: ${role}`);
    addToast(`تم تفعيل دور: ${targetUser.name}`, 'info');
  };

  // Action: Add / Update School
  const addSchool = (schoolData: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (currentUser.role !== 'directorate_admin' && currentUser.role !== 'super_admin') {
      addToast('عذراً، فقط إدارة روض الفرج التعليمية تملك صلاحية إضافة المدارس', 'error');
      return;
    }
    const newId = `sch-${String(schools.length + 1).padStart(2, '0')}`;
    const now = new Date().toISOString().split('T')[0];
    const newSchool: School = {
      ...schoolData,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    setSchools(prev => [...prev, newSchool]);
    recordAudit('إضافة مدرسة جديدة', `School/${newId}`, `تم تسجيل المدرسة: ${newSchool.name} بكود ${newSchool.code}`);
    addToast(`تمت إضافة ${newSchool.name} بنجاح`);
  };

  const updateSchool = (id: string, updates: Partial<School>) => {
    if (currentUser.role !== 'directorate_admin' && currentUser.role !== 'super_admin') {
      addToast('عذراً، ليس لديك صلاحية تعديل بيانات المدرسة الرسمية', 'error');
      return;
    }
    const now = new Date().toISOString().split('T')[0];
    setSchools(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: now } : s));
    recordAudit('تحديث بيانات مدرسة', `School/${id}`, `تعديل السجل للمدرسة: ${id}`);
    addToast('تم تحديث بيانات المدرسة بنجاح');
  };

  // Action: Add / Update Teacher
  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newId = `tch-${String(teachers.length + 1).padStart(2, '0')}`;
    const newTeacher: Teacher = { ...teacherData, id: newId };
    setTeachers(prev => [newTeacher, ...prev]);
    recordAudit('تسجيل معلم جديد', `Teacher/${newId}`, `تم إضافة ${newTeacher.name} - تخصص ${newTeacher.subject}`);
    addToast(`تم تسجيل المعلم: ${newTeacher.name}`);
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    recordAudit('تعديل ملف معلم', `Teacher/${id}`, `تحديث البيانات الوظيفية`);
    addToast('تم تعديل بيانات المعلم');
  };

  // Action: Add / Update Student
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newId = `stu-${Date.now()}`;
    const newStudent: Student = { ...studentData, id: newId };
    setStudents(prev => [newStudent, ...prev]);
    recordAudit('تسجيل ملف طالب', `Student/${newId}`, `إضافة الطالب: ${newStudent.name} (${newStudent.grade})`);
    addToast(`تم إضافة الطالب: ${newStudent.name}`);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    recordAudit('تحديث ملف طالب', `Student/${id}`, `تحديث البيانات الأكاديمية`);
    addToast('تم تحديث بيانات الطالب');
  };

  // Action: Attendance
  const recordAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newId = `att-${Date.now()}`;
    const newRecord: AttendanceRecord = { ...recordData, id: newId };
    setAttendance(prev => [newRecord, ...prev]);
    recordAudit('تسجيل الحضور اليومي', `Attendance/${newId}`, `تسجيل حضور فصل ${newRecord.classroom} - ${newRecord.schoolName}`);
    addToast('تم حفظ واعتماد سجل الحضور بنجاح');
  };

  // Action: Assessments
  const createAssessment = (assessmentData: Omit<Assessment, 'id'>) => {
    const newId = `asm-${Date.now()}`;
    const newAssessment: Assessment = { ...assessmentData, id: newId };
    setAssessments(prev => [newAssessment, ...prev]);
    recordAudit('إنشاء تقييم دراسي', `Assessment/${newId}`, `إنشاء تقييم ${newAssessment.title}`);
    addToast('تم حفظ التقييم بانتظار المراجعة والاعتماد');
  };

  const approveAssessment = (id: string): { success: boolean; error?: string } => {
    if (!['super_admin', 'directorate_admin', 'school_principal'].includes(currentUser.role)) {
      return { success: false, error: 'فقط الإدارة التعليمية أو مدير المدرسة يملك صلاحية الاعتماد' };
    }
    const target = assessments.find(a => a.id === id);
    if (!target) return { success: false, error: 'التقييم غير موجود' };

    const now = new Date().toLocaleString('ar-EG');
    setAssessments(prev => prev.map(a => a.id === id ? {
      ...a,
      status: 'approved',
      approvedBy: `${currentUser.name} (${currentUser.role === 'directorate_admin' ? 'الإدارة التعليمية' : 'مدير المدرسة'})`,
      approvedAt: now
    } : a));
    recordAudit('اعتماد نتائج تقييم', `Assessment/${id}`, `تم اعتماد نتائج ${target.title}`);
    addToast('تم اعتماد نتيجة التقييم بنجاح، وأصبحت جاهزة للنشر');
    return { success: true };
  };

  const publishAssessment = (id: string): { success: boolean; error?: string } => {
    const target = assessments.find(a => a.id === id);
    if (!target) return { success: false, error: 'التقييم غير موجود' };
    const check = canPublishAssessment(currentUser, target);
    if (!check.allowed) {
      addToast(check.reason || 'غير مسموح بالنشر', 'error');
      return { success: false, error: check.reason };
    }
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, status: 'published' } : a));
    recordAudit('نشر نتائج دراسية', `Assessment/${id}`, `تم نشر نتائج ${target.title} للطلاب وأولياء الأمور`);
    addToast('تم نشر النتيجة رسمياً وأصبحت متاحة في بوابات أولياء الأمور والطلاب');
    return { success: true };
  };

  // Action: Correspondence
  const createCorrespondence = (itemData: Omit<Correspondence, 'id' | 'auditTrail'>) => {
    const newId = `cor-${Date.now()}`;
    const now = new Date().toLocaleString('ar-EG');
    const newItem: Correspondence = {
      ...itemData,
      id: newId,
      auditTrail: [
        { action: 'إنشاء وتوجيه المراسلة', actor: currentUser.name, timestamp: now }
      ]
    };
    setCorrespondence(prev => [newItem, ...prev]);
    recordAudit('إصدار مراسلة إلكترونية رسمية', `Correspondence/${newId}`, `صادر رقم ${newItem.outwardNumber} - ${newItem.subject}`);
    addToast('تم إرسال المراسلة بنجاح إلى الجهات المعنية');
  };

  const updateCorrespondenceStatus = (id: string, newStatus: Correspondence['status']) => {
    const now = new Date().toLocaleString('ar-EG');
    setCorrespondence(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          auditTrail: [
            ...c.auditTrail,
            { action: `تحديث الحالة إلى: ${newStatus}`, actor: currentUser.name, timestamp: now }
          ]
        };
      }
      return c;
    }));
    recordAudit('تحديث حالة مراسلة', `Correspondence/${id}`, `تغيير الحالة إلى ${newStatus}`);
    addToast('تم تحديث حالة المراسلة');
  };

  const replyToCorrespondence = (id: string, replyText: string) => {
    const now = new Date().toLocaleString('ar-EG');
    setCorrespondence(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: 'replied',
          schoolReply: {
            schoolId: currentUser.schoolId || 'sch-01',
            repliedBy: currentUser.name,
            repliedAt: now,
            replyText
          },
          auditTrail: [
            ...c.auditTrail,
            { action: 'تسجيل الرد الرسمي من المدرسة', actor: currentUser.name, timestamp: now }
          ]
        };
      }
      return c;
    }));
    recordAudit('الرد على مكاتبة رسمية', `Correspondence/${id}`, `تسجيل رد من ${currentUser.name}`);
    addToast('تم إرسال الرد الرسمي للإدارة التعليمية');
  };

  // Action: Notification
  const broadcastNotification = (itemData: Omit<NotificationItem, 'id' | 'createdAt' | 'sentBy'>) => {
    const newId = `notif-${Date.now()}`;
    const now = new Date().toLocaleString('ar-EG');
    const newItem: NotificationItem = {
      ...itemData,
      id: newId,
      createdAt: now,
      sentBy: currentUser.name,
      deliveryStatus: 'delivered',
      readCount: 0
    };
    setNotifications(prev => [newItem, ...prev]);
    recordAudit('بث إشعار / تهنئة', `Notification/${newId}`, `عنوان: ${newItem.title}`);
    addToast('تم بث الإشعار بنجاح في المنظومة');
  };

  // Action: Discipline
  const reportDisciplineIncident = (incidentData: Omit<DisciplineIncident, 'id' | 'incidentNumber'>) => {
    const newId = `inc-${Date.now()}`;
    const incidentNumber = `RDF-DISC-2026-${String(discipline.length + 1).padStart(3, '0')}`;
    const newIncident: DisciplineIncident = {
      ...incidentData,
      id: newId,
      incidentNumber,
      status: 'under_investigation',
      hearingStatus: 'scheduled'
    };
    setDiscipline(prev => [newIncident, ...prev]);
    recordAudit('توثيق واقعة انضباط مدرسي', `Discipline/${newId}`, `تسجيل واقعة ${incidentNumber} في مدرسة ${newIncident.schoolName}`);
    addToast(`تم توثيق الواقعة برقم: ${incidentNumber} وإحالتها للتحقيق وسماع الأطراف`);
  };

  const updateDisciplineHearing = (id: string, hearingStatus: DisciplineIncident['hearingStatus']) => {
    setDiscipline(prev => prev.map(inc => inc.id === id ? { ...inc, hearingStatus } : inc));
    recordAudit('تحديث جلسة استماع انضباط', `Discipline/${id}`, `تحديث حالة الاستماع إلى: ${hearingStatus}`);
    addToast('تم تحديث مجريات جلسة الاستماع وسماع الأقوال');
  };

  const approveDisciplineDecision = (id: string, sanctionText: string): { success: boolean; error?: string } => {
    const target = discipline.find(d => d.id === id);
    if (!target) return { success: false, error: 'الواقعة غير موجودة' };

    const validation = validateDisciplineSanction(target, sanctionText, currentUser);
    if (!validation.valid) {
      addToast(validation.reason || 'غير مسموح باعتماد القرار', 'error');
      return { success: false, error: validation.reason };
    }

    const now = new Date().toISOString().split('T')[0];
    setDiscipline(prev => prev.map(inc => inc.id === id ? {
      ...inc,
      status: 'decision_approved',
      approvedSanction: sanctionText,
      closedDate: now
    } : inc));
    recordAudit('اعتماد قرار انضباط مدرسي', `Discipline/${id}`, `اعتماد قرار رسمي بحق الواقعة ${target.incidentNumber}`);
    addToast('تم اعتماد القرار وتوثيقه مع إتاحة حق التظلم القانوني');
    return { success: true };
  };

  // Action: Complaints
  const submitComplaint = (complaintData: Omit<Complaint, 'id' | 'trackingCode' | 'submittedDate' | 'status'>): string => {
    const newId = `cmp-${Date.now()}`;
    const trackingCode = `RDF-CMP-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString().split('T')[0];
    const newComplaint: Complaint = {
      ...complaintData,
      id: newId,
      trackingCode,
      submittedDate: now,
      status: 'new'
    };
    setComplaints(prev => [newComplaint, ...prev]);
    recordAudit('تقديم شكوى / تظلم سري', `Complaint/${newId}`, `تقديم شكوى بكود متابعة: ${trackingCode}`);
    addToast(`تم إرسال الشكوى بنجاح. كود المتابعة السري هو: ${trackingCode}`);
    return trackingCode;
  };

  const updateComplaintStatus = (id: string, status: Complaint['status'], officialResponse?: string) => {
    const target = complaints.find(c => c.id === id);
    if (!target) return;
    if (!canManageComplaint(currentUser, target)) {
      addToast('عذراً، لا تملك صلاحية إدارة هذه الشكوى لحماية السرية ومنع تضارب المصالح', 'error');
      return;
    }

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          ...(officialResponse ? { officialResponse } : {})
        };
      }
      return c;
    }));
    recordAudit('تحديث حالة الشكوى', `Complaint/${id}`, `تحديث الحالة إلى ${status}`);
    addToast('تم تحديث حالة الشكوى وتسجيل القرار');
  };

  // Action: Intellectual Property
  const registerIpAsset = (assetData: Omit<IntellectualPropertyAsset, 'id' | 'createdDate' | 'infringementReportsCount'>) => {
    const newId = `ip-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newAsset: IntellectualPropertyAsset = {
      ...assetData,
      id: newId,
      createdDate: now,
      infringementReportsCount: 0
    };
    setIpAssets(prev => [newAsset, ...prev]);
    recordAudit('إيداع مصنف ملكية فكرية', `IPAsset/${newId}`, `تسجيل مصنف: ${newAsset.title} باسم: ${newAsset.ownerName}`);
    addToast('تم إيداع المصنف التعليمي بنجاح وخضوعه للمراجعة الفنية');
  };

  const reportIpInfringement = (id: string, reportNote: string) => {
    setIpAssets(prev => prev.map(a => a.id === id ? {
      ...a,
      infringementReportsCount: a.infringementReportsCount + 1,
      verificationStatus: 'claim_pending'
    } : a));
    recordAudit('تقديم بلاغ انتهاك ملكية فكرية', `IPAsset/${id}`, `بلاغ: ${reportNote}`);
    addToast('تم استقبال بلاغ الانتهاك وتحويله لمسؤول الملكية الفكرية للفحص القانوني', 'warning');
  };

  // Action: Future Leaders
  const submitLeaderInitiative = (initiativeData: Omit<FutureLeaderInitiative, 'id' | 'submissionDate'>) => {
    const newId = `ldr-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newInitiative: FutureLeaderInitiative = {
      ...initiativeData,
      id: newId,
      submissionDate: now
    };
    setFutureLeaders(prev => [newInitiative, ...prev]);
    recordAudit('تقديم مبادرة قيادة طلابية', `LeaderInitiative/${newId}`, `تقديم مبادرة ${newInitiative.title}`);
    addToast('تم تقديم المبادرة لقادة المستقبل بنجاح');
  };

  const updateLeaderStage = (id: string, stage: FutureLeaderInitiative['stage'], award?: string) => {
    const now = new Date().toISOString().split('T')[0];
    setFutureLeaders(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          stage,
          ...(award ? { awards: [...l.awards, award] } : {}),
          ...(stage === 'completed' ? { completionDate: now } : {})
        };
      }
      return l;
    }));
    recordAudit('تحديث مرحلة مبادرة طلابية', `LeaderInitiative/${id}`, `نقل المبادرة إلى مرحلة: ${stage}`);
    addToast('تم تحديث مرحلة المبادرة');
  };

  // Action: System Settings & Reset
  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    if (currentUser.role !== 'super_admin' && currentUser.role !== 'directorate_admin') {
      addToast('عذراً، فقط مسؤول النظام يملك صلاحية تغيير الإعدادات العامة', 'error');
      return;
    }
    setSettings(prev => ({ ...prev, ...newSettings }));
    recordAudit('تحديث إعدادات النظام', 'System/Settings', 'تعديل الإعدادات والخيارات العامة');
    addToast('تم حفظ إعدادات النظام بنجاح');
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setSchools(INITIAL_SCHOOLS);
    setTeachers(INITIAL_TEACHERS);
    setStudents(INITIAL_STUDENTS);
    setParents(INITIAL_PARENTS);
    setAttendance(INITIAL_ATTENDANCE);
    setAssessments(INITIAL_ASSESSMENTS);
    setCorrespondence(INITIAL_CORRESPONDENCE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setDiscipline(INITIAL_DISCIPLINE);
    setComplaints(INITIAL_COMPLAINTS);
    setIpAssets(INITIAL_IP_ASSETS);
    setFutureLeaders(INITIAL_LEADERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSettings(INITIAL_SETTINGS);
    setCurrentUser(DEMO_USERS[0]);
    setSelectedSchoolFilter('all');
    addToast('تم استعادة البيانات التجريبية الافتراضية بنجاح', 'info');
  };

  const exportDatabaseJSON = () => {
    const payload = {
      exportTimestamp: new Date().toISOString(),
      directorate: 'إدارة روض الفرج التعليمية',
      schools,
      teachers,
      students,
      parents,
      attendance,
      assessments,
      correspondence,
      notifications,
      discipline,
      complaints,
      ipAssets,
      futureLeaders,
      settings
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rod_El_Farag_Education_Data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('تم تصدير نسخة احتياطية من قاعدة البيانات بصيغة JSON');
  };

  // Auth & Onboarding Handlers
  const loginUser = (user: UserProfile) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowAuthPortal(false);
    localStorage.setItem(`${STORAGE_PREFIX}isLoggedIn`, 'true');
    recordAudit('تسجيل دخول ناجح للمنظومة', `User/${user.id}`, `دخول بصلاحية: ${user.role} - ${user.name}`);
    addToast(`مرحبًا بك، ${user.name} في منصة الإدارة الرقمية`, 'success');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setShowAuthPortal(true);
    setAuthPortalTab('landing');
    localStorage.setItem(`${STORAGE_PREFIX}isLoggedIn`, 'false');
    addToast('تم تسجيل الخروج بنجاح من المنظومة', 'info');
  };

  const addSchoolAdditionRequest = (data: Omit<SchoolAdditionRequest, 'id' | 'trackingNumber' | 'createdAt' | 'status'>): SchoolAdditionRequest => {
    const newReq = createSchoolAdditionRequest(data);
    setSchoolAdditionRequests(prev => {
      const updated = [newReq, ...prev];
      localStorage.setItem(`${STORAGE_PREFIX}school_addition_requests`, JSON.stringify(updated));
      return updated;
    });
    recordAudit('تقديم طلب اعتماد مدرسة جديدة', `SchoolRequest/${newReq.trackingNumber}`, `طلب اعتماد: ${newReq.schoolName}`);
    addToast(`تم إرسال طلب اعتماد المدرسة بنجاح برقم متابعة: ${newReq.trackingNumber}`, 'success');
    return newReq;
  };

  const registerUserAccount = (payload: RegistrationPayload): { success: boolean; user?: UserProfile; errors?: string[] } => {
    const validation = validateRegistrationPayload(payload);
    if (!validation.valid) {
      validation.errors.forEach(err => addToast(err, 'error'));
      return { success: false, errors: validation.errors };
    }

    let assignedRole: UserRole = 'student';
    if (payload.category === 'teacher_staff') {
      assignedRole = payload.jobTitle?.includes('مدير مدرسة') ? 'school_principal' : 
                     payload.jobTitle?.includes('شؤون طلاب') ? 'student_affairs' : 'teacher';
    } else if (payload.category === 'student') {
      assignedRole = 'student';
    } else if (payload.category === 'parent') {
      assignedRole = 'parent';
    } else if (payload.category === 'directorate_leader') {
      assignedRole = payload.adminClearanceLevel?.includes('مدير مدرسة') ? 'school_principal' : 'directorate_admin';
    }

    const newUserId = `u-${Date.now().toString(36)}`;
    const newUser: UserProfile = {
      id: newUserId,
      name: payload.fullName,
      email: payload.email || `${payload.username}@rodelgard.edu.eg`,
      role: assignedRole,
      schoolId: payload.schoolId,
      phone: payload.mobile,
      nationalIdMasked: payload.nationalId ? `${payload.nationalId.slice(0, 3)}********${payload.nationalId.slice(-3)}` : undefined
    };

    if (payload.category === 'teacher_staff') {
      const newTeacher: Teacher = {
        id: `tea-${Date.now()}`,
        internalCode: payload.staffCode || `T-${Math.floor(1000 + Math.random() * 9000)}`,
        name: payload.fullName,
        schoolId: payload.schoolId,
        schoolName: payload.schoolName,
        subject: payload.specialization || 'المادة العامة',
        assignedClasses: ['الصف الأول', 'الصف الثاني'],
        email: newUser.email,
        phone: payload.mobile,
        employmentStatus: 'active',
        hireDate: new Date().toISOString().split('T')[0],
        evaluationScore: 92,
        notes: `مسجل حديثاً - ${payload.jobTitle || 'معلم'}`
      };
      setTeachers(prev => [newTeacher, ...prev]);
    } else if (payload.category === 'student') {
      const newStudent: Student = {
        id: `stu-${Date.now()}`,
        internalCode: payload.studentCode || `STU-${Math.floor(10000 + Math.random() * 90000)}`,
        name: payload.fullName,
        schoolId: payload.schoolId,
        schoolName: payload.schoolName,
        grade: payload.grade || 'الأول الثانوي',
        classroom: payload.classroom || '1/1',
        parentId: 'parent-pending',
        parentName: 'ولي الأمر المسجل',
        parentPhone: payload.parentPhone || payload.mobile,
        attendanceRate: 100,
        generalAverage: 88,
        status: 'enrolled',
        emergencyContact: payload.parentPhone || payload.mobile,
        achievementsCount: 0
      };
      setStudents(prev => [newStudent, ...prev]);
    } else if (payload.category === 'parent') {
      const newParent: Parent = {
        id: `par-${Date.now()}`,
        name: payload.fullName,
        phone: payload.mobile,
        nationalIdMasked: payload.nationalId ? `${payload.nationalId.slice(0, 3)}********${payload.nationalId.slice(-3)}` : undefined,
        childrenIds: [payload.linkedStudentIdentifier || 'stu-101'],
        childrenNames: ['الطالب التابع بالمنظومة'],
        activeFollowUpsCount: 1
      };
      setParents(prev => [newParent, ...prev]);
    }

    loginUser(newUser);
    recordAudit('تسجيل حساب جديد بالمنظومة', `User/${newUserId}`, `تم إنشاء حساب ${payload.fullName} بدور ${assignedRole}`);
    addToast(`تم اعتماد وتسجيل الحساب بنجاح! مرحبًا بك ${payload.fullName}`, 'success');

    return { success: true, user: newUser };
  };

  const value = useMemo(() => ({
    currentUser,
    setCurrentUser,
    switchRole,
    activeSection,
    setActiveSection,
    selectedSchoolFilter,
    setSelectedSchoolFilter,
    searchQuery,
    setSearchQuery,
    schools,
    teachers,
    students,
    parents,
    attendance,
    assessments,
    correspondence,
    notifications,
    discipline,
    complaints,
    governanceDocs,
    ipAssets,
    futureLeaders,
    auditLogs,
    settings,
    demoUsers: DEMO_USERS,
    addSchool,
    updateSchool,
    addTeacher,
    updateTeacher,
    addStudent,
    updateStudent,
    recordAttendance,
    createAssessment,
    approveAssessment,
    publishAssessment,
    createCorrespondence,
    updateCorrespondenceStatus,
    replyToCorrespondence,
    broadcastNotification,
    reportDisciplineIncident,
    updateDisciplineHearing,
    approveDisciplineDecision,
    submitComplaint,
    updateComplaintStatus,
    registerIpAsset,
    reportIpInfringement,
    submitLeaderInitiative,
    updateLeaderStage,
    updateSettings,
    resetAllDemoData,
    exportDatabaseJSON,
    // Authentication & Onboarding
    isLoggedIn,
    showAuthPortal,
    setShowAuthPortal,
    authPortalTab,
    setAuthPortalTab,
    loginUser,
    logoutUser,
    schoolAdditionRequests,
    addSchoolAdditionRequest,
    registerUserAccount,
    // 27 Governorates & Directorates
    governorates: EGYPT_27_GOVERNORATES,
    selectedGovernorateId,
    setSelectedGovernorateId,
    selectedDirectorateId,
    setSelectedDirectorateId,
    activeGovernorate,
    activeDirectorate,
    availableDirectorates,
    selectGovernorateAndDirectorate,
    isGovModalOpen,
    setIsGovModalOpen,
    toasts,
    addToast,
    removeToast
  }), [
    currentUser,
    activeSection,
    selectedSchoolFilter,
    searchQuery,
    isLoggedIn,
    showAuthPortal,
    authPortalTab,
    schoolAdditionRequests,
    selectedGovernorateId,
    selectedDirectorateId,
    activeGovernorate,
    activeDirectorate,
    availableDirectorates,
    isGovModalOpen,
    schools,
    teachers,
    students,
    parents,
    attendance,
    assessments,
    correspondence,
    notifications,
    discipline,
    complaints,
    governanceDocs,
    ipAssets,
    futureLeaders,
    auditLogs,
    settings,
    toasts
  ]);

  return (
    <RodFaragContext.Provider value={value}>
      {children}
    </RodFaragContext.Provider>
  );
};

export const useRodFarag = () => {
  const ctx = useContext(RodFaragContext);
  if (!ctx) throw new Error('useRodFarag must be used within RodFaragProvider');
  return ctx;
};
