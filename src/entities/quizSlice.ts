import { IQuiz } from "./Quiz";
import { IQuizProgress } from "./QuizProgress";


export interface IQuizSlice{
    currentQuizProgress?: IQuizProgress;
    quizes?: IQuiz[],
    answerCollapsed: boolean;
}