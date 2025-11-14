import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data: Post[]) => setPosts(data))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Latest posts</h1>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts?.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
            <p className="text-sm text-slate-600 mb-4 line-clamp-3">{p.body}</p>
            <div className="mt-auto">
              <Link to={`/posts/${p.id}`} className="text-sm text-primary-600 hover:underline">
                Read more →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}