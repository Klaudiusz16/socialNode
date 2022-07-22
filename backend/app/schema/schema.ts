import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { getUserData } from "./QueryFields/getUserData";
import { getPosts } from "./QueryFields/getPosts";
import { addpost } from "./MutationFields/Post/addPost";
import { postLikeHandler } from "./MutationFields/Post/postLikeHandler";
import { addComment } from "./MutationFields/Post/addComment";
import { deletePost } from "./MutationFields/Post/deletePost";
import { deleteComment } from "./MutationFields/Post/deleteComment";
import { createChat } from "./MutationFields/Chat/createChat";
import { getAllUsers } from "./QueryFields/getAllUsers";
import { getChats } from "./QueryFields/getChats";
import { sendMessage } from "./MutationFields/Chat/sendMessage";
import { makeMessageRead } from "./MutationFields/Chat/makeMessageRead";
import { getUserPosts } from "./QueryFields/getUserPosts";
import { updateUserAvatar } from "./MutationFields/User/updateUserAvatar";
import { makeFriendInvate } from "./MutationFields/FriendShip/makeFriendInvite";
import { getNotifications } from "./QueryFields/getNotifications";
import { makeNotificationRead } from "./MutationFields/Notification/makeNotificationRead";

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUserData: getUserData,
    getPosts: getPosts,
    getAllUsers: getAllUsers,
    getChats: getChats,
    getUserPosts: getUserPosts,
    getNotifications: getNotifications,
  },
});

const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addPost: addpost,
    postLikeHandler: postLikeHandler,
    addComment: addComment,
    deletePost: deletePost,
    deleteComment: deleteComment,
    createChat: createChat,
    sendMessage: sendMessage,
    makeMessageRead: makeMessageRead,
    updateUserAvatar: updateUserAvatar,
    makeFriendInvate: makeFriendInvate,
    makeNotificationRead: makeNotificationRead,
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
