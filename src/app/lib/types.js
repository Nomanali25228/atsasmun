// lib/types.js

// ImageData object shape
export const ImageData = {
    url: '', // Example property
  };
  
  // Author object shape
  export const Author = {
    id: 0, // Unique ID
    name: '', // Author name
    email: '', // Author email
    avatar: ImageData, // Author avatar as an ImageData object
  };
  
  // Category object shape
  export const Category = {
    documentId: '', // Unique category ID
    name: '', // Category name
    description: '', // Optional description
  };
  
  // BlogPost object shape
  export const BlogPost = {
    id: 0, // Blog post ID
    title: '', // Post title
    slug: '', // Post slug
    description: '', // Post description
    content: '', // Rich markdown text content
    createdAt: '', // ISO date string
    cover: ImageData, // Featured image as ImageData
    author: Author, // Author object
    categories: [Category], // Array of Category objects
  };
  
  // UserBlogPostData object shape
  export const UserBlogPostData = {
    title: '', // Post title
    slug: '', // Post slug
    description: '', // Post description
    content: '', // Rich markdown text content
  };
  
  // BlogPostResponse object shape for fetching multiple posts
  export const BlogPostResponse = {
    data: [BlogPost], // Array of BlogPost objects
  };
  
  // SingleBlogPostResponse object shape for fetching a single post
  export const SingleBlogPostResponse = {
    data: BlogPost, // A single BlogPost object
  };