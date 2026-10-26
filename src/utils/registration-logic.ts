import { Governorate, EducationalDirectorate, School, UserProfile } from '../types';
import { AccountCategory, RegistrationPayload, SchoolAdditionRequest, AccreditationCheckResult } from '../types/auth';

/**
 * Validates Egyptian Mobile Phone numbers (11 digits, starts with 010, 011, 012, or 015)
 */
export function validateEgyptianPhone(phone: string): { valid: boolean; error?: string } {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (!cleaned) {
    return { valid: false, error: 'رقم الهاتف مطلوب' };
  }
  const regex = /^01[0125][0-9]{8}$/;
  if (!regex.test(cleaned)) {
    return { valid: false, error: 'رقم الهاتف يجب أن يتكون من 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015' };
  }
  return { valid: true };
}

/**
 * Validates Egyptian National ID (14 digits)
 * Format: C YY MM DD SS GGG K
 * C: Century (2 for 1900-1999, 3 for 2000-2099)
 * YY MM DD: Birth date
 * SS: Governorate code (01 Cairo, 02 Alex, etc.)
 * GGG: Sequence (odd for male, even for female)
 * K: Check digit
 */
export function validateEgyptianNationalId(nid: string): { 
  valid: boolean; 
  birthDate?: string; 
  gender?: 'ذكر' | 'أنثى'; 
  error?: string 
} {
  const cleaned = nid.trim();
  if (!cleaned) {
    return { valid: false, error: 'الرقم القومي مطلوب' };
  }
  if (!/^\d{14}$/.test(cleaned)) {
    return { valid: false, error: 'الرقم القومي يجب أن يتكون من 14 رقمًا بدقة' };
  }

  const centuryDigit = parseInt(cleaned[0], 10);
  if (centuryDigit !== 2 && centuryDigit !== 3) {
    return { valid: false, error: 'الرقم القومي غير صحيح (رقم القرن يجب أن يبدأ بـ 2 أو 3)' };
  }

  const yearPrefix = centuryDigit === 2 ? '19' : '20';
  const year = yearPrefix + cleaned.substring(1, 3);
  const month = cleaned.substring(3, 5);
  const day = cleaned.substring(5, 7);

  const mInt = parseInt(month, 10);
  const dInt = parseInt(day, 10);

  if (mInt < 1 || mInt > 12) {
    return { valid: false, error: 'شهر الميلاد في الرقم القومي غير صحيح' };
  }
  if (dInt < 1 || dInt > 31) {
    return { valid: false, error: 'يوم الميلاد في الرقم القومي غير صحيح' };
  }

  const genderDigit = parseInt(cleaned[12], 10);
  const gender: 'ذكر' | 'أنثى' = genderDigit % 2 === 1 ? 'ذكر' : 'أنثى';
  const birthDate = `${year}-${month}-${day}`;

  return { valid: true, birthDate, gender };
}

/**
 * Validates teacher/staff code
 */
export function validateStaffCode(code: string): { valid: boolean; error?: string } {
  const cleaned = code.trim();
  if (!cleaned) {
    return { valid: false, error: 'الكود الوظيفي مطلوب' };
  }
  if (cleaned.length < 4 || cleaned.length > 20) {
    return { valid: false, error: 'الكود الوظيفي يجب أن يكون بين 4 إلى 20 حرفًا ورقمًا' };
  }
  return { valid: true };
}

/**
 * Validates student code
 */
export function validateStudentCode(code: string): { valid: boolean; error?: string } {
  const cleaned = code.trim();
  if (!cleaned) {
    return { valid: false, error: 'كود الطالب بالوزارة مطلوب' };
  }
  if (cleaned.length < 5 || cleaned.length > 15) {
    return { valid: false, error: 'كود الطالب يجب أن يكون بين 5 إلى 15 رقمًا' };
  }
  return { valid: true };
}

/**
 * Validates comprehensive registration payload
 */
