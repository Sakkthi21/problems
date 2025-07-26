
import React, { useState, useCallback } from 'react';

const CaesarCipher: React.FC = () => {
  const [message, setMessage] = useState<string>('Hello, World!');
  const [shift, setShift] = useState<number>(3);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [result, setResult] = useState<string>('');

  const processCipher = useCallback(() => {
    const finalShift = mode === 'encode' ? shift : -shift;
    let output = '';

    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      let code = message.charCodeAt(i);

      if (code >= 65 && code <= 90) { // Uppercase letters
        char = String.fromCharCode((((code - 65 + finalShift) % 26) + 26) % 26 + 65);
      } else if (code >= 97 && code <= 122) { // Lowercase letters
        char = String.fromCharCode((((code - 97 + finalShift) % 26) + 26) % 26 + 97);
      }
      output += char;
    }
    setResult(output);
  }, [message, shift, mode]);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Caesar Cipher</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">Encrypt or decrypt messages with a simple letter shift.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
          <textarea
            id="message"
            rows={4}
            className="block w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="shift" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Shift Value</label>
            <input
              type="number"
              id="shift"
              className="block w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value, 10) || 0)}
            />
          </div>
          <div className="flex-1">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mode</label>
            <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
              <button onClick={() => setMode('encode')} className={`w-full py-1.5 rounded-md text-sm font-semibold transition-colors ${mode === 'encode' ? 'bg-white dark:bg-slate-800 shadow text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}>Encode</button>
              <button onClick={() => setMode('decode')} className={`w-full py-1.5 rounded-md text-sm font-semibold transition-colors ${mode === 'decode' ? 'bg-white dark:bg-slate-800 shadow text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}>Decode</button>
            </div>
          </div>
        </div>

        <button
          onClick={processCipher}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
        >
          Process Message
        </button>

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Result:</h3>
            <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <p className="font-mono text-slate-700 dark:text-slate-300 break-words">{result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaesarCipher;
