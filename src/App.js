import './App.css';
import { useMemo, useState } from 'react';

const YEAR = 2026;
const MONTH_NAMES = [
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
const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_TONES = ['sun', 'peach', 'mint', 'sky', 'lavender', 'amber', 'rose'];
const MONTH_TONES = ['teal', 'coral', 'violet', 'indigo', 'emerald', 'gold'];

function buildCalendarDays(year, month) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDayOfWeek; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  return cells;
}

function getWeekdayTone(weekdayIndex) {
  return DAY_TONES[weekdayIndex % DAY_TONES.length];
}

function getRandomMonthTone() {
  return MONTH_TONES[Math.floor(Math.random() * MONTH_TONES.length)];
}

function App() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [monthTone, setMonthTone] = useState(() => getRandomMonthTone());

  const calendarDays = useMemo(() => buildCalendarDays(YEAR, monthIndex), [monthIndex]);
  const isAtFirstMonth = monthIndex === 0;
  const isAtLastMonth = monthIndex === 11;

  function changeMonth(nextMonthIndex) {
    setMonthIndex(nextMonthIndex);
    setMonthTone(getRandomMonthTone());
  }

  return (
    <main className="calendar-app">
      <section className="calendar-card" aria-label="2026 calendar">
        <header className="calendar-header">
          <p className="calendar-kicker">Year Planner</p>
          <h1>{YEAR} Calendar</h1>
          <p className="calendar-subtitle">Use the buttons to switch months.</p>
        </header>

        <div className="month-toolbar" role="group" aria-label="Change month">
          <button
            type="button"
            onClick={() => changeMonth(monthIndex - 1)}
            disabled={isAtFirstMonth}
          >
            Previous
          </button>
          <h2 className={`month-box month-box--${monthTone}`} aria-live="polite">
            {MONTH_NAMES[monthIndex]}
          </h2>
          <button
            type="button"
            onClick={() => changeMonth(monthIndex + 1)}
            disabled={isAtLastMonth}
          >
            Next
          </button>
        </div>

        <div className="weekdays" role="row" aria-label="Weekdays">
          {WEEKDAY_NAMES.map((weekday, weekdayIndex) => (
            <span key={weekday} className={`weekday-pill weekday-pill--${getWeekdayTone(weekdayIndex)}`}>
              {weekday}
            </span>
          ))}
        </div>

        <div className="calendar-grid" aria-label={`${MONTH_NAMES[monthIndex]} ${YEAR}`}>
          {calendarDays.map((day, index) =>
            day === null ? (
              <div key={`empty-${index}`} className="day-cell empty" aria-hidden="true" />
            ) : (
              <div key={day} className={`day-cell day-cell--${getWeekdayTone(index % 7)}`}>
                {day}
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
