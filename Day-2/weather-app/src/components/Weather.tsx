import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import type { WeatherAPIResponse } from "../types";

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY ?? "";
const API_URL = "https://api.weatherapi.com/v1/current.json";

export default function Weather() {
  const [query, setQuery] = useState("");
  const [searchCity, setSearchCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // stable debounced setter
  const debouncedSetSearchCity = useMemo(
    () =>
      debounce((value: string) => {
        setSearchCity(value.trim());
      }, 600),
    []
  );

  useEffect(() => {
    debouncedSetSearchCity(query);
    return () => {
      debouncedSetSearchCity.cancel();
    };
  }, [query, debouncedSetSearchCity]);

  useEffect(() => {
    if (!searchCity) {
      setWeather(null);
      setError(null);
      return;
    }

    if (!API_KEY) {
      setError("Missing API key. Set VITE_WEATHERAPI_KEY in .env.local");
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_URL}?key=${encodeURIComponent(
          API_KEY
        )}&q=${encodeURIComponent(searchCity)}&aqi=no`;

        const res = await fetch(url, { signal });

        if (!res.ok) {
          // WeatherAPI returns 400 for bad query, 401 for invalid key, etc.
          if (res.status === 400) {
            throw new Error("Bad request or city not found");
          }
          if (res.status === 401) {
            throw new Error("Unauthorized — check your API key");
          }
          throw new Error(`API error: ${res.status}`);
        }

        const data = (await res.json()) as WeatherAPIResponse;
        setWeather(data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "Unknown error");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();

    return () => controller.abort();
  }, [searchCity]);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          City
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type city name (e.g. Jakarta). Debounced 600ms"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <p className="text-xs text-slate-400 mt-1">
          Searching: <span className="font-medium">{searchCity || "-"}</span>
        </p>
      </div>

      <div className="min-h-[120px]">
        {loading && (
          <div className="flex items-center gap-2 text-slate-600">
            <div className="spinner" />
            <span>Loading...</span>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 text-red-700 p-3">
            {error}
          </div>
        )}

        {!loading && !error && weather && (
          <div className="mt-3 p-4 rounded-lg bg-slate-50 border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">
                  {weather.location.name}
                  {weather.location.country ? `, ${weather.location.country}` : ""}
                </div>
                <div className="text-sm text-slate-500">
                  {weather.current.condition.text}
                </div>
                <div className="text-xs text-slate-400">
                  Local time: {weather.location.localtime}
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
                <div className="text-xs text-slate-500">
                  Feels like {Math.round(weather.current.feelslike_c ?? weather.current.temp_c)}°C
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-600">
              <div>Humidity: {weather.current.humidity}%</div>
              {weather.current.wind_kph !== undefined && (
                <div>Wind: {weather.current.wind_kph} kph</div>
              )}
            </div>
          </div>
        )}

        {!loading && !error && !weather && !searchCity && (
          <div className="text-sm text-slate-500">Type a city to see the weather.</div>
        )}
      </div>
    </div>
  );
}