import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
} from '../redux/slices/choiceSlice';
import '../css/choice.css';

export function Choice() {
    const [showTest, setShowTest] = useState(true);
    const [showReview, setShowReview] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const currentQuestionId = useSelector((state) => state.choice.currentQuestionId);
    const questions = useSelector((state) => state.choice.questions);
    const completed = useSelector((state) => state.choice.completed);
    const correctAnswer = useSelector((state) => state.choice.correctAnswer);

    const dispatch = useDispatch();

    const handleAnswerSelect = (questionId, answer) => {
        dispatch(selectAnswer({ questionId, answer }));

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
        setShowAnswer(false)
    };

    const allQuestionsCompleted = questions.every((question) => question.completed);
    const currentQuestion = questions[currentQuestionId];

    return (
        <div className="container">
            <div className="content">
                <h2 className={showAnswer ? (currentQuestion.answer === currentQuestion.trueAnswer ? 'correct-answer ' : 'incorrect-answer') : ''}>
                    {showAnswer ? (currentQuestion.answer === currentQuestion.trueAnswer ? 'TRUE' : 'FALSE') : ''}
                </h2>
                <h3> Question {currentQuestionId + 1}</h3>
                <ul className="ul">
                    {currentQuestion.options.map((option, index) => (
                        <li key={index} >
                            <label
                                className={showAnswer
                                    ? currentQuestion.answer === currentQuestion.trueAnswer
                                        ? currentQuestion.answer === option
                                            ? 'correct-answer'
                                            : currentQuestion.trueAnswer === option
                                                ? 'correct-answer'
                                                : ''
                                        : currentQuestion.answer === option
                                            ? 'incorrect-answer'
                                            : currentQuestion.trueAnswer === option
                                                ? 'correct-answer'
                                                : ''
                                    : ''}
                            >
                                <input
                                    type="radio"
                                    value={option}
                                    checked={currentQuestion.answer === option}
                                    onChange={() => handleAnswerSelect(currentQuestionId, option)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>

            </div>
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
        </div>
    );
}

export default Choice;