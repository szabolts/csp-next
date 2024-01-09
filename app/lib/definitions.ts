
export type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
  };

  export type SessionType = {
    user: {
      name: string;
      email: string;
      id: string;
    };
    expires: string;
    userId: string;
  };
  