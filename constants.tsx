
import { 
  SiteSettings, TeamMember, Trainer, TrainingCourse, 
  Violation, NewsArticle, Project, MediaItem, SlideItem, Report, NavItem 
} from './types';

// Fix: Updated DEFAULT_SETTINGS to include mapIframe
export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'مؤسسة بيت الصحافة - Press House',
  logoUrl: 'https://ph-ye.org/logo.png',
  primaryColor: '#003399',
  secondaryColor: '#d4af37',
  typography: 'font-cairo',
  aboutContent: {
    heroTitle: 'صحافة حرة من أجل الإنسان',
    heroDescription: 'مؤسسة مجتمع مدني تهدف إلى تعزيز حرية الإعلام وخلق مساحة نقاش مهني وعملي للصحفيين والصحفيات.',
    vision: 'صحافة مهنية حرة أولويتها الإنسان',
    mission: 'أن تصبح بيت الصحافة المؤسسة الأولى في تعزيز حرية الصحافة وحمل مطالبها والدفاع عن استحقاقاتها وحضورها وتعزز دورها في الدفاع عن الإنسان أولاً وأخيراً.',
    intro: 'في ظل الوضع القائم في اليمن والحرب المستمرة، عاشت الصحافة تأثيرات كل هذه الظروف، واجهتها، وانتكست كثيراً بسببها، خاصة في ظل الحاجة الماسة لتعزيز وإسناد نقابة الصحفيين اليمنيين.'
  },
  contact: {
    email: 'Info@phye.org',
    phone: '04-210613',
    whatsapp: '967737095047',
    address: 'تعز، الجمهورية اليمنية',
    mapLocation: 'H2H9+P9J, Taizz, Yemen',
    mapIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.4312818621415!2d44.0041283!3d13.5783333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x161aa564b6e5668b%3A0x8e83f8f1c1f1f1f1!2sTaizz%2C%20Yemen!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }
};

// Fix: Export CONTACT_INFO
export const CONTACT_INFO = DEFAULT_SETTINGS.contact;

export const REAL_TEAM: TeamMember[] = [
  { id: 'tm1', name: 'محمد الحريبي', role: 'رئيس المؤسسة', image: 'https://i.pravatar.cc/150?u=tm1', category: 'leadership' },
  { id: 'tm2', name: 'مازن فارس', role: 'المدير التنفيذي', image: 'https://i.pravatar.cc/150?u=tm2', category: 'leadership' },
  { id: 'tm3', name: 'الفتح العيسائي', role: 'مدير البرامج', image: 'https://i.pravatar.cc/150?u=tm3', category: 'leadership' },
  { id: 'tm4', name: 'مكين العوجري', role: 'مدير وحدة المالية', image: 'https://i.pravatar.cc/150?u=tm4', category: 'leadership' },
  { id: 'tm5', name: 'رانيا عبدالله', role: 'وحدة العمليات', image: 'https://i.pravatar.cc/150?u=tm5', category: 'staff' },
  { id: 'tm6', name: 'أبرار مصطفى', role: 'العلاقات العامة', image: 'https://i.pravatar.cc/150?u=tm6', category: 'staff' },
  { id: 'tm7', name: 'أحمد منعم', role: 'إدارة الإعلام', image: 'https://i.pravatar.cc/150?u=tm7', category: 'staff' },
  { id: 'tm8', name: 'محمد الصلاحي', role: 'مدير وحدة الرصد', image: 'https://i.pravatar.cc/150?u=tm8', category: 'staff' },
  { id: 'tm9', name: 'إيهاب العبسي', role: 'متابعة وتقييم', image: 'https://i.pravatar.cc/150?u=tm9', category: 'staff' },
  { id: 'tm10', name: 'نعمة البرحي', role: 'الموارد البشرية', image: 'https://i.pravatar.cc/150?u=tm10', category: 'staff' },
];

