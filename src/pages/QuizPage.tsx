import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startQuiz, collapseAnswer, setQuestion } from "../store/quizSlice";
import { IQuizProgress } from "../entities/QuizProgress";
import { useNavigate, useParams, useLocation } from "react-router";
import { FirebaseContext } from "../context/firebase";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDocToQuiz } from "../functions/firestore";
// import { Button, Card, Collapse, Divider, Flex, List, Pagination, Spin, Tag, Typography } from "antd";
// import { DownOutlined, UpOutlined } from "@ant-design/icons";
// import Markdown from "react-markdown";
// import remarkMath from 'remark-math';
// import callouts from 'remark-callouts';
// import remarkParse from 'remark-parse';
// import rehypeKatex from 'rehype-katex';
// import remarkGfm from 'remark-gfm';
// @ts-ignore
// import remarkMermaid from 'remark-mermaid-plugin';
// import rehypeRaw from 'rehype-raw';
// import rehypeStringify from 'rehype-stringify';
import { Header } from "../stories/Header";
import { Spacing } from "../stories/Spacing";
import { QuizCard } from "../stories/QuizCard";

import '../stories/quizPage.css';
import { Typography } from "../stories/Typography";


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


export function QuizPage () {
    const { db } = useContext(FirebaseContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { quizId } = useParams();
    // const [ isPaginationOnTop, setIsPaginationOnTop ] = useState(false);
    // const [ shouldUpdateProgress, setShouldUpdateProgress ] = useState(false);
    const [ isAnswerOpened, setIsAnswerOpened ] = useState(false);
    
    // const tagsData = [{
    //     title: "Пройдено",
    //     data: "done"
    // }]

    useEffect(() => {
        // Fetch quiz by id
        // Dispatch startQuiz
        if(db && quizId){
            getDoc(doc(db, "quiz", quizId)).then((doc) => {
                if(doc.exists()){
                    dispatch(startQuiz(firestoreDocToQuiz(doc)));
                    console.log("Quiz fetched");
                }
            }).catch((error) => {
                console.error(error);
                navigate("/e");
            });
        }
    }, [db, quizId]);

    // useEffect(() => {
    //     if(db && quizId && auth && auth.currentUser != null){
    //         getDoc(doc(db, "user", auth.currentUser.uid, "quiz", quizId)).then((doc) => {
    //             if(doc.exists()){
    //                 const data = doc.data();
    //                 console.log("Progress data got.")
    //                 if (data['questions'] != undefined){
    //                     dispatch(setAllQuestionsResult(data['questions']));
    //                     console.log("Progress set.");
    //                 }
    //             }
    //         });
    //     }
    // }, [auth?.currentUser]);
    
    // const isAnswerCollapsed = useSelector((state: any) => state.quiz.answerCollapsed);
    const progress: IQuizProgress | undefined = useSelector((state: any) => state.quiz.currentQuizProgress);
    const quiz = progress?.quiz;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(progress && db && quizId && auth && auth.currentUser != null && shouldUpdateProgress){
    //         console.log("Setting progress.", progress.questionsResult)
    //         setDoc(doc(db, "user", auth.currentUser.uid, "quiz", quizId), {
    //             questions: progress.questionsResult
    //         });
    //     }
    // }, [progress?.questionsResult])

    const onSetQuestion = (q: number) => {
        dispatch(collapseAnswer());
        dispatch(setQuestion(q - 1));
    }

    // const onCollapseButton = () => {   
    //     if(isAnswerCollapsed){
    //         dispatch(uncollapseAnswer());
    //     }
    //     else{
    //         dispatch(collapseAnswer());
    //     }
    // }

    // const onTagClick = () => {
    //     if(progress){
    //         dispatch(setCurrentQuestionResult(!progress.questionsResult[progress.currentQuestionIndex]));
    //         setShouldUpdateProgress(true);
    //     }
    // }

    // const markQuestionAsSuccessAndGoNext = () => {
    //     dispatch(setCurrentQuestionResult(true));
    //     onNextQuestion();
    // }
    // const markQuestionAsFailureAndGoNext = () => {
    //     dispatch(setCurrentQuestionResult(false));
    //     onNextQuestion();
    // }

    // const collapseButtonText = isAnswerCollapsed ? "Показать ответ" : "Скрыть ответ";

    const onPageSelected = (p: number) => {
        setIsAnswerOpened(false);
        onSetQuestion(p);
    }

    var content = 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* <Spin size="large" /> */}
            <Typography>Loading</Typography>
        </div>;
    if(quiz){
        const q = quiz.questions[progress.currentQuestionIndex];
        return (
            <article className='quiz-page-root'>
              <Header
                pages={pages}
                primary
                onNavClick={(p) => navigate(p)}
                current={'/' + location.pathname.split('/')[1]}
              />
              <section className="w-full quiz-content">
                <Spacing align='center' direction='vertical'>
                    <QuizCard.WithMarkdown 
                        opened={isAnswerOpened}
                        title={quiz.title}
                        question={q.question} 
                        answer={q.answer} 
                        style={{width: '100%', maxWidth: '1000px'}} 
                        allQuestions={quiz.questions.map(q => {return {title: q?.question}})}
                        onPageSelected={onPageSelected}
                        onOpen={() => setIsAnswerOpened(true)}
                        onClose={() => setIsAnswerOpened(false)}
                        sidebarProps={{style: {
                            maxWidth: '300px'
                        }}}
                    />
                </Spacing>
              </section>
            </article>
        );
    }

    return content;
}