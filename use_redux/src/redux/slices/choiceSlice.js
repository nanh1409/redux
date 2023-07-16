import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import React, { useMemo, useState, useEffect } from 'react';
import axios from '../../axios';
// import axios from 'axios';

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));;
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffleQuestions = (questions) => {
    shuffleArray(questions)
    return questions.map((question) => {
        const shuffleOptions = shuffleArray(Object.entries(question.options));
        return {
            ...question,
            options: Object.fromEntries(shuffleOptions)
        }
    })
}

const initialState = {
    loading: false,
    error: '',
    questions: [],
    currentQuestionId: 0,
    completed: false,
    correctAnswer: 0,
    answer: ''
}

export const fetchData = createAsyncThunk('choice/fetchData', () => {
    return axios
        .get('/api/questions')
        .then((response) => response.data)
})


export const submitAnswer = (answer, question) => {
    return axios.post("/api/answers", {
        answer: answer,
        question:question,
    }).then((response) => {
        console.log(response);
    });

};

const choiceSlice = createSlice({
    name: 'choice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.questions = shuffleQuestions(action.payload)
            state.error = ''
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.questions = []
            state.error = action.error.message
        })
    },
    reducers: {
        getDataQuestion: (state, action) => {
            state.questions = action.payload
        },
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
        },
        goToQuestion: (state, action) => {
            state.currentQuestionId = action.payload;
        },
        saveAnswer: (state, action) => {
            const answer = action.payload.value;
            const question = action.payload.question;
            submitAnswer(answer, question)
        },
    },

})

// Action creators are generated for each case reducer function
export const {
    goToQuestion,
    selectAnswer,
    resetChoiceAll,
    goBack,
    goNext,
    setQuestionCompletion,
    resultReview,
    setShowClose,
    redoTest,
    viewResult,
    addCase,
    getDataQuestion,
    saveAnswer
} = choiceSlice.actions

export default choiceSlice.reducer;