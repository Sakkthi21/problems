
import React, { useState, useCallback } from 'react';
import { ListItem } from '../types';

const defaultList1 = JSON.stringify([
  { "positions": [100, 200], "values": ["valueA", "valueB"] },
  { "positions": [300, 400], "values": ["valueC"] }
], null, 2);

const defaultList2 = JSON.stringify([
  { "positions": [110, 220], "values": ["valueD"] },
  { "positions": [500, 600], "values": ["valueE"] }
], null, 2);

const ListCombiner: React.FC = () => {
  const [list1Json, setList1Json] = useState<string>(defaultList1);
  const [list2Json, setList2Json] = useState<string>(defaultList2);
  const [combinedListJson, setCombinedListJson] = useState<string>('');
  const [error, setError] = useState<string>('');

  const combineLists = useCallback(() => {
    try {
      const list1: ListItem[] = JSON.parse(list1Json);
      const list2: ListItem[] = JSON.parse(list2Json);
      setError('');

      const result: ListItem[] = [];
      const combinedFromList2 = new Set<number>();

      for (const item1 of list1) {
        let wasCombined = false;
        for (let j = 0; j < list2.length; j++) {
          if (combinedFromList2.has(j)) continue;

          const item2 = list2[j];
          const [left1, right1] = item1.positions;
          const [left2, right2] = item2.positions;
          const len1 = right1 - left1;
          const len2 = right2 - left2;

          const overlapStart = Math.max(left1, left2);
          const overlapEnd = Math.min(right1, right2);
          const overlapLength = Math.max(0, overlapEnd - overlapStart);

          if (overlapLength > len1 / 2 || overlapLength > len2 / 2) {
            const firstItem = item1.positions[0] <= item2.positions[0] ? item1 : item2;
            const combinedItem: ListItem = {
              positions: firstItem.positions,
              values: [...new Set([...item1.values, ...item2.values])],
            };
            result.push(combinedItem);
            combinedFromList2.add(j);
            wasCombined = true;
            break;
          }
        }
        if (!wasCombined) {
          result.push(item1);
        }
      }

      for (let j = 0; j < list2.length; j++) {
        if (!combinedFromList2.has(j)) {
          result.push(list2[j]);
        }
      }

      result.sort((a, b) => a.positions[0] - b.positions[0]);
      setCombinedListJson(JSON.stringify(result, null, 2));

    } catch (e) {
      setError('Invalid JSON input. Please check your data.');
      setCombinedListJson('');
    }
  }, [list1Json, list2Json]);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Combine Lists</h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">Combines two lists if an element from one overlaps more than 50% with an element from the other.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="list1" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">List 1 (JSON)</label>
          <textarea id="list1" rows={8} className="font-mono text-sm block w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" value={list1Json} onChange={(e) => setList1Json(e.target.value)} />
        </div>
        <div>
          <label htmlFor="list2" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">List 2 (JSON)</label>
          <textarea id="list2" rows={8} className="font-mono text-sm block w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" value={list2Json} onChange={(e) => setList2Json(e.target.value)} />
        </div>
      </div>
      
      <button onClick={combineLists} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900">
        Combine Lists
      </button>

      {error && <p className="mt-4 text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
      
      {combinedListJson && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Combined Result:</h3>
          <pre className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg text-sm"><code className="font-mono text-slate-700 dark:text-slate-300">{combinedListJson}</code></pre>
        </div>
      )}
    </div>
  );
};

export default ListCombiner;
