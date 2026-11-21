export const DAY_START_MINUTES = 9 * 60;
export const DAY_MINUTES = 480;

export const FLAVOURS = [
  'Curd-rice',
  'Pumpkin',
  'Paneer',
  'Chicken broth',
  'Banana-oat',
  'Welcome Home',
];

export const SCHEDULES = {
  calm: {
    key: 'calm',
    label: 'Calm Curve',
    sessions: [0, 40, 100, 200, 320, 465],
    curve: [
      [0, 88], [0, 64],
      [26, 62], [40, 44],
      [86, 40], [100, 32],
      [186, 29], [200, 24],
      [306, 21], [320, 17],
      [451, 15], [465, 11],
      [480, 10],
    ],
    markers: [
      [0, 64], [40, 44], [100, 32], [200, 24], [320, 17], [465, 11],
    ],
  },
  even: {
    key: 'even',
    label: 'Even spacing',
    sessions: [0, 96, 192, 288, 384, 480],
    curve: [
      [0, 88], [0, 64],
      [82, 60], [96, 48],
      [178, 45], [192, 36],
      [274, 33], [288, 27],
      [370, 24], [384, 19],
      [466, 16], [480, 12],
      [480, 10],
    ],
    markers: [
      [0, 64], [96, 48], [192, 36], [288, 27], [384, 19], [480, 12],
    ],
  },
};

export const ALONE_CURVE = [
  [0, 86], [120, 83], [240, 80], [360, 77], [480, 74],
];

export const AXIS_LABELS = [
  { minutes: 0, label: '9 am' },
  { minutes: 120, label: '11 am' },
  { minutes: 240, label: '1 pm' },
  { minutes: 360, label: '3 pm' },
  { minutes: 480, label: '5 pm' },
];

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function formatSessionTime(minutes) {
  const total = DAY_START_MINUTES + minutes;
  const hours24 = Math.floor(total / 60);
  const mins = total % 60;
  const suffix = hours24 >= 12 ? 'pm' : 'am';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(mins).padStart(2, '0')} ${suffix}`;
}

export function smoothPath(points) {
  if (!points.length) return '';

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}
