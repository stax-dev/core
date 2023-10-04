package git

import (
	"fmt"
	"os/exec"
)

// Clone a Git repository
func Clone(repoURL string, destination string) error {
	cmd := exec.Command("git", "clone", repoURL, destination)
	return executeCmd(cmd)
}

// Pull updates from a Git repository
func Pull(repoPath string) error {
	cmd := exec.Command("git", "-C", repoPath, "pull")
	return executeCmd(cmd)
}

// Push changes to a Git repository
func Push(repoPath string, branch string) error {
	cmd := exec.Command("git", "-C", repoPath, "push", "origin", branch)
	return executeCmd(cmd)
}

// SwitchBranch switches to another branch
func SwitchBranch(repoPath string, branch string) error {
	cmd := exec.Command("git", "-C", repoPath, "checkout", branch)
	return executeCmd(cmd)
}

// CreateBranch creates a new branch
func CreateBranch(repoPath string, branch string) error {
	cmd := exec.Command("git", "-C", repoPath, "checkout", "-b", branch)
	return executeCmd(cmd)
}

// MergeBranch merges a branch into the current one
func MergeBranch(repoPath string, branchToMerge string) error {
	cmd := exec.Command("git", "-C", repoPath, "merge", branchToMerge)
	return executeCmd(cmd)
}

// DeleteBranch deletes a branch
func DeleteBranch(repoPath string, branch string) error {
	cmd := exec.Command("git", "-C", repoPath, "branch", "-d", branch)
	return executeCmd(cmd)
}

// ExecuteCmd executes the given command and handles errors
func executeCmd(cmd *exec.Cmd) error {
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("Error while executing command: %v", err)
	}
	fmt.Println("Command executed successfully.")
	return nil
}
