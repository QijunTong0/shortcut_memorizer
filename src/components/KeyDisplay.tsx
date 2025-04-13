// src/components/KeyDisplay.tsx
import React from 'react';

interface KeyDisplayProps {
    keys: string[];
}

const KeyDisplay: React.FC<KeyDisplayProps> = ({ keys }) => {
    return (
        <div className="key-display">
            {keys.map((keyName, index) => (
                <span key={index} className="key">
                    {keyName}
                </span>
            ))}
        </div>
    );
};

export default KeyDisplay;
