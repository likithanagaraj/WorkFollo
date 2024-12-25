import Link from "next/link";
// import { getAllPublished } from "../../lib/notion";

export default async function Home() {
  // const posts = await getAllPublished();

  return (
    <main>
      <h1>Blog</h1>
      {/* {posts.map((post) => (
        <section key={post.id}>
          <div>
            
            <h2>
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <div>{post.date}</div>
          </div>
          <p>{post.description}</p>
        </section>
      ))} */}
    </main>
  );
}