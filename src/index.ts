import type { ResultOf } from '@graphql-typed-document-node/core';
import {
  error,
  getInput,
  getState,
  notice,
  saveState,
  setFailed,
} from '@actions/core';
import { getOctokit } from './getOctokit.js';
import { graphql } from './graphql/gql.js';

const LOGIN_QUERY = graphql(`
  query ViewLogin {
    viewer {
      login
    }
  }
`).toString();

export async function getLogin(githubToken: string): Promise<string> {
  const octokit = getOctokit(githubToken);
  const {
    viewer: { login },
  } = (await octokit.graphql<{ viewer: { login: string } }>(
    LOGIN_QUERY,
    {},
  )) as ResultOf<typeof LOGIN_QUERY>;
  return login;
}

async function run(): Promise<void> {
  const githubToken = getInput('github-token');
  const login = await getLogin(githubToken);
  saveState('login', login);

  notice(`Hello, ${login}!`);
  error('Please implement this Action.');
}

function cleanup(): void {
  const login = getState('login');

  notice(`Goodbye, ${login}!`);
  error('Please implement or remove Action cleanup.');
}

if (!getState('isPost')) {
  saveState('isPost', 'true');
  run().catch((error: Error) => setFailed(error));
} else {
  cleanup();
}
