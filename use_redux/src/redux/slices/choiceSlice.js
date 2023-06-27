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
            state.questions.forEach((question) => {
                question.answer = null;
            });
            state.correctAnswer = 0;
        },
        setQuestionCompletion: (state, action) => {
            const { questionId, completed } = action.payload;
            state.questions[questionId].completed = completed;
        },
        resultReview: (state) => {
            state.questions.forEach((question) => {
                if (question.answer === question.trueAnswer) {
                    state.correctAnswer++;
                }
            })
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
export const { setQuestions, selectAnswer, resetChoiceAll, goBack, goNext, setQuestionCompletion, resultReview, setShowClose } = choiceSlice.actions

export default choiceSlice.reducer;