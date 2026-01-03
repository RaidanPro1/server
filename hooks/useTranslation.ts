
export const translations = {
  ar: {
    siteName: 'بيت الصحافة',
    siteTagline: 'منصة مستقلة لرصد الحريات ودعم العمل الصحفي في اليمن',
    emergencyBtn: 'نظام الطوارئ (SOS)',
    searchPlaceholder: 'ابحث عن انتهاك، تقرير أو خبر...',
    violationArrests: 'اعتقال وحجز حرية',
    violationAssaults: 'اعتداءات جسدية ومادية',
    violationThreats: 'تهديدات ومضايقات',
    violationCensorship: 'حجب ومنع من النشر',
    violationLegal: 'إجراءات قانونية تعسفية',
    statTotalViolations: 'إجمالي الانتهاكات',
    statVerifiedClaims: 'ادعاءات تم التحقق منها',
    statTrainedJournalists: 'صحفيون متدربون',
    statActiveCases: 'قضايا قيد المتابعة',
    factCheckHero: 'تحقق من صحة الأخبار والصور',
    dropFiles: 'اسحب الملفات هنا أو انقر للتحميل',
    analyzeBtn: 'بدء التحليل',
    panicInstructions: 'في حالة الخطر، اضغط على الزر الأحمر لإرسال موقعك الجغرافي لفريق الدعم القانوني فوراً.',
    adminTitle: 'إدارة المحتوى',
    addViolation: 'إضافة انتهاك جديد',
    latestNews: 'آخر الأخبار والفعاليات',
    footerAbout: 'بيت الصحافة هي منظمة مجتمع مدني يمنية تهدف إلى تعزيز حرية الرأي والتعبير وحماية حقوق الصحفيين من خلال الرصد والتوثيق والتدريب.',
    quickLinks: 'روابط سريعة',
    newsletter: 'النشرة البريدية',
    subscribe: 'اشترك الآن',
  }
};

export const useTranslation = () => {
  const t = (key: keyof typeof translations.ar) => translations.ar[key] || key;
  return { t };
};
