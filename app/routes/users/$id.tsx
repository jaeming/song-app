import { useLoaderData } from "remix"
import type { User } from "@prisma/client";
import { db } from "~/lib/db.server";

export const loader = async ({ params: { id } }) => db.user.findFirst({ where: { id: parseInt(id) } })

export default function PostItem() {
  const user = useLoaderData<User>()
  return (
    <>
      <h2>Welcome</h2>
      <h3>{user.email}!</h3>
    </>
  )
}