import { useNavigate } from "react-router";
import { Button } from "../stories/Button";
import { Header } from "../stories/Header";
import { Typography } from "../stories/Typography";

import '../stories/mainPage.css';
import { Spacing } from "../stories/Spacing";

type Path = {
    text: string;
    value: string;
};
  

const pages: Path[] = [
    {
        text: "Home",
        value: "/"
    },
    {
        text: "Quizzes",
        value: "/q"
    },
    {
        text: "Notes",
        value: "/"
    }
];

export function MainPage () {
    const navigate = useNavigate();
    
    return <article>
        <Header
            pages={pages}
            onNavClick={(p) => navigate(p)}
            current={'/' + location.pathname.split('/')[1]}
        />
        <Spacing className="main-page" direction="vertical"> 
            <Typography.Heading1>Hello</Typography.Heading1>
            <Typography>Welcome to Edventy's Learning Platform (originally Spaced Learning)!</Typography>
            <Button onClick={() => navigate('/q')} label="Go to quizzes"/>
        </Spacing>
    </article>
}