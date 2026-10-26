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

export const EGYPT_27_GOVERNORATES: Governorate[] = [
  {
    id: 'cairo',
    name: 'محافظة القاهرة',
    capital: 'القاهرة',
    region: 'القاهرة الكبرى',
    totalDirectoratesCount: 15,
    estimatedSchoolsCount: 1840,
    estimatedStudentsCount: 1450000,
    directorates: [
      { id: 'cairo_rodelgard', name: 'إدارة روض الفرج التعليمية', governorateId: 'cairo', schoolsCount: 16, studentsCount: 15310, isFullyConnected: true },
      { id: 'cairo_sahel', name: 'إدارة الساحل التعليمية', governorateId: 'cairo', schoolsCount: 78, studentsCount: 62000 },
      { id: 'cairo_shubra', name: 'إدارة شبرا التعليمية', governorateId: 'cairo', schoolsCount: 64, studentsCount: 51000 },
      { id: 'cairo_zaitoun', name: 'إدارة الزيتون التعليمية', governorateId: 'cairo', schoolsCount: 92, studentsCount: 74000 },
      { id: 'cairo_heliopolis', name: 'إدارة مصر الجديدة التعليمية', governorateId: 'cairo', schoolsCount: 110, studentsCount: 88000 },
      { id: 'cairo_nozha', name: 'إدارة النزهة التعليمية', governorateId: 'cairo', schoolsCount: 105, studentsCount: 82000 },
      { id: 'cairo_nasr_east', name: 'إدارة شرق مدينة نصر التعليمية', governorateId: 'cairo', schoolsCount: 135, studentsCount: 104000 },
      { id: 'cairo_nasr_west', name: 'إدارة غرب مدينة نصر التعليمية', governorateId: 'cairo', schoolsCount: 98, studentsCount: 78000 },
      { id: 'cairo_maadi', name: 'إدارة المعادي التعليمية', governorateId: 'cairo', schoolsCount: 120, studentsCount: 95000 },
      { id: 'cairo_helwan', name: 'إدارة حلوان التعليمية', governorateId: 'cairo', schoolsCount: 142, studentsCount: 115000 },
      { id: 'cairo_ain_shams', name: 'إدارة عين شمس التعليمية', governorateId: 'cairo', schoolsCount: 125, studentsCount: 98000 },
      { id: 'cairo_matariya', name: 'إدارة المطرية التعليمية', governorateId: 'cairo', schoolsCount: 118, studentsCount: 94000 },
      { id: 'cairo_waily', name: 'إدارة الوايلي التعليمية', governorateId: 'cairo', schoolsCount: 72, studentsCount: 58000 },
      { id: 'cairo_basateen', name: 'إدارة البساتين ودار السلام', governorateId: 'cairo', schoolsCount: 138, studentsCount: 110000 },
      { id: 'cairo_mokattam', name: 'إدارة الخليفة والمقطم التعليمية', governorateId: 'cairo', schoolsCount: 88, studentsCount: 69000 }
    ]
  },
  {
    id: 'giza',
    name: 'محافظة الجيزة',
    capital: 'الجيزة',
    region: 'القاهرة الكبرى',
    totalDirectoratesCount: 11,
    estimatedSchoolsCount: 1420,
    estimatedStudentsCount: 1280000,
    directorates: [
      { id: 'giza_dokki', name: 'إدارة الدقي التعليمية', governorateId: 'giza', schoolsCount: 82, studentsCount: 68000 },
      { id: 'giza_agouza', name: 'إدارة العجوزة التعليمية', governorateId: 'giza', schoolsCount: 95, studentsCount: 76000 },
      { id: 'giza_south', name: 'إدارة جنوب الجيزة التعليمية', governorateId: 'giza', schoolsCount: 110, studentsCount: 92000 },
      { id: 'giza_north', name: 'إدارة شمال الجيزة التعليمية', governorateId: 'giza', schoolsCount: 130, studentsCount: 112000 },
      { id: 'giza_haram', name: 'إدارة الهرم التعليمية', governorateId: 'giza', schoolsCount: 165, studentsCount: 145000 },
      { id: 'giza_omraniya', name: 'إدارة العمرانية التعليمية', governorateId: 'giza', schoolsCount: 140, studentsCount: 120000 },
      { id: 'giza_october', name: 'إدارة 6 أكتوبر التعليمية', governorateId: 'giza', schoolsCount: 155, studentsCount: 130000 },
      { id: 'giza_zayed', name: 'إدارة الشيخ زايد التعليمية', governorateId: 'giza', schoolsCount: 74, studentsCount: 58000 },
      { id: 'giza_bulaq', name: 'إدارة بولاق الدكرور التعليمية', governorateId: 'giza', schoolsCount: 145, studentsCount: 128000 },
      { id: 'giza_kardasa', name: 'إدارة كرداسة التعليمية', governorateId: 'giza', schoolsCount: 90, studentsCount: 75000 },
      { id: 'giza_oussim', name: 'إدارة أوسيم التعليمية', governorateId: 'giza', schoolsCount: 84, studentsCount: 70000 }
    ]
  },
  {
    id: 'alexandria',
    name: 'محافظة الإسكندرية',
    capital: 'الإسكندرية',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 9,
    estimatedSchoolsCount: 1180,
    estimatedStudentsCount: 950000,
    directorates: [
      { id: 'alex_montaza1', name: 'إدارة المنتزه أول التعليمية', governorateId: 'alexandria', schoolsCount: 160, studentsCount: 140000 },
      { id: 'alex_montaza2', name: 'إدارة المنتزه ثان التعليمية', governorateId: 'alexandria', schoolsCount: 145, studentsCount: 125000 },
      { id: 'alex_east', name: 'إدارة شرق الإسكندرية التعليمية', governorateId: 'alexandria', schoolsCount: 180, studentsCount: 150000 },
      { id: 'alex_middle', name: 'إدارة وسط الإسكندرية التعليمية', governorateId: 'alexandria', schoolsCount: 120, studentsCount: 98000 },
      { id: 'alex_west', name: 'إدارة غرب الإسكندرية التعليمية', governorateId: 'alexandria', schoolsCount: 110, studentsCount: 88000 },
      { id: 'alex_gomrok', name: 'إدارة الجمرك التعليمية', governorateId: 'alexandria', schoolsCount: 65, studentsCount: 48000 },
      { id: 'alex_agami', name: 'إدارة العجمي التعليمية', governorateId: 'alexandria', schoolsCount: 130, studentsCount: 105000 },
      { id: 'alex_amriya', name: 'إدارة العامرية التعليمية', governorateId: 'alexandria', schoolsCount: 140, studentsCount: 112000 },
      { id: 'alex_borg_arab', name: 'إدارة برج العرب التعليمية', governorateId: 'alexandria', schoolsCount: 52, studentsCount: 38000 }
    ]
  },
  {
    id: 'qalyubia',
    name: 'محافظة القليوبية',
    capital: 'بنها',
    region: 'القاهرة الكبرى',
    totalDirectoratesCount: 10,
    estimatedSchoolsCount: 1050,
    estimatedStudentsCount: 860000,
    directorates: [
      { id: 'qal_banha', name: 'إدارة بنها التعليمية', governorateId: 'qalyubia', schoolsCount: 140, studentsCount: 115000 },
      { id: 'qal_toukh', name: 'إدارة طوخ التعليمية', governorateId: 'qalyubia', schoolsCount: 125, studentsCount: 98000 },
      { id: 'qal_qaha', name: 'إدارة قها التعليمية', governorateId: 'qalyubia', schoolsCount: 45, studentsCount: 36000 },
      { id: 'qal_qalyub', name: 'إدارة قليوب التعليمية', governorateId: 'qalyubia', schoolsCount: 110, studentsCount: 92000 },
      { id: 'qal_shubra_east', name: 'إدارة شرق شبرا الخيمة التعليمية', governorateId: 'qalyubia', schoolsCount: 135, studentsCount: 120000 },
      { id: 'qal_shubra_west', name: 'إدارة غرب شبرا الخيمة التعليمية', governorateId: 'qalyubia', schoolsCount: 120, studentsCount: 105000 },
      { id: 'qal_qanater', name: 'إدارة القناطر الخيرية التعليمية', governorateId: 'qalyubia', schoolsCount: 95, studentsCount: 78000 },
      { id: 'qal_khanka', name: 'إدارة الخانكة التعليمية', governorateId: 'qalyubia', schoolsCount: 115, studentsCount: 96000 },
      { id: 'qal_shebin', name: 'إدارة شبين القناطر التعليمية', governorateId: 'qalyubia', schoolsCount: 105, studentsCount: 84000 },
      { id: 'qal_obour', name: 'إدارة العبور التعليمية', governorateId: 'qalyubia', schoolsCount: 60, studentsCount: 48000 }
    ]
  },
  {
    id: 'dakahlia',
    name: 'محافظة الدقهلية',
    capital: 'المنصورة',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 10,
    estimatedSchoolsCount: 1380,
    estimatedStudentsCount: 1120000,
    directorates: [
      { id: 'dak_mansoura_east', name: 'إدارة شرق المنصورة التعليمية', governorateId: 'dakahlia', schoolsCount: 155, studentsCount: 130000 },
      { id: 'dak_mansoura_west', name: 'إدارة غرب المنصورة التعليمية', governorateId: 'dakahlia', schoolsCount: 145, studentsCount: 122000 },
      { id: 'dak_mit_ghamr', name: 'إدارة ميت غمر التعليمية', governorateId: 'dakahlia', schoolsCount: 160, studentsCount: 135000 },
      { id: 'dak_sinbillawein', name: 'إدارة السنبلاوين التعليمية', governorateId: 'dakahlia', schoolsCount: 130, studentsCount: 108000 },
      { id: 'dak_dekernes', name: 'إدارة دكرنس التعليمية', governorateId: 'dakahlia', schoolsCount: 115, studentsCount: 94000 },
      { id: 'dak_belqas', name: 'إدارة بلقاس التعليمية', governorateId: 'dakahlia', schoolsCount: 140, studentsCount: 114000 },
      { id: 'dak_talkha', name: 'إدارة طلخا التعليمية', governorateId: 'dakahlia', schoolsCount: 110, studentsCount: 88000 },
      { id: 'dak_sherbin', name: 'إدارة شربين التعليمية', governorateId: 'dakahlia', schoolsCount: 105, studentsCount: 85000 },
      { id: 'dak_aga', name: 'إدارة أجا التعليمية', governorateId: 'dakahlia', schoolsCount: 120, studentsCount: 98000 },
      { id: 'dak_meniet_nasr', name: 'إدارة منية النصر التعليمية', governorateId: 'dakahlia', schoolsCount: 95, studentsCount: 76000 }
    ]
  },
  {
    id: 'sharqia',
    name: 'محافظة الشرقية',
    capital: 'الزقازيق',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 10,
    estimatedSchoolsCount: 1510,
    estimatedStudentsCount: 1240000,
    directorates: [
      { id: 'shar_zag_east', name: 'إدارة شرق الزقازيق التعليمية', governorateId: 'sharqia', schoolsCount: 170, studentsCount: 142000 },
      { id: 'shar_zag_west', name: 'إدارة غرب الزقازيق التعليمية', governorateId: 'sharqia', schoolsCount: 150, studentsCount: 125000 },
      { id: 'shar_menya_qamh', name: 'إدارة منيا القمح التعليمية', governorateId: 'sharqia', schoolsCount: 180, studentsCount: 150000 },
      { id: 'shar_belbeis', name: 'إدارة بلبيس التعليمية', governorateId: 'sharqia', schoolsCount: 165, studentsCount: 138000 },
      { id: 'shar_faqous', name: 'إدارة فاقوس التعليمية', governorateId: 'sharqia', schoolsCount: 155, studentsCount: 128000 },
      { id: 'shar_tenth_ramadan', name: 'إدارة العاشر من رمضان التعليمية', governorateId: 'sharqia', schoolsCount: 95, studentsCount: 82000 },
      { id: 'shar_abu_hammad', name: 'إدارة أبو حماد التعليمية', governorateId: 'sharqia', schoolsCount: 110, studentsCount: 90000 },
      { id: 'shar_hehia', name: 'إدارة ههيا التعليمية', governorateId: 'sharqia', schoolsCount: 85, studentsCount: 70000 },
      { id: 'shar_deirb_negm', name: 'إدارة ديرب نجم التعليمية', governorateId: 'sharqia', schoolsCount: 120, studentsCount: 98000 },
      { id: 'shar_kafr_saqr', name: 'إدارة كفر صقر التعليمية', governorateId: 'sharqia', schoolsCount: 95, studentsCount: 78000 }
    ]
  },
  {
    id: 'monufia',
    name: 'محافظة المنوفية',
    capital: 'شبين الكوم',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 9,
    estimatedSchoolsCount: 980,
    estimatedStudentsCount: 780000,
    directorates: [
      { id: 'mon_shebin', name: 'إدارة شبين الكوم التعليمية', governorateId: 'monufia', schoolsCount: 150, studentsCount: 125000 },
      { id: 'mon_ashmoun', name: 'إدارة أشمون التعليمية', governorateId: 'monufia', schoolsCount: 175, studentsCount: 145000 },
      { id: 'mon_menouf', name: 'إدارة منوف التعليمية', governorateId: 'monufia', schoolsCount: 135, studentsCount: 110000 },
      { id: 'mon_quesna', name: 'إدارة قويسنا التعليمية', governorateId: 'monufia', schoolsCount: 120, studentsCount: 98000 },
      { id: 'mon_berket_sabaa', name: 'إدارة بركة السبع التعليمية', governorateId: 'monufia', schoolsCount: 90, studentsCount: 72000 },
      { id: 'mon_tala', name: 'إدارة تلا التعليمية', governorateId: 'monufia', schoolsCount: 95, studentsCount: 76000 },
      { id: 'mon_shohada', name: 'إدارة الشهداء التعليمية', governorateId: 'monufia', schoolsCount: 85, studentsCount: 68000 },
      { id: 'mon_bagour', name: 'إدارة الباجور التعليمية', governorateId: 'monufia', schoolsCount: 100, studentsCount: 82000 },
      { id: 'mon_sadat', name: 'إدارة السادات التعليمية', governorateId: 'monufia', schoolsCount: 75, studentsCount: 59000 }
    ]
  },
  {
    id: 'gharbia',
    name: 'محافظة الغربية',
    capital: 'طنطا',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 8,
    estimatedSchoolsCount: 1120,
    estimatedStudentsCount: 910000,
    directorates: [
      { id: 'ghar_tanta_east', name: 'إدارة شرق طنطا التعليمية', governorateId: 'gharbia', schoolsCount: 165, studentsCount: 138000 },
      { id: 'ghar_tanta_west', name: 'إدارة غرب طنطا التعليمية', governorateId: 'gharbia', schoolsCount: 155, studentsCount: 130000 },
      { id: 'ghar_mahalla_east', name: 'إدارة شرق المحلة الكبرى التعليمية', governorateId: 'gharbia', schoolsCount: 160, studentsCount: 134000 },
      { id: 'ghar_mahalla_west', name: 'إدارة غرب المحلة الكبرى التعليمية', governorateId: 'gharbia', schoolsCount: 150, studentsCount: 126000 },
      { id: 'ghar_zefta', name: 'إدارة زفتى التعليمية', governorateId: 'gharbia', schoolsCount: 135, studentsCount: 110000 },
      { id: 'ghar_kafr_zayat', name: 'إدارة كفر الزيات التعليمية', governorateId: 'gharbia', schoolsCount: 125, studentsCount: 102000 },
      { id: 'ghar_samannoud', name: 'إدارة سمنود التعليمية', governorateId: 'gharbia', schoolsCount: 90, studentsCount: 74000 },
      { id: 'ghar_basyoun', name: 'إدارة بسيون التعليمية', governorateId: 'gharbia', schoolsCount: 80, studentsCount: 65000 }
    ]
  },
  {
    id: 'kafr_sheikh',
    name: 'محافظة كفر الشيخ',
    capital: 'كفر الشيخ',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 10,
    estimatedSchoolsCount: 890,
    estimatedStudentsCount: 720000,
    directorates: [
      { id: 'kfs_kafr_sheikh', name: 'إدارة كفر الشيخ التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 140, studentsCount: 118000 },
      { id: 'kfs_desouk', name: 'إدارة دسوق التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 130, studentsCount: 108000 },
      { id: 'kfs_fouh', name: 'إدارة فوه التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 65, studentsCount: 52000 },
      { id: 'kfs_metobas', name: 'إدارة مطوبس التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 85, studentsCount: 68000 },
      { id: 'kfs_sidi_salem', name: 'إدارة سيدي سالم التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 115, studentsCount: 94000 },
      { id: 'kfs_biela', name: 'إدارة بيلا التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 90, studentsCount: 72000 },
      { id: 'kfs_qaleen', name: 'إدارة قلين التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 80, studentsCount: 64000 },
      { id: 'kfs_hamoul', name: 'إدارة الحامول التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 95, studentsCount: 76000 },
      { id: 'kfs_baltim', name: 'إدارة بلطيم التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 75, studentsCount: 58000 },
      { id: 'kfs_riyad', name: 'إدارة الرياض التعليمية', governorateId: 'kafr_sheikh', schoolsCount: 70, studentsCount: 54000 }
    ]
  },
  {
    id: 'beheira',
    name: 'محافظة البحيرة',
    capital: 'دمنهور',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 10,
    estimatedSchoolsCount: 1460,
    estimatedStudentsCount: 1190000,
    directorates: [
      { id: 'beh_damanhour', name: 'إدارة بندر ومركز دمنهور التعليمية', governorateId: 'beheira', schoolsCount: 195, studentsCount: 165000 },
      { id: 'beh_kafr_dawar', name: 'إدارة كفر الدوار التعليمية', governorateId: 'beheira', schoolsCount: 180, studentsCount: 152000 },
      { id: 'beh_etay_baroud', name: 'إدارة إيتاي البارود التعليمية', governorateId: 'beheira', schoolsCount: 145, studentsCount: 118000 },
      { id: 'beh_abu_hommos', name: 'إدارة أبو حمص التعليمية', governorateId: 'beheira', schoolsCount: 150, studentsCount: 122000 },
      { id: 'beh_housh_eissa', name: 'إدارة حوش عيسى التعليمية', governorateId: 'beheira', schoolsCount: 120, studentsCount: 98000 },
      { id: 'beh_delengat', name: 'إدارة الدلنجات التعليمية', governorateId: 'beheira', schoolsCount: 135, studentsCount: 110000 },
      { id: 'beh_kom_hamada', name: 'إدارة كوم حمادة التعليمية', governorateId: 'beheira', schoolsCount: 140, studentsCount: 115000 },
      { id: 'beh_badr', name: 'إدارة التحرير وبدر التعليمية', governorateId: 'beheira', schoolsCount: 90, studentsCount: 72000 },
      { id: 'beh_rosetta', name: 'إدارة رشيد التعليمية', governorateId: 'beheira', schoolsCount: 75, studentsCount: 60000 },
      { id: 'beh_edko', name: 'إدارة إدكو التعليمية', governorateId: 'beheira', schoolsCount: 65, studentsCount: 52000 }
    ]
  },
  {
    id: 'damietta',
    name: 'محافظة دمياط',
    capital: 'دمياط',
    region: 'وجه بحري والدلتا',
    totalDirectoratesCount: 6,
    estimatedSchoolsCount: 540,
    estimatedStudentsCount: 420000,
    directorates: [
      { id: 'dam_damietta', name: 'إدارة دمياط التعليمية', governorateId: 'damietta', schoolsCount: 140, studentsCount: 115000 },
      { id: 'dam_kafr_saad', name: 'إدارة كفر سعد التعليمية', governorateId: 'damietta', schoolsCount: 115, studentsCount: 88000 },
      { id: 'dam_fareskour', name: 'إدارة فارسكور التعليمية', governorateId: 'damietta', schoolsCount: 95, studentsCount: 74000 },
      { id: 'dam_zarqa', name: 'إدارة الزرقا التعليمية', governorateId: 'damietta', schoolsCount: 80, studentsCount: 62000 },
      { id: 'dam_rawda', name: 'إدارة الروضة التعليمية', governorateId: 'damietta', schoolsCount: 45, studentsCount: 35000 },
      { id: 'dam_new_damietta', name: 'إدارة دمياط الجديدة التعليمية', governorateId: 'damietta', schoolsCount: 65, studentsCount: 52000 }
    ]
  },
  {
    id: 'port_said',
    name: 'محافظة بورسعيد',
    capital: 'بورسعيد',
    region: 'القناة وسيناء',
    totalDirectoratesCount: 4,
    estimatedSchoolsCount: 340,
    estimatedStudentsCount: 260000,
    directorates: [
      { id: 'pts_east', name: 'إدارة شرق بورسعيد التعليمية', governorateId: 'port_said', schoolsCount: 95, studentsCount: 76000 },
      { id: 'pts_north', name: 'إدارة شمال بورسعيد التعليمية', governorateId: 'port_said', schoolsCount: 90, studentsCount: 70000 },
      { id: 'pts_south', name: 'إدارة جنوب بورسعيد التعليمية', governorateId: 'port_said', schoolsCount: 85, studentsCount: 65000 },
      { id: 'pts_port_fouad', name: 'إدارة بورفؤاد التعليمية', governorateId: 'port_said', schoolsCount: 70, studentsCount: 54000 }
    ]
  },
  {
    id: 'ismailia',
    name: 'محافظة الإسماعيلية',
    capital: 'الإسماعيلية',
    region: 'القناة وسيناء',
    totalDirectoratesCount: 7,
    estimatedSchoolsCount: 490,
    estimatedStudentsCount: 380000,
    directorates: [
      { id: 'ism_north', name: 'إدارة شمال الإسماعيلية التعليمية', governorateId: 'ismailia', schoolsCount: 110, studentsCount: 88000 },
      { id: 'ism_south', name: 'إدارة جنوب الإسماعيلية التعليمية', governorateId: 'ismailia', schoolsCount: 95, studentsCount: 75000 },
      { id: 'ism_tall_kebir', name: 'إدارة التل الكبير التعليمية', governorateId: 'ismailia', schoolsCount: 85, studentsCount: 66000 },
      { id: 'ism_qantara_west', name: 'إدارة القنطرة غرب التعليمية', governorateId: 'ismailia', schoolsCount: 70, studentsCount: 54000 },
      { id: 'ism_qantara_east', name: 'إدارة القنطرة شرق التعليمية', governorateId: 'ismailia', schoolsCount: 55, studentsCount: 42000 },
      { id: 'ism_fayed', name: 'إدارة فايد التعليمية', governorateId: 'ismailia', schoolsCount: 60, studentsCount: 46000 },
      { id: 'ism_qassassin', name: 'إدارة القصاصين التعليمية', governorateId: 'ismailia', schoolsCount: 50, studentsCount: 38000 }
    ]
  },
  {
    id: 'suez',
    name: 'محافظة السويس',
    capital: 'السويس',
    region: 'القناة وسيناء',
    totalDirectoratesCount: 5,
    estimatedSchoolsCount: 360,
    estimatedStudentsCount: 280000,
    directorates: [
      { id: 'suz_suez', name: 'إدارة السويس التعليمية', governorateId: 'suez', schoolsCount: 80, studentsCount: 65000 },
      { id: 'suz_arbaeen', name: 'إدارة الأربعين التعليمية', governorateId: 'suez', schoolsCount: 95, studentsCount: 76000 },
      { id: 'suz_faisal', name: 'إدارة فيصل التعليمية', governorateId: 'suez', schoolsCount: 85, studentsCount: 68000 },
      { id: 'suz_ataqah', name: 'إدارة عتاقة التعليمية', governorateId: 'suez', schoolsCount: 55, studentsCount: 42000 },
      { id: 'suz_ganayen', name: 'إدارة الجناين التعليمية', governorateId: 'suez', schoolsCount: 45, studentsCount: 35000 }
    ]
  },
  {
    id: 'north_sinai',
    name: 'محافظة شمال سيناء',
    capital: 'العريش',
    region: 'القناة وسيناء',
    totalDirectoratesCount: 6,
    estimatedSchoolsCount: 320,
    estimatedStudentsCount: 160000,
    directorates: [
      { id: 'nsn_arish', name: 'إدارة العريش التعليمية', governorateId: 'north_sinai', schoolsCount: 120, studentsCount: 68000 },
      { id: 'nsn_beer_abd', name: 'إدارة بئر العبد التعليمية', governorateId: 'north_sinai', schoolsCount: 80, studentsCount: 42000 },
      { id: 'nsn_sheikh_zuweid', name: 'إدارة الشيخ زويد التعليمية', governorateId: 'north_sinai', schoolsCount: 45, studentsCount: 22000 },
      { id: 'nsn_rafah', name: 'إدارة رفح التعليمية', governorateId: 'north_sinai', schoolsCount: 35, studentsCount: 16000 },
      { id: 'nsn_hasana', name: 'إدارة الحسنة التعليمية', governorateId: 'north_sinai', schoolsCount: 25, studentsCount: 11000 },
      { id: 'nsn_nakhl', name: 'إدارة نخل التعليمية', governorateId: 'north_sinai', schoolsCount: 20, studentsCount: 8500 }
    ]
  },
  {
    id: 'south_sinai',
    name: 'محافظة جنوب سيناء',
    capital: 'طور سيناء',
    region: 'القناة وسيناء',
    totalDirectoratesCount: 8,
    estimatedSchoolsCount: 240,
    estimatedStudentsCount: 95000,
    directorates: [
      { id: 'ssn_tor', name: 'إدارة طور سيناء التعليمية', governorateId: 'south_sinai', schoolsCount: 65, studentsCount: 28000 },
      { id: 'ssn_sharm', name: 'إدارة شرم الشيخ التعليمية', governorateId: 'south_sinai', schoolsCount: 40, studentsCount: 18000 },
      { id: 'ssn_dahab', name: 'إدارة دهب التعليمية', governorateId: 'south_sinai', schoolsCount: 25, studentsCount: 10500 },
      { id: 'ssn_nuweiba', name: 'إدارة نويبع التعليمية', governorateId: 'south_sinai', schoolsCount: 22, studentsCount: 9200 },
      { id: 'ssn_katherine', name: 'إدارة سانت كاترين التعليمية', governorateId: 'south_sinai', schoolsCount: 18, studentsCount: 7400 },
      { id: 'ssn_ras_sedr', name: 'إدارة رأس سدر التعليمية', governorateId: 'south_sinai', schoolsCount: 30, studentsCount: 13000 },
      { id: 'ssn_abu_rodeis', name: 'إدارة أبو رديس التعليمية', governorateId: 'south_sinai', schoolsCount: 20, studentsCount: 8500 },
      { id: 'ssn_abu_zenima', name: 'إدارة أبو زنيمة التعليمية', governorateId: 'south_sinai', schoolsCount: 20, studentsCount: 8200 }
    ]
  },
  {
    id: 'beni_suef',
    name: 'محافظة بني سويف',
    capital: 'بني سويف',
    region: 'شمال الصعيد',
    totalDirectoratesCount: 7,
    estimatedSchoolsCount: 920,
    estimatedStudentsCount: 760000,
    directorates: [
      { id: 'bns_beni_suef', name: 'إدارة بني سويف التعليمية', governorateId: 'beni_suef', schoolsCount: 180, studentsCount: 155000 },
      { id: 'bns_wasta', name: 'إدارة الواسطى التعليمية', governorateId: 'beni_suef', schoolsCount: 145, studentsCount: 118000 },
      { id: 'bns_nasser', name: 'إدارة ناصر التعليمية', governorateId: 'beni_suef', schoolsCount: 135, studentsCount: 110000 },
      { id: 'bns_beba', name: 'إدارة ببا التعليمية', governorateId: 'beni_suef', schoolsCount: 150, studentsCount: 122000 },
      { id: 'bns_ehnasia', name: 'إدارة إهناسيا التعليمية', governorateId: 'beni_suef', schoolsCount: 125, studentsCount: 102000 },
      { id: 'bns_fashn', name: 'إدارة الفشن التعليمية', governorateId: 'beni_suef', schoolsCount: 130, studentsCount: 105000 },
      { id: 'bns_somosta', name: 'إدارة سمسطا التعليمية', governorateId: 'beni_suef', schoolsCount: 85, studentsCount: 68000 }
    ]
  },
  {
    id: 'faiyum',
    name: 'محافظة الفيوم',
    capital: 'الفيوم',
    region: 'شمال الصعيد',
    totalDirectoratesCount: 7,
    estimatedSchoolsCount: 880,
    estimatedStudentsCount: 710000,
    directorates: [
      { id: 'fay_east', name: 'إدارة شرق الفيوم التعليمية', governorateId: 'faiyum', schoolsCount: 160, studentsCount: 135000 },
      { id: 'fay_west', name: 'إدارة غرب الفيوم التعليمية', governorateId: 'faiyum', schoolsCount: 150, studentsCount: 125000 },
      { id: 'fay_senouris', name: 'إدارة سنورس التعليمية', governorateId: 'faiyum', schoolsCount: 165, studentsCount: 138000 },
      { id: 'fay_itsa', name: 'إدارة إطسا التعليمية', governorateId: 'faiyum', schoolsCount: 180, studentsCount: 146000 },
      { id: 'fay_tamiya', name: 'إدارة طامية التعليمية', governorateId: 'faiyum', schoolsCount: 120, studentsCount: 96000 },
      { id: 'fay_abshaway', name: 'إدارة أبشواي التعليمية', governorateId: 'faiyum', schoolsCount: 110, studentsCount: 88000 },
      { id: 'fay_youssef_seddiq', name: 'إدارة يوسف الصديق التعليمية', governorateId: 'faiyum', schoolsCount: 75, studentsCount: 58000 }
    ]
  },
  {
    id: 'minya',
    name: 'محافظة المنيا',
    capital: 'المنيا',
    region: 'شمال الصعيد',
    totalDirectoratesCount: 9,
    estimatedSchoolsCount: 1640,
    estimatedStudentsCount: 1380000,
    directorates: [
      { id: 'mny_minya', name: 'إدارة المنيا التعليمية', governorateId: 'minya', schoolsCount: 220, studentsCount: 190000 },
      { id: 'mny_mallawi', name: 'إدارة ملوي التعليمية', governorateId: 'minya', schoolsCount: 210, studentsCount: 182000 },
      { id: 'mny_maghagha', name: 'إدارة مغاغة التعليمية', governorateId: 'minya', schoolsCount: 180, studentsCount: 152000 },
      { id: 'mny_beni_mazar', name: 'إدارة بني مزار التعليمية', governorateId: 'minya', schoolsCount: 195, studentsCount: 165000 },
      { id: 'mny_samalout', name: 'إدارة سمالوط التعليمية', governorateId: 'minya', schoolsCount: 205, studentsCount: 175000 },
      { id: 'mny_abu_qurqas', name: 'إدارة أبو قرقاص التعليمية', governorateId: 'minya', schoolsCount: 175, studentsCount: 148000 },
      { id: 'mny_matay', name: 'إدارة مطاي التعليمية', governorateId: 'minya', schoolsCount: 130, studentsCount: 108000 },
      { id: 'mny_deir_mowas', name: 'إدارة ديرمواس التعليمية', governorateId: 'minya', schoolsCount: 125, studentsCount: 104000 },
      { id: 'mny_adwa', name: 'إدارة العدوة التعليمية', governorateId: 'minya', schoolsCount: 110, studentsCount: 92000 }
    ]
  },
  {
    id: 'asyut',
    name: 'محافظة أسيوط',
    capital: 'أسيوط',
    region: 'وسط وجنوب الصعيد',
    totalDirectoratesCount: 11,
    estimatedSchoolsCount: 1320,
    estimatedStudentsCount: 1050000,
    directorates: [
      { id: 'asy_asyut', name: 'إدارة أسيوط التعليمية', governorateId: 'asyut', schoolsCount: 190, studentsCount: 160000 },
      { id: 'asy_dairut', name: 'إدارة ديروط التعليمية', governorateId: 'asyut', schoolsCount: 175, studentsCount: 145000 },
      { id: 'asy_qoussiya', name: 'إدارة القوصية التعليمية', governorateId: 'asyut', schoolsCount: 150, studentsCount: 124000 },
      { id: 'asy_manfalut', name: 'إدارة منفلوط التعليمية', governorateId: 'asyut', schoolsCount: 160, studentsCount: 132000 },
      { id: 'asy_abnoub', name: 'إدارة أبنوب التعليمية', governorateId: 'asyut', schoolsCount: 140, studentsCount: 115000 },
      { id: 'asy_fateh', name: 'إدارة الفتح التعليمية', governorateId: 'asyut', schoolsCount: 135, studentsCount: 110000 },
      { id: 'asy_sedfa', name: 'إدارة صدفا التعليمية', governorateId: 'asyut', schoolsCount: 95, studentsCount: 76000 },
      { id: 'asy_ghanaim', name: 'إدارة الغنايم التعليمية', governorateId: 'asyut', schoolsCount: 80, studentsCount: 62000 },
      { id: 'asy_sahel_selim', name: 'إدارة ساحل سليم التعليمية', governorateId: 'asyut', schoolsCount: 85, studentsCount: 68000 },
      { id: 'asy_badari', name: 'إدارة البداري التعليمية', governorateId: 'asyut', schoolsCount: 110, studentsCount: 88000 },
      { id: 'asy_new_asyut', name: 'إدارة أسيوط الجديدة التعليمية', governorateId: 'asyut', schoolsCount: 40, studentsCount: 32000 }
    ]
  },
  {
    id: 'sohag',
    name: 'محافظة سوهاج',
    capital: 'سوهاج',
    region: 'وسط وجنوب الصعيد',
    totalDirectoratesCount: 11,
    estimatedSchoolsCount: 1480,
    estimatedStudentsCount: 1220000,
    directorates: [
      { id: 'shg_sohag', name: 'إدارة سوهاج التعليمية', governorateId: 'sohag', schoolsCount: 210, studentsCount: 180000 },
      { id: 'shg_akhmeem', name: 'إدارة أخميم التعليمية', governorateId: 'sohag', schoolsCount: 155, studentsCount: 128000 },
      { id: 'shg_maragha', name: 'إدارة المراغة التعليمية', governorateId: 'sohag', schoolsCount: 145, studentsCount: 118000 },
      { id: 'shg_tahta', name: 'إدارة طهطا التعليمية', governorateId: 'sohag', schoolsCount: 165, studentsCount: 138000 },
      { id: 'shg_tama', name: 'إدارة طما التعليمية', governorateId: 'sohag', schoolsCount: 150, studentsCount: 124000 },
      { id: 'shg_juhayna', name: 'إدارة جهينة التعليمية', governorateId: 'sohag', schoolsCount: 115, studentsCount: 92000 },
      { id: 'shg_monshaa', name: 'إدارة المنشأة التعليمية', governorateId: 'sohag', schoolsCount: 160, studentsCount: 130000 },
      { id: 'shg_girga', name: 'إدارة جرجا التعليمية', governorateId: 'sohag', schoolsCount: 170, studentsCount: 142000 },
      { id: 'shg_balyana', name: 'إدارة البلينا التعليمية', governorateId: 'sohag', schoolsCount: 155, studentsCount: 126000 },
      { id: 'shg_dar_salam', name: 'إدارة دار السلام التعليمية', governorateId: 'sohag', schoolsCount: 135, studentsCount: 110000 },
      { id: 'shg_saqalta', name: 'إدارة ساقلتة التعليمية', governorateId: 'sohag', schoolsCount: 85, studentsCount: 68000 }
    ]
  },
  {
    id: 'qena',
    name: 'محافظة قنا',
    capital: 'قنا',
    region: 'وسط وجنوب الصعيد',
    totalDirectoratesCount: 9,
    estimatedSchoolsCount: 1180,
    estimatedStudentsCount: 940000,
    directorates: [
      { id: 'qen_qena', name: 'إدارة قنا التعليمية', governorateId: 'qena', schoolsCount: 210, studentsCount: 175000 },
      { id: 'qen_naga_hammadi', name: 'إدارة نجع حمادي التعليمية', governorateId: 'qena', schoolsCount: 195, studentsCount: 162000 },
      { id: 'qen_qous', name: 'إدارة قوص التعليمية', governorateId: 'qena', schoolsCount: 160, studentsCount: 132000 },
      { id: 'qen_deshna', name: 'إدارة دشنا التعليمية', governorateId: 'qena', schoolsCount: 145, studentsCount: 118000 },
      { id: 'qen_abu_tesht', name: 'إدارة أبو تشت التعليمية', governorateId: 'qena', schoolsCount: 170, studentsCount: 138000 },
      { id: 'qen_farshout', name: 'إدارة فرشوط التعليمية', governorateId: 'qena', schoolsCount: 95, studentsCount: 78000 },
      { id: 'qen_qift', name: 'إدارة قفط التعليمية', governorateId: 'qena', schoolsCount: 90, studentsCount: 74000 },
      { id: 'qen_waqf', name: 'إدارة الوقف التعليمية', governorateId: 'qena', schoolsCount: 65, studentsCount: 52000 },
      { id: 'qen_naqada', name: 'إدارة نقادة التعليمية', governorateId: 'qena', schoolsCount: 85, studentsCount: 69000 }
    ]
  },
  {
    id: 'luxor',
    name: 'محافظة الأقصر',
    capital: 'الأقصر',
    region: 'وسط وجنوب الصعيد',
    totalDirectoratesCount: 7,
    estimatedSchoolsCount: 520,
    estimatedStudentsCount: 410000,
    directorates: [
      { id: 'lux_luxor', name: 'إدارة الأقصر التعليمية', governorateId: 'luxor', schoolsCount: 135, studentsCount: 112000 },
      { id: 'lux_esna', name: 'إدارة إسنا التعليمية', governorateId: 'luxor', schoolsCount: 160, studentsCount: 130000 },
      { id: 'lux_armant', name: 'إدارة أرمنت التعليمية', governorateId: 'luxor', schoolsCount: 95, studentsCount: 78000 },
      { id: 'lux_bayadiya', name: 'إدارة البياضية التعليمية', governorateId: 'luxor', schoolsCount: 55, studentsCount: 44000 },
      { id: 'lux_qurna', name: 'إدارة القرنة التعليمية', governorateId: 'luxor', schoolsCount: 70, studentsCount: 56000 },
      { id: 'lux_zeiniya', name: 'إدارة الزينية التعليمية', governorateId: 'luxor', schoolsCount: 40, studentsCount: 32000 },
      { id: 'lux_toud', name: 'إدارة الطود التعليمية', governorateId: 'luxor', schoolsCount: 45, studentsCount: 36000 }
    ]
  },
  {
    id: 'aswan',
    name: 'محافظة أسوان',
    capital: 'أسوان',
    region: 'وسط وجنوب الصعيد',
    totalDirectoratesCount: 5,
    estimatedSchoolsCount: 680,
    estimatedStudentsCount: 520000,
    directorates: [
      { id: 'asw_aswan', name: 'إدارة أسوان التعليمية', governorateId: 'aswan', schoolsCount: 220, studentsCount: 175000 },
      { id: 'asw_edfu', name: 'إدارة إدفو التعليمية', governorateId: 'aswan', schoolsCount: 210, studentsCount: 165000 },
      { id: 'asw_kom_ombo', name: 'إدارة كوم أمبو التعليمية', governorateId: 'aswan', schoolsCount: 155, studentsCount: 122000 },
      { id: 'asw_nasr_nuba', name: 'إدارة نصر النوبة التعليمية', governorateId: 'aswan', schoolsCount: 85, studentsCount: 64000 },
      { id: 'asw_draw', name: 'إدارة دراو التعليمية', governorateId: 'aswan', schoolsCount: 75, studentsCount: 58000 }
    ]
  },
  {
    id: 'red_sea',
    name: 'محافظة البحر الأحمر',
    capital: 'الغردقة',
    region: 'المحافظات الحدودية',
    totalDirectoratesCount: 7,
    estimatedSchoolsCount: 230,
    estimatedStudentsCount: 110000,
    directorates: [
      { id: 'rds_hurghada', name: 'إدارة الغردقة التعليمية', governorateId: 'red_sea', schoolsCount: 110, studentsCount: 62000 },
      { id: 'rds_safaga', name: 'إدارة سفاجا التعليمية', governorateId: 'red_sea', schoolsCount: 42, studentsCount: 21000 },
      { id: 'rds_quseir', name: 'إدارة القصير التعليمية', governorateId: 'red_sea', schoolsCount: 38, studentsCount: 18000 },
      { id: 'rds_ras_ghareb', name: 'إدارة رأس غارب التعليمية', governorateId: 'red_sea', schoolsCount: 32, studentsCount: 15000 },
      { id: 'rds_marsa_alam', name: 'إدارة مرسى علم التعليمية', governorateId: 'red_sea', schoolsCount: 16, studentsCount: 6500 },
      { id: 'rds_shalateen', name: 'إدارة شلاتين التعليمية', governorateId: 'red_sea', schoolsCount: 14, studentsCount: 5200 },
      { id: 'rds_halaib', name: 'إدارة حلايب التعليمية', governorateId: 'red_sea', schoolsCount: 8, studentsCount: 2800 }
    ]
  },
  {
    id: 'new_valley',
    name: 'محافظة الوادي الجديد',
    capital: 'الخارجة',
    region: 'المحافظات الحدودية',
    totalDirectoratesCount: 5,
    estimatedSchoolsCount: 210,
    estimatedStudentsCount: 82000,
    directorates: [
      { id: 'nwv_kharga', name: 'إدارة الخارجة التعليمية', governorateId: 'new_valley', schoolsCount: 95, studentsCount: 42000 },
      { id: 'nwv_dakhla', name: 'إدارة الداخلة التعليمية', governorateId: 'new_valley', schoolsCount: 82, studentsCount: 36000 },
      { id: 'nwv_farafra', name: 'إدارة الفرافرة التعليمية', governorateId: 'new_valley', schoolsCount: 26, studentsCount: 9500 },
      { id: 'nwv_baris', name: 'إدارة باريس التعليمية', governorateId: 'new_valley', schoolsCount: 20, studentsCount: 6800 },
      { id: 'nwv_balat', name: 'إدارة بلاط التعليمية', governorateId: 'new_valley', schoolsCount: 22, studentsCount: 7400 }
    ]
  },
  {
    id: 'matrouh',
    name: 'محافظة مطروح',
    capital: 'مرسى مطروح',
    region: 'المحافظات الحدودية',
    totalDirectoratesCount: 8,
    estimatedSchoolsCount: 320,
    estimatedStudentsCount: 135000,
    directorates: [
      { id: 'mtr_matrouh', name: 'إدارة مرسى مطروح التعليمية', governorateId: 'matrouh', schoolsCount: 140, studentsCount: 68000 },
      { id: 'mtr_hammam', name: 'إدارة الحمام التعليمية', governorateId: 'matrouh', schoolsCount: 65, studentsCount: 29000 },
      { id: 'mtr_alamein', name: 'إدارة العلمين التعليمية', governorateId: 'matrouh', schoolsCount: 32, studentsCount: 13000 },
      { id: 'mtr_dabaa', name: 'إدارة الضبعة التعليمية', governorateId: 'matrouh', schoolsCount: 45, studentsCount: 18000 },
      { id: 'mtr_siwa', name: 'إدارة سيوة التعليمية', governorateId: 'matrouh', schoolsCount: 28, studentsCount: 11000 },
      { id: 'mtr_barrani', name: 'إدارة براني التعليمية', governorateId: 'matrouh', schoolsCount: 38, studentsCount: 15000 },
      { id: 'mtr_salloum', name: 'إدارة السلوم التعليمية', governorateId: 'matrouh', schoolsCount: 18, studentsCount: 6800 },
      { id: 'mtr_negila', name: 'إدارة النجيلة التعليمية', governorateId: 'matrouh', schoolsCount: 24, studentsCount: 9200 }
    ]
  }
];

export function getGovernorateById(id: string): Governorate | undefined {
  return EGYPT_27_GOVERNORATES.find(g => g.id === id);
}

export function getDirectoratesByGovernorateId(govId: string): EducationalDirectorate[] {
  const gov = getGovernorateById(govId);
  return gov ? gov.directorates : [];
}
