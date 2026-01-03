
import { GoogleGenAI } from "@google/genai";

// Fix: analyzeLongReport uses Gemini to extract key insights and recommendations from human rights reports
export const analyzeLongReport = async (reportText: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبيراً في الشأن الحقوقي اليمني، قم بتحليل التقرير التالي واستخرج النقاط الأساسية، الضحايا، الجهات المسؤولة، وتوصيات ختامية بلغة عربية رصينة: ${reportText}`,
      config: {
        temperature: 0.3,
        maxOutputTokens: 2000,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    return "نعتذر، تعذر معالجة التقرير حالياً. يرجى المحاولة لاحقاً.";
  }
};

// Fix: Added missing generateSocialMediaPost export to resolve the module error in AdminDashboard
export const generateSocialMediaPost = async (content: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك أخصائي تواصل اجتماعي لمؤسسة حقوقية، قم بتحويل النص التالي إلى منشور جذاب ومنظم لمنصات التواصل الاجتماعي باللغة العربية مع استخدام هاشتاجات مناسبة تتعلق بحرية الصحافة في اليمن: ${content}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Social Post Generation Failed:", error);
    return "نعتذر، تعذر إنشاء المنشور في الوقت الحالي.";
  }
};
