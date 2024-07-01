import { error, getState, info, saveState } from '@actions/core';
import { context } from '@actions/github';
function run() {
    if (!getState('isPost')) {
        saveState('isPost', 'true');
    }
    info(`This is the Action context: ${JSON.stringify(context)}`);
    error('Action needs to be implemented.');
}
function cleanup() {
    error('Post action needs to be implemented or removed.');
}
if (!getState('isPost')) {
    run();
}
else {
    cleanup();
}
