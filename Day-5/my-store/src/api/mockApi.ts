// simulate API calls with delay and random failure for optimistic update demonstration

export type MockOptions = {
  minDelay?: number;
  maxDelay?: number;
  failureRate?: number;
};

export function simulateApi<T>(result: T, opts: MockOptions = {}): Promise<T> {
  const { minDelay = 400, maxDelay = 1200, failureRate = 0.1 } = opts;
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failed = Math.random() < failureRate;
      if (failed) reject(new Error("Simulated API failure"));
      else resolve(result);
    }, delay);
  });
}