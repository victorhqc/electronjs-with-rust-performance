import v8 from 'v8';

export function printMemoryUsage() {
  const used = (process.memoryUsage() as unknown) as Record<string, number>;

  for (let key in used) {
    console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
  }
}

export function printCSVHeap() {
  const statistics = (v8.getHeapStatistics() as unknown) as Record<string, number>;

  const keys = Object.keys(statistics);
  console.log(keys.join(','));

  const values = keys.map((k) => statistics[k]);
  console.log(values.join(','));
}
