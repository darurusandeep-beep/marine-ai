// Comprehensive Indian Language Database for INDRAT

export const SUPPORTED_LANGUAGES = [
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', script: 'Devanagari', color: 'from-orange-500 to-amber-500' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🪷', script: 'Tamil', color: 'from-red-500 to-rose-600' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🌾', script: 'Telugu', color: 'from-emerald-500 to-teal-600' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🐯', script: 'Bengali', color: 'from-amber-500 to-yellow-600' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🐘', script: 'Kannada', color: 'from-blue-500 to-indigo-600' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🌴', script: 'Malayalam', color: 'from-green-600 to-emerald-700' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', flag: '🚩', script: 'Devanagari', color: 'from-orange-600 to-red-600' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🦁', script: 'Gujarati', color: 'from-yellow-500 to-amber-600' },
  { id: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🪕', script: 'Gurmukhi', color: 'from-rose-500 to-purple-600' },
  { id: 'en', name: 'English', native: 'English', flag: '🌐', script: 'Latin', color: 'from-blue-600 to-cyan-600' },
];

export const TIME_GOALS = [
  { id: 'casual', label: 'Casual', minutes: 3, xpBonus: '1x XP', desc: '1 quick lesson a day' },
  { id: 'regular', label: 'Regular', minutes: 5, xpBonus: '1.2x XP', desc: '2 lessons a day (Recommended)' },
  { id: 'serious', label: 'Serious', minutes: 10, xpBonus: '1.5x XP', desc: 'Build rapid conversational fluency' },
  { id: 'intense', label: 'Intense', minutes: 15, xpBonus: '2x XP', desc: 'Master the language in record time' }
];

