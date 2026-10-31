// Fictional people and offerings. Images are independently licensed editorial illustrations/photos.
export const ASSETS = {
  hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=82',
  interior: 'https://images.unsplash.com/photo-1642844771937-23accb161a3d?auto=format&fit=crop&w=1100&q=82',
  experience: 'https://images.unsplash.com/photo-1643660527190-4f401370f788?auto=format&fit=crop&w=1200&q=82',
  tools: 'https://images.unsplash.com/photo-1734518352262-bda6b9640b25?auto=format&fit=crop&w=950&q=82',
  braces: 'https://images.unsplash.com/photo-1777446899714-c26de766dffd?auto=format&fit=crop&w=950&q=82',
};

export const services = [
  {
    id: 'general', number: '01', label: 'General dentistry', short: 'Everyday care, thoughtfully done.',
    description: 'Explore example consultation, restorative, and routine dentistry pathways tailored to everyday oral-care needs.',
    details: ['Initial consultation and oral health discussion', 'Assessment of teeth and gums', 'A conversation about potential next steps'],
    note: 'A clinician would need to assess individual needs before recommending any treatment.', icon: 'tooth', color: 'sage'
  },
  {
    id: 'preventive', number: '02', label: 'Preventive care', short: 'Small steps. Lasting habits.',
    description: 'A prevention-focused approach that introduces oral hygiene, checkups, and practical ways to look after your smile.',
    details: ['Example hygiene consultation', 'Personalized home-care guidance', 'Routine assessment discussion'],
    note: 'Checkup frequency and procedures vary by person and clinician advice.', icon: 'sparkles', color: 'blue'
  },
  {
    id: 'orthodontics', number: '03', label: 'Orthodontics', short: 'A considered path to alignment.',
    description: 'Learn about possible alignment consultations, including discussion of braces and removable aligner options.',
    details: ['Alignment consultation', 'Discussion of possible treatment types', 'Illustrative follow-up plan'],
    note: 'Suitability, duration, and outcomes can only be assessed by a qualified clinician.', icon: 'smile', color: 'peach'
  },
  {
    id: 'cosmetic', number: '04', label: 'Cosmetic dentistry', short: 'Confidence, on your own terms.',
    description: 'Explore information about elective appearance-focused services and an individual approach to planning.',
    details: ['Aesthetic goals conversation', 'Possible whitening and restoration discussion', 'Risk, benefit, and alternatives overview'],
    note: 'Cosmetic procedures have limitations and potential risks; no result is guaranteed.', icon: 'star', color: 'lavender'
  }
];

export const practitioners = [
  { id: 'salma', name: 'Dr. Salma Bennani', initials:'SB', role:'General dentistry · fictional profile', specialty:'Patient-first consultations', bio:'A fictional practitioner created to demonstrate how a real clinic could introduce its team. In this concept, Salma brings a warm, collaborative approach to routine dental conversations.', color:'sage', portrait:'/portrait-salma.svg' },
  { id: 'youssef', name: 'Dr. Youssef El Idrissi', initials:'YE', role:'Orthodontics · fictional profile', specialty:'Clear communication', bio:'A fictional character for the NOVA portfolio experience. Youssef illustrates how a practice might explain alignment options without promising specific outcomes.', color:'peach', portrait:'/portrait-youssef.svg' },
  { id: 'lina', name: 'Dr. Lina Amrani', initials:'LA', role:'Preventive & aesthetic care · fictional profile', specialty:'Comfort-focused care', bio:'Lina is an invented profile for this demonstration, representing an attentive style of conversations about prevention and elective dental care.', color:'blue', portrait:'/portrait-lina.svg' },
];

export const faqs = [
  { question:'Is this a real dental clinic?', answer:'No. NOVA DENTAL is a fictional website concept developed for the Innovatechs portfolio. The clinicians, location, services, and appointment workflow are illustrative.' },
  { question:'Does choosing a date reserve a real appointment?', answer:'No. Dates and time preferences are only examples. This browser-only demo does not check real calendar availability or contact any clinic.' },
  { question:'How should I prepare for a first dental consultation?', answer:'A real practice may ask about your goals and relevant history using a secure channel. For this portfolio demo, please do not enter medical details or real personal information.' },
  { question:'How much do treatments cost?', answer:'This concept does not publish actual prices. Costs depend on the clinical assessment, treatment plan, and location; a real clinic would explain any quotation before treatment.' },
  { question:'Will I receive a confirmation email?', answer:'No. Submitting a demo request only saves an entry in this browser when local storage is available. No email, SMS, or clinical booking is created.' },
];

export const timePreferences = [
  { id:'morning', label:'Morning', hours:'09:00–12:00' },
  { id:'midday', label:'Midday', hours:'12:00–15:00' },
  { id:'afternoon', label:'Afternoon', hours:'15:00–18:00' },
];
