import { getCollection, type CollectionEntry } from "astro:content";
import { urlSafeTransform } from "~/utils";

export type Post = CollectionEntry<"blog">;

/** All posts, newest first. */
export const getPosts = async () =>
    (await getCollection("blog")).sort(
        (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
    );

export const postSlug = (post: Post) => urlSafeTransform(post.id);
export const postUrl = (post: Post) => `/blog/${postSlug(post)}/`;
export const tagUrl = (tag: string) => `/blog/?tag=${encodeURIComponent(tag)}`;

// Frontmatter dates parse as UTC midnight, so format in UTC to keep the day.
const longDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
export const formatDate = (d: Date) => longDate.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Post body as plain text, for the search index. */
export const plainText = (markdown: string) =>
    markdown
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links and images → their text
        .replace(/^```.*$/gm, "")
        .replace(/^\s*(#{1,6}|>|[-*+])\s+/gm, "")
        .replace(/^\s*\|[\s|:-]+\|\s*$/gm, "") // table divider rows
        .replace(/^\s*\|.*\|\s*$/gm, (row) => row.replaceAll("|", " "))
        .replace(/[*`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
