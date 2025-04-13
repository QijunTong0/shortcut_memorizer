// src/components/AppSelection.tsx
import React, { useState } from 'react';

interface AppSelectionProps {
    onSelectApp: (appName: string) => void;
}

const availableApps = ['VSCode', 'Excel', 'PowerPoint', 'ChatGPT', 'UbuntuTerminal', 'MacTerminal'];

const AppSelection: React.FC<AppSelectionProps> = ({ onSelectApp }) => {
    const [selected, setSelected] = useState<string>(availableApps[0]);

    return (
        <div>
            <h1>アプリ選択</h1>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                {availableApps.map((app) => (
                    <option key={app} value={app}>
                        {app}
                    </option>
                ))}
            </select>
            <button onClick={() => onSelectApp(selected)}>練習開始</button>
        </div>
    );
};

export default AppSelection;
