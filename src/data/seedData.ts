import {
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
  UserProfile,
  AuditLogEntry,
  SystemSettings
} from '../types';

export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'sch-01',
    code: 'RDF-SCH-01',
    name: 'مدرسة روض الفرج الثانوية بنين',
    stage: 'secondary',
    stageNameAr: 'المرحلة الثانوية العامة',
    address: 'شارع روض الفرج الرئيسي، قسم الساحل / روض الفرج، القاهرة',
    phone: '02-24589101',
    email: 'sch01@rodfarag-edu.gov.eg',
    principalName: 'أ.د. عصام عبد المعطي الشريف',
    authorizedOfficers: ['أ. حسن القاضي (وكيل شؤون طلاب)', 'أ. منى صبري (مسؤول التطوير)'],
    studentsCount: 1240,
    teachersCount: 68,
    classesCount: 28,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1958,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-20'
  },
  {
    id: 'sch-02',
    code: 'RDF-SCH-02',
    name: 'مدرسة التوفيقية الثانوية العسكرية بنين',
    stage: 'secondary',
    stageNameAr: 'المرحلة الثانوية العسكرية',
    address: 'ميدان التوفيقية، روض الفرج، القاهرة',
    phone: '02-24589102',
    email: 'sch02@rodfarag-edu.gov.eg',
    principalName: 'أ. حسام فؤاد الباشا',
    authorizedOfficers: ['عقيد متقاعد/ سامح عزت', 'أ. طارق عبد الرازق'],
    studentsCount: 1480,
    teachersCount: 82,
    classesCount: 34,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1881,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-21'
  },
  {
    id: 'sch-03',
    code: 'RDF-SCH-03',
    name: 'مدرسة الشهيد أسامة سالم الإعدادية بنين',
    stage: 'preparatory',
    stageNameAr: 'المرحلة الإعدادية',
    address: 'شارع جزيرة بدران، روض الفرج، القاهرة',
    phone: '02-24589103',
    email: 'sch03@rodfarag-edu.gov.eg',
    principalName: 'أ. مروان كمال الدين',
    authorizedOfficers: ['أ. شيرين رضوان', 'أ. عاطف الدسوقي'],
    studentsCount: 890,
    teachersCount: 52,
    classesCount: 22,
    status: 'active',
    accreditationStatus: 'in_progress',
    establishedYear: 1974,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-18'
  },
  {
    id: 'sch-04',
    code: 'RDF-SCH-04',
    name: 'مدرسة السيدة خديجة التجريبية الرسمية لغات',
    stage: 'experimental_languages',
    stageNameAr: 'الرسمية التجريبية لغات',
    address: 'شارع ابن الرشيد، روض الفرج، القاهرة',
    phone: '02-24589104',
    email: 'sch04@rodfarag-edu.gov.eg',
    principalName: 'أ. نادية صبري المهدي',
    authorizedOfficers: ['أ. نهال السعيد', 'أ. كريم المنشاوي'],
    studentsCount: 1120,
    teachersCount: 64,
    classesCount: 26,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1993,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-22'
  },
  {
    id: 'sch-05',
    code: 'RDF-SCH-05',
    name: 'مدرسة طه حسين الابتدائية المشتركة',
    stage: 'primary',
    stageNameAr: 'المرحلة الابتدائية',
    address: 'شارع شبرا الرئيسي تقاطع كورنيش النيل، روض الفرج',
    phone: '02-24589105',
    email: 'sch05@rodfarag-edu.gov.eg',
    principalName: 'أ. وجيه مختار العريان',
    authorizedOfficers: ['أ. فايزة جلال', 'أ. إيهاب سلامة'],
    studentsCount: 950,
    teachersCount: 48,
    classesCount: 24,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1965,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-19'
  },
  {
    id: 'sch-06',
    code: 'RDF-SCH-06',
    name: 'مدرسة جزيرة بدران الابتدائية',
    stage: 'primary',
    stageNameAr: 'المرحلة الابتدائية',
    address: 'ميدان جزيرة بدران، خلف الإسعاف، روض الفرج',
    phone: '02-24589106',
    email: 'sch06@rodfarag-edu.gov.eg',
    principalName: 'أ. سهير عبد العاطي',
    authorizedOfficers: ['أ. محمد عويس', 'أ. ريم غانم'],
    studentsCount: 780,
    teachersCount: 42,
    classesCount: 20,
    status: 'active',
    accreditationStatus: 'in_progress',
    establishedYear: 1982,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-15'
  },
  {
    id: 'sch-07',
    code: 'RDF-SCH-07',
    name: 'مدرسة القومية الإعدادية المشتركة',
    stage: 'preparatory',
    stageNameAr: 'المرحلة الإعدادية',
    address: 'شارع باحثة البادية، روض الفرج، القاهرة',
    phone: '02-24589107',
    email: 'sch07@rodfarag-edu.gov.eg',
    principalName: 'أ. أشرف نبيل غباشي',
    authorizedOfficers: ['أ. سلوى هنداوي', 'أ. مروة الزناتي'],
    studentsCount: 860,
    teachersCount: 46,
    classesCount: 21,
    status: 'active',
    accreditationStatus: 'pending',
    establishedYear: 1970,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-14'
  },
  {
    id: 'sch-08',
    code: 'RDF-SCH-08',
    name: 'مدرسة شبرا الإعدادية بنات',
    stage: 'preparatory',
    stageNameAr: 'المرحلة الإعدادية بنات',
    address: 'شارع المستشفى، متفرع من خلوصي، روض الفرج',
    phone: '02-24589108',
    email: 'sch08@rodfarag-edu.gov.eg',
    principalName: 'أ. هدى عبد الوهاب سراج',
    authorizedOfficers: ['أ. نجوى عبد العظيم', 'أ. أماني شكري'],
    studentsCount: 920,
    teachersCount: 50,
    classesCount: 23,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1962,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-23'
  },
  {
    id: 'sch-09',
    code: 'RDF-SCH-09',
    name: 'مدرسة ابن خلدون الثانوية بنين',
    stage: 'secondary',
    stageNameAr: 'المرحلة الثانوية العامة',
    address: 'شارع ابن خلدون، بجوار مكتب بريد روض الفرج',
    phone: '02-24589109',
    email: 'sch09@rodfarag-edu.gov.eg',
    principalName: 'أ. خالد إسماعيل النجار',
    authorizedOfficers: ['أ. علاء البيه', 'أ. سمير الفقي'],
    studentsCount: 1050,
    teachersCount: 58,
    classesCount: 25,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1968,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-17'
  },
  {
    id: 'sch-10',
    code: 'RDF-SCH-10',
    name: 'مدرسة النيل الابتدائية الحديثة',
    stage: 'primary',
    stageNameAr: 'المرحلة الابتدائية',
    address: 'كورنيش النيل بالقرب من كوبري إمبابة، روض الفرج',
    phone: '02-24589110',
    email: 'sch10@rodfarag-edu.gov.eg',
    principalName: 'أ. ماجد فوزي سمعان',
    authorizedOfficers: ['أ. هبة الله حلمي', 'أ. رامي حليم'],
    studentsCount: 810,
    teachersCount: 44,
    classesCount: 20,
    status: 'active',
    accreditationStatus: 'in_progress',
    establishedYear: 1989,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-12'
  },
  {
    id: 'sch-11',
    code: 'RDF-SCH-11',
    name: 'مدرسة روض الفرج الميكانيكية الفنية',
    stage: 'vocational',
    stageNameAr: 'التعليم الفني والصناعي',
    address: 'شارع الورش والمصانع، روض الفرج، القاهرة',
    phone: '02-24589111',
    email: 'sch11@rodfarag-edu.gov.eg',
    principalName: 'م. ممدوح عبد الرحمن',
    authorizedOfficers: ['م. شريف كمال', 'أ. وليد الجيار'],
    studentsCount: 980,
    teachersCount: 62,
    classesCount: 24,
    status: 'active',
    accreditationStatus: 'in_progress',
    establishedYear: 1978,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-16'
  },
  {
    id: 'sch-12',
    code: 'RDF-SCH-12',
    name: 'مدرسة ناصر الثانوية بنات',
    stage: 'secondary',
    stageNameAr: 'المرحلة الثانوية بنات',
    address: 'شارع الترعة البولاقية، روض الفرج، القاهرة',
    phone: '02-24589112',
    email: 'sch12@rodfarag-edu.gov.eg',
    principalName: 'أ. داليا مراد الجوهري',
    authorizedOfficers: ['أ. إيمان متولي', 'أ. بسمة زهران'],
    studentsCount: 1150,
    teachersCount: 66,
    classesCount: 27,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1961,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-24'
  },
  {
    id: 'sch-13',
    code: 'RDF-SCH-13',
    name: 'مدرسة أبطال العبور الابتدائية',
    stage: 'primary',
    stageNameAr: 'المرحلة الابتدائية',
    address: 'ميدان المماليك، روض الفرج، القاهرة',
    phone: '02-24589113',
    email: 'sch13@rodfarag-edu.gov.eg',
    principalName: 'أ. عبد السلام يوسف',
    authorizedOfficers: ['أ. صابرين حمدي', 'أ. هشام قنديل'],
    studentsCount: 720,
    teachersCount: 38,
    classesCount: 18,
    status: 'active',
    accreditationStatus: 'pending',
    establishedYear: 1985,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-11'
  },
  {
    id: 'sch-14',
    code: 'RDF-SCH-14',
    name: 'مدرسة سانت تريزا الرسمية المشتركة',
    stage: 'primary',
    stageNameAr: 'التعليم الأساسي المشترك',
    address: 'شارع سانت تريزا، متفرع من الترعة، روض الفرج',
    phone: '02-24589114',
    email: 'sch14@rodfarag-edu.gov.eg',
    principalName: 'أ. جورج ميلاد إسكندر',
    authorizedOfficers: ['أ. نيفين عزيز', 'أ. ميخائيل فهيم'],
    studentsCount: 830,
    teachersCount: 45,
    classesCount: 21,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1952,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-20'
  },
  {
    id: 'sch-15',
    code: 'RDF-SCH-15',
    name: 'مدرسة الراعى الصالح الإعدادية',
    stage: 'preparatory',
    stageNameAr: 'المرحلة الإعدادية',
    address: 'شارع المستشفى التخصصي، روض الفرج',
    phone: '02-24589115',
    email: 'sch15@rodfarag-edu.gov.eg',
    principalName: 'أ. منير رزق الله حنا',
    authorizedOfficers: ['أ. ماريان لمعي', 'أ. سامح منسي'],
    studentsCount: 690,
    teachersCount: 40,
    classesCount: 17,
    status: 'active',
    accreditationStatus: 'in_progress',
    establishedYear: 1969,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-13'
  },
  {
    id: 'sch-16',
    code: 'RDF-SCH-16',
    name: 'مدرسة الفرير الثانوية بروض الفرج',
    stage: 'secondary',
    stageNameAr: 'المرحلة الثانوية الخاصة المعتمدة',
    address: 'ميدان فيكتور عمانويل، روض الفرج، القاهرة',
    phone: '02-24589116',
    email: 'sch16@rodfarag-edu.gov.eg',
    principalName: 'أ. رفيق توفيق بشارة',
    authorizedOfficers: ['أ. إميل غطاس', 'أ. نانسي حبيب'],
    studentsCount: 840,
    teachersCount: 49,
    classesCount: 20,
    status: 'active',
    accreditationStatus: 'accredited',
    establishedYear: 1930,
    createdAt: '2020-09-01',
    updatedAt: '2026-10-25'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-01',
    internalCode: 'RDF-TCH-1001',
    name: 'أ. طارق عبد الرازق سالم',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    subject: 'اللغة العربية والتربية الإسلامية',
    assignedClasses: ['1/1', '1/2', '2/3'],
    email: 'tarek.salem@rodfarag-edu.gov.eg',
    phone: '01011223344',
    employmentStatus: 'active',
    hireDate: '2012-09-15',
    evaluationScore: 96,
    notes: 'معلم أول أ - حاصل على جائزة التميز التربوي'
  },
  {
    id: 'tch-02',
    internalCode: 'RDF-TCH-1002',
    name: 'د. ياسمين سامي ربيع',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    subject: 'الفيزياء والعلوم العامة',
    assignedClasses: ['1/2', '2/1', '3/1'],
    email: 'yasmin.rabie@rodfarag-edu.gov.eg',
    phone: '01022334455',
    employmentStatus: 'active',
    hireDate: '2016-02-01',
    evaluationScore: 94,
    notes: 'مشرفة نادي الابتكار والذكاء الاصطناعي'
  },
  {
    id: 'tch-03',
    internalCode: 'RDF-TCH-1003',
    name: 'أ. كرم عبد المجيد زايد',
    schoolId: 'sch-02',
    schoolName: 'مدرسة التوفيقية الثانوية العسكرية بنين',
    subject: 'الرياضيات البحتة والتطبيقية',
    assignedClasses: ['1/4', '2/2', '3/2'],
    email: 'karam.zayed@rodfarag-edu.gov.eg',
    phone: '01033445566',
    employmentStatus: 'active',
    hireDate: '2010-10-10',
    evaluationScore: 98,
    notes: 'مدرب منتخب الأولمبياد الرياضي بروض الفرج'
  },
  {
    id: 'tch-04',
    internalCode: 'RDF-TCH-1004',
    name: 'أ. فاطمة أحمد الديب',
    schoolId: 'sch-04',
    schoolName: 'مدرسة السيدة خديجة التجريبية الرسمية لغات',
    subject: 'اللغة الإنجليزية وآدابها',
    assignedClasses: ['Prep 1/A', 'Prep 2/B'],
    email: 'fatma.eldeeb@rodfarag-edu.gov.eg',
    phone: '01044556677',
    employmentStatus: 'active',
    hireDate: '2018-09-01',
    evaluationScore: 92
  },
  {
    id: 'tch-05',
    internalCode: 'RDF-TCH-1005',
    name: 'أ. عمرو حازم السنباطي',
    schoolId: 'sch-03',
    schoolName: 'مدرسة الشهيد أسامة سالم الإعدادية بنين',
    subject: 'الدراسات الاجتماعية والتاريخ',
    assignedClasses: ['2/1', '2/2', '3/1'],
    email: 'amr.sonbaty@rodfarag-edu.gov.eg',
    phone: '01055667788',
    employmentStatus: 'active',
    hireDate: '2015-03-20',
    evaluationScore: 90
  },
  {
    id: 'tch-06',
    internalCode: 'RDF-TCH-1006',
    name: 'أ. منى زكريا خطاب',
    schoolId: 'sch-12',
    schoolName: 'مدرسة ناصر الثانوية بنات',
    subject: 'الأحياء والجيولوجيا',
    assignedClasses: ['2/1 بنات', '3/2 علمي'],
    email: 'mona.khattab@rodfarag-edu.gov.eg',
    phone: '01066778899',
    employmentStatus: 'active',
    hireDate: '2014-11-05',
    evaluationScore: 95
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-101',
    internalCode: 'RDF-STU-2026-001',
    name: 'كريم محمد عبد الله',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    parentId: 'prt-01',
    parentName: 'محمد عبد الله الشناوي',
    parentPhone: '01099887766',
    nationalIdMasked: '3100412010****',
    gender: 'ذكر',
    enrollmentType: 'رسمي عربي',
    attendanceRate: 98.2,
    generalAverage: 94.5,
    studentRank: 'الأول على الصف الأول الثانوي',
    status: 'enrolled',
    birthDate: '2010-04-12',
    emergencyContact: '01099887766',
    achievementsCount: 3,
    behaviorRating: 'ممتاز',
    academicSubjects: [
      { subject: 'اللغة العربية', score: 29, maxScore: 30, grade: 'ممتاز' },
      { subject: 'اللغة الإنجليزية', score: 28, maxScore: 30, grade: 'ممتاز' },
      { subject: 'الرياضيات', score: 29, maxScore: 30, grade: 'ممتاز' },
      { subject: 'الفيزياء', score: 28, maxScore: 30, grade: 'ممتاز' },
      { subject: 'الكيمياء', score: 27, maxScore: 30, grade: 'جيد جداً' }
    ]
  },
  {
    id: 'stu-102',
    internalCode: 'RDF-STU-2026-002',
    name: 'مريم محمد عبد الله',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-04',
    schoolName: 'مدرسة السيدة خديجة التجريبية الرسمية لغات',
    grade: 'الصف الأول الإعدادي',
    classroom: 'Prep 1/A',
    parentId: 'prt-01',
    parentName: 'محمد عبد الله الشناوي',
    parentPhone: '01099887766',
    nationalIdMasked: '3130820010****',
    gender: 'أنثى',
    enrollmentType: 'تجريبي لغات',
    attendanceRate: 99.0,
    generalAverage: 97.0,
    studentRank: 'الأولى مكرر على المدرسة',
    status: 'enrolled',
    birthDate: '2013-08-20',
    emergencyContact: '01099887766',
    achievementsCount: 2,
    behaviorRating: 'ممتاز',
    academicSubjects: [
      { subject: 'اللغة العربية', score: 30, maxScore: 30, grade: 'ممتاز' },
      { subject: 'English (Advanced)', score: 29.5, maxScore: 30, grade: 'ممتاز' },
      { subject: 'Mathematics', score: 29, maxScore: 30, grade: 'ممتاز' },
      { subject: 'Science', score: 29, maxScore: 30, grade: 'ممتاز' }
    ]
  },
  {
    id: 'stu-103',
    internalCode: 'RDF-STU-2026-003',
    name: 'يوسف شريف الدمرداش',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-02',
    schoolName: 'مدرسة التوفيقية الثانوية العسكرية بنين',
    grade: 'الصف الثاني الثانوي',
    classroom: '2/2 علمي',
    parentId: 'prt-02',
    parentName: 'شريف أحمد الدمرداش',
    parentPhone: '01122334488',
    nationalIdMasked: '3090215010****',
    gender: 'ذكر',
    enrollmentType: 'عسكري',
    attendanceRate: 93.5,
    generalAverage: 88.0,
    studentRank: 'الخامس على شعبة علمي',
    status: 'enrolled',
    birthDate: '2009-02-15',
    emergencyContact: '01122334488',
    achievementsCount: 1,
    behaviorRating: 'جيد جداً',
    academicSubjects: [
      { subject: 'اللغة العربية', score: 26, maxScore: 30, grade: 'جيد جداً' },
      { subject: 'الرياضيات التطبيقية', score: 46, maxScore: 50, grade: 'ممتاز' },
      { subject: 'التربية العسكرية', score: 50, maxScore: 50, grade: 'امتياز' }
    ]
  },
  {
    id: 'stu-104',
    internalCode: 'RDF-STU-2026-004',
    name: 'عمر خالد الصاوي',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-03',
    schoolName: 'مدرسة الشهيد أسامة سالم الإعدادية بنين',
    grade: 'الصف الثالث الإعدادي',
    classroom: '3/1',
    parentId: 'prt-03',
    parentName: 'خالد الصاوي بدر',
    parentPhone: '01233445599',
    nationalIdMasked: '3111103010****',
    gender: 'ذكر',
    enrollmentType: 'رسمي عربي',
    attendanceRate: 95.0,
    generalAverage: 91.2,
    studentRank: 'الثالث على الشهادة الإعدادية',
    status: 'enrolled',
    birthDate: '2011-11-03',
    emergencyContact: '01233445599',
    achievementsCount: 2,
    behaviorRating: 'ممتاز'
  },
  {
    id: 'stu-105',
    internalCode: 'RDF-STU-2026-005',
    name: 'نور الدين وليد النمر',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    parentId: 'prt-04',
    parentName: 'وليد فاروق النمر',
    parentPhone: '01011992288',
    nationalIdMasked: '3100625010****',
    gender: 'ذكر',
    enrollmentType: 'رسمي عربي',
    attendanceRate: 92.0,
    generalAverage: 85.5,
    studentRank: 'متفوق في الأنشطة الرياضية',
    status: 'enrolled',
    birthDate: '2010-06-25',
    emergencyContact: '01011992288',
    achievementsCount: 0,
    behaviorRating: 'جيد جداً'
  },
  {
    id: 'stu-106',
    internalCode: 'RDF-STU-2026-006',
    name: 'سلمى إيهاب العطار',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-12',
    schoolName: 'مدرسة ناصر الثانوية بنات',
    grade: 'الصف الأول الثانوي',
    classroom: '1/1 بنات',
    parentId: 'prt-05',
    parentName: 'إيهاب صلاح العطار',
    parentPhone: '01222119944',
    nationalIdMasked: '3100114010****',
    gender: 'أنثى',
    enrollmentType: 'رسمي عربي',
    attendanceRate: 96.8,
    generalAverage: 93.0,
    studentRank: 'الأولى على المدرسة وسفيرة الإبداع',
    status: 'enrolled',
    birthDate: '2010-01-14',
    emergencyContact: '01222119944',
    achievementsCount: 4,
    behaviorRating: 'ممتاز'
  },
  {
    id: 'stu-107',
    internalCode: 'RDF-STU-2026-007',
    name: 'أحمد حسام التلاوي',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-05',
    schoolName: 'مدرسة طه حسين الابتدائية المشتركة',
    grade: 'الصف السادس الابتدائي',
    classroom: '6/1',
    parentId: 'prt-01',
    parentName: 'حسام الدين التلاوي',
    parentPhone: '01077665544',
    nationalIdMasked: '3140510010****',
    gender: 'ذكر',
    enrollmentType: 'رسمي عربي',
    attendanceRate: 97.5,
    generalAverage: 95.0,
    studentRank: 'المثالي على المرحلة الابتدائية',
    status: 'enrolled',
    birthDate: '2014-05-10',
    emergencyContact: '01077665544',
    achievementsCount: 2,
    behaviorRating: 'ممتاز'
  },
  {
    id: 'stu-108',
    internalCode: 'RDF-STU-2026-008',
    name: 'ندى عاطف عبد الرحمن',
    governorateId: 'cairo',
    directorateId: 'cairo_rodelgard',
    directorateName: 'إدارة روض الفرج التعليمية',
    schoolId: 'sch-08',
    schoolName: 'مدرسة شبرا الإعدادية بنات',
    grade: 'الصف الثاني الإعدادي',
    classroom: '2/3 بنات',
    parentId: 'prt-03',
    parentName: 'عاطف عبد الرحمن',
    parentPhone: '01299887711',
    nationalIdMasked: '3120918010****',
    gender: 'أنثى',
    enrollmentType: 'رسمي عربي',
    attendanceRate: 98.0,
    generalAverage: 96.2,
    studentRank: 'الثانية على الصف الثاني',
    status: 'enrolled',
    birthDate: '2012-09-18',
    emergencyContact: '01299887711',
    achievementsCount: 3,
    behaviorRating: 'ممتاز'
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: 'prt-01',
    name: 'أ. محمد عبد الله الشناوي',
    nationalIdMasked: '280********119',
    phone: '01099887766',
    email: 'mohamed.shennawy@gmail.com',
    verified: true,
    linkedStudents: [
      {
        studentId: 'stu-101',
        studentName: 'كريم محمد عبد الله',
        schoolName: 'مدرسة روض الفرج الثانوية بنين',
        grade: 'الصف الأول الثانوي',
        classroom: '1/2'
      },
      {
        studentId: 'stu-102',
        studentName: 'مريم محمد عبد الله',
        schoolName: 'مدرسة السيدة خديجة التجريبية الرسمية لغات',
        grade: 'الصف الأول الإعدادي',
        classroom: 'Prep 1/A'
      }
    ],
    notes: 'ولي أمر معتمد ومطابق مع السجل المدني'
  },
  {
    id: 'prt-02',
    name: 'م. شريف أحمد الدمرداش',
    nationalIdMasked: '278********432',
    phone: '01122334488',
    email: 'sherif.demerdash@gmail.com',
    verified: true,
    linkedStudents: [
      {
        studentId: 'stu-103',
        studentName: 'يوسف شريف الدمرداش',
        schoolName: 'مدرسة التوفيقية الثانوية العسكرية بنين',
        grade: 'الصف الثاني الثانوي',
        classroom: '2/2 علمي'
      }
    ]
  },
  {
    id: 'prt-03',
    name: 'أ. خالد الصاوي بدر',
    nationalIdMasked: '282********887',
    phone: '01233445599',
    email: 'khaled.el-sawi@outlook.com',
    verified: true,
    linkedStudents: [
      {
        studentId: 'stu-104',
        studentName: 'عمر خالد الصاوي',
        schoolName: 'مدرسة الشهيد أسامة سالم الإعدادية بنين',
        grade: 'الصف الثالث الإعدادي',
        classroom: '3/1'
      }
    ]
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    date: '2026-10-26',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    totalStudents: 42,
    presentCount: 40,
    absentCount: 1,
    excusedCount: 1,
    recordedBy: 'أ. طارق عبد الرازق',
    status: 'confirmed'
  },
  {
    id: 'att-02',
    date: '2026-10-26',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    classroom: '1/1',
    totalStudents: 40,
    presentCount: 38,
    absentCount: 2,
    excusedCount: 0,
    recordedBy: 'أ. حسام فؤاد',
    status: 'confirmed'
  },
  {
    id: 'att-03',
    date: '2026-10-26',
    schoolId: 'sch-02',
    schoolName: 'مدرسة التوفيقية الثانوية العسكرية بنين',
    grade: 'الصف الثاني الثانوي',
    classroom: '2/2 علمي',
    totalStudents: 45,
    presentCount: 43,
    absentCount: 2,
    excusedCount: 0,
    recordedBy: 'أ. كرم عبد المجيد',
    status: 'confirmed'
  },
  {
    id: 'att-04',
    date: '2026-10-26',
    schoolId: 'sch-04',
    schoolName: 'مدرسة السيدة خديجة التجريبية الرسمية لغات',
    grade: 'الصف الأول الإعدادي',
    classroom: 'Prep 1/A',
    totalStudents: 36,
    presentCount: 35,
    absentCount: 0,
    excusedCount: 1,
    recordedBy: 'أ. فاطمة أحمد الديب',
    status: 'confirmed'
  }
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'asm-01',
    title: 'تقييم شهر أكتوبر - مادة اللغة العربية',
    subject: 'اللغة العربية',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    date: '2026-10-22',
    maxScore: 30,
    status: 'published',
    approvedBy: 'أ.د. عصام عبد المعطي الشريف (مدير المدرسة)',
    approvedAt: '2026-10-24 11:30',
    averageScore: 26.8,
    studentScores: [
      {
        studentId: 'stu-101',
        studentName: 'كريم محمد عبد الله',
        score: 29,
        gradeEquivalent: 'ممتاز',
        notes: 'إجابة نموذجية في البلاغة والتعبير'
      },
      {
        studentId: 'stu-105',
        studentName: 'نور الدين وليد النمر',
        score: 24.5,
        gradeEquivalent: 'جيد جداً',
        notes: 'مجهود طيب يحتاج مراجعة النحو'
      }
    ]
  },
  {
    id: 'asm-02',
    title: 'تقييم شهر أكتوبر - مادة الفيزياء',
    subject: 'الفيزياء',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    classroom: '1/2',
    date: '2026-10-24',
    maxScore: 30,
    status: 'approved',
    approvedBy: 'أ.د. عصام عبد المعطي الشريف (مدير المدرسة)',
    approvedAt: '2026-10-25 14:00',
    averageScore: 25.2,
    studentScores: [
      {
        studentId: 'stu-101',
        studentName: 'كريم محمد عبد الله',
        score: 28,
        gradeEquivalent: 'ممتاز',
        notes: 'فهم عميق لقوانين الحركة'
      },
      {
        studentId: 'stu-105',
        studentName: 'نور الدين وليد النمر',
        score: 22,
        gradeEquivalent: 'جيد',
        notes: 'حل صحيح للمسائل الأساسية'
      }
    ]
  },
  {
    id: 'asm-03',
    title: 'اختبار نصف الفصل الدراسي - الرياضيات التطبيقية',
    subject: 'الرياضيات',
    schoolId: 'sch-02',
    schoolName: 'مدرسة التوفيقية الثانوية العسكرية بنين',
    grade: 'الصف الثاني الثانوي',
    classroom: '2/2 علمي',
    date: '2026-10-25',
    maxScore: 50,
    status: 'under_review',
    averageScore: 42.1,
    studentScores: [
      {
        studentId: 'stu-103',
        studentName: 'يوسف شريف الدمرداش',
        score: 46,
        gradeEquivalent: 'ممتاز'
      }
    ]
  }
];

