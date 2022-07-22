export interface PostType {
  id: string;
  Creator: {
    Firstname: string;
    Surname: string;
    Avatar: string;
    id: string;
  };
  Date: string;
  TextContent: string;
  Images: string[];
  LikedBy: string[];
  Comments: {
    id: string;
    Creator: {
      Firstname: string;
      Surname: string;
      Avatar: string;
      id: string;
    };
    CommenContent: string;
    Date: string;
  }[];
}
