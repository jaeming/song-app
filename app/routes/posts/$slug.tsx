import { useLoaderData } from "remix"
import type { Post } from "@prisma/client";
import { db } from "~/lib/db.server";

export const loader = async ({ params: { slug } }) => db.post.findFirst({ where: { slug } })

export default function PostItem() {
  const post = useLoaderData<Post>()
  return (
    <>
      <h2>{post.title}</h2>
      <main>{post.content}</main>
      <small>{post.createdAt}</small>
    </>
  )
}