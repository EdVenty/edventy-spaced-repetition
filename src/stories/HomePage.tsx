import React from 'react';

import { Header } from './Header';
import './page.css';

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

export const HomePage: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article>
      <Header
        pages={pages}
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />

      <section className="storybook-page">
        <h2>Home Page</h2>
        
      </section>
    </article>
  );
};
