import Head from 'next/head';

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
};

export default function MetaHead({
  title,
  description,
  url,
  image,
  shouldIndexPage = true,
}: SEOProps) {
  const imageUrl = `${url}${image}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {image && <meta name="image" content={imageUrl} />}

      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#7a7010" />
      <meta name="msapplication-TileColor" content="#7a7010" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
}
