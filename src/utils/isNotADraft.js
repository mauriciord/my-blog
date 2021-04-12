function isNotADraft(post) {
  if (!post) {
    return post;
  }

  if (post && !post.categories) {
    return post;
  }

  return !post.categories.includes('Draft');
}

export default isNotADraft;
