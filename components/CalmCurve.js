'use client';

import { useCallback, useRef, useState } from 'react';
import { animate, motion } from 'motion/react';

import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import {
  ALONE_CURVE,
  AXIS_LABELS,
  DAY_MINUTES,
  FLAVOURS,
  SCHEDULES,
  formatSessionTime,
  lerp,
  smoothPath,
} from '@/lib/schedule';

const PLOT = { left: 96, right: 692, top: 28, bottom: 252 };

const TO_X = (minutes) =>
  PLOT.left + (minutes / DAY_MINUTES) * (PLOT.right - PLOT.left);
const TO_Y = (value) =>
  PLOT.bottom - (value / 100) * (PLOT.bottom - PLOT.top);

function toPoints(pairs) {
  return pairs.map(([minutes, value]) => ({
    x: TO_X(minutes),
    y: TO_Y(value),
  }));
}

function CalmCurveGraph({ blend }) {
  const calm = SCHEDULES.calm;
  const even = SCHEDULES.even;

  const curvePoints = calm.curve.map((point, i) => ({
    x: TO_X(lerp(point[0], even.curve[i][0], blend)),
    y: TO_Y(lerp(point[1], even.curve[i][1], blend)),
  }));

  const markerPoints = calm.markers.map((point, i) => ({
    x: TO_X(lerp(point[0], even.markers[i][0], blend)),
    y: TO_Y(lerp(point[1], even.markers[i][1], blend)),
  }));

  const alonePoints = toPoints(ALONE_CURVE);

  return (
    <div className="rounded-[1.75rem] border-2 border-text bg-background p-4 sm:p-6">
      {/* Legend */}
      <div className="mb-3 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-text/70">
          <span
            className="h-0.5 w-7 rounded-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgba(32,43,41,0.45) 0 6px, transparent 6px 11px)',
            }}
            aria-hidden="true"
          />
          Home alone, nothing to do
        </span>
        <span className="flex items-center gap-2 text-xs font-semibold text-text/70">
          <span className="h-1 w-7 rounded-full bg-teal" aria-hidden="true" />
          With AwayStack
        </span>
      </div>

      <svg
        viewBox="0 0 720 300"
        className="block w-full"
        role="img"
        aria-label="Graph comparing restlessness over the day when a dog is home alone versus with AwayStack, with six planned lick sessions marked"
      >
        {/* Horizontal guides */}
        {[0, 1, 2, 3].map((i) => {
          const y = PLOT.top + ((PLOT.bottom - PLOT.top) / 3) * i;
          return (
            <line
              key={i}
              x1={PLOT.left}
              y1={y}
              x2={PLOT.right}
              y2={y}
              stroke="#202B29"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          );
        })}

        {/* Baseline */}
        <line
          x1={PLOT.left}
          y1={PLOT.bottom}
          x2={PLOT.right}
          y2={PLOT.bottom}
          stroke="#202B29"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Home alone */}
        <path
          d={smoothPath(alonePoints)}
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="3"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        {/* With AwayStack */}
        <path
          d={smoothPath(curvePoints)}
          fill="none"
          stroke="#126D68"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Session markers */}
        {markerPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="8"
            fill="#F1785B"
            stroke="#FFF7ED"
            strokeWidth="3.5"
          />
        ))}

        {/* Axis labels */}
        <text
          x={PLOT.left - 14}
          y={PLOT.top + 14}
          textAnchor="end"
          fill="#202B29"
          fillOpacity="0.55"
          fontSize="13"
          fontWeight="600"
          fontFamily="var(--font-heading)"
        >
          Restless
        </text>
        <text
          x={PLOT.left - 14}
          y={PLOT.bottom}
          textAnchor="end"
          fill="#202B29"
          fillOpacity="0.55"
          fontSize="13"
          fontWeight="600"
          fontFamily="var(--font-heading)"
        >
          Calm
        </text>

        {AXIS_LABELS.map((axis, i) => {
          const x = TO_X(axis.minutes);
          const anchor = i === 0 ? 'start' : i === AXIS_LABELS.length - 1 ? 'end' : 'middle';
          return (
            <text
              key={axis.label}
              x={x}
              y={PLOT.bottom + 30}
              textAnchor={anchor}
              fill="#202B29"
              fillOpacity="0.6"
              fontSize="13"
              fontWeight="600"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function ModeToggle({ mode, onChange }) {
  const options = [
    { key: 'calm', label: 'Calm Curve' },
    { key: 'even', label: 'Even spacing' },
  ];

  return (
    <div
      role="group"
      aria-label="Session schedule mode"
      className="inline-flex shrink-0 rounded-full border-2 border-text bg-white p-1"
    >
      {options.map((option) => {
        const isActive = mode === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            aria-pressed={isActive}
            className="relative rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 sm:px-5"
          >
            {isActive && (
              <motion.span
                layoutId="calm-curve-toggle"
                className="absolute inset-0 rounded-full bg-teal"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative ${isActive ? 'text-white' : 'text-text/65 hover:text-text'}`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function CalmCurve() {
  const [mode, setMode] = useState('calm');
  const [blend, setBlend] = useState(0);
  const blendRef = useRef(0);
  const controlsRef = useRef(null);

  const handleModeChange = useCallback((next) => {
    if (next === mode) return;
    setMode(next);

    const from = blendRef.current;
    const to = next === 'calm' ? 0 : 1;

    controlsRef.current?.stop();
    controlsRef.current = animate(from, to, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        blendRef.current = value;
        setBlend(value);
      },
    });
  }, [mode]);

  const schedule = SCHEDULES[mode];

  const description =
    mode === 'calm'
      ? 'Two cups close together right after you leave, when they miss you most. Then calmer flavours, spaced out, so they can settle and nap.'
      : 'Every session spaced at an even interval from 9 am to 5 pm, so the day follows a predictable rhythm they can learn.';

  return (
    <section id="calm-curve" className="relative scroll-mt-28 bg-background pb-20 sm:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border-2 border-text bg-white p-6 shadow-soft sm:p-10 lg:p-12"
        >
          {/* Top area */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <Badge variant="lavender" size="md">
                The Calm Curve
              </Badge>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-text sm:text-4xl lg:text-[2.75rem]">
                Built around their feelings, not the clock
              </h2>
            </div>

            <ModeToggle mode={mode} onChange={handleModeChange} />
          </div>

          {/* Two column content */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            {/* Left — graph */}
            <div>
              <CalmCurveGraph blend={blend} />
              <p className="mt-4 text-xs leading-relaxed text-text/55">
                Illustration of the idea, not measured data. Individual dogs
                respond differently.
              </p>
            </div>

            {/* Right — image, explanation, schedule pills */}
            <div>
              <div className="overflow-hidden rounded-[1.75rem] border-2 border-text bg-peach/30">
                <img
                  src="/images/nap.jpg"
                  alt="A dog settled and napping on the rug beside the AwayStack tower in a warm living room"
                  width={900}
                  height={687}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] w-full object-cover"
                />
              </div>

              <p className="mt-6 text-base leading-relaxed text-text/70">
                {description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {schedule.sessions.map((minutes, i) => (
                  <li
                    key={`${schedule.key}-${minutes}`}
                    className="rounded-full border border-text/15 bg-background px-3 py-1.5 text-xs font-semibold text-text"
                  >
                    <span className="text-teal">{formatSessionTime(minutes)}</span>
                    <span className="mx-1 text-text/35" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-text/70">{FLAVOURS[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default CalmCurve;
