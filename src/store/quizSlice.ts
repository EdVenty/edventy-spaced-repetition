import { createSlice } from '@reduxjs/toolkit'
import { IQuizSlice } from '../entities/quizSlice'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    currentQuizProgress: undefined,
    quizes: undefined,
    answerCollapsed: true
  } as IQuizSlice,
  reducers: {
    startQuiz: (state: IQuizSlice, action) => {
        state.currentQuizProgress = {
            quiz: action.payload,
            currentQuestionIndex: 0,
            questionsResult: {}
        }
    },
    setCurrentQuestionResult: (state: IQuizSlice, action) => {
        state.currentQuizProgress!.questionsResult[state.currentQuizProgress!.currentQuestionIndex] = action.payload;
    },
    nextQuestion: (state: IQuizSlice) => {
        state.currentQuizProgress!.currentQuestionIndex++;
        if(state.currentQuizProgress!.currentQuestionIndex >= state.currentQuizProgress!.quiz.questions.length){
            state.currentQuizProgress!.currentQuestionIndex = state.currentQuizProgress!.quiz.questions.length - 1;
        }
    },
    prevQuestion: (state: IQuizSlice) => {
        state.currentQuizProgress!.currentQuestionIndex--;
        if(state.currentQuizProgress!.currentQuestionIndex < 0){
            state.currentQuizProgress!.currentQuestionIndex = 0;
        }
    },
    setQuestion: (state: IQuizSlice, action) => {
        state.currentQuizProgress!.currentQuestionIndex = action.payload;
    },
    uncollapseAnswer(state: IQuizSlice){
        state.answerCollapsed = false;
    },
    collapseAnswer(state: IQuizSlice){
        state.answerCollapsed = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { startQuiz, setCurrentQuestionResult, nextQuestion, prevQuestion, setQuestion, uncollapseAnswer, collapseAnswer } = quizSlice.actions

export default quizSlice.reducer