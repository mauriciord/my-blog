import Link from 'next/link';
import Home from '../containers/Home';
import PostPreview from '../components/PostPreview';
import MetaHead from '../components/MetaHead';
import HeroTitle from '../components/HeroTitle';
import HeroExcerpt from '../components/HeroExcerpt';

import blogStyles from '@/styles/blog.module.css';
import { postIsPublished } from '@/lib/blog-helpers';
import getNotionUsers from '@/lib/notion/getNotionUsers';
import getBlogIndex from '@/lib/notion/getBlogIndex';
import metaData from '@/lib/data';

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_TABLE_ID;

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex();

  const authorsToGet: Set<string> = new Set();
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug];
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null;
      }
      post.Authors = post.Authors || [];
      for (const author of post.Authors) {
        authorsToGet.add(author);
      }
      return post;
    })
    .filter(Boolean);

  const { users } = await getNotionUsers([...authorsToGet]);

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name);
  });

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  };
}

function Index({ posts = [], preview }) {
  console.log('Posts __', posts);

  return (
    <Home>
      <MetaHead
        title={metaData.title}
        description={metaData.description}
        url={metaData.url}
        image={metaData.image}
      />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col max-w-5xl px-2 mx-auto my-4 space-y-3">
        <HeroTitle title={metaData.title} />
        <HeroExcerpt excerpt={metaData.description} />
      </div>
      <hr className="max-w-5xl px-4 mx-auto" />
      <div className="flex flex-col max-w-5xl px-2 mx-auto my-2 space-y-6">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </Home>
  );
}

export default Index;
