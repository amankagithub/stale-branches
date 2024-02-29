import { execSync } from 'child_process';

export function pruneRemoteBranchRef() {
    execSync('git fetch origin --prune');
}
export function getLocalBranches(): string[] {
    const rawLocalBranches = execSync('git branch').toString().trim().split('\n');
    const processedBranchNames = rawLocalBranches.map(branch => branch.replace('*', '').trim());
    return processedBranchNames;
}

export function getRemoteBranches(): string[] {
    // If we don't prune refs of deleted remote branches locally
    // Our local repo will still think these branches exits on remote
    pruneRemoteBranchRef();
    const rawRemoteBranches = execSync('git branch -r').toString().trim().split('\n');
    const processedBranchNames = rawRemoteBranches.map(branch => branch.replace('origin/', '').trim());
    return processedBranchNames;
}

export function deleteLocalBranches(branchNames: string[]) {
    console.log('Deleting following branches :', branchNames);
    execSync(`git branch -D ${branchNames.join(' ')}`);
    console.log('Deleted successfully');
}