'use server'

import { prisma } from '@/lib/prisma'

export async function incrementDownloadCount(slug: string) {
    if (!slug) return { success: false, error: 'Slug is required' }
    try {
        const post = await prisma.post.update({
            where: { slug },
            data: {
                downloadCount: {
                    increment: 1,
                },
            },
        })
        return { success: true, count: post.downloadCount }
    } catch (error) {
        console.error('Error incrementing download count:', error)
        return { success: false, error: 'Failed to update count' }
    }
}

export async function incrementBuyCount(slug: string) {
    if (!slug) return { success: false, error: 'Slug is required' }
    try {
        const post = await prisma.post.update({
            where: { slug },
            data: {
                buyCount: {
                    increment: 1,
                },
            },
        })
        return { success: true, count: post.buyCount }
    } catch (error) {
        console.error('Error incrementing buy count:', error)
        return { success: false, error: 'Failed to update count' }
    }
}
