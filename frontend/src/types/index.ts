export interface Bot {
    id: string;
    name: string;
    description?: string;
    status: string;
    created: number;
}

export interface Worker {
    id: string;
    name: string;
    description?: string;
    bot: string;
    created: number;
}

export interface Log {
    id: string;
    created: string;
    message: string;
    bot: string;
    worker: string;
}
