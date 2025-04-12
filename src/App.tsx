import React, { useState } from 'react';
import AppSelection from './components/AppSelection';
import PracticeMode from './components/PracticeMode';

const App: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [mode, setMode] = useState<'selection' | 'practice'>('selection');

  const handleSelectApp = (appName: string) => {
    setSelectedApp(appName);
    setMode('practice');
  };

  const handleBackToSelection = () => {
    setMode('selection');
    setSelectedApp(null);
  };

  return (
    <div>
      {mode === 'selection' && <AppSelection onSelectApp={handleSelectApp} />}
      {mode === 'practice' && selectedApp && (
        <PracticeMode appName={selectedApp} onExit={handleBackToSelection} />
      )}
    </div>
  );
};

export default App;
