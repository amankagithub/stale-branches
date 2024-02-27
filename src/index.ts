import { deleteLocalBranches, getLocalBranches, getRemoteBranches } from "./utils";

async function main() {
    const localBranches = getLocalBranches();
    console.log('Local branches : ', localBranches);

    const remoteBranches = getRemoteBranches();
    console.log('Remote branches : ', remoteBranches);

    const staleBranches = localBranches.filter(localBranch => !remoteBranches.includes(localBranch));
    if (!staleBranches.length) {
        console.log('There is no stale branches found');
        return;
    }
    deleteLocalBranches(staleBranches);
}

main().catch(e => {
    console.error('Error in the stale-branches script : ', e);
})