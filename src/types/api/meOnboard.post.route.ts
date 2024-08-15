export type ApiOnboardRoute = "/me/onboard";

export type ApiOnboardData = {
    body: {
        firstName: string;
        lastName: string;
        email: string;
    };
    params?: undefined;
    query?: undefined;
};

export type ApiOnboard = {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    onboadingCompleted: boolean;
};

export type ApiOnboardEndpoint = {
    route: ApiOnboardRoute;
    data?: ApiOnboardData;
    response: ApiOnboard;
};
