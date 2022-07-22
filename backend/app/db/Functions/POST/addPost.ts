import Post from "../../models/Post";
import { PostType } from "../../../types/PostType";
import { UserInputError } from "apollo-server-express";

export const ADD_POST = async (
  creatorID: string,
  date: string,
  textContent: string
) => {
  try {
    if (!textContent.trim().length) {
      throw "Post content can not be empty.";
    }

    const post = await Post.query().insert({
      Creator: creatorID,
      Date: date,
      TextContent: textContent,
      images: "",
    });

    return post;
  } catch (err) {
    throw err;
  }
};

export const ADD_IMAGES_TO_POST = async (postID, images) => {
  try {
    const post = await Post.query()
      .findById(postID)
      .update({
        images: images.join(","),
      });
    return true;
  } catch (err) {
    throw err;
  }
};
