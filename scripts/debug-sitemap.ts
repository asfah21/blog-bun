import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const posts = await prisma.post.findMany({
        select: { slug: true, category: true }
    })

    const badPosts = posts.filter(p => p.slug.includes('&') || p.category.includes('&'))
    console.log('Bad posts count:', badPosts.length)
    if (badPosts.length > 0) {
        console.log('Sample bad posts:', badPosts.slice(0, 10))
    }

    const allCategories = [...new Set(posts.map(p => p.category))]
    const badCategories = allCategories.filter(c => c.includes('&'))
    console.log('Bad categories:', badCategories)
}

main().catch(console.error).finally(() => prisma.$disconnect())