export const INITIAL_CORRESPONDENCE: Correspondence[] = [
  {
    id: 'cor-01',
    referenceNumber: 'RDF-OUT-2026-0891',
    outwardNumber: '891 / صادر تعليم عام',
    date: '2026-10-20',
    subject: 'تعليمات بشأن خطة الاستعداد لامتحانات نصف الفصل الدراسي الأول وتأمين اللجان',
    content: 'بناءً على توجيهات مديرية التربية والتعليم بالقاهرة وإدارة روض الفرج التعليمية، يرجى من السادة مديري المدارس الـ16 موافاتنا بجدول اللجان وجاهزية غرف الكنترول مع الالتزام التام بالضوابط الأمنية والوقائية.',
    sender: 'مدير عام إدارة روض الفرج التعليمية',
    recipients: ['جميع المدارس الـ16 التابعة للإدارة'],
    confidentiality: 'normal',
    deadlineDate: '2026-10-29',
    status: 'in_progress',
    attachments: [
      { name: 'ضوابط_امتحانات_الفصل_الأول_2026.pdf', size: '1.4 ميجابايت', type: 'application/pdf' },
      { name: 'نموذج_تشكيل_لجنة_الكنترول.xlsx', size: '240 كيلوبايت', type: 'application/vnd.ms-excel' }
    ],
    auditTrail: [
      { action: 'إنشاء وإرسال المراسلة الصادرة', actor: 'مدير عام الإدارة', timestamp: '2026-10-20 09:15' },
      { action: 'استلام وتوجيه للشؤون الإدارية', actor: 'مدرسة روض الفرج الثانوية', timestamp: '2026-10-20 10:40' }
    ]
  },
  {
    id: 'cor-02',
    referenceNumber: 'RDF-OUT-2026-0870',
    outwardNumber: '870 / توجيه مالي',
    date: '2026-10-15',
    subject: 'حصر الاحتياجات العاجلة لمعامل العلوم وتطوير الحاسب الآلي',
    content: 'مطلوب إرسال بيان تفصيلي بالأجهزة المعطلة والاحتياجات التكنولوجية للمدارس الـ16 لاعتمادها ضمن خطة الصيانة السنوية لروض الفرج.',
    sender: 'إدارة التجهيزات والمباني التعليمية',
    recipients: ['مدرسة روض الفرج الثانوية', 'مدرسة التوفيقية', 'مدرسة السيدة خديجة'],
    confidentiality: 'normal',
    deadlineDate: '2026-10-22',
    status: 'overdue',
    attachments: [
      { name: 'استمارة_حصر_تجهيزات.pdf', size: '820 كيلوبايت', type: 'application/pdf' }
    ],
    auditTrail: [
      { action: 'إصدار التكليف الرسمي', actor: 'رئيس قسم التجهيزات', timestamp: '2026-10-15 08:30' }
    ]
  },
  {
    id: 'cor-03',
    referenceNumber: 'RDF-SCH01-IN-2026-014',
    outwardNumber: '114 / وارد مدرسة روض الفرج',
    date: '2026-10-23',
    subject: 'تقرير تنفيذ ورشة التوعية بالأمن الرقمي والملكية الفكرية للمرحلة الثانوية',
    content: 'نحيطكم علماً بأنه قد تم بنجاح عقد ورشة العمل بالتعاون مع معلمي الحاسب الآلي بحضور 320 طالباً، ومرفق طيه كشوف الحضور ومخرجات الورشة.',
    sender: 'مدرسة روض الفرج الثانوية بنين',
    recipients: ['إدارة روض الفرج التعليمية - قسم التدريب والتطوير'],
    confidentiality: 'normal',
    deadlineDate: '2026-10-30',
    status: 'replied',
    schoolReply: {
      schoolId: 'sch-01',
      repliedBy: 'أ.د. عصام عبد المعطي الشريف',
      repliedAt: '2026-10-23 13:20',
      replyText: 'تم إرفاق تقرير الفعالية والتوثيق الفوتوغرافي وقائمة الطلاب المتميزين المرشحين لمبادرة قادة المستقبل.'
    },
    attachments: [
      { name: 'تقرير_ورشة_الأمن_الرقمي_أكتوبر.pdf', size: '2.1 ميجابايت', type: 'application/pdf' }
    ],
    auditTrail: [
      { action: 'إرسال الرد الرسمي مع المرفقات', actor: 'مدير المدرسة', timestamp: '2026-10-23 13:20' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'تهنئة لتفوق مدرسة روض الفرج الثانوية بنين في مسابقة الروبوتات والبرمجة',
    message: 'تتقدم إدارة روض الفرج التعليمية بخالص التهنئة لإدارة المدرسة وفريق الطلاب لحصولهم على المركز الأول على مستوى قطاع شمال القاهرة التعليمي.',
    type: 'congratulation',
    recipientScope: 'all',
    createdAt: '2026-10-25 09:00',
    sentBy: 'العلاقات العامة بالإدارة التعليمية',
    deliveryStatus: 'delivered',
    readCount: 1420
  },
  {
    id: 'notif-02',
    title: 'إعلان موعد جدول اختبارات شهر أكتوبر الموحدة',
    message: 'تم اعتماد ونشر جدول التقييمات الشهرية لجميع المدارس الـ16 للعام الدراسي الحالي، ويمكن لأولياء الأمور مراجعة المواعيد عبر البوابة.',
    type: 'exam',
    recipientScope: 'parents',
    createdAt: '2026-10-21 12:00',
    sentBy: 'شؤون الامتحانات والتقييم',
    deliveryStatus: 'delivered',
    readCount: 3890,
    externalDispatchNotice: 'جاهز للربط مع بوابة الرسائل النصية المعتمدة فور توفير الخدمة'
  },
  {
    id: 'notif-03',
    title: 'تنبيه إداري: تفعيل سجل الحضور الذكي اليومي قبل الساعة 9:30 صباحاً',
    message: 'تهيب الإدارة التعليمية بالسادة مسؤولي شؤون الطلاب في المدارس الـ16 إتمام إدخال نسب الحضور اليومي قبل التاسعة والنصف صباحاً للتقييم المركزي.',
    type: 'administrative',
    recipientScope: 'specific_school',
    targetSchoolId: 'sch-01',
    createdAt: '2026-10-26 08:00',
    sentBy: 'المتابعة الميدانية بروض الفرج',
    deliveryStatus: 'delivered',
    readCount: 16
  }
];

export const INITIAL_DISCIPLINE: DisciplineIncident[] = [
  {
    id: 'inc-01',
    incidentNumber: 'RDF-DISC-2026-003',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    date: '2026-10-22',
    incidentType: 'behavioral',
    descriptionSummary: 'مشادة كلامية وسلوك غير لائق بين طالبين أثناء الفسحة المدرسية',
    partiesInvolvedMasked: ['طالب كود #782 (الصف الأول الثانوي)', 'طالب كود #789 (الصف الأول الثانوي)'],
    evidenceDocuments: ['محضر_إثبات_حالة_إشراف.pdf', 'إفادة_الأخصائي_الاجتماعي.pdf'],
    reviewingOfficer: 'أ. محمود عبد الهادي (رئيس لجنة الحماية المدرسية)',
    hearingStatus: 'conducted',
    status: 'decision_approved',
    approvedSanction: 'توجيه إرشاد تربوي وجلسة دعم سلوكي مع استدعاء وليي الأمرين وتوقيع تعهد بعدم التكرار وفق المادة 12 من لائحة الانضباط المدرسي.',
    closedDate: '2026-10-24',
    isAppealable: true
  },
  {
    id: 'inc-02',
    incidentNumber: 'RDF-DISC-2026-004',
    schoolId: 'sch-02',
    schoolName: 'مدرسة التوفيقية الثانوية العسكرية بنين',
    date: '2026-10-24',
    incidentType: 'attendance_violation',
    descriptionSummary: 'تكرار التأخر الصباحي وتخطي السور الخلفي للمدرسة',
    partiesInvolvedMasked: ['طالب كود #441 (الصف الثاني الثانوي)'],
    evidenceDocuments: ['تقرير_أمن_البوابة.pdf'],
    reviewingOfficer: 'وكيل شؤون الطلاب والمشرف العام',
    hearingStatus: 'scheduled',
    status: 'under_investigation',
    isAppealable: true
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp-01',
    trackingCode: 'RDF-CMP-2026-8812',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    submitterType: 'parent',
    submitterNameMasked: 'ولي أمر طالب بالصف الأول الثانوي',
    submitterContact: '010****7766',
    category: 'academic',
    submittedDate: '2026-10-21',
    subject: 'طلب مراجعة تدقيق رصد درجات مادة الكيمياء لاختبار الشهر',
    description: 'ابني حصل على 21 درجة بالرغم من مطابقة إجاباته مع النموذج المعلن بالمعمل، ونرجو إعادة فحص ورقة الإجابة والتصحيح بمعرفة موجه المادة بالإدارة.',
    assignedAuthority: 'لجنة فحص التظلمات والشكاوى بإدارة روض الفرج',
    status: 'response_issued',
    officialResponse: 'تمت مراجعة ورقة الإجابة بحضور موجه أول الكيمياء وتبين وجود خطأ في تجميع الدرجات بالصفحة الثانية، وتم تعديل الدرجة المستحقة إلى 26 درجة واعتمادها رسمياً.',
    attachments: ['صورة_طلب_التظلم.jpg']
  },
  {
    id: 'cmp-02',
    trackingCode: 'RDF-CMP-2026-9041',
    schoolId: 'sch-03',
    schoolName: 'مدرسة الشهيد أسامة سالم الإعدادية بنين',
    submitterType: 'teacher',
    submitterNameMasked: 'معلم أول لغة عربية',
    category: 'administrative',
    submittedDate: '2026-10-24',
    subject: 'طلب صيانة وإعادة تهيئة أجهزة العرض الضوئي (DataShow) بغرفة التطوير التكنولوجي',
    description: 'الأجهزة لا تعمل منذ أسبوع مما يعطل تقديم الحصص التفاعلية للطلاب في معمل الوسائط.',
    assignedAuthority: 'قسم التطوير التكنولوجي والمخازن',
    status: 'under_review'
  }
];

export const INITIAL_GOVERNANCE_DOCS: SchoolGovernanceDoc[] = [
  {
    id: 'gov-01',
    title: 'ميثاق حقوق وواجبات الطالب في منظومة روض الفرج التعليمية',
    targetAudience: 'students',
    version: 'إصدار 2026/1.2 (مسودة استرشادية غير معتمدة نهائياً)',
    effectiveDate: 'العام الدراسي 2026/2027',
    approvingBody: 'مجلس الأمناء والآباء والمعلمين بإدارة روض الفرج',
    status: 'draft_unapproved',
    summary: 'وثيقة تهدف إلى ترسيخ بيئة تعليمية آمنة ومحفزة تضمن حق الطالب في تلقي تعليم عالي الجودة والكرامة والعدالة والمساواة، وتوضح واجباته في الالتزام والانضباط.',
    chapters: [
      {
        title: 'الباب الأول: الحقوق الأساسية للطالب',
        clauses: [
          'الحق في بيئة مدرسية آمنة وخالية من أي شكل من أشكال التنمر أو العنف البدني أو النفسي.',
          'الحق في الاطلاع على نتائج التقييمات الشهرية والسنوية ومراجعتها بشفافية.',
          'الحق في إبداء الرأي وتقديم المقترحات والشكاوى بسرية وأمان تام دون خوف من الانتقام.',
          'الحق في الرعاية الصحية الأولية والأنشطة الرياضية والثقافية وتنمية المواهب.'
        ]
      },
      {
        title: 'الباب الثاني: واجبات ومسؤوليات الطالب',
        clauses: [
          'الالتزام بالحضور المدرسي في المواعيد المقررة والمحافظة على الزي المعتمد.',
          'المحافظة على مرافق المدرسة والأثاث والأجهزة التكنولوجية والمعامل.',
          'احترام المعلمين وجميع العاملين بالمدرسة والتعاون البنّاء مع الزملاء.'
        ]
      }
    ]
  },
  {
    id: 'gov-02',
    title: 'لائحة حقوق ومسؤوليات المعلم والكوادر التربوية',
    targetAudience: 'teachers',
    version: 'إصدار 2026/2.0 (مسودة للمراجعة الفنية)',
    effectiveDate: 'العام الدراسي 2026/2027',
    approvingBody: 'نقابة المعلمين الفرعية وإدارة روض الفرج',
    status: 'draft_unapproved',
    summary: 'تنظيم العلاقة المهنية وضمان الحصانة التربوية والتقدير المجتمعي للمعلم مع تحديد واجبات الأمانة التعليمية والنزاهة الأكاديمية.',
    chapters: [
      {
        title: 'الباب الأول: صون كرامة المعلم وحقوقه المهنية',
        clauses: [
          'الحق في التقدير المهني وتوفير الحماية القانونية أثناء أداء واجباته التعليمية.',
          'الحق في الحصول على برامج التدريب المستمر والتطوير التكنولوجي والتربوي.',
          'حظر أي تدخل غير قانوني في تقييم الطلاب المستند إلى معايير العدالة والموضوعية.'
        ]
      }
    ]
  },
  {
    id: 'gov-03',
    title: 'حوكمة المساءلة الإدارية وضوابط مكافحة تضارب المصالح',
    targetAudience: 'administration',
    version: 'إصدار 2026/0.9 (وثيقة سياسات عمل استرشادية)',
    effectiveDate: '2026/2027',
    approvingBody: 'الإدارة العامة للمتابعة والحوكمة',
    status: 'draft_unapproved',
    summary: 'معايير النزاهة والشفافية لإدارات المدارس، وحظر اشتراك أي مسؤول في اتخاذ قرار يخص شكوى موجهة ضده أو تخص أقارب حتى الدرجة الرابعة.',
    chapters: [
      {
        title: 'الباب الأول: الحياد ومنع تضارب المصالح',
        clauses: [
          'يحظر على المشكو في حقه البت في الشكوى أو ممارسة أي ضغط على صاحبها.',
          'توثيق وحفظ كافة محاضر لجان الحماية والانضباط بسجل مشفر يخضع لرقابة الإدارة التعليمية.',
          'فصل قنوات تقديم الشكاوى واستقبالها عن سلطة الإدارة المدرسية المباشرة.'
        ]
      }
    ]
  }
];

export const INITIAL_IP_ASSETS: IntellectualPropertyAsset[] = [
  {
    id: 'ip-01',
    title: 'حقيبة التدريب التفاعلي في الكيمياء الحديثة بتقنية النماذج ثلاثية الأبعاد',
    description: 'محتوى تعليمي رقمي مبتكر أعده فريق معلمي العلوم بروض الفرج لتبسيط تفاعلات المركبات العضوية للمرحلة الثانوية.',
    ownerName: 'د. ياسمين سامي ربيع',
    ownerType: 'teacher',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    createdDate: '2026-09-18',
    contentType: 'interactive_module',
    licenseType: 'open_for_directorate',
    allowedEntities: ['جميع المدارس الـ16 التابعة لإدارة روض الفرج'],
    verificationStatus: 'verified',
    proofDocuments: ['إقرار_الأصالة_والملكية_الفكرية.pdf', 'موافقة_التوجيه_العام_للعلوم.pdf'],
    infringementReportsCount: 0
  },
  {
    id: 'ip-02',
    title: 'منظومة دليل الإعراب الميسر وأطلس النحو العربي للشهادة الإعدادية',
    description: 'كتاب ومذكرات إلكترونية ومخططات ذهنية من إعداد توجيه اللغة العربية لتيسير القواعد النحوية على الطلاب.',
    ownerName: 'أ. طارق عبد الرازق سالم',
    ownerType: 'teacher',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    createdDate: '2026-10-02',
    contentType: 'curriculum_guide',
    licenseType: 'creative_commons_by_nc',
    allowedEntities: ['معلمو وطلاب إدارة روض الفرج مجاناً للأغراض التعليمية غير التجارية'],
    verificationStatus: 'verified',
    proofDocuments: ['تسجيل_مصنف_تربوي_داخلي_رقم_441.pdf'],
    infringementReportsCount: 0
  },
  {
    id: 'ip-03',
    title: 'تطبيق برمجي مبسط لمتابعة اللياقة البدنية والأنشطة الرياضية المدرسية',
    description: 'مشروع رقمي قام بتطويره طالب بالمرحلة الثانوية لتنظيم تدريبات دوري المدارس.',
    ownerName: 'الطالب كريم محمد عبد الله',
    ownerType: 'student',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    createdDate: '2026-10-10',
    contentType: 'interactive_module',
    licenseType: 'restricted_permission_required',
    allowedEntities: ['مدرسة روض الفرج الثانوية بنين'],
    verificationStatus: 'under_audit',
    proofDocuments: ['كود_المشروع_وملخص_الفكرة.pdf'],
    infringementReportsCount: 0
  }
];

export const INITIAL_LEADERS: FutureLeaderInitiative[] = [
  {
    id: 'ldr-01',
    title: 'مبادرة روض الفرج الخضراء: إعادة تدوير المخلفات الورقية المدرسية وتحويلها إلى سماد عضوي',
    studentId: 'stu-101',
    studentName: 'كريم محمد عبد الله',
    schoolId: 'sch-01',
    schoolName: 'مدرسة روض الفرج الثانوية بنين',
    grade: 'الصف الأول الثانوي',
    category: 'environmental',
    stage: 'approved',
    description: 'تجميع بقايا الأوراق والكرتون التالف في صناديق مخصصة بجميع فصول المدرسة وإعادة استخدامها بالتعاون مع حي الساحل وروض الفرج.',
    supervisorTeacher: 'د. ياسمين سامي ربيع',
    awards: ['درع التميز البيئي لإدارة روض الفرج 2026'],
    isSchoolAmbassador: true,
    submissionDate: '2026-10-05'
  },
  {
    id: 'ldr-02',
    title: 'مبادرة شفرة الأمل: تعليم مبادئ البرمجة والذكاء الاصطناعي لطلاب المرحلة الابتدائية',
    studentId: 'stu-106',
    studentName: 'سلمى إيهاب العطار',
    schoolId: 'sch-12',
    schoolName: 'مدرسة ناصر الثانوية بنات',
    grade: 'الصف الأول الثانوي',
    category: 'science_innovation',
    stage: 'in_progress',
    description: 'ورش عمل أسبوعية مبسطة باستخدام Scratch ومبادئ الخوارزميات تقدمها طالبات المدرسة لزميلاتهن الصغار بمدارس الجوار.',
    supervisorTeacher: 'أ. منى زكريا خطاب',
    awards: ['شهادة تقدير الإبداع الشبابي'],
    isSchoolAmbassador: true,
    submissionDate: '2026-09-28'
  },
  {
    id: 'ldr-03',
    title: 'مشروع سفراء التاريخ المصري: جولات استكشافية لمعالم حي شبرا وروض الفرج التراثية',
    studentId: 'stu-104',
    studentName: 'عمر خالد الصاوي',
    schoolId: 'sch-03',
    schoolName: 'مدرسة الشهيد أسامة سالم الإعدادية بنين',
    grade: 'الصف الثالث الإعدادي',
    category: 'community_service',
    stage: 'completed',
    description: 'توثيق تاريخي لمعالم منطقة روض الفرج والقصور التاريخية وكوبري إمبابة الشهير وتقديمها في كتيب وثائقي وفيلم قصير.',
    supervisorTeacher: 'أ. عمرو حازم السنباطي',
    awards: ['المركز الأول في مسابقة المعرفة المجتمعية'],
    isSchoolAmbassador: false,
    submissionDate: '2026-09-15',
    completionDate: '2026-10-18'
  }
];

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-admin',
    name: 'أ.د. عبد المنعم السعيد (مدير عام الإدارة)',
    email: 'admin.directorate@rodfarag-edu.gov.eg',
    role: 'directorate_admin',
    phone: '01000000001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-principal-01',
    name: 'أ.د. عصام عبد المعطي الشريف (مدير المدرسة)',
    email: 'principal01@rodfarag-edu.gov.eg',
    role: 'school_principal',
    schoolId: 'sch-01',
    phone: '01000000002',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-student-affairs',
    name: 'أ. حسن القاضي (مسؤول شؤون الطلاب)',
    email: 'affairs01@rodfarag-edu.gov.eg',
    role: 'student_affairs',
    schoolId: 'sch-01',
    phone: '01000000003'
  },
  {
    id: 'usr-teacher-01',
    name: 'أ. طارق عبد الرازق سالم (معلم أول لغة عربية)',
    email: 'tarek.salem@rodfarag-edu.gov.eg',
    role: 'teacher',
    schoolId: 'sch-01',
    phone: '01011223344'
  },
  {
    id: 'usr-parent-01',
    name: 'أ. محمد عبد الله الشناوي (ولي أمر)',
    email: 'mohamed.shennawy@gmail.com',
    role: 'parent',
    linkedStudentIds: ['stu-101', 'stu-102'],
    phone: '01099887766'
  },
  {
    id: 'usr-student-01',
    name: 'الطالب كريم محمد عبد الله',
    email: 'karim.shennawy@rodfarag-edu.gov.eg',
    role: 'student',
    schoolId: 'sch-01',
    studentId: 'stu-101',
    phone: '01099887766'
  },
  {
    id: 'usr-complaints-officer',
    name: 'المستشار شريف فهمي (مسؤول الشكاوى والتظلمات)',
    email: 'complaints@rodfarag-edu.gov.eg',
    role: 'complaints_officer',
    phone: '01000000005'
  },
  {
    id: 'usr-ip-officer',
    name: 'أ. هناء ممدوح (مسؤول الملكية الفكرية والابتكار)',
    email: 'ip.office@rodfarag-edu.gov.eg',
    role: 'ip_officer',
    phone: '01000000006'
  },
  {
    id: 'usr-super-admin',
    name: 'م. إيهاب كامل (مسؤول النظام التقني والأمن)',
    email: 'tech.support@rodfarag-edu.gov.eg',
    role: 'super_admin',
    phone: '01000000007'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUDIT-1001',
    timestamp: '2026-10-26 09:15:22',
    actorId: 'usr-admin',
    actorName: 'أ.د. عبد المنعم السعيد',
    actorRole: 'directorate_admin',
    action: 'إصدار مذكرات التفتيش والمتابعة للمدارس',
    targetResource: 'Schools/All',
    details: 'اعتماد خطة الزيارات الميدانية لمدارس روض الفرج للأسبوع الجاري',
    ipAddress: '192.168.1.10',
    integrityHash: 'RDF-AUDIT-4F2A901B'
  },
  {
    id: 'AUDIT-1002',
    timestamp: '2026-10-25 14:00:10',
    actorId: 'usr-principal-01',
    actorName: 'أ.د. عصام عبد المعطي الشريف',
    actorRole: 'school_principal',
    schoolId: 'sch-01',
    action: 'اعتماد نتائج تقييم شهر أكتوبر لمادة الفيزياء',
    targetResource: 'Assessment/asm-02',
    details: 'توثيق الدرجات واعتمادها ونقلها إلى حالة معتمدة تمهيداً للنشر',
    ipAddress: '192.168.1.45',
    integrityHash: 'RDF-AUDIT-8B7C112D'
  },
  {
    id: 'AUDIT-1003',
    timestamp: '2026-10-24 16:30:00',
    actorId: 'usr-complaints-officer',
    actorName: 'المستشار شريف فهمي',
    actorRole: 'complaints_officer',
    action: 'تسجيل الرد الرسمي على تظلم رصد درجات الكيمياء',
    targetResource: 'Complaint/RDF-CMP-2026-8812',
    details: 'إضافة الرد المعتمد بحضور موجه المادة وتعديل الدرجة المستحقة',
    ipAddress: '192.168.1.22',
    integrityHash: 'RDF-AUDIT-99E410CA'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  academicYear: '2026 / 2027',
  currentTerm: 'الفصل الدراسي الأول',
  allowParentRegistration: true,
  maintenanceMode: false,
  autoArchiveDelayDays: 90,
  enableAuditDetailedLog: true,
  directorateContactEmail: 'contact@rodfarag-edu.gov.eg',
  directoratePhone: '02-24589000'
};