export const ADVISORY_BOARD: TeamMember[] = [
  { id: 'ab1', name: 'زكريا الكمالي', role: 'أستاذ', image: 'https://i.pravatar.cc/150?u=ab1', category: 'advisory' },
  { id: 'ab2', name: 'د. منصور القدسي', role: 'دكتور', image: 'https://i.pravatar.cc/150?u=ab2', category: 'advisory' },
  { id: 'ab3', name: 'أ. وداد البدوي', role: 'أستاذة', image: 'https://i.pravatar.cc/150?u=ab3', category: 'advisory' },
  { id: 'ab4', name: 'أ. سعيد الصوفي', role: 'أستاذ', image: 'https://i.pravatar.cc/150?u=ab4', category: 'advisory' },
  { id: 'ab5', name: 'أ. بسام غبر', role: 'أستاذ', image: 'https://i.pravatar.cc/150?u=ab5', category: 'advisory' },
];

export const PROJECTS: Project[] = [
  { id: 'p1', title: 'مشروع إحياء القيم الصحفية', description: 'يهدف لتكريم أعلام الصحافة اليمنية والاحتفاء بالقيم التي تمثلوها.', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800', activities: ['إحياء ذكرى عبدالحبيب سالم', 'إحياء ذكرى مهدي الشنواح', 'ذكرى اغتيال محمد العبسي'], images: ['https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800'] },
  { id: 'p2', title: 'إحياء اليوم العالمي للتراث السمعي والبصري', description: 'التعريف بأهمية حفظ التراث السمعي والبصري وإثارة قضية أرشيف صحيفة الجمهورية.', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800', activities: ['ندوة أرشيف اليمن', 'معرض صور تعز القديمة'], images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800'] },
  { id: 'p3', title: 'مشروع إنهاء الإفلات من العقاب', description: 'التأكيد على عدم إفلات مرتكبي الانتهاكات من العقاب في اليمن.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800', activities: ['ندوة بعنوان ثمن الحقيقة', 'جلسة استماع لشهادات صحفيين مفرج عنهم'], images: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800'] },
  { id: 'p4', title: 'مشروع دقة لمكافحة المعلومات المضللة', description: 'الحد من انتشار المعلومات المضللة وتزويد الصحفيين بمهارات التحقق.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', activities: ['دورة تدريبية لـ 15 صحفياً', 'إنتاج 15 مادة تحقق'], images: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'] }
];

// Fix: Export REAL_PROJECTS alias
export const REAL_PROJECTS = PROJECTS;

export const PARTNERS = [
  { id: 'pa1', name: 'مؤسسة أرنيادا للتنمية الثقافية', logo: 'https://via.placeholder.com/150' },
  { id: 'pa2', name: 'مؤسسة قرار للإعلام والتنمية', logo: 'https://via.placeholder.com/150' },
  { id: 'pa3', name: 'منصة يوب يوب (YoopYupFact)', logo: 'https://via.placeholder.com/150' },
  { id: 'pa4', name: 'تكتل وهج الشبابي', logo: 'https://via.placeholder.com/150' },
  { id: 'pa5', name: 'مؤسسة ألف لدعم وحماية التعليم', logo: 'https://via.placeholder.com/150' },
];

export const MOCK_TRAINERS: Trainer[] = [
  { id: 'tr1', name: 'د. منصور القدسي', role: 'خبير أكاديمي', bio: 'أستاذ الصحافة والإعلام، متخصص في أخلاقيات المهنة والاستقصاء.', expertise: ['الصحافة الاستقصائية', 'أخلاقيات المهنة'], image: 'https://i.pravatar.cc/150?u=ab2' },
  { id: 'tr2', name: 'أ. وداد البدوي', role: 'صحفية وحقوقية', bio: 'ناشطة في مجال حقوق الإنسان وحرية التعبير، متخصصة في صحافة النوع الاجتماعي.', expertise: ['الأمن الرقمي', 'صحافة حقوق الإنسان'], image: 'https://i.pravatar.cc/150?u=ab3' }
];

export const MOCK_COURSES: TrainingCourse[] = [
  { 
    id: 'c1', title: 'أساسيات التحقق من المعلومات الرقمية', description: 'دورة مكثفة حول أدوات التحقق وكشف التزييف العميق.', trainerId: 'tr1', startDate: '2025-06-01', endDate: '2025-06-15', status: 'upcoming', category: 'تحقق', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', curriculum: ['أدوات البحث العكسي', 'تحليل الميتاداتا', 'كشف التلاعب بالذكاء الاصطناعي']
  },
  { 
    id: 'c2', title: 'الصحافة الاستقصائية في مناطق النزاع', description: 'كيفية إنتاج تقارير معمقة مع الحفاظ على السلامة المهنية.', trainerId: 'tr2', startDate: '2025-07-01', endDate: '2025-07-20', status: 'upcoming', category: 'استقصاء', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800', curriculum: ['إدارة المصادر السرية', 'أمن البيانات', 'تحليل الوثائق الرسمية']
  }
];

export const VIOLATION_DATA: Violation[] = [
  { id: 'v1', date: '2025-01-10', type: 'اعتقال تعسفي', victim: 'أحمد صالح', city: 'صنعاء', perpetrator: 'سلطات الأمر الواقع', severity: 'high', description: 'تم اعتقاله من مقر عمله.', status: 'confirmed', month: 'يناير' },
  { id: 'v2', date: '2025-01-25', type: 'اعتداء جسدي', victim: 'سارة محمد', city: 'تعز', perpetrator: 'مجهولون', severity: 'medium', description: 'اعتداء أثناء تغطية مسيرة.', status: 'confirmed', month: 'يناير' },
  { id: 'v3', date: '2025-02-14', type: 'تهديد بالقتل', victim: 'علي ناصر', city: 'عدن', perpetrator: 'مجهولون', severity: 'high', description: 'رسائل تهديد عبر الهاتف.', status: 'confirmed', month: 'فبراير' },
  { id: 'v4', date: '2025-02-28', type: 'حجب موقع', victim: 'منصة إخبارية', city: 'صنعاء', perpetrator: 'وزارة الاتصالات', severity: 'low', description: 'حجب الموقع داخل اليمن.', status: 'confirmed', month: 'فبراير' },
  { id: 'v5', date: '2025-03-05', type: 'اعتقال تعسفي', victim: 'ياسر خالد', city: 'مأرب', perpetrator: 'جهات أمنية', severity: 'high', description: 'احتجاز لمدة أسبوع.', status: 'confirmed', month: 'مارس' },
];

// Fix: Export MOCK_VIOLATIONS alias
export const MOCK_VIOLATIONS = VIOLATION_DATA;

export const GOVERNORATE_STATS = [
  { name: 'صنعاء', count: 45, risk: 'high' },
  { name: 'تعز', count: 32, risk: 'high' },
  { name: 'عدن', count: 28, risk: 'medium' },
  { name: 'مأرب', count: 12, risk: 'medium' },
  { name: 'حضرموت', count: 8, risk: 'low' },
];

// Fix: Added missing mock news data
export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'مؤسسة بيت الصحافة تدشن برنامج التدريب النوعي',
    summary: 'أعلنت المؤسسة عن إطلاق سلسلة من الدورات التدريبية المتخصصة في الصحافة الاستقصائية.',
    content: 'في إطار سعيها لتطوير مهارات الصحفيين اليمنيين، دشنت مؤسسة بيت الصحافة اليوم برنامجاً تدريبياً نوعياً يستهدف 50 صحفياً وصحفية من مختلف المحافظات.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
    date: '2025-04-15',
    category: 'فعاليات'
  },
  {
    id: 'n2',
    title: 'تقرير جديد يرصد انتهاكات الحريات الإعلامية',
    summary: 'أصدر مرصد بيت الصحافة تقريره الشهري حول حالة الحريات الإعلامية في اليمن لشهر مارس.',
    content: 'كشف التقرير الجديد عن تصاعد وتيرة الانتهاكات ضد الصحفيين، مشيراً إلى تسجيل 15 حالة انتهاك متنوعة خلال الشهر الماضي.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800',
    date: '2025-04-05',
    category: 'تقارير',
    relatedViolationId: 'v5'
  }
];

