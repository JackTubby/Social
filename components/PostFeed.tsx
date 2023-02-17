import Link from "next/link";

// The admin prop is a boolean that if true provides extra ability for the admin (crud)
const PostFeed = ({ posts, admin }:any) => {
    // List of posts that is mapped to an individual post item component
    return posts ? posts.map((post:any) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
    // Method to calc word count and read time
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    return (
        <div>
            <Link>
                <a href={`/${post.username}`}>
                    <strong>By @{post.username}</strong>
                </a>
            </Link>
            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a>{post.title}</a>
                </h2>
            </Link>
            <footer>
                <span>
                {wordCount} words. {minutesToRead} min read
                </span>
            </footer>
        </div>
    )
}

export default PostFeed;