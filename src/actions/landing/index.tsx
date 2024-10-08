"use server";
import axios from "axios";

export const onGetBlogPosts = async () => {
  try {
    const postArray: {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[] = [];

    const postsUrl = process.env.CLOUDWAYS_POSTS_URL;
    if (!postsUrl) return;

    const posts = await axios.get(postsUrl);

    const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL;
    if (!featuredImages) return;

    let i = 0;
    while (i < posts.data.length) {
      const image = await axios.get(
        `${featuredImages}/${posts.data[i].featured_media}`
      );
      if (image) {
        const post: {
          id: string;
          title: string;
          image: string;
          content: string;
          createdAt: Date;
        } = {
          id: posts.data[i].id,
          title: posts.data[i].title.rendered,
          image: image.data.media_details.file,
          content: posts.data[i].content.rendered,
          createdAt: new Date(posts.data[i].date),
        };
        postArray.push(post);
      }
    }
    if (posts.data) {
      return postArray;
    }
  } catch (error) {
    console.log(error);
  }
};
