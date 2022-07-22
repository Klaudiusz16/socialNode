export interface MessageType {
  Date: string;
  IsRead: boolean;
  TextContent: string;
  id: string;
  Creator: {
    Firstname: string;
    Avatar: string;
    id: string;
    Surname;
  };
}

export interface ChatType {
  id: string;
  Participants: {
    Firstname: string;
    Avatar: string;
    id: string;
    Surname;
  }[];
  Messages: MessageType[];
}
