import './App.css'
import Weather from "./components/Weather";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Weather App</h1>
        <p className="text-sm text-slate-500 mb-6">
          Search city name. API calls are debounced to avoid extra requests.
        </p>
        <Weather />
      </div>
    </div>
  );
}
