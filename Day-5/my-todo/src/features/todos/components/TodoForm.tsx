import { useForm } from "react-hook-form";
import { useTodos } from "../TodoContext";

type FormData = { title: string };

export default function TodoForm() {
  const { createTodo, state } = useTodos();
  const { register, handleSubmit, reset } = useForm<FormData>({ defaultValues: { title: "" } });

  async function onSubmit(data: FormData) {
    if (!data.title.trim()) return;
    await createTodo(data.title.trim());
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="flex gap-2">
        <input
          {...register("title")}
          placeholder="Add new to-do"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          disabled={state.loading.creating}
        >
          {state.loading.creating ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}