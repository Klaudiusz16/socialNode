import { GraphQLString } from "graphql";
import { GET_USER_DATA } from "../../db/Functions/USER/getUserData";
import { UserSchemaType } from "../../types/UserType";

export const getUserData = {
  type: UserSchemaType,
  args: {
    ID: { type: GraphQLString },
  },
  async resolve(_, { ID }) {
    try {
      const data = await GET_USER_DATA(ID);
      return data;
    } catch (err) {
      return {
        status: err.message,
      };
    }
  },
};
