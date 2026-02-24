import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on web development, building products, and lessons learned.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Blog
          </p>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            Writing &amp; Thoughts
          </h1>
          <p className="text-muted-foreground">
            Sharing what I learn building real-world web applications.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
