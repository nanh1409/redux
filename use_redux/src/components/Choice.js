import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/slices/choiceSlice';
import { shuffleArray } from '../redux/slices/choiceSlice';
import {
    selectAnswer,
    resetChoiceAll,
    redoTest,
    goBack,
    goNext,
    setQuestionCompletion,
    resultReview,
    setShowClose,
    viewResult,
    goToQuestion,
    getDataQuestion,
    saveAnswer
} from '../redux/slices/choiceSlice';
import '../css/choice.css';

export const Choice = () => {
    const [showReview, setShowReview] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const { currentQuestionId, correctAnswer, questions } = useSelector(state => state.choice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    const handleAnswerSelect = (questionId, answer, value) => {
        dispatch(selectAnswer({ questionId, answer }));
        const question = questions[currentQuestionId].question;
        dispatch(saveAnswer({ question, value }))
        const completed = answer !== '';
        dispatch(setQuestionCompletion({ questionId, completed }));
    };

    const handleResetChoiceAll = () => {
        dispatch(resetChoiceAll());
    };

    const handlePrevious = () => {
        dispatch(goBack());
    };

    const handleNext = () => {
        dispatch(goNext());
    };

    const handleViewResult = () => {
        dispatch(viewResult());
        setShowReview(false);
        setShowAnswer(true);
    };

    const handleSubmit = () => {
        dispatch(resultReview());
        setShowReview(true);
    };

    const setClose = () => {
        setShowReview(false);
        dispatch(setShowClose());
    };

    const handleRedoTest = () => {
        setShowReview(false);
        dispatch(redoTest());
        setShowAnswer(false);
    };

    const allQuestionsCompleted = useMemo(() => {
        return questions.length ?
            questions.every((question) => question.completed)
            : false
    }, [questions]);

    const currentQuestion = questions.length ? questions[currentQuestionId] : null
    currentQuestion ? console.log(" currentQuestion:", currentQuestion.answer) : console.log('lo')
    return (
        <div className='all'>
            {questions.length ?
                <h1 className='header'>ENGLISH TEST</h1>
                : <></>}
            <div className="container">

                <div className="question-status">

                    {questions.length ? questions.map((question, index) => (
                        <div
                            key={question.id}
                            className={`question-number ${currentQuestionId === index ? 'active' : (question.completed ? 'completed' : '')}`}
                            onClick={() => dispatch(goToQuestion(index))}
                        >
                            {index + 1}
                        </div>
                    )) : <></>}
                </div>

                <div className='question-container'>
                    <div className="question-content">
                        {questions.length ?
                            <h2 className={showAnswer ? (currentQuestion.answer === currentQuestion.trueAnswer ? 'correct-answer ' : 'incorrect-answer') : ''}>
                                {showAnswer ? (currentQuestion.answer === currentQuestion.trueAnswer ? 'TRUE' : 'FALSE') : ''}
                            </h2>
                            : <></>}
                        {questions.length ?
                            <h3> Question {currentQuestionId + 1}: {currentQuestion?.question || ""}</h3>
                            : <></>}
                        <ul className="ul">
                            {currentQuestion ?
                                Object.entries(currentQuestion.options).map(([key, value]) => (
                                    <li key={key}>
                                        <label
                                            className={showAnswer
                                                ? currentQuestion.answer === currentQuestion.trueAnswer
                                                    ? currentQuestion.answer === key
                                                        ? 'correct-answer'
                                                        : ''
                                                    : currentQuestion.trueAnswer === key
                                                        ? 'correct-answer'
                                                        : currentQuestion.answer === key
                                                            ? 'incorrect-answer'
                                                            : ''
                                                : currentQuestion.answer === key
                                                    ? 'selected'
                                                    : ''}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestionId}`}
                                                value={key}
                                                checked={currentQuestion.answer === key}
                                                onChange={() => handleAnswerSelect(currentQuestionId, key, value)}
                                            />
                                            {`${value}`}
                                        </label>
                                    </li>
                                ))
                                : <></>}
                        </ul>
                    </div>

                    {questions.length ?
                        <div className="block">
                            <button
                                disabled={currentQuestionId === 0}
                                onClick={handlePrevious}
                                className={currentQuestionId === 0 ? 'disable' : 'enable'}
                            >
                                Back
                            </button>
                            <button
                                disabled={currentQuestionId === questions.length - 1}
                                onClick={handleNext}
                                className={currentQuestionId === questions.length - 1 ? 'disable' : 'enable'}
                            >
                                Next
                            </button>
                            {showAnswer ? (
                                <button className='redo' onClick={handleRedoTest}>Redo</button>
                            ) : (
                                <button className={allQuestionsCompleted ? 'submited' : 'submit'} onClick={handleSubmit} disabled={!allQuestionsCompleted}>
                                    Submit
                                </button>
                            )}
                            <p onClick={handleResetChoiceAll}>Clear all answer</p>
                            {showReview && (
                                <div className="popup-dialog">
                                    <h2>Review</h2>
                                    <p>Correct Answer: {correctAnswer}</p>
                                    <p>Incorrect Answer: {questions.length - correctAnswer}</p>
                                    <div className="button">
                                        <button onClick={handleViewResult}>View Result</button>
                                        <button onClick={handleRedoTest}>Redo</button>
                                        <button onClick={setClose}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        : <></>}
                </div>

            </div>
        </div>
    )
}

export default Choice;
