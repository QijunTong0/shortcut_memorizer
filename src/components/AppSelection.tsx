// src/components/AppSelection.tsx
import React from 'react';
import './AppSelection.css';

interface AppIcon {
    name: string;
    icon: string; // 画像ファイルのパス（例："/icons/vscode.png"）
}

interface AppSelectionProps {
    onSelectApp: (appName: string) => void;
}

// 各アプリの名称と対応するアイコン画像のパス
const availableApps: AppIcon[] = [
    { name: 'VSCode', icon: '/data/icons/vscode.png' },
    { name: 'Excel', icon: '/data/icons/excel.png' },
    { name: 'PowerPoint', icon: '/data/icons/powerpoint.png' },
    { name: 'ChatGPT', icon: '/data/icons/chatgpt.png' },
    { name: 'UbuntuTerminal', icon: '/data/icons/ubuntuterminal.png' },
];

const AppSelection: React.FC<AppSelectionProps> = ({ onSelectApp }) => {
    return (
        <div>
            <h1>アプリ選択</h1>
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
