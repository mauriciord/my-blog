import { getDateStr } from '@/lib/blog-helpers';
import PostDetails from '../PostDetails';
import PostPreviewTitle from '../PostPreviewTitle';
import { textBlock } from '../../lib/notion/renderers';

export default function PostPreview({ post }) {
  return (
    <div className="flex flex-col my-4 space-y-3">
      <PostPreviewTitle slug={post.Slug} title={post.Page} />
      <PostDetails author={post.Authors[0]} date={getDateStr(post.Date)} />
      {post && post.preview.length > 0 && (
        <p>
          {post.preview.map((block, idx) =>
            textBlock(block, true, `${post.Slug}${idx}`)
          )}
        </p>
      )}
    </div>
  );
}
