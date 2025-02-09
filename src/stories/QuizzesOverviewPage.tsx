import React from 'react';

import { Header } from './Header';
import { Spacing } from './Spacing';
import { QuizPreview } from './QuizPreview';
import { Scrollview } from './Scrollview';

import './quizzes-overview-page.css';

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

type QuizHead = {
    title: string;
    size: number;
    author: string;
    rating?: number;
};

const quizzes: QuizHead[] = [
    {
        title: "Informatics - S1",
        size: 111,
        author: "@edventy",
        rating: 5
    },
    {
        title: "Physics - S2",
        size: 256,
        author: "@edventy"
    },
    {
        title: "Calculus - S1",
        size: 318,
        author: "@edventy"
    },
    {
        title: "Sociology - S1",
        size: 58,
        author: "@edventy"
    },
    {
        title: "Chemistry - S2",
        size: 118,
        author: "@edventy"
    },
    {
        title: "Math (more) - S2",
        size: 1111,
        author: "@edventy"
    }
]


export const QuizzesOverviewPage: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article className='quizzes-overview-page-root'>
      <Header
        pages={pages}
        current='q'
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
      <section className="quizzes-overview-page">
        <Scrollview direction="horizontal" step={200}>
          <Spacing>
              {quizzes.map(q => <QuizPreview {...q} className='h-full' style={{width: 250}} clickable/>)}
          </Spacing>
        </Scrollview>
      </section>
    </article>
  );
};
