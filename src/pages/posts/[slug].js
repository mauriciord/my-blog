import { NotionRenderer } from 'react-notion';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';

import Home from '../../containers/Home';
import { getAllPosts } from '../index';
import MetaHead from '../../components/MetaHead';
// import PostContent from "../../components/PostContent";
import PostTitle from '../../components/PostTitle';
import PostDetails from '../../components/PostDetails';
// import PostCoverImage from '../../components/PostCoverImage';
import metaData from '../../lib/data';
import { isNotADraft } from '../../utils';

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts();
  const post = posts
    .filter((post) => isNotADraft(post))
    .find((t) => t.slug === slug);

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    // paths: posts.map((row) => `/${row.slug}`),
    paths: posts
      .filter((post) => isNotADraft(post))
      .map((row) => ({
        params: {
          slug: row.slug,
        },
      })),
    fallback: false,
  };
}

export default function Post({ post, blocks }) {
  const titleToShare = `${post.title} by Mauricio R. Duarte<@mauriciord>`;
  const urlToShare = `${metaData.url}/${post.slug}`;

  return (
    <Home>
      <MetaHead
        title={metaData.title}
        description={metaData.description}
        url={metaData.url}
        image={metaData.image}
      />
      <article className="flex flex-col max-w-5xl px-2 mx-auto space-y-4">
        <div className="flex flex-col my-6 space-y-3">
          <PostTitle title={post.title} />
          <PostDetails author={post.author} date={post.date} />
          <div className="py-4 space-x-4 flex items-center">
            <p>Share:</p>
            <FacebookShareButton url={urlToShare} quote={titleToShare}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={urlToShare} title={titleToShare}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton url={urlToShare} title={titleToShare}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
          <NotionRenderer blockMap={blocks} />
        </div>
      </article>
    </Home>
  );
}
