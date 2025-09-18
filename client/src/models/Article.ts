export type Article = {
    id: number;
    topic: string;
    articleLength: string;
    content: string;
    createdAt: string;
    userId: string;
}

export type ArticlePost = {
    topic: string;
    articleLength: string;
}