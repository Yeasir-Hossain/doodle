const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedData() {
    try {
        // Create a user
        const user = await prisma.user.create({
            data: {
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
        });

        // Create two blogs for the user
        const blog1 = await prisma.blog.create({
            data: {
                userId: user.id,
                title: 'First Blog Title',
                body: 'Content of the first blog...',
            },
        });

        const blog2 = await prisma.blog.create({
            data: {
                userId: user.id,
                title: 'Second Blog Title',
                body: 'Content of the second blog...',
            },
        });

        // Create two comments for each blog
        const comment1Blog1 = await prisma.comment.create({
            data: {
                blogId: blog1.id,
                name: 'Commenter1',
                email: 'commenter1@example.com',
                body: 'Comment 1 for the first blog...',
            },
        });

        const comment2Blog1 = await prisma.comment.create({
            data: {
                blogId: blog1.id,
                name: 'Commenter2',
                email: 'commenter2@example.com',
                body: 'Comment 2 for the first blog...',
            },
        });

        const comment1Blog2 = await prisma.comment.create({
            data: {
                blogId: blog2.id,
                name: 'Commenter3',
                email: 'commenter3@example.com',
                body: 'Comment 1 for the second blog...',
            },
        });

        const comment2Blog2 = await prisma.comment.create({
            data: {
                blogId: blog2.id,
                name: 'Commenter4',
                email: 'commenter4@example.com',
                body: 'Comment 2 for the second blog...',
            },
        });

        console.log('Seeding finished.');
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
