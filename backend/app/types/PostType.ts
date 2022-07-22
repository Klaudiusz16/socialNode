import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export interface PostType {
  id: string;
  Creator: {
    Avatar: string;
    id: string;
    Surname: string;
    Firstname: string;
  };
  Date: string;
  TextContent: string;
  Images: string[];
  LikedBy: string[];
  Comments: {
    id: string;
    Creator: {
      Surname: string;
      Avatar: string;
      id: string;
      Firstname: string;
    };
    CommentContent: string;
    Date: string;
    LikedBy: string[];
  }[];
}

export const CreatorSchemaType = new GraphQLObjectType({
  name: "PostCreator",
  fields: () => ({
    Avatar: { type: GraphQLString },
    Firstname: { type: GraphQLString },
    Surname: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});

export const CommentSchemaType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    Creator: { type: CreatorSchemaType },
    id: { type: GraphQLString },
    CommentContent: { type: GraphQLString },
    Date: { type: GraphQLString },
    LikedBy: { type: new GraphQLList(GraphQLString) },
    error: { type: GraphQLString },
  }),
});

export const PostSchemaType = new GraphQLObjectType({
  name: "post",
  fields: () => ({
    id: { type: GraphQLString },
    Creator: { type: CreatorSchemaType },
    Date: { type: GraphQLString },
    LikedBy: { type: new GraphQLList(GraphQLString) },
    Comments: { type: new GraphQLList(CommentSchemaType) },
    TextContent: { type: GraphQLString },
    Images: { type: new GraphQLList(GraphQLString) },
    error: { type: GraphQLString },
  }),
});
