import React, { useEffect, useState, useCallback } from 'react';
import KeyDisplay from './KeyDisplay';

interface Question {
  action: string;
  shortcut: string;
}

interface PracticeModeProps {
  appName: string;
  onExit: () => void;
}

const PracticeMode: React.FC<PracticeModeProps> = ({ appName, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [answerShown, setAnswerShown] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch(`data/${appName.toLowerCase()}.json`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading shortcuts:', error);
        setLoading(false);
      });
  }, [appName]);

  // ユーザーのキー入力から「Ctrl+S」などの文字列を生成
  const getKeyCombination = useCallback((e: KeyboardEvent): string => {
    const keys: string[] = [];
    if (e.ctrlKey && e.key !== 'Control') keys.push('Ctrl');
    if (e.shiftKey && e.key !== 'Shift') keys.push('Shift');
    if (e.altKey && e.key !== 'Alt') keys.push('Alt');
    if (e.metaKey && e.key !== 'Meta') keys.push('Meta');
    if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      keys.push(key);
    }
    return keys.join('+');
  }, []);

  useEffect(() => {
    if (!quizStarted) return;
    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      const combination = getKeyCombination(e);
      setCurrentInput(combination);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [quizStarted, getKeyCombination]);

  useEffect(() => {
    if (quizStarted && questions.length > 0 && currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      if (currentInput === currentQuestion.shortcut) {
        setMessage('正解！');
        setTimeout(() => {
          setCurrentInput('');
          setMessage('');
          setAnswerShown(false);
          setCurrentIndex((prev) => prev + 1);
        }, 1000);
      }
    }
  }, [currentInput, quizStarted, questions, currentIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (quizStarted && currentIndex >= questions.length) {
    return (
      <div>
        <h2>お疲れ様でした！全ての問題を終了しました。</h2>
        <button className="exit-button" onClick={onExit}>
          終了
        </button>
      </div>
    );
  }

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setCurrentInput('');
    setMessage('');
    setAnswerShown(false);
  };

  const handleGiveUp = () => {
    setAnswerShown(true);
  };

  const handleNextAfterGiveUp = () => {
    setCurrentInput('');
    setAnswerShown(false);
    setCurrentIndex((prev) => prev + 1);
  };

  // ユーザー入力のキー文字列（例："Ctrl+S"）を分割して表示用コンポーネントへ
  const renderKeyCombination = (combination: string) => {
    const keysArray = combination.split('+');
    return <KeyDisplay keys={keysArray} />;
  };

  return (
    <div>
      <h1>{appName} ショートカット練習</h1>
      {/* ボタン群を左右に配置するレイアウト */}
      <div className="button-row">
        <div className="left-button">
          {!quizStarted ? (
            <button onClick={startQuiz}>start</button>
          ) : (
            <button onClick={handleGiveUp}>正解を表示</button>
          )}
        </div>
        <div className="right-button">
          <button className="exit-button" onClick={onExit}>
            終了
          </button>
        </div>
      </div>
      {quizStarted && (
        <div>
          <h2>{questions[currentIndex].action}</h2>
          <div className="info">入力中: {renderKeyCombination(currentInput)}</div>
          {answerShown && (
            <div className="info">
              正解は: {renderKeyCombination(questions[currentIndex].shortcut)}
              <br />
              <button onClick={handleNextAfterGiveUp}>次へ</button>
            </div>
          )}
          {message && <div className="info correct-message">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default PracticeMode;
