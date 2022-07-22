import { GraphQLList } from "graphql";
import { UserSchemaType } from "../../types/UserType";
import { GET_ALL_USERS } from "./../../db/Functions/USER/getAllUsers";

export const getAllUsers = {
  type: new GraphQLList(UserSchemaType),
  async resolve() {
    try {
      const users = await GET_ALL_USERS();

      return users;
    } catch (err) {
      return { status: err.message };
    }
  },
};
