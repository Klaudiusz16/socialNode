import { GraphQLList, GraphQLString } from "graphql";
import { GraphQLUpload } from "graphql-upload";
import { PostSchemaType } from "../../../types/PostType";
import {
  ADD_IMAGES_TO_POST,
  ADD_POST,
} from "./../../../db/Functions/POST/addPost";
const fs = require("fs");
const { createWriteStream } = require("fs");
const path = require("path");

export const addpost = {
  type: PostSchemaType,
  args: {
    images: { type: new GraphQLList(GraphQLUpload) },
    creator: { type: GraphQLString },
    date: { type: GraphQLString },
    textContent: { type: GraphQLString },
  },
  async resolve(_, { creator, date, textContent, images }) {
    try {
      const postID = await ADD_POST(creator, date, textContent);

      const imagesLinks = [];

      await images.map(async (image, i) => {
        const { createReadStream, filename } = await image;
        const newFileName = `${filename.split(".")[0].toLowerCase()}_${i}.jpg`;
        imagesLinks.push(newFileName);

        const dir = path.join(
          __dirname,
          `../../../images/posts/post_${postID.id}/`
        );

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        await new Promise((res) =>
          createReadStream()
            .pipe(createWriteStream(path.join(dir, newFileName)))
            .on("close", res)
        );

        return;
      });

      const addingImages = ADD_IMAGES_TO_POST(postID.id, imagesLinks);

      return { id: postID.id };
    } catch (err) {
      return { error: err };
    }
  },
};
