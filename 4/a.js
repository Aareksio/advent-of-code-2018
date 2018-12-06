const readInput = require('../util/readInput');

async function getResult(filePath) {
  const input = await readInput(filePath);

  const events = input.map(line => {
    const [date, message] = line.substring(1).split(']');
    return { date: new Date(date), message: message.trim() };
  }).sort((lhs, rhs) => lhs.date.getTime() - rhs.date.getTime());

  const guards = {};
  let currentGuard = null;
  let previousEventDate = null;

  for (const event of events) {
    if (event.message.endsWith('begins shift')) {
      currentGuard = parseInt(event.message.substring(7), 10);
      if (!guards[currentGuard]) guards[currentGuard] = { id: currentGuard, asleep: Array(60).fill(0), totalAsleep: 0 };
    } else if (event.message === 'wakes up') {
      for (let minute = previousEventDate.getMinutes(); minute < event.date.getMinutes(); ++minute) {
        guards[currentGuard].asleep[minute]++;
        guards[currentGuard].totalAsleep++;
      }
    }

    previousEventDate = event.date;
  }

  const [sleepyHead] = Object.values(guards).sort((lhs, rhs) => rhs.totalAsleep - lhs.totalAsleep);

  const maxAsleep = Math.max(...sleepyHead.asleep);
  const result = { guard: sleepyHead.id, time: sleepyHead.asleep.indexOf(maxAsleep) };

  return result.guard * result.time;
}

(async () => console.log(await getResult(process.argv[2])))();
