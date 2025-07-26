
import React, { useState, useCallback } from 'react';

const IndianCurrencyFormatter: React.FC = () => {
  const [inputNumber, setInputNumber] = useState<string>('1234567.89');
  const [formattedNumber, setFormattedNumber] = useState<string>('');

  const formatCurrency = useCallback(() => {
    const num = parseFloat(inputNumber);
    if (isNaN(num)) {
      setFormattedNumber('Invalid number');
      return;
    }

    const [integerPart, decimalPart] = String(num).split('.');
    
    if (integerPart.length <= 3) {
      setFormattedNumber(String(num));
      return;
    }
    
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    
    const result = formattedOtherNumbers + ',' + lastThree + (decimalPart ? '.' + decimalPart : '');
    setFormattedNumber(result);

  }, [inputNumber]);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Indian Currency Formatter</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">Convert numbers into the Indian numbering system format (Lakhs, Crores).</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="number-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Number</label>
          <input
            type="text"
            id="number-input"
            className="block w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="e.g., 1234567.89"
          />
        </div>

        <button
          onClick={formatCurrency}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
        >
          Format Number
        </button>

        {formattedNumber && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Formatted Result:</h3>
            <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <p className="font-mono text-2xl text-slate-700 dark:text-slate-300 break-words">{formattedNumber}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndianCurrencyFormatter;
