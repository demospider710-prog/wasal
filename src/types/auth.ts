import { UserRole } from './index';

export type AccountCategory = 
  | 'teacher_staff'       // مدرس أو مسؤول تعليمي
  | 'student'             // طالب
  | 'parent'              // ولي أمر
  | 'directorate_leader'; // مسؤول إدارة أو مدير مدرسة

export type TeacherJobTitle =
  | 'معلم'
  | 'معلم أول'
  | 'معلم أول أ'
  | 'معلم خبير'
  | 'كبير معلمين'
  | 'وكيل مدرسة'
  | 'مدير مدرسة'
  | 'موجه مادة'
  | 'موجه أول'
  | 'موجه عام'
  | 'مسؤول شؤون طلاب'
  | 'مسؤول إداري ومالي'
  | 'مسؤول تطوير تكنولوجي'
  | 'أخصائي اجتماعي / نفسي'
  | 'وظيفة تعليمية أخرى';

export const TEACHER_JOB_TITLES: TeacherJobTitle[] = [
  'معلم',
  'معلم أول',
  'معلم أول أ',
  'معلم خبير',
  'كبير معلمين',
  'وكيل مدرسة',
  'مدير مدرسة',
  'موجه مادة',
  'موجه أول',
  'موجه عام',
  'مسؤول شؤون طلاب',
  'مسؤول إداري ومالي',
  'مسؤول تطوير تكنولوجي',
  'أخصائي اجتماعي / نفسي',
  'وظيفة تعليمية أخرى'
];

export const TEACHING_SPECIALIZATIONS = [
  'اللغة العربية والتربية الإسلامية',
  'اللغة الإنجليزية',
  'اللغة الفرنسية',
  'الرياضيات (عام / بحتة وتطبيقية)',
  'العلوم العامة',
  'الفيزياء',
  'الكيمياء',
  'الأحياء والجيولوجيا',
  'الدراسات الاجتماعية (تاريخ وجغرافيا)',
  'الحاسب الآلي وتكنولوجيا المعلومات',
  'التربية الفنية',
  'التربية الرياضية',
  'التربية الموسيقية',
  'الأنشطة التربوية والصحافة المدرسية',
  'إدارة مدرسية وإشراف تربوي',
  'شؤون الطلاب والامتحانات'
];

export interface SchoolAdditionRequest {
  id: string;
  trackingNumber: string;
  schoolName: string;
  governorateId: string;
  governorateName: string;
  directorateId: string;
  directorateName: string;
  stage: 'primary' | 'preparatory' | 'secondary' | 'vocational' | 'experimental_languages';
  stageNameAr: string;
  educationType: 'حكومي عربي' | 'تجريبي لغات رسمية' | 'خاص معتمد' | 'تعليم فني وتطبيقي';
  address: string;
  ministerialDecreeNumber?: string;
  requesterName: string;
  requesterPhone: string;
  requesterRole: string;
  notes?: string;
  status: 'pending_audit' | 'approved' | 'rejected' | 'documents_required';
  createdAt: string;
  reviewedBy?: string;
}

export interface AccreditationCheckResult {
  found: boolean;
  status?: 'active_accredited' | 'pending_directorate_review' | 'action_required' | 'rejected';
  statusTextAr?: string;
  userName?: string;
  roleNameAr?: string;
  schoolName?: string;
  directorateName?: string;
  governorateName?: string;
  code?: string;
  nationalIdMasked?: string;
  submissionDate?: string;
  accreditationNotes?: string;
  certificateRef?: string;
}

export interface RegistrationPayload {
  category: AccountCategory;
  governorateId: string;
  governorateName: string;
  directorateId: string;
  directorateName: string;
  schoolId: string;
  schoolName: string;
  fullName: string;
  nationalId?: string;
  mobile: string;
  email?: string;
  username: string;
  password?: string;
  
  // Teacher/Staff specific
  staffCode?: string;
  jobTitle?: TeacherJobTitle;
  specialization?: string;

  // Student specific
  studentCode?: string;
  grade?: string;
  classroom?: string;
  parentPhone?: string;

  // Parent specific
  relationship?: 'أب' | 'أم' | 'ولي أمر شرعي';
  linkedStudentIdentifier?: string;

  // Admin/Principal specific
  decreeNumber?: string;
  adminClearanceLevel?: string;
}
