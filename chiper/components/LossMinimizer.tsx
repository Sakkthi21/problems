
import React, { useState, useCallback } from 'react';

type Result = {
    buyYear: number;
    sellYear: number;
    buyPrice: number;
    sellPrice: number;
    loss: number;
} | null;

const LossMinimizer: React.FC = () => {
    const [pricesInput, setPricesInput] = useState<string>('20, 15, 7, 2, 13');
    const [result, setResult] = useState<Result>(null);
    const [message, setMessage] = useState<string>('');

    const calculateMinLoss = useCallback(() => {
        const prices = pricesInput.split(',').map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p));
        
        if (prices.length < 2) {
            setMessage('Please provide at least two valid prices.');
            setResult(null);
            return;
        }

        let minLoss = Infinity;
        let bestBuyInfo = { year: 0, price: 0 };
        let bestSellInfo = { year: 0, price: 0 };
        
        // O(n^2) approach, clear and suitable for typical inputs.
        for (let i = 0; i < prices.length; i++) {
            for (let j = i + 1; j < prices.length; j++) {
                const buyPrice = prices[i];
                const sellPrice = prices[j];
                const loss = sellPrice - buyPrice;

                if (loss < 0 && loss > -minLoss) { // A loss that is smaller than the current minLoss
                    minLoss = -loss; // Store loss as a positive number
                    bestBuyInfo = { year: i + 1, price: buyPrice };
                    bestSellInfo = { year: j + 1, price: sellPrice };
                }
            }
        }

        if (minLoss === Infinity) {
            setMessage('No possible transaction results in a loss.');
            setResult(null);
        } else {
            setResult({
                buyYear: bestBuyInfo.year,
                sellYear: bestSellInfo.year,
                buyPrice: bestBuyInfo.price,
                sellPrice: bestSellInfo.price,
                loss: minLoss,
            });
            setMessage('');
        }
    }, [pricesInput]);

    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Minimize Loss</h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">Find the optimal buy and sell years to minimize financial loss, given a series of prices.</p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="prices-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Projected Prices (comma-separated)</label>
                    <input
                        type="text"
                        id="prices-input"
                        className="block w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        value={pricesInput}
                        onChange={(e) => setPricesInput(e.target.value)}
                        placeholder="e.g., 20, 15, 7, 2, 13"
                    />
                </div>

                <button
                    onClick={calculateMinLoss}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
                >
                    Calculate Minimum Loss
                </button>

                {message && (
                    <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-lg">
                        <p>{message}</p>
                    </div>
                )}

                {result && (
                    <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Optimal Transaction:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                           <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Buy in Year {result.buyYear}</p>
                                <p className="text-xl font-bold text-slate-700 dark:text-slate-200">${result.buyPrice}</p>
                           </div>
                           <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Sell in Year {result.sellYear}</p>
                                <p className="text-xl font-bold text-slate-700 dark:text-slate-200">${result.sellPrice}</p>
                           </div>
                           <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg shadow">
                                <p className="text-sm text-red-600 dark:text-red-300">Minimum Loss</p>
                                <p className="text-xl font-bold text-red-700 dark:text-red-200">${result.loss}</p>
                           </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LossMinimizer;
