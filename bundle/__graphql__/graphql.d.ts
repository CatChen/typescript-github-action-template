import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
export type ViewerLoginQueryVariables = Exact<{
    [key: string]: never;
}>;
export type ViewerLoginQuery = {
    __typename: 'Query';
    viewer: {
        __typename: 'User';
        id: string;
        login: string;
    };
};
export declare class TypedDocumentString<TResult, TVariables> extends String implements DocumentTypeDecoration<TResult, TVariables> {
    __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
    private value;
    __meta__?: Record<string, any> | undefined;
    constructor(value: string, __meta__?: Record<string, any> | undefined);
    toString(): string & DocumentTypeDecoration<TResult, TVariables>;
}
export declare const ViewerLoginDocument: TypedDocumentString<ViewerLoginQuery, ViewerLoginQueryVariables>;
export {};
