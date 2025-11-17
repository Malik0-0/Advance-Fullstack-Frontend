// simulate API calls with delay and random failure for optimistic update demonstration

export const delay = (ms = 500) =>
  new Promise((res) => setTimeout(res, ms));

let failNext = false;

export function flipFailure() {
  failNext = true;
}

export async function createTodoApi<T>(todo: T) {
  await delay(400);
  if (failNext) { failNext = false; throw new Error("Simulated API failure"); }
  return { ...todo, id: `${Date.now()}` };
}

export async function updateTodoApi<T>(todo: T) {
  await delay(300);
  if (Math.random() < 0.05) throw new Error("Random API failure");
  return todo;
}

export async function deleteTodoApi(id: string) {
  await delay(250);
  if (Math.random() < 0.05) throw new Error("Random API failure");
  return { id };
}