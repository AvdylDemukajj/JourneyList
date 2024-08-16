import React, { useState, useEffect, useRef } from 'react';
import { useSquid } from '@squidcloud/react';
import './AskAI.css';
import LoadingIndicator from './LoadingIndicator';

function AskAI() {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const squid = useSquid();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const askPressed = async () => {
    if (!text) return;
    setLoading(true);
    const result = await squid.executeFunction('askQuestion', text);
    setResult(result);
    setText('');
    setLoading(false);
  };

  const closeResult = () => {
    setResult('');
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [result]);

  return (
    <div className="container">
      <h3>Ask a Question!</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <button onClick={askPressed}>Ask</button>
      )}
      {result && (
        <div className="result-container">
          <textarea ref={textareaRef} value={result} rows={4} readOnly />
          <button onClick={closeResult} className="close-button"></button>
        </div>
      )}
    </div>
  );
}

export default AskAI;
