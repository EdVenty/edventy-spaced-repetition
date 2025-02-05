import { IQuiz } from "./Quiz";

export interface IQuizProgress{
    quiz: IQuiz;
    currentQuestionIndex: number;
    questionsResult: {[questionId: number]: boolean};
}