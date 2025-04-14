// src/components/AppSelection.tsx
import React from 'react';
import './AppSelection.css';

interface AppIcon {
    name: string;
    icon: string;
}

interface AppSelectionProps {
    onSelectApp: (appName: string) => void;
}

// 各アプリの名称と対応するアイコン画像のパス
const availableApps: AppIcon[] = [
    { name: 'VSCode', icon: 'data/vscode.png' },
    { name: 'Excel', icon: 'data/excel.png' },
    { name: 'PowerPoint', icon: 'data/powerpoint.png' },
    { name: 'ChatGPT', icon: 'data/chatgpt.png' },
    { name: 'UbuntuTerminal', icon: 'data/ubuntu.png' },
];

const AppSelection: React.FC<AppSelectionProps> = ({ onSelectApp }) => {
    return (
        <div>
            <h1>What App do you want to practice?</h1>
            <div className="app-grid">
                {availableApps.map((app) => (
                    <div
                        key={app.name}
                        className="app-icon"
                        onClick={() => onSelectApp(app.name)}
                    >
                        <img src={app.icon} alt={app.name} />
                        <p>{app.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppSelection;
