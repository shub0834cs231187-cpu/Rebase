import { useEffect, useMemo, useState } from 'react';
import './DigitalClock.css';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatTimePart(value) {
  return value.toString().padStart(2, '0');
}

function DigitalClock() {
  const [now, setNow] = useState(() => new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(() => {
    const hours = formatTimePart(now.getHours());
    const minutes = formatTimePart(now.getMinutes());
    const seconds = formatTimePart(now.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }, [now]);

  const dateLabel = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const monthLabel = `Month: ${months[now.getMonth()]}`;
  const themeLabel = isDarkMode ? 'Dark' : 'Light';

  return (
    <div className={`clock-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="clock-card">
        <div className="clock-header">
          <div>
            <p className="eyebrow">Shubh Digital Clock</p>
            <h1>Digital Clock</h1>
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDarkMode((currentMode) => !currentMode)}
            aria-label={`switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {themeLabel} Mode
          </button>
        </div>

        <div className="time-panel">
          <p className="time-label">Current Time</p>
          <p className="time-value" aria-live="polite">
            {time}
          </p>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <span className="info-title">Weekday</span>
            <strong>{days[now.getDay()]}</strong>
          </div>
          <div className="info-box">
            <span className="info-title">Month</span>
            <strong>{months[now.getMonth()]}</strong>
          </div>
        </div>

        <p className="date-text">{dateLabel}</p>
        <p className="month-text">{monthLabel}</p>
      </div>
    </div>
  );
}

export default DigitalClock;
