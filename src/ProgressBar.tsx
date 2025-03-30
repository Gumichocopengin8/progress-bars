import { useCallback, useEffect, useRef, useState } from 'react';
import './ProgressBar.css';

const MAX_PROGRESS_VALUE = 100;

function ProgressBar() {
  const [val, setVal] = useState<number>(0);
  const progressIntervalId = useRef<number | null>(null);

  const onStopProgressBar = useCallback(() => {
    const intervalId = progressIntervalId.current;
    if (intervalId) {
      clearInterval(intervalId);
      progressIntervalId.current = null;
    }
  }, []);

  const onStartProgressBar = useCallback(() => {
    if (progressIntervalId.current !== null) {
      return;
    }
    const intervalId = setInterval(() => {
      setVal((prev) => {
        const newVal = prev + 3;
        return newVal % MAX_PROGRESS_VALUE;
      });
    }, 100);
    progressIntervalId.current = intervalId;
  }, []);

  useEffect(() => {
    onStartProgressBar();

    return () => {
      onStopProgressBar();
    };
  }, [onStartProgressBar, onStopProgressBar]);

  return (
    <div className='progressbar-container'>
      <progress style={{ width: '100%' }} max={MAX_PROGRESS_VALUE} value={val} />
      <span>{val}%</span>
      <button type='button' onClick={onStartProgressBar}>
        Start
      </button>
      <button type='button' onClick={onStopProgressBar}>
        Stop
      </button>
    </div>
  );
}

export default ProgressBar;
