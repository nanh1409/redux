import { createSlice } from '@reduxjs/toolkit'
import questions from './questions';

const initialState = {
    questions,
    currentQuestionId: 0,
    completed: false,
    correctAnswer: 0,
}

export const choiceSlice = createSlice({
    name: 'choice',
    initialState,
    reducers: {
        selectAnswer: (state, action) => {
            const { questionId, answer } = action.payload;
            state.questions[questionId].answer = answer;
        },
        resetChoiceAll: (state) => {
            state.questions.map((question) => {
                question.answer = null;
                question.completed = false;
            });
            state.correctAnswer = 0;
        },
        setQuestionCompletion: (state, action) => {
            const { questionId, completed } = action.payload;
            state.questions[questionId].completed = completed;
        },
        resultReview: (state) => {
            state.questions.map((question) => {
                if (question.answer === question.trueAnswer) {
                    state.correctAnswer++;
                }
            })
        },
        viewResult: (state) => {
            state.currentQuestionId = 0;
            state.questions.map((question) => {
                question.completed = false;
            });
        },
        redoTest: (state) => {
            state.questions.map((question) => {
                question.answer = null;
                question.completed = false;
            })
            state.correctAnswer = 0;
            state.currentQuestionId = 0;
        },
        goBack: (state) => {
            state.currentQuestionId--;
        },
        goNext: (state) => {
            state.currentQuestionId++;
        },
        setShowClose: (state) => {
            state.correctAnswer = 0;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setQuestions, selectAnswer, resetChoiceAll, goBack, goNext, setQuestionCompletion, resultReview, setShowClose, redoTest, viewResult } = choiceSlice.actions

export default choiceSlice.reducer;