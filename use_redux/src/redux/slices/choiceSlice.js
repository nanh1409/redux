import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import React, { useMemo, useState, useEffect } from 'react';
// import axios from '../../axios';
import axios from 'axios';

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));;
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const fetchData = createAsyncThunk('choice/fetchData', async () => {
    return axios
        .get('http://localhost:8081/api/questions')
        .then((response) => response.data)
})

const initialState = {
    loading: false,
    error: '',
    questions: [],
    currentQuestionId: 0,
    completed: false,
    correctAnswer: 0,
}

const choiceSlice = createSlice({
    name: 'choice',
    initialState,
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.questions = action.payload
            console.log("action:", state.questions)

        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
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
    getDataQuestion
} = choiceSlice.actions

export default choiceSlice.reducer;