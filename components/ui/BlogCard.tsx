import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>&middot;</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
