
import React, { useState, ReactNode } from 'react';
import CaesarCipher from './components/CaesarCipher';
import IndianCurrencyFormatter from './components/IndianCurrencyFormatter';
import ListCombiner from './components/ListCombiner';
import LossMinimizer from './components/LossMinimizer';
import { NAV_ITEMS } from './constants';

type ProblemId = 'caesar' | 'currency' | 'list' | 'loss';

const problemComponents: Record<ProblemId, ReactNode> = {
  caesar: <CaesarCipher />,
  currency: <IndianCurrencyFormatter />,
  list: <ListCombiner />,
  loss: <LossMinimizer />,
};

const App: React.FC = () => {
  const [activeProblem, setActiveProblem] = useState<ProblemId>('caesar');

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Code Solver <span className="text-blue-600 dark:text-blue-400">Suite</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Solutions to classic programming challenges.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 md:flex-shrink-0">
            <nav className="flex flex-row md:flex-col gap-2 p-4 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveProblem(item.id as ProblemId)}
                  className={`flex items-center gap-3 w-full p-3 text-left rounded-lg transition-all duration-200 text-sm md:text-base font-semibold ${
                    activeProblem === item.id
                      ? 'bg-blue-500 text-white shadow'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-grow">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6 sm:p-8 min-h-[500px]">
              {problemComponents[activeProblem]}
            </div>
          </main>
        </div>
        <footer className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
            <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
