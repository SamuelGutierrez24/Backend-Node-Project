
import { AuthenticationError } from 'apollo-server';

export const verifyRole = (user: any, requiredRole: string) => {
    if (!user || user.role !== requiredRole) {
        throw new AuthenticationError('Unauthorized');
    }
};

export const verifyUserRole = {
    requestDidStart: async (requestContext: any) => {
        const { user } = requestContext.context;
        if (user && user.role !== '0' && user.role !== '1') {
            throw new AuthenticationError('Invalid role');
        }
    }
};