// Fix: Added missing mock reports data
export const MOCK_REPORTS: Report[] = [
  {
    id: 'r1',
    title: 'التقرير السنوي للحريات الإعلامية 2024',
    type: 'annual',
    date: '2025-01-20',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400',
    url: '#'
  },
  {
    id: 'r2',
    title: 'تقرير حول وضع الصحفيات في مناطق النزاع',
    type: 'special',
    date: '2025-03-08',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400',
    url: '#'
  }
];

// Fix: Added missing mock fact check data
export const MOCK_FACT_CHECKS = [
  { id: 'fc1', title: 'حقيقة الفيديو المتداول حول انفجار عدن', result: 'false', evidence: 'الفيديو قديم ويعود لعام 2020 في لبنان.' },
  { id: 'fc2', title: 'ادعاءات حول إغلاق طريق تعز الرئيسي', result: 'misleading', evidence: 'الطريق مفتوح جزئياً فقط للشاحنات.' }
];

// Fix: Added missing slider data
export const SLIDER_DATA: SlideItem[] = [
  {
    id: 1,
    title: 'نحمي الحقيقة وندعم حرية الصحافة',
    description: 'نحن صوت من لا صوت له في اليمن، نعمل على توثيق الانتهاكات ودعم العمل الصحفي المستقل.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200',
    tag: 'حماية',
    linkTab: 'observatory'
  },
  {
    id: 2,
    title: 'أكاديمية التدريب والتطوير المهني',
    description: 'برامج تدريبية متطورة لتزويد الصحفيين بمهارات العصر الرقمي والتحقق من المعلومات.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
    tag: 'تدريب',
    linkTab: 'academy'
  }
];

