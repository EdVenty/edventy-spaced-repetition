import React, { useContext, useEffect, useState } from 'react';
// import { List, Card, Typography, Spin, Button } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../context/firebase';
import { IQuiz } from '../entities/Quiz';
import { useLocation, useNavigate } from 'react-router';
import { Header } from '../stories/Header';
import { Spacing } from '../stories/Spacing';
import { QuizPreview } from '../stories/QuizPreview';
import { Scrollview } from '../stories/Scrollview';
import { Typography } from '../stories/Typography';

// const { Title } = Typography;


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
        value: "/n"
    }
];


export const OverviewQuizzesPage: React.FC = () => {
    const { db } = useContext(FirebaseContext);
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!db){
            return;
        }
        const fetchQuizzes = async () => {
            const quizCollection = collection(db, 'quiz');
            const quizSnapshot = await getDocs(quizCollection);
            const quizList = quizSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as IQuiz[];
            setQuizzes(quizList);
            setLoading(false);
        };

        fetchQuizzes();
    }, [db]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                {/* <Spin size="large" /> */}
                <Typography>Loading</Typography>
            </div>
        );
    }

    return <article className='quizzes-overview-page-root'>
        <Header
            pages={pages}
            onNavClick={(p) => navigate(p)}
            current={'/' + location.pathname.split('/')[1]}
        />
        <section className="quizzes-overview-page">
        <Scrollview direction="horizontal">
            <Spacing>
                {quizzes.map(q => <QuizPreview 
                    title={q.title}
                    size={q.questions.length}
                    className='h-full' 
                    style={{width: 250}} 
                    clickable
                    onClick={() => navigate(`/q/${q.id}`)}
                />)}
            </Spacing>
        </Scrollview>
        </section>
    </article>;
};
