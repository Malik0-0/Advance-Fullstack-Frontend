export default function SearchInput({ value, onChange, placeholder = "Search movies..." }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex items-center gap-2 w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
      />
    </label>
  );
}