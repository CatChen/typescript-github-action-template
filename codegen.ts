import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://docs.github.com/public/fpt/schema.docs.graphql',
  documents: ['src/**/!(*.d).ts'],
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    './src/__graphql__/': {
      preset: 'client',
      config: {
        // NodeNext resolves ESM imports exactly as Node does, so generated
        // TypeScript must point at the JavaScript files that tsc will emit.
        importExtension: '.js',
        useTypeImports: true,
        enumsAsTypes: true,
        dedupeFragments: true,
        nonOptionalTypename: true,
        documentMode: 'string',
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
        skipDocumentsValidation: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

export default config;
