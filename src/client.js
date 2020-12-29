import { GraphQLClient } from 'graphql-request';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/graphql'
    : 'http://localhost:5000/graphql';
export const WS_URL =
  process.env.NODE_ENV === 'production'
    ? 'ws://fundboon.com/graphql'
    : 'ws://localhost:5000/graphql';

export const FILE_UPLOAD_URL =
    process.env.NODE_ENV === 'production'
      ? '/api/fullerton/file-upload'
      : 'https://www.fundboon.com/api/fullerton/file-upload';

export const FULLERTON_APPLY_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/fullerton/create-lead'
    : 'https://www.fundboon.com/api/fullerton/create-lead';

export const useClient = () => {
  return new GraphQLClient(BASE_URL, { credentials: 'include' });
};
