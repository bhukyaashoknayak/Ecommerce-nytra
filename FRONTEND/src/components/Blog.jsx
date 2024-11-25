import React from 'react';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Top 10 Trends in E-Commerce for 2024',
            date: 'October 20, 2024',
            excerpt: 'Discover the latest trends in the e-commerce industry that can help you stay ahead of the competition...',
            image: 'src/assets/blog1.jpg',
        },
        {
            id: 2,
            title: 'How to Choose the Perfect Gift',
            date: 'October 15, 2024',
            excerpt: 'Finding the right gift can be challenging. Here are some tips to make the process easier...',
            image: 'src/assets/blog2.jpg',
        },
        {
            id: 3,
            title: 'Sustainable Shopping: What You Need to Know',
            date: 'October 10, 2024',
            excerpt: 'Learn how to make more sustainable shopping choices that benefit the environment...',
            image: 'src/assets/blog3.jpg',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                        <div className="relative">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute inset-0 bg-black opacity-30"></div>
                        </div>
                        <div className="p-6 relative z-10">
                            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                            <p className="text-gray-700 mb-4">{post.excerpt}</p>
                            <a className="text-red-600 hover:underline">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
