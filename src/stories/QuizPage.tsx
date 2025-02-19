import React from 'react';

import { Header } from './Header';
import './page.css';
import './quizPage.css';
import { Spacing } from './Spacing';
import { QuizCard } from './QuizCard';

type User = {
  name: string;
};

type Path = {
  text: string;
  value: string;
};

const pages: Path[] = [
  {
      value: "",
      text: "Home"
  },
  {
      value: "q",
      text: "Quizzes"
  },
  {
      value: "n",
      text: "Notes"
  }
]

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
  },
  {
    question: 'Lorem ipsum',
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus pretium erat quis malesuada. Suspendisse in facilisis est. Phasellus blandit ornare arcu, ut commodo velit blandit sit amet. Praesent auctor massa ex, vitae euismod ligula semper nec. Etiam vitae tempor turpis. Nunc non interdum dui, at finibus nibh. Nulla leo ipsum, condimentum ac sollicitudin convallis, ultrices at diam. Phasellus lobortis erat eros, et bibendum tortor tempus non.

Pellentesque eu ligula aliquet, vehicula eros quis, rutrum nibh. Sed ac cursus lectus. Phasellus ut rhoncus sapien. Pellentesque varius lacinia rhoncus. Vivamus hendrerit nulla ut tortor venenatis fermentum. In convallis, neque non tincidunt lacinia, risus nulla faucibus lorem, nec ullamcorper eros velit a velit. Sed varius hendrerit dignissim. Nam id orci ac elit porta posuere. In in convallis libero, vitae tristique diam. Cras in venenatis diam. Nunc tortor lectus, porttitor eu consequat at, cursus vel neque. Nunc vulputate nibh quis felis pellentesque, nec vestibulum risus finibus. Integer ac ligula vulputate, hendrerit tortor at, blandit lectus. Integer pharetra eleifend est, vel dictum lacus maximus at.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi a urna in massa vehicula pulvinar. Proin bibendum quam ut ex vulputate, non posuere purus viverra. Nulla euismod elementum porta. Praesent sed magna vel mauris malesuada lacinia nec non felis. Pellentesque volutpat iaculis faucibus. Mauris feugiat viverra urna, sit amet faucibus felis bibendum eget. Fusce eu ex sit amet felis elementum faucibus id ac felis. Sed pharetra viverra lacus, et vulputate lectus. Nunc ornare, odio non condimentum mattis, justo mauris posuere est, id volutpat nisi leo a ante. Ut ultricies faucibus vulputate. Vivamus vel ipsum sem. Vivamus consequat lacus at euismod pretium. Suspendisse accumsan, libero nec commodo vulputate, mauris nisi bibendum orci, vitae commodo odio urna a justo.`
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
        current='q'
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
        />
        </Spacing>
      </section>
    </article>
  );
};
