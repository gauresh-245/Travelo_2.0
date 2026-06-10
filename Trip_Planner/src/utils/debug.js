



// Trip_Planner/src/utils/debug.js
export const debug = {
  log: (label, data) => {
    console.log(`🔍 [${label}]`, data);
  },
  
  error: (label, error) => {
    console.error(`❌ [${label}]`, error);
  },
  
  api: async (url, options = {}) => {
    try {
      console.log(`🌐 API Call: ${url}`, options);
      const response = await fetch(url, options);
      console.log(`📥 Response Status: ${response.status}`);
      
      const text = await response.text();
      console.log(`📄 Raw Response:`, text);
      
      try {
        const json = JSON.parse(text);
        console.log(`✅ Parsed JSON:`, json);
        return json;
      } catch {
        console.warn(`⚠️ Response is not JSON`);
        return { success: false, raw: text };
      }
    } catch (error) {
      console.error(`🚨 API Error:`, error);
      throw error;
    }
  }
};