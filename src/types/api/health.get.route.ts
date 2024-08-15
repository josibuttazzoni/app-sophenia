export type ApiHealthRoute = "/health";

export type ApiHealthData = {
    body?: undefined;
    params?: undefined;
    query?: undefined;
};

export type ApiHealth = {
    uptime: number;
    mongo: "connected" | "disconnected";
};

export type ApiHealthEndpoint = {
    route: ApiHealthRoute;
    data?: ApiHealthData;
    response: ApiHealth;
};
