import PostDetails from "../PostDetails";
import PostPreviewTitle from "../PostPreviewTitle";

export default function PostPreview({ post }) {
    return (
        <div className="flex flex-col my-4 space-y-3">
            <PostPreviewTitle slug={post.slug} title={post.title} />
            <PostDetails author={post.author} date={post.date} />
        </div>
    );
}
