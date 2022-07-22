export interface NotificationType {
  Image: string;
  TextContent: string;
  From: {
    Firstname: string;
    Surname: string;
    Avatar: string;
    id: string;
  };
  IsRead: boolean;
  Date: string;
}
