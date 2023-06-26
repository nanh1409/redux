import { createSlice } from '@reduxjs/toolkit'
import questions from './questions';

const initialState = {
    questions,
    currentQuestionId: 0,
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
        },
        goBack: (state) => {
            state.currentQuestionId--;
        },
        goNext: (state) => {
            state.currentQuestionId++;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setQuestions, selectAnswer, resetChoiceAll, goBack, goNext } = choiceSlice.actions

export default choiceSlice.reducer;