import { Question } from '@/types/social';

export const questions: Question[] = [
  {
    id: 'topic',
    question: "What is the primary topic you would like me to write about?",
    description: "More detail will allow me to create a better, more valuable post",
    type: 'textarea',
    placeholder: "Provide detailed information about your topic..."
  },
  {
    id: 'brandVoice',
    question: "What is the preferred tone and style for your brand's content?",
    description: "Should the post be more casual and conversational, or formal and informative?",
    type: 'select',
    placeholder: "Select your preferred tone",
    options: [
      'Friendly and professional',
      'Authoritative and informative',
      'Casual and conversational',
      'Urgent and persuasive',
      'Trustworthy and educational',
      'Fun and engaging'
    ]
  },
  {
    id: 'keyMessages',
    question: "Are there any specific messages or themes that you want to emphasize in this post?",
    description: "List the key points you want to include in your post",
    type: 'textarea',
    placeholder: "List your key messages..."
  },
  {
    id: 'callToAction',
    question: "What specific actions do you want the audience to take after viewing this post?",
    description: "This could include dropping a comment, sending you a DM, engaging with specific content, or checking the link in your bio",
    type: 'textarea',
    placeholder: "Describe the desired actions you want your audience to take..."
  }
];