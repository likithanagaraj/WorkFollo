const Post = () => {
  return (
    <h1>Post</h1>
  )
}

/*
Similarly to the blog overview page, you will be pre-rendering each post page.

In /pages/posts/[slug].js, add the getStaticProps() function after the Post component and call the getSingleBlogPostBySlug function to fetch the blog post from Notion.
*/

export const getStaticProps = async ({ params }) => {
  const post = await getSingleBlogPostBySlug(params.slug)
 
 return {
    props: {
      post,
    },
    revalidate: 60
  };
};