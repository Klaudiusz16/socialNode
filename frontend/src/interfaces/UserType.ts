import { NotificationType } from "./Notification";

export interface UserType {
  id: string;
  Firstname: string;
  Surname: string;
  DateOfBirth: string;
  Country: string;
  Email: string;
  Password: string;
  Friends: {
    Firstname: string;
    Surname: string;
    DateOfBirth: string;
    Country: string;
  }[];
  Avatar: string;
  Notifications: NotificationType[];
}
