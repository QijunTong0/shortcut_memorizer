import React, { useEffect, useState, useCallback } from 'react';

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

  // キーイベントからショートカット文字列を生成する関数
  const getKeyCombination = useCallback((e: KeyboardEvent): string => {
    // 各修飾キーの状態をチェックしつつ、メインのキーを組み合わせる
    const keys: string[] = [];

    // e.key では "Control", "Shift" なども返るため、メインのキーであるかを判断します。
    if (e.ctrlKey && e.key !== 'Control') keys.push('Ctrl');
    if (e.shiftKey && e.key !== 'Shift') keys.push('Shift');
    if (e.altKey && e.key !== 'Alt') keys.push('Alt');
    if (e.metaKey && e.key !== 'Meta') keys.push('Meta');
    // 修飾キー自体はここでは加えず、通常のキーのみ追加
    if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
      // アルファベットの場合は大文字に統一
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      keys.push(key);
    }
    return keys.join('+');
  }, []);

  // キー入力を拾う処理（quizStarted が true の場合のみ有効）
  useEffect(() => {
    if (!quizStarted) return;

    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault(); // ブラウザのショートカットなどの干渉を防ぐ
      const combination = getKeyCombination(e);
      setCurrentInput(combination);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [quizStarted, getKeyCombination]);

  // 入力が変わるたびに正解かチェック
  useEffect(() => {
    if (quizStarted && questions.length > 0 && currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      if (currentInput === currentQuestion.shortcut) {
        setMessage('正解！');
        // 少し待ってから次の問題へ移行
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
          {/* 入力欄は削除するか、情報表示用に変更 */}
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
