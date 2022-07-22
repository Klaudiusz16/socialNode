import { UserType } from "../interfaces/UserType";
import { NotificationsData } from "./notifications";
import { messengerData } from "./messenger";
import { postsData } from "./posts";

export const usersData: UserType[] = [
  {
    ID: "379067356735890",
    Firstname: "Thomas",
    Avatar: "https://picsum.photos/50",
    Surname: "Rickard",
    DateOfBirth: new Date().toISOString(),
    Country: "Portugal",
    Groups: [],
    Email: "thomas@gmail.com",
    Password: "thomas55",
    Posts: [...postsData],
    Friends: [],
    Notifications: [...NotificationsData],
    Chats: [...messengerData],
    liked: {
      posts: ["5248372590"],
      comments: [],
    },
  },
  {
    ID: "379067356735890",
    Firstname: "Rogerson",
    Avatar: "https://picsum.photos/50",
    Surname: "Mustaff",
    DateOfBirth: new Date("10.12.1994").toISOString(),
    Country: "England",
    Groups: [],
    Email: "Rogerson@gmail.com",
    Password: "Rogerson55",
    Posts: [],
    Friends: [],
    Notifications: [...NotificationsData],
    Chats: [...messengerData],
    liked: {
      posts: [],
      comments: [],
    },
  },
  {
    ID: "379067356735890",
    Firstname: "George",
    Avatar: "https://picsum.photos/50",
    Surname: "Flyod",
    DateOfBirth: new Date("10.12.1992").toISOString(),
    Country: "Spain",
    Groups: [],
    Email: "George@gmail.com",
    Password: "George55",
    Posts: [],
    Friends: [],
    Notifications: [...NotificationsData],
    Chats: [...messengerData],
    liked: {
      posts: [],
      comments: [],
    },
  },
  {
    ID: "379067356735890",
    Firstname: "Martin",
    Avatar: "https://picsum.photos/50",
    Surname: "Masterson",
    DateOfBirth: new Date("10.12.1994").toISOString(),
    Country: "Russia",
    Groups: [],
    Email: "Martin@gmail.com",
    Password: "Martin55",
    Posts: [],
    Friends: [],
    Notifications: [...NotificationsData],
    Chats: [...messengerData],
    liked: {
      posts: [],
      comments: [],
    },
  },
];
