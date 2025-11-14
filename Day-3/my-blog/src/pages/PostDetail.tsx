import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post } from "../types";
import { Card } from "../components/ui/card";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch post");
        return r.json();
      })
      .then((data: Post) => setPost(data))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl">
      <Link to="/" className="text-sm text-primary-600 hover:underline">← Back to Home</Link>
      <Card className="mt-4">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-slate-700 whitespace-pre-line">{post.body}</p>
      </Card>
    </div>
  );
}