export type UserRole =
  | 'super_admin'            // مسؤول النظام التقني
  | 'directorate_admin'       // مسؤول الإدارة التعليمية
  | 'school_principal'        // مدير مدرسة
  | 'student_affairs'         // مسؤول شؤون الطلاب
  | 'teacher'                 // المدرس
  | 'student'                 // الطالب
  | 'parent'                  // ولي الأمر
  | 'complaints_officer'      // مسؤول الشكاوى
  | 'ip_officer';             // مسؤول الملكية الفكرية

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string; // If scoped to a specific school (e.g. for principal, teacher, student)
  studentId?: string; // For student role
  linkedStudentIds?: string[]; // For parent role
  phone?: string;
  avatar?: string;
  nationalIdMasked?: string;
}

export type EducationStage = 'primary' | 'preparatory' | 'secondary' | 'vocational' | 'experimental_languages';

export interface School {
  id: string;
  code: string;
  name: string;
  stage: EducationStage;
  stageNameAr: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  authorizedOfficers: string[];
  studentsCount: number;
  teachersCount: number;
  classesCount: number;
  status: 'active' | 'under_review' | 'archived';
  accreditationStatus: 'accredited' | 'in_progress' | 'pending';
  establishedYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  internalCode: string;
  name: string;
  schoolId: string;
  schoolName: string;
  subject: string;
  assignedClasses: string[];
  email: string;
  phone: string;
  employmentStatus: 'active' | 'seconded' | 'on_leave';
  hireDate: string;
  evaluationScore: number; // e.g. 94/100
  notes?: string;
}

export interface EducationalDirectorate {
  id: string;
  name: string;
  nameEn?: string;
  governorateId: string;
  schoolsCount: number;
  studentsCount: number;
  isFullyConnected?: boolean;
}

export interface Governorate {
  id: string;
  name: string;
  capital: string;
  region: 'القاهرة الكبرى' | 'وجه بحري والدلتا' | 'القناة وسيناء' | 'شمال الصعيد' | 'وسط وجنوب الصعيد' | 'المحافظات الحدودية';
  totalDirectoratesCount: number;
  estimatedSchoolsCount: number;
  estimatedStudentsCount: number;
  directorates: EducationalDirectorate[];
}

export interface Student {
  id: string;
  internalCode: string;
  name: string;
  governorateId?: string;
  directorateId?: string;
  directorateName?: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  classroom: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  nationalIdMasked?: string;
  gender?: 'ذكر' | 'أنثى';
  enrollmentType?: 'رسمي عربي' | 'تجريبي لغات' | 'خاص معتمد' | 'عسكري';
  attendanceRate: number; // percentage e.g. 96
  generalAverage: number; // percentage e.g. 88.5
  studentRank?: string;
  status: 'enrolled' | 'transferred' | 'graduated';
  birthDate: string;
  enrollmentDate?: string;
  emergencyContact: string;
  achievementsCount: number;
  academicSubjects?: { subject: string; score: number; maxScore: number; grade: string }[];
  behaviorRating?: 'ممتاز' | 'جيد جداً' | 'جيد';
  healthStatus?: string;
}

export interface Parent {
  id: string;
  name: string;
  nationalIdMasked: string;
  phone: string;
  email: string;
  linkedStudents: {
    studentId: string;
    studentName: string;
    schoolName: string;
    grade: string;
    classroom: string;
  }[];
  verified: boolean;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  classroom: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  excusedCount: number;
  recordedBy: string;
  status: 'confirmed' | 'draft';
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  classroom: string;
  date: string;
  maxScore: number;
  status: 'draft' | 'under_review' | 'approved' | 'published';
  approvedBy?: string;
  approvedAt?: string;
  averageScore?: number;
  studentScores: {
    studentId: string;
    studentName: string;
    score: number;
    gradeEquivalent: string;
    notes?: string;
  }[];
}

export type CorrespondenceStatus = 
  | 'draft'          // مسودة
  | 'sent'           // مرسلة
  | 'received'       // تم استلامها
  | 'in_progress'    // قيد التنفيذ
  | 'replied'        // تم الرد
  | 'closed'         // مغلقة
  | 'overdue';       // متأخرة

export type ConfidentialityLevel = 'normal' | 'confidential' | 'top_secret';

export interface Correspondence {
  id: string;
  referenceNumber: string;
  outwardNumber: string;
  date: string;
  subject: string;
  content: string;
  sender: string;
  recipients: string[];
  confidentiality: ConfidentialityLevel;
  deadlineDate: string;
  status: CorrespondenceStatus;
  attachments: { name: string; size: string; type: string }[];
  schoolReply?: {
    schoolId: string;
    repliedBy: string;
    repliedAt: string;
    replyText: string;
    attachments?: string[];
  };
  auditTrail: { action: string; actor: string; timestamp: string }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'attendance' | 'exam' | 'announcement' | 'congratulation' | 'administrative';
  recipientScope: 'all' | 'specific_school' | 'teachers' | 'parents' | 'students';
  targetSchoolId?: string;
  createdAt: string;
  sentBy: string;
  deliveryStatus: 'delivered' | 'pending' | 'draft';
  readCount?: number;
  externalDispatchNotice?: string;
}

export interface DisciplineIncident {
  id: string;
  incidentNumber: string;
  schoolId: string;
  schoolName: string;
  date: string;
  incidentType: 'behavioral' | 'academic_integrity' | 'attendance_violation' | 'property_damage' | 'other';
  descriptionSummary: string;
  partiesInvolvedMasked: string[]; // Protected privacy
  evidenceDocuments: string[];
  reviewingOfficer: string;
  hearingStatus: 'scheduled' | 'conducted' | 'appeal_submitted' | 'waived';
  status: 'new_report' | 'under_investigation' | 'hearing_in_progress' | 'decision_approved' | 'closed';
  approvedSanction?: string;
  closedDate?: string;
  isAppealable: boolean;
}

export interface Complaint {
  id: string;
  trackingCode: string; // Unique tracking ID for applicant
  schoolId?: string;
  schoolName?: string;
  submitterType: 'student' | 'parent' | 'teacher' | 'anonymous';
  submitterNameMasked?: string;
  submitterContact?: string;
  category: 'academic' | 'administrative' | 'behavioral' | 'facilities' | 'financial' | 'general';
  submittedDate: string;
  subject: string;
  description: string;
  assignedAuthority: string;
  status: 'new' | 'under_review' | 'referred' | 'info_requested' | 'response_issued' | 'closed';
  officialResponse?: string;
  attachments?: string[];
  hasAppeal?: boolean;
  appealNotes?: string;
}

export interface SchoolGovernanceDoc {
  id: string;
  title: string;
  targetAudience: 'students' | 'teachers' | 'administration' | 'all';
  version: string;
  effectiveDate: string;
  approvingBody: string;
  status: 'draft_unapproved' | 'active_guideline' | 'under_amendment';
  summary: string;
  chapters: { title: string; clauses: string[] }[];
}

export interface IntellectualPropertyAsset {
  id: string;
  title: string;
  description: string;
  ownerName: string;
  ownerType: 'teacher' | 'student' | 'school' | 'directorate';
  schoolId: string;
  schoolName: string;
  createdDate: string;
  contentType: 'text' | 'image' | 'video' | 'interactive_module' | 'curriculum_guide';
  licenseType: 'open_for_directorate' | 'restricted_permission_required' | 'creative_commons_by_nc';
  allowedEntities: string[];
  verificationStatus: 'verified' | 'under_audit' | 'claim_pending';
  proofDocuments: string[];
  infringementReportsCount: number;
}

export interface FutureLeaderInitiative {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  category: 'science_innovation' | 'community_service' | 'environmental' | 'digital_arts' | 'leadership';
  stage: 'new_idea' | 'under_review' | 'approved' | 'in_progress' | 'completed';
  description: string;
  supervisorTeacher: string;
  awards: string[];
  isSchoolAmbassador: boolean;
  submissionDate: string;
  completionDate?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  schoolId?: string;
  action: string;
  targetResource: string;
  details: string;
  ipAddress: string;
  integrityHash: string;
}

export interface SystemSettings {
  academicYear: string;
  currentTerm: string;
  allowParentRegistration: boolean;
  maintenanceMode: boolean;
  autoArchiveDelayDays: number;
  enableAuditDetailedLog: boolean;
  directorateContactEmail: string;
  directoratePhone: string;
}
