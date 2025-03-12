// lib/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://atsas-backend.onrender.com/",

});

// Fetch all posts with pagination and search query
export const getAllPosts = async (page = 1, searchQuery = "") => {
  try {
    const searchFilter = searchQuery
      ? `&filters[title][$containsi]=${searchQuery}`
      : ""; // Search filter if searchQuery exists
    const response = await api.get(
      `api/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=3${searchFilter}`
    );
    return {
      posts: response.data.data,
      pagination: response.data.meta.pagination, // Return posts and pagination data
    };
  } catch (error) {
    // console.error("Error fetching blogs:", error);
    throw new Error("Server error");
  }
};

// Fetch a post by its slug
export const getPostBySlug = async (slug) => {
  try {
    const response = await api.get(
      `api/blog-posts?filters[slug]=${slug}&populate=*`
    );
    if (response.data.data.length > 0) {
      return response.data.data[0]; // Return the post data if it exists
    }
    throw new Error("Post not found.");
  } catch (error) {
    // console.error("Error fetching post:", error);
    throw new Error("Server error");
  }
};

// Fetch all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get("api/Author");
    return response.data.data; // Return all categories
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw new Error("Server error");
  }
};

// Upload an image
export const uploadImage = async (image, refId) => {
  try {
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::blog.blog"); // Content-type name (blog)
    formData.append("refId", refId.toString()); // Blog post ID
    formData.append("field", "cover"); // Image field name in the blog

    const response = await api.post("api/upload", formData);
    const uploadedImage = response.data[0];
    return uploadedImage; // Return uploaded image metadata
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

// Create a new blog post
export const createPost = async (postData) => {
  try {
    const reqData = { data: { ...postData } }; // Prepare data for Strapi
    const response = await api.post("api/blog-posts", reqData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};