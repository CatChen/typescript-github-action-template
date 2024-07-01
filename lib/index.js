var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { error, getInput, getState, notice, saveState, setFailed, } from '@actions/core';
import { getOctokit } from './getOctokit.js';
export function getLogin(githubToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = getOctokit(githubToken);
        const { viewer: { login }, } = yield octokit.graphql(`
      query {
        viewer {
          login
        }
      }
    `, {});
        return login;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const githubToken = getInput('github-token');
        const login = yield getLogin(githubToken);
        saveState('login', login);
        notice(`Hello, ${login}!`);
        error('Please implement this Action.');
    });
}
function cleanup() {
    const login = getState('login');
    notice(`Goodbye, ${login}!`);
    error('Please implemented or removed Action cleanup.');
}
if (!getState('isPost')) {
    saveState('isPost', 'true');
    run().catch((error) => setFailed(error));
}
else {
    cleanup();
}
