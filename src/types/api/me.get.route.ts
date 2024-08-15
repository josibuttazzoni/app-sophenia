export type ApiMeRoute = "/me";

export type ApiMeData = {
    body?: undefined;
    params?: undefined;
    query?: undefined;
};

export type ApiMe = {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    onboadingCompleted: boolean;
};

export type ApiMeEndpoint = {
    route: ApiMeRoute;
    data?: ApiMeData;
    response: ApiMe;
};