// Fix: Added missing navigation items
export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'nav1', label: 'الرئيسية', tab: 'home', isVisible: true, order: 1, iconName: 'Home', category: 'main' },
  { id: 'nav2', label: 'المرصد', tab: 'observatory', isVisible: true, order: 2, iconName: 'ShieldAlert', category: 'main' },
  { id: 'nav3', label: 'الأكاديمية', tab: 'academy', isVisible: true, order: 3, iconName: 'GraduationCap', category: 'main' },
  { id: 'nav4', label: 'تحقق', tab: 'factcheck', isVisible: true, order: 4, iconName: 'SearchCheck', category: 'media' },
  { id: 'nav5', label: 'التقارير', tab: 'reports', isVisible: true, order: 5, iconName: 'FileText', category: 'media' },
  { id: 'nav6', label: 'الأخبار', tab: 'news', isVisible: true, order: 6, iconName: 'Newspaper', category: 'media' },
  { id: 'nav7', label: 'من نحن', tab: 'about', isVisible: true, order: 7, iconName: 'Info', category: 'support' },
];

// Fix: Added missing opportunities data
export const OPPORTUNITIES = [
  {
    id: 'o1',
    title: 'باحث ميداني - وحدة الرصد',
    type: 'job',
    deadline: '2025-05-30',
    description: 'مطلوب باحث للعمل على توثيق الانتهاكات في الميدان.',
    location: 'تعز / عدن'
  },
  {
    id: 'o2',
    title: 'متطوع في إدارة منصات التواصل',
    type: 'volunteer',
    deadline: '2025-06-15',
    description: 'المساهمة في نشر محتوى المؤسسة الحقوقي.',
    location: 'عن بعد'
  }
];
