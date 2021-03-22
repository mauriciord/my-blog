import { NotionRenderer } from 'react-notion'

import Home from "../../containers/Home";
import { getAllPosts } from '../index'
import MetaHead from "../../components/MetaHead";
// import PostContent from "../../components/PostContent";
import PostTitle from "../../components/PostTitle";
import PostDetails from "../../components/PostDetails";
import PostCoverImage from "../../components/PostCoverImage";
import metaData from "../../lib/data";

export async function getStaticProps({ params: { slug } }) {
    const posts = await getAllPosts();
    const post = posts.find((t) => t.slug === slug)

    const blocks = await fetch(
        `https://notion-api.splitbee.io/v1/page/${post.id}`
    ).then((res) => res.json())

    return {
        props: {
            blocks,
            post
        }
    }
}

export async function getStaticPaths() {
    const posts = await getAllPosts()
    return {
        // paths: posts.map((row) => `/${row.slug}`),
        paths: posts.map((row) => ({
            params: {
                slug: row.slug,
            },
        })),
        fallback: false
    };
}

export default function Post({ post, blocks }) {
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
                    <PostCoverImage image={post.coverImage} />
                    <NotionRenderer blockMap={blocks} />
                </div>
            </article>
        </Home>
    );
}

