// Full-text index for the blog search; fetched only when someone searches.
import { getPosts, plainText, postSlug } from "~/blog";

export async function GET() {
    const posts = await getPosts();
    return Response.json(
        Object.fromEntries(posts.map((p) => [postSlug(p), plainText(p.body ?? "")])),
    );
}