export function validateRegistrationPayload(payload: RegistrationPayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!payload.governorateId) errors.push('يجب اختيار المحافظة التابع لها');
  if (!payload.directorateId) errors.push('يجب اختيار الإدارة التعليمية التابع لها');
  if (!payload.schoolId) errors.push('يجب تحديد المدرسة المسجل بها');
  
  if (!payload.fullName || payload.fullName.trim().split(/\s+/).length < 3) {
    errors.push('الاسم يجب أن يكون ثلاثياً أو رباعياً على الأقل باللغة العربية');
  }

  const phoneCheck = validateEgyptianPhone(payload.mobile);
  if (!phoneCheck.valid) {
    errors.push(phoneCheck.error || 'رقم المحمول غير صحيح');
  }

  if (payload.nationalId) {
    const nidCheck = validateEgyptianNationalId(payload.nationalId);
    if (!nidCheck.valid) {
      errors.push(nidCheck.error || 'الرقم القومي غير صحيح');
    }
  }

  if (!payload.username || payload.username.trim().length < 4) {
    errors.push('اسم المستخدم يجب ألا يقل عن 4 أحرف');
  }

  // Role-specific constraints
  if (payload.category === 'teacher_staff') {
    if (!payload.staffCode) errors.push('الكود الوظيفي للمعلم مطلوب');
    if (!payload.jobTitle) errors.push('المسمى الوظيفي المعتمد مطلوب');
    if (!payload.specialization) errors.push('التخصص أو المادة الدراسية مطلوبة');
  } else if (payload.category === 'student') {
    if (!payload.studentCode) errors.push('كود الطالب بوزارة التربية والتعليم مطلوب');
    if (!payload.nationalId) errors.push('الرقم القومي للطالب مطلوب');
    if (!payload.grade) errors.push('المرحلة والصف الدراسي مطلوب');
  } else if (payload.category === 'parent') {
    if (!payload.nationalId) errors.push('الرقم القومي لولي الأمر مطلوب');
    if (!payload.linkedStudentIdentifier) errors.push('كود أو اسم الطالب التابع مطلوب');
    if (!payload.relationship) errors.push('صلة القرابة بالطالب مطلوبة');
  } else if (payload.category === 'directorate_leader') {
    if (!payload.staffCode) errors.push('الكود الوظيفي للقيادة التعليمية مطلوب');
    if (!payload.decreeNumber) errors.push('رقم القرار الوزاري أو أمر التكليف الرسمي مطلوب');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Filter educational directorates by governorate ID
 */
export function getDirectoratesForGovernorate(governorates: Governorate[], govId: string): EducationalDirectorate[] {
  const found = governorates.find(g => g.id === govId);
  return found ? found.directorates : [];
}

/**
 * Filter schools by directorate ID or default to Rod El Farag 16 schools
 */
export function getSchoolsForDirectorate(allSchools: School[], directorateId: string): School[] {
  // If directorate is Rod El Farag, returns all 16 schools
  if (directorateId === 'cairo_rodelgard') {
    return allSchools;
  }
  // Otherwise filter schools matching directorateId or return sample
  const filtered = allSchools.filter(s => (s as any).directorateId === directorateId);
  return filtered;
}

/**
 * Creates official school addition request
 */
export function createSchoolAdditionRequest(
  data: Omit<SchoolAdditionRequest, 'id' | 'trackingNumber' | 'createdAt' | 'status'>
): SchoolAdditionRequest {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  const trackingNumber = `RDF-REQ-${year}-${rand}`;

  return {
    ...data,
    id: `req-${Date.now()}`,
    trackingNumber,
    status: 'pending_audit',
    createdAt: new Date().toISOString()
  };
}

/**
 * Query user account accreditation status
 */
export function checkAccountStatus(
  users: UserProfile[],
  teachers: any[],
  students: any[],
  identifier: string
): AccreditationCheckResult {
  const cleanId = identifier.trim().toLowerCase();

  // Search by National ID, Email, Code, or Phone
  const user = users.find(u => 
    u.id.toLowerCase() === cleanId ||
    u.email?.toLowerCase() === cleanId ||
    u.phone?.replace(/\D/g, '') === cleanId.replace(/\D/g, '') ||
    (u.nationalIdMasked && u.nationalIdMasked.replace(/\*/g, '') === cleanId.slice(-4))
  );

  const teacher = teachers.find(t => 
    t.internalCode.toLowerCase() === cleanId ||
    t.phone?.replace(/\D/g, '') === cleanId.replace(/\D/g, '') ||
    t.email?.toLowerCase() === cleanId
  );

  const student = students.find(s => 
    s.internalCode.toLowerCase() === cleanId ||
    s.id.toLowerCase() === cleanId
  );

  if (teacher) {
    return {
      found: true,
      status: 'active_accredited',
      statusTextAr: 'معتمد ونشط رسميًا بسجلات الإدارة التعليمية',
      userName: teacher.name,
      roleNameAr: `معلم — ${teacher.subject}`,
      schoolName: teacher.schoolName,
      directorateName: 'إدارة روض الفرج التعليمية',
      governorateName: 'محافظة القاهرة',
      code: teacher.internalCode,
      submissionDate: teacher.hireDate || '2023-09-15',
      certificateRef: `MOE-CERT-${teacher.internalCode}-VERIFIED`,
      accreditationNotes: 'تمت مطابقة الكود الوظيفي وتدقيق صحيفة الأحوال الإلكترونية'
    };
  }

  if (student) {
    return {
      found: true,
      status: 'active_accredited',
      statusTextAr: 'طالب مقيد ومعتمد بالنظام الإلكتروني',
      userName: student.name,
      roleNameAr: `طالب — ${student.grade} (${student.classroom})`,
      schoolName: student.schoolName,
      directorateName: 'إدارة روض الفرج التعليمية',
      governorateName: 'محافظة القاهرة',
      code: student.internalCode,
      submissionDate: '2026-09-01',
      certificateRef: `MOE-STU-${student.internalCode}`,
      accreditationNotes: 'البيانات مطابقة لسجلات قيد شؤون الطلاب بالإدارة'
    };
  }

  if (user) {
    const roleLabels: Record<string, string> = {
      super_admin: 'مسؤول نظام تقني',
      directorate_admin: 'قيادة بالإدارة التعليمية',
      school_principal: 'مدير مدرسة معتمد',
      student_affairs: 'مسؤول شؤون طلاب',
      teacher: 'معلم معتمد',
      student: 'طالب مسجل',
      parent: 'ولي أمر معتمد',
      complaints_officer: 'مسؤول فحص الشكاوى',
      ip_officer: 'مسؤول حماية الملكية الفكرية'
    };

    return {
      found: true,
      status: 'active_accredited',
      statusTextAr: 'حساب رسمي نشط ومعتمد في منظومة روض الفرج',
      userName: user.name,
      roleNameAr: roleLabels[user.role] || user.role,
      schoolName: user.schoolId ? 'مدرسة تابعة لإدارة روض الفرج' : 'ديوان إدارة روض الفرج التعليمية',
      directorateName: 'إدارة روض الفرج التعليمية',
      governorateName: 'محافظة القاهرة',
      code: user.id,
      submissionDate: '2026-01-15',
      certificateRef: `ACC-${user.id.toUpperCase()}-GOV`,
      accreditationNotes: 'الحساب مستوفٍ لكافة متطلبات الأمان والتكليف الوزاري'
    };
  }

  // Not found in current active database
  return {
    found: false,
    statusTextAr: 'لم يتم العثور على سجل مطابق، يُرجى التأكد من الرقم القومي أو الكود المسجل أو التوجه لقسم الإحصاء بالإدارة'
  };
}
