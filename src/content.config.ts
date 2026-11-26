import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({
        base: "./src/posts",
        pattern: "**/*.md",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        // Write as YYYY-MM-DD.
        publishDate: z.coerce.date(),
        // Lowercased so "CTF" and "ctf" count as the same tag.
        tags: z
            .array(z.string())
            .default([])
            .transform((tags) => [...new Set(tags.map((t) => t.trim().toLowerCase()))]),
    }),
});

export const collections = { blog };
