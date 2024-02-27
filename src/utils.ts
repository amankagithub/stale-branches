import { execSync } from 'child_process';

export function getLocalBranches(): string[] {
    const rawLocalBranches = execSync('git branch').toString().trim().split('\n');
    const processedBranchNames = rawLocalBranches.map(branch => branch.replace('*', '').trim());
    return processedBranchNames;
}

export function getRemoteBranches(): string[] {
    const rawRemoteBranches = execSync('git branch -r').toString().trim().split('\n');
    const processedBranchNames = rawRemoteBranches.map(branch => branch.replace('origin/', '').trim());
    return processedBranchNames;
}

export function deleteLocalBranches(branchNames: string[]) {
    console.log('Deleting following branches :', branchNames);
    execSync(`git branch -D ${branchNames.join(' ')}`);
    console.log('Successfully deleted given branches', branchNames);
}