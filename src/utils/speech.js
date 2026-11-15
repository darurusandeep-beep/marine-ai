// Text-to-Speech utility utilizing Browser Native SpeechSynthesis
export const speakText = (text, langCode = 'hi-IN') => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn("Speech synthesis not supported on this browser.");
    return;
  }

  // Cancel any ongoing utterance
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9; // Slightly slower for language learners
  utterance.pitch = 1.0;

  // Map our language IDs to BCP-47 language tags
  const codeMap = {
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    bn: 'bn-IN',
    mr: 'mr-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    gu: 'gu-IN',
    pa: 'pa-IN',
    en: 'en-IN'
  };

  const targetLang = codeMap[langCode] || langCode || 'hi-IN';
  utterance.lang = targetLang;

  // Try to pick a native voice if available
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0])) ||
                voices.find(v => v.lang.includes('IN'));
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};
