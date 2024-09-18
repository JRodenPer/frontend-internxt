
/**
 * A function that sometimes throws an error
 */
export const maybeThrowErrorMaybeNot = () => {
    
    const probability = 0.25;
    const shouldBoom = Math.random() < probability

    if(shouldBoom && process.env.NODE_ENV !== 'test') {
        throw new ApiError('UNKNOWN_ERROR','Something went wrong')
    }
}

export class ApiError extends Error {
    public code;
    constructor(code: string, message: string) {
        super(message);
        this.code = code;
    }
}