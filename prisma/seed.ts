import { PrismaClient } from "@prisma/client";
const { post } = new PrismaClient();

const posts = [
  {
    slug: "my-first-post",
    title: "My First Post",
    content: "I thought I'd make a new blog..."
  },
  {
    slug: "90s-mixtape",
    title: "A Mixtape I Made Just For You",
    content: "I love mixtapes!"
  },
  {
    slug: "sushi",
    title: "I love Sushi!",
    content: "but really it's all about sashimi"
  },
  {
    slug: "umbrellas",
    title: "Umbrellas were an iteresting invention",
    content: "but why do we still use them?"
  }
]

async function seed() {
  await Promise.all(posts.map(data => post.create({ data })))
}

seed()