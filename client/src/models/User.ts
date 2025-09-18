export type UserProfileToken = {
    id: string;
    userName: string;
    email: string;
    token: string;
    isPremium: boolean;
};

export type UserProfile = {
    userName: string;
    email: string;
}