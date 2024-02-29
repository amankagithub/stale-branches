import { deleteLocalBranches, getLocalBranches, getRemoteBranches } from "./utils";
import yargs from 'yargs';
async function main() {
    const cli = yargs.options('print-stale-branches', {
        type: 'boolean',
        alias: 'p',
        description: 'Option to print stale branches',
    }).option('delete-stale-branch', {
        type: 'boolean',
        alias: 'd',
        description: 'Delete stale branches'
    }).example('git stale-branches -p -d', 'Print and delete stale branches');

    // TODO : check why we are getting type error here
    const { printStaleBranches, deleteStaleBranch } = cli.argv as { printStaleBranches?: boolean, deleteStaleBranch?: boolean };

    if (!printStaleBranches && !deleteStaleBranch) {
        console.log('Please run the command with one of these options : print-stale-branches (p) or delete-stale-branch (d)');
        return;
    }
    const localBranches = getLocalBranches();

    const remoteBranches = getRemoteBranches();

    const staleBranches = localBranches.filter(localBranch => !remoteBranches.includes(localBranch));

    if (!staleBranches.length) {
        console.log('There is no stale branches found');
        return;
    }
    if (printStaleBranches) {
        console.log(...staleBranches);
    }
    if (deleteStaleBranch) {
        deleteLocalBranches(staleBranches);
    }
}

main().catch(e => {
    console.error('Error in the stale-branches script : ', e);
})