// Rich curriculum with Units and Lesson Quizzes
export const CURRICULUM = {
  // Learning Tamil
  ta: {
    title: 'Tamil (தமிழ்)',
    units: [
      {
        id: 'ta-unit-1',
        unitNumber: 1,
        title: 'Unit 1: Essential Greetings & Introductions',
        description: 'Learn to say hello, introduce yourself, and show respect.',
        color: '#58cc02', // Emerald green
        lessons: [
          {
            id: 'ta-1-1',
            title: 'First Words & Greetings',
            xp: 15,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'What does this greeting mean?',
                phrase: 'வணக்கம்',
                phonetic: 'Vanakkam',
                options: ['Hello / Greetings', 'Thank you', 'Goodbye', 'Good morning'],
                correctIndex: 0,
                audioText: 'வணக்கம்',
                tip: 'வணக்கம் (Vanakkam) is the classic respectful greeting used anytime!'
              },
              {
                type: 'word-bank',
                prompt: 'Translate to Tamil: "Thank you very much"',
                englishSentence: 'Thank you very much',
                targetSentence: 'மிக்க நன்றி',
                phonetic: 'Mikka nandri',
                audioText: 'மிக்க நன்றி',
                pool: ['மிக்க', 'நன்றி', 'வணக்கம்', 'வாருங்கள்', 'நலம்'],
                correctWords: ['மிக்க', 'நன்றி']
              },
              {
                type: 'match-pairs',
                prompt: 'Match the Tamil words with their meanings',
                pairs: [
                  { left: 'வணக்கம் (Vanakkam)', right: 'Hello' },
                  { left: 'நன்றி (Nandri)', right: 'Thank you' },
                  { left: 'ஆமாம் (Aamam)', right: 'Yes' },
                  { left: 'இல்லை (Illai)', right: 'No' }
                ]
              },
              {
                type: 'multiple-choice',
                prompt: 'How do you say "How are you?" in Tamil?',
                phrase: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
                phonetic: 'Neengal eppadi irukkireergal?',
                options: ['Neengal eppadi irukkireergal?', 'Ungal peyar enna?', 'Engae poreenga?', 'Enakku theriyadhu'],
                correctIndex: 0,
                audioText: 'நீங்கள் எப்படி இருக்கிறீர்கள்?'
              },
              {
                type: 'fill-blank',
                prompt: 'Fill in the blank: "என் _____ கார்த்திக்" (My name is Karthik)',
                sentenceParts: ['என்', 'கார்த்திக்'],
                phonetic: 'En [peyar] Karthik',
                options: ['பெயர் (Peyar)', 'ஊர் (Oor)', 'வீடு (Veedu)', 'நண்பன் (Nanban)'],
                correctAnswer: 'பெயர் (Peyar)',
                audioText: 'என் பெயர் கார்த்திக்'
              }
            ]
          },
          {
            id: 'ta-1-2',
            title: 'Yes, No & Politeness',
            xp: 20,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'Select the correct word for "Please":',
                phrase: 'தயவுசெய்து',
                phonetic: 'Thayavuseidhu',
                options: ['Thayavuseidhu', 'Nandri', 'Vanakkam', 'Mannikkavum'],
                correctIndex: 0,
                audioText: 'தயவுசெய்து'
              },
              {
                type: 'word-bank',
                prompt: 'Assemble: "I am fine" (நான் நலமாக இருக்கிறேன்)',
                englishSentence: 'I am doing well / fine',
                targetSentence: 'நான் நலம்',
                phonetic: 'Naan nalam',
                audioText: 'நான் நலம்',
                pool: ['நான்', 'நலம்', 'நீங்கள்', 'ஊர்', 'இல்லை'],
                correctWords: ['நான்', 'நலம்']
              },
              {
                type: 'match-pairs',
                prompt: 'Match the polite expressions',
                pairs: [
                  { left: 'மன்னிக்கவும் (Mannikkavum)', right: 'Sorry / Excuse me' },
                  { left: 'சரி (Sari)', right: 'Okay / All right' },
                  { left: 'வாருங்கள் (Vaarungal)', right: 'Welcome / Come in' },
                  { left: 'போய் வருகிறேன் (Poi varugiren)', right: 'Goodbye' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ta-unit-2',
        unitNumber: 2,
        title: 'Unit 2: Chai, Filter Coffee & Food Stall',
        description: 'Order food, ask for coffee, and taste the flavors of India.',
        color: '#1cb0f6', // Duolingo blue
        lessons: [
          {
            id: 'ta-2-1',
            title: 'Ordering at a Darshini / Canteen',
            xp: 20,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'How do you ask for "One Filter Coffee"?',
                phrase: 'ஒரு பில்டர் காபி கொடுங்கள்',
                phonetic: 'Oru filter coffee kodungal',
                options: ['Oru filter coffee kodungal', 'Oru chai venum', 'Tiffin ready-ah?', 'Evvalavu aachu?'],
                correctIndex: 0,
                audioText: 'ஒரு பில்டர் காபி கொடுங்கள்'
              },
              {
                type: 'word-bank',
                prompt: 'Assemble: "I want hot tea"',
                englishSentence: 'I want hot tea',
                targetSentence: 'எனக்கு சூடான டீ வேண்டும்',
                phonetic: 'Enakku soodaana tea vendum',
                audioText: 'எனக்கு சூடான டீ வேண்டும்',
                pool: ['எனக்கு', 'சூடான', 'டீ', 'வேண்டும்', 'காபி', 'வேண்டாம்'],
                correctWords: ['எனக்கு', 'சூடான', 'டீ', 'வேண்டும்']
              },
              {
                type: 'match-pairs',
                prompt: 'Match the food items in Tamil',
                pairs: [
                  { left: 'தோசை (Dosai)', right: 'Crispy Dosa' },
                  { left: 'தண்ணீர் (Thanneer)', right: 'Water' },
                  { left: 'சாப்பாடு (Saappaadu)', right: 'Meal / Food' },
                  { left: 'இனிப்பு (Inippu)', right: 'Sweet' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ta-unit-3',
        unitNumber: 3,
        title: 'Unit 3: Auto-Rickshaw & Getting Around',
        description: 'Ask for directions, negotiate with the auto driver, and navigate!',
        color: '#ff9600', // Sunset orange
        lessons: [
          {
            id: 'ta-3-1',
            title: 'Auto Meter & Directions',
            xp: 25,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'What does "எவ்வளவு?" (Evvalavu?) mean?',
                phrase: 'எவ்வளவு?',
                phonetic: 'Evvalavu?',
                options: ['How much?', 'Where?', 'When?', 'Why?'],
                correctIndex: 0,
                audioText: 'எவ்வளவு?'
              },
              {
                type: 'word-bank',
                prompt: 'Translate: "Where is the railway station?"',
                englishSentence: 'Where is the railway station?',
                targetSentence: 'ரயில் நிலையம் எங்கே?',
                phonetic: 'Railway nilayam engae?',
                audioText: 'ரயில் நிலையம் எங்கே?',
                pool: ['ரயில்', 'நிலையம்', 'எங்கே?', 'எப்போது?', 'நேராக'],
                correctWords: ['ரயில்', 'நிலையம்', 'எங்கே?']
              },
              {
                type: 'match-pairs',
                prompt: 'Match the directional words',
                pairs: [
                  { left: 'இங்கே (Ingae)', right: 'Here' },
                  { left: 'அங்கே (Angae)', right: 'There' },
                  { left: 'நேராக (Naeraaga)', right: 'Straight' },
                  { left: 'நிறுத்துங்கள் (Niruthungal)', right: 'Stop here' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // Learning Hindi
  hi: {
    title: 'Hindi (हिन्दी)',
    units: [
      {
        id: 'hi-unit-1',
        unitNumber: 1,
        title: 'Unit 1: Essential Greetings & Namaste',
        description: 'Learn the universal greeting Namaste and how to introduce yourself.',
        color: '#58cc02',
        lessons: [
          {
            id: 'hi-1-1',
            title: 'Greetings & Introduction',
            xp: 15,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'What is the most common polite greeting in Hindi?',
                phrase: 'नमस्ते',
                phonetic: 'Namaste',
                options: ['Namaste (Hello / Respects)', 'Shukriya (Thank you)', 'Alvida (Goodbye)', 'Haan (Yes)'],
                correctIndex: 0,
                audioText: 'नमस्ते'
              },
              {
                type: 'word-bank',
                prompt: 'Assemble: "आप कैसे हैं?" (How are you?)',
                englishSentence: 'How are you?',
                targetSentence: 'आप कैसे हैं?',
                phonetic: 'Aap kaise hain?',
                audioText: 'आप कैसे हैं?',
                pool: ['आप', 'कैसे', 'हैं?', 'मैं', 'ठीक', 'कहाँ'],
                correctWords: ['आप', 'कैसे', 'हैं?']
              },
              {
                type: 'match-pairs',
                prompt: 'Match the Hindi words with English',
                pairs: [
                  { left: 'धन्यवाद (Dhanyavaad)', right: 'Thank you' },
                  { left: 'हाँ (Haan)', right: 'Yes' },
                  { left: 'नहीं (Nahin)', right: 'No' },
                  { left: 'अच्छा (Achha)', right: 'Good / Okay' }
                ]
              },
              {
                type: 'fill-blank',
                prompt: 'Fill in the blank: "मेरा _____ राहुल है" (My name is Rahul)',
                sentenceParts: ['मेरा', 'राहुल है'],
                phonetic: 'Mera [naam] Rahul hai',
                options: ['नाम (Naam)', 'घर (Ghar)', 'शहर (Shahar)', 'दोस्त (Dost)'],
                correctAnswer: 'नाम (Naam)',
                audioText: 'मेरा नाम राहुल है'
              }
            ]
          },
          {
            id: 'hi-1-2',
            title: 'Numbers & Counting (1-5)',
            xp: 20,
            questions: [
              {
                type: 'match-pairs',
                prompt: 'Match the Hindi numbers',
                pairs: [
                  { left: 'एक (Ek)', right: 'One (1)' },
                  { left: 'दो (Do)', right: 'Two (2)' },
                  { left: 'तीन (Teen)', right: 'Three (3)' },
                  { left: 'चार (Chaar)', right: 'Four (4)' }
                ]
              },
              {
                type: 'multiple-choice',
                prompt: 'What number is "पाँच" (Paanch)?',
                phrase: 'पाँच',
                phonetic: 'Paanch',
                options: ['Five (5)', 'Four (4)', 'Six (6)', 'Three (3)'],
                correctIndex: 0,
                audioText: 'पाँच'
              }
            ]
          }
        ]
      },
      {
        id: 'hi-unit-2',
        unitNumber: 2,
        title: 'Unit 2: Chai, Dhaba & Street Food',
        description: 'Order Masala Chai and delicious samosas at the roadside tapri.',
        color: '#1cb0f6',
        lessons: [
          {
            id: 'hi-2-1',
            title: 'Tapri Chai & Snacks',
            xp: 20,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'How do you say "One cup of tea, please"?',
                phrase: 'एक कप चाय दीजिए',
                phonetic: 'Ek cup chai dijiye',
                options: ['Ek cup chai dijiye', 'Chai kahan hai?', 'Pani pilao', 'Bhookh lagi hai'],
                correctIndex: 0,
                audioText: 'एक कप चाय दीजिए'
              },
              {
                type: 'word-bank',
                prompt: 'Assemble: "Water is cold"',
                englishSentence: 'Water is cold',
                targetSentence: 'पानी ठंडा है',
                phonetic: 'Paani thanda hai',
                audioText: 'पानी ठंडा है',
                pool: ['पानी', 'ठंडा', 'है', 'गर्म', 'चाय', 'मीठा'],
                correctWords: ['पानी', 'ठंडा', 'है']
              },
              {
                type: 'match-pairs',
                prompt: 'Match food and taste',
                pairs: [
                  { left: 'मीठा (Meetha)', right: 'Sweet' },
                  { left: 'तीखा (Teekha)', right: 'Spicy' },
                  { left: 'गर्म (Garm)', right: 'Hot' },
                  { left: 'स्वादिष्ट (Swaadisht)', right: 'Delicious' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // Learning Telugu
  te: {
    title: 'Telugu (తెలుగు)',
    units: [
      {
        id: 'te-unit-1',
        unitNumber: 1,
        title: 'Unit 1: Namaskaram & First Conversations',
        description: 'Learn sweet Telugu greetings and personal introductions.',
        color: '#58cc02',
        lessons: [
          {
            id: 'te-1-1',
            title: 'Greetings & Well Being',
            xp: 15,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'How do you greet someone in Telugu?',
                phrase: 'నమస్కారం',
                phonetic: 'Namaskaram',
                options: ['Namaskaram', 'Dhanyavaadaalu', 'Bagunnara', 'Velostha'],
                correctIndex: 0,
                audioText: 'నమస్కారం'
              },
              {
                type: 'word-bank',
                prompt: 'Assemble: "మీరు ఎలా ఉన్నారు?" (How are you?)',
                englishSentence: 'How are you?',
                targetSentence: 'మీరు ఎలా ఉన్నారు?',
                phonetic: 'Meeru ela unnaaru?',
                audioText: 'మీరు ఎలా ఉన్నారు?',
                pool: ['మీరు', 'ఎలా', 'ఉన్నారు?', 'నేను', 'బాగున్నాను', 'ఎక్కడ'],
                correctWords: ['మీరు', 'ఎలా', 'ఉన్నారు?']
              },
              {
                type: 'match-pairs',
                prompt: 'Match Telugu phrases with English',
                pairs: [
                  { left: 'ధన్యవాదాలు (Dhanyavaadaalu)', right: 'Thank you' },
                  { left: 'నేను బాగున్నాను (Nenu baagunnaanu)', right: 'I am fine' },
                  { left: 'అవును (Avunu)', right: 'Yes' },
                  { left: 'కాదు (Kaadhu)', right: 'No' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // Learning Bengali
  bn: {
    title: 'Bengali (বাংলা)',
    units: [
      {
        id: 'bn-unit-1',
        unitNumber: 1,
        title: 'Unit 1: Nomoshkar & Sweet Bengali',
        description: 'Start speaking the language of Rabindranath Tagore and Rosogolla.',
        color: '#58cc02',
        lessons: [
          {
            id: 'bn-1-1',
            title: 'Greetings & Introduction',
            xp: 15,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'What does "নমস্কার" mean?',
                phrase: 'নমস্কার',
                phonetic: 'Nomoshkar',
                options: ['Greetings / Hello', 'Thank you', 'Goodbye', 'Welcome'],
                correctIndex: 0,
                audioText: 'নমস্কার'
              },
              {
                type: 'match-pairs',
                prompt: 'Match the Bengali terms',
                pairs: [
                  { left: 'ধন্যবাদ (Dhonnobaad)', right: 'Thank you' },
                  { left: 'আপনি কেমন আছেন? (Apni kemon aachen?)', right: 'How are you?' },
                  { left: 'আমি ভালো আছি (Ami bhalo aachi)', right: 'I am doing well' },
                  { left: 'খুব মিষ্টি (Khub mishti)', right: 'Very sweet' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // Learning Kannada
  kn: {
    title: 'Kannada (ಕನ್ನಡ)',
    units: [
      {
        id: 'kn-unit-1',
        unitNumber: 1,
        title: 'Unit 1: Namaskara & Bengaluru Basics',
        description: 'Learn Kannada to chat with locals, autos, and make friends!',
        color: '#58cc02',
        lessons: [
          {
            id: 'kn-1-1',
            title: 'Greetings & Kindness',
            xp: 15,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'How do you say "Hello" in Kannada?',
                phrase: 'ನಮಸ್ಕಾರ',
                phonetic: 'Namaskara',
                options: ['Namaskara', 'Dhanyavada', 'Hogi barthini', 'Haudu'],
                correctIndex: 0,
                audioText: 'ನಮಸ್ಕಾರ'
              },
              {
                type: 'match-pairs',
                prompt: 'Match Kannada words',
                pairs: [
                  { left: 'ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)', right: 'Thank you' },
                  { left: 'ಹೇಗಿದ್ದೀರಾ? (Hegiddeera?)', right: 'How are you?' },
                  { left: 'ಚೆನ್ನಾಗಿದ್ದೀನಿ (Chennagiddini)', right: 'I am fine' },
                  { left: 'ಎಷ್ಟು? (Eshtu?)', right: 'How much?' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // Learning Malayalam
  ml: {
    title: 'Malayalam (മലയാളം)',
    units: [
      {
        id: 'ml-unit-1',
        unitNumber: 1,
        title: "Unit 1: Namaskaram in God's Own Country",
        description: 'Learn the smooth rhythms of Malayalam phrases.',
        color: '#58cc02',
        lessons: [
          {
            id: 'ml-1-1',
            title: 'Greetings & Introduction',
            xp: 15,
            questions: [
              {
                type: 'multiple-choice',
                prompt: 'What does "നമസ്കാരം" mean?',
                phrase: 'നമസ്കാരം',
                phonetic: 'Namaskaram',
                options: ['Greetings / Hello', 'Thank you', 'Yes', 'See you later'],
                correctIndex: 0,
                audioText: 'നമസ്കാരം'
              },
              {
                type: 'match-pairs',
                prompt: 'Match Malayalam expressions',
                pairs: [
                  { left: 'നന്ദി (Nandi)', right: 'Thank you' },
                  { left: 'സുഖമാണോ? (Sukhamano?)', right: 'Are you fine?' },
                  { left: 'അതെ (Athe)', right: 'Yes' },
                  { left: 'അല്ല (Alla)', right: 'No' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
