import { useCallback, useState } from 'react';
import './App.css';
import ProgressBar from './ProgressBar';

function App() {
  const [progressBarIdList, setProgressBarIdList] = useState<string[]>(['0']);

  const onAddProgressBar = useCallback(() => {
    setProgressBarIdList([...progressBarIdList, crypto.randomUUID()]);
  }, [progressBarIdList]);

  const onRemoveProgressBar = useCallback(() => {
    setProgressBarIdList(progressBarIdList.slice(0, -1));
  }, [progressBarIdList]);

  return (
    <>
      <h1>Progress Bars</h1>
      <div>
        <button type='button' onClick={onAddProgressBar}>
          Add
        </button>
        <button type='button' onClick={onRemoveProgressBar} disabled={progressBarIdList.length === 0}>
          Remove
        </button>
      </div>
      {progressBarIdList.map((id) => (
        <ProgressBar key={id} />
      ))}
    </>
  );
}

export default App;
