// src/types.ts

export interface SuccessResponse {
    success: true;
    token: string;
    admin: {
        id: string;
        user_name: string;
        email: string;
        phone_number: string;
    };
}

export interface FailureResponse {
    success: false;
    message: string;
}

// Union type for action data
export type ActionData = SuccessResponse | FailureResponse;
