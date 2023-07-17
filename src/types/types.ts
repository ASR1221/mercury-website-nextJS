export type Post = {
   id: number,
   title: string,
   body: string,
   userId: number,
   tags: string[],
   reactions: number,
}

export type User = {
   id: number,
   username: string,
   email?: string,
}

export type Comment = {
   id: number,
   body: string,
   postId: number,
   user: User,
}

export type ResObj = {
  total: number,
  skip: number,
  limit: number,
}