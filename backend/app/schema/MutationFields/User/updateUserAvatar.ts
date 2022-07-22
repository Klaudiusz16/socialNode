import { GraphQLString } from "graphql";
import { GraphQLUpload } from "graphql-upload";
import { UserSchemaType } from "../../../types/UserType";
import { createWriteStream } from "fs";
const fs = require("fs");
import path = require("path");
import { UPDATE_USER_AVATAT } from "../../../db/Functions/USER/updateUserAvatar";

export const updateUserAvatar = {
  type: UserSchemaType,
  args: {
    image: { type: GraphQLUpload },
    userID: { type: GraphQLString },
  },
  async resolve(_, { image, userID }) {
    try {
      const { createReadStream, filename } = await image;

      const newFileName = `${userID}.jpg`;

      const dir = path.join(__dirname, `../../../images/avatars/`);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await new Promise((res) =>
        createReadStream()
          .pipe(createWriteStream(path.join(dir, newFileName)))
          .on("close", res)
      );

      const response = await UPDATE_USER_AVATAT(newFileName, userID);

      return { id: response };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
};
