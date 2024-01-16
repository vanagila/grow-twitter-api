declare namespace Express {
  interface Request {
    authorizedUser: {
      id: string;
      username: string;
      email: string;
    };
  }
}
