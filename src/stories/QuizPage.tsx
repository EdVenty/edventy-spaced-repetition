import React from 'react';

import { Header } from './Header';
import './page.css';
import './quizPage.css';
import { Spacing } from './Spacing';
import { QuizCard, QuizCardProps } from './QuizCard';

type User = {
  name: string;
};

type Path = {
  text: string;
  value: string;
};

const pages: Path[] = [
  {
    text: "Home",
    value: "home"
  },
  {
    text: "Quiz",
    value: "quiz"
  },
  {
    text: "Notes",
    value: "notes"
  }
];

// const cardProps: QuizCardProps = {
//   questionText: "What is OSI?",
//     answerText: "The Open Systems Intercommunication  (OSI) model is a reference model from the International Organization for Standardization (ISO) that provides a common basis for the coordination of standards development for the purpose of systems interconnection. In the OSI reference model, the communications between systems are split into seven different abstraction layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
//     allQuestions: [
//         {
//             title: "What is COM?"
//         },
//         {
//             title: "Describe the networking principals.",
//             status: "mastered"
//         },
//         {
//             title: "What is OSI?"
//         }
//     ]
// }

type Question = {
  question: string;
  answer: string;
};

const questions: Question[] = [
  {
    question: "How much 2 + 2?",
    answer: `\`\`\`mermaid
flowchart LR
    A(are) --> B
    B(you) --> C
    C(albanian?)
\`\`\``
  },
  {
    question: "**why?**",
    answer: `- because
- it's not what you think.`
  }
]

export const QuizPage: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isAnswerOpened, setIsAnswerOpened] = React.useState(false);
  

  const q: Question | undefined = questions[currentQuestion];

  const onPageSelected = (p: number) => {
    setIsAnswerOpened(false);
    setCurrentQuestion(p - 1);
  }

  return (
    <article className='quiz-page-root'>
      <Header
        pages={pages}
        user={user}
        primary
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
      <section className="storybook-page quiz-page-section">
        <Spacing align='center' direction='vertical'>
          <QuizCard.WithMarkdown 
          opened={isAnswerOpened}
          question={q?.question} 
          answer={q?.answer} 
          style={{width: '100%'}} 
          allQuestions={questions.map(q => {return {title: q?.question}})}
          onPageSelected={onPageSelected}
          onOpen={() => setIsAnswerOpened(true)}
          onClose={() => setIsAnswerOpened(false)}
          sidebarProps={{style: {
            maxWidth: '200px'
          }}}
        />
        </Spacing>
      </section>
    </article>
  );
};
