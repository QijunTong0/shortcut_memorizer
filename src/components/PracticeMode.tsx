import React, { useEffect, useState } from 'react';

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
    // public/data 以下にアプリごとの JSON ファイルがあると仮定
    // ファイル名は小文字に変換して読み込みます（例：vscode.json）
    fetch(`/data/${appName.toLowerCase()}.json`)
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

  useEffect(() => {
    // 入力が変わるたびに正解かチェック
    if (quizStarted && questions.length > 0 && currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      if (currentInput === currentQuestion.shortcut) {
        setMessage('正解！');
        // 少し待ってから次の問題へ
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

  // 全問終了時の処理
  if (quizStarted && currentIndex >= questions.length) {
    return (
      <div>
        <h2>お疲れ様でした！全ての問題を終了しました。</h2>
        <button onClick={onExit}>戻る</button>
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

  return (
    <div>
      <h1>{appName} ショートカット練習</h1>
      <button onClick={onExit}>中断</button>
      {!quizStarted ? (
        <div>
          <button onClick={startQuiz}>start</button>
        </div>
      ) : (
        <div>
          <h2>操作内容: {questions[currentIndex].action}</h2>
          <div>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="ショートカットを入力..."
              autoFocus
            />
          </div>
          <div>入力中: {currentInput}</div>
          <div>
            <button onClick={handleGiveUp}>give up</button>
          </div>
          {answerShown && (
            <div>
              正解は: {questions[currentIndex].shortcut}
              <button onClick={handleNextAfterGiveUp}>次へ</button>
            </div>
          )}
          {message && <div>{message}</div>}
        </div>
      )}
    </div>
  );
};

export default PracticeMode;
