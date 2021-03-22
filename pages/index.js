import Home from "../containers/Home";
import PostPreview from "../components/PostPreview";
import MetaHead from "../components/MetaHead";
import HeroTitle from "../components/HeroTitle";
import HeroExcerpt from "../components/HeroExcerpt";
import metaData from "../lib/data";

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_TABLE_ID;

export const getAllPosts = async () => {
  return await fetch(
      `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json())
}

export async function getStaticProps() {
  const posts = await getAllPosts()

  return {
    props: {
        allPosts: posts
    },
    revalidate: 1
  }
}

function Index({ allPosts }) {
  const posts = allPosts.map((post, key) => (
      <PostPreview id={post.slug} key={key} post={post} />
  ));
  return (
      <Home>
        <MetaHead
            title={metaData.title}
            description={metaData.description}
            url={metaData.url}
            image={metaData.image}
        />
        <div className="flex flex-col max-w-5xl px-2 mx-auto my-4 space-y-3">
          <HeroTitle title={metaData.title} />
          <HeroExcerpt excerpt={metaData.description} />
        </div>
        <hr className="max-w-5xl px-4 mx-auto" />
        <div className="flex flex-col max-w-5xl px-2 mx-auto my-2 space-y-6">
          {posts}
        </div>
      </Home>
  );
}

export default Index;