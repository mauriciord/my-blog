import Link from 'next/link';
import { getBlogLink } from '../../lib/blog-helpers';

export default function PostPreviewTitle({ slug, title }) {
  return (
    <Link as={getBlogLink(slug)} href={getBlogLink(slug)}>
      <a className="text-2xl font-bold no-underline sm:text-4xl hover:underline">
        {title}
      </a>
    </Link>
  );
}
