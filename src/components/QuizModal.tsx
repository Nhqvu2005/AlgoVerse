'use client';

import { useState } from 'react';
import { Quiz } from '@/lib/quiz';
import { useLanguage } from '@/lib/LanguageContext';

interface QuizModalProps {
    quiz: Quiz;
    onClose: () => void;
    onComplete?: (score: number, total: number) => void;
}

export default function QuizModal({ quiz, onClose, onComplete }: QuizModalProps) {
    const { locale } = useLanguage();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);

    const question = quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const isVi = locale === 'vi';
    const questionText = isVi ? question.question : question.questionEn;
    const options = isVi ? question.options : question.optionsEn;
    const explanation = isVi ? question.explanation : question.explanationEn;

    const handleAnswer = (index: number) => {
        if (answered) return;
        setSelectedAnswer(index);
        setAnswered(true);
        if (index === question.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setAnswered(false);
        } else {
            setShowResult(true);
            if (onComplete) {
                onComplete(score, quiz.questions.length);
            }
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        const percentage = Math.round((score / quiz.questions.length) * 100);
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <div className="relative glass rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
                    <div className="text-6xl mb-4">
                        {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
                    </div>
                    <h2 className="font-heading text-2xl text-white mb-2">
                        {isVi ? 'Kết quả Quiz!' : 'Quiz Result!'}
                    </h2>
                    <p className="text-text-secondary mb-4">
                        {isVi
                            ? `Bạn trả lời đúng ${score}/${quiz.questions.length} câu (${percentage}%)`
                            : `You answered ${score}/${quiz.questions.length} correctly (${percentage}%)`
                        }
                    </p>
                    <div className="w-full bg-darker rounded-full h-3 mb-6 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-warning' : 'bg-danger'}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={handleRestart} className="btn-secondary">
                            {isVi ? 'Làm lại' : 'Try Again'}
                        </button>
                        <button onClick={onClose} className="btn-primary">
                            {isVi ? 'Đóng' : 'Close'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative glass rounded-2xl p-6 max-w-lg w-full animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-xl text-white">
                        {isVi ? '📝 Quiz' : '📝 Quiz'}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-text-muted">
                            {currentQuestion + 1}/{quiz.questions.length}
                        </span>
                        <button onClick={onClose} className="text-text-muted hover:text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-darker rounded-full h-1.5 mb-6">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                    />
                </div>

                {/* Question */}
                <div className="mb-6">
                    <p className="text-white font-medium text-lg mb-4">{questionText}</p>

                    {/* Options */}
                    <div className="space-y-3">
                        {options?.map((option, index) => {
                            let buttonClass = 'w-full p-4 rounded-xl text-left transition-all border ';
                            if (!answered) {
                                buttonClass += 'border-white/10 bg-surface/50 hover:border-primary/40 hover:bg-primary/10 text-text-secondary hover:text-white';
                            } else {
                                if (index === question.correctAnswer) {
                                    buttonClass += 'border-success bg-success/20 text-success';
                                } else if (index === selectedAnswer) {
                                    buttonClass += 'border-danger bg-danger/20 text-danger';
                                } else {
                                    buttonClass += 'border-white/10 bg-surface/50 text-text-muted';
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={answered}
                                    className={buttonClass}
                                >
                                    <span className="inline-flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                                            !answered
                                                ? 'bg-surface-light text-text-muted'
                                                : index === question.correctAnswer
                                                ? 'bg-success/30 text-success'
                                                : index === selectedAnswer
                                                ? 'bg-danger/30 text-danger'
                                                : 'bg-surface-light text-text-muted'
                                        }`}>
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        {option}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Explanation */}
                {answered && (
                    <div className={`mb-6 p-4 rounded-xl border ${
                        isCorrect
                            ? 'bg-success/10 border-success/30'
                            : 'bg-danger/10 border-danger/30'
                    }`}>
                        <p className={`font-semibold mb-1 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                            {isCorrect ? (isVi ? '✅ Đúng!' : '✅ Correct!') : (isVi ? '❌ Sai!' : '❌ Wrong!')}
                        </p>
                        <p className="text-text-secondary text-sm">{explanation}</p>
                    </div>
                )}

                {/* Next button */}
                {answered && (
                    <button onClick={handleNext} className="btn-primary w-full">
                        {currentQuestion < quiz.questions.length - 1
                            ? (isVi ? 'Câu tiếp theo →' : 'Next Question →')
                            : (isVi ? 'Xem kết quả' : 'See Results')
                        }
                    </button>
                )}
            </div>
        </div>
    );
}
