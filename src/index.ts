import { getLocalBranches, getRemoteBranches } from "./utils";

async function main() {
    const localBranches = getLocalBranches();
    console.log('Local branches : ', localBranches);

    const remoteBranches = getRemoteBranches();
    console.log('Remote branches : ', remoteBranches);
}

main().catch(e => {
    console.error('Error in the script : ', e);
})