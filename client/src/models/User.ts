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

export type UserPremiumProfile = {
    id: string;
    userName: string;
    email: string;
    isPremium: boolean;
}