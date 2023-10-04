package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

const initFilePath = "initialized.txt"

// InitializeApp performs first-time setup
func InitializeApp() {
	// Check if the app has already been initialized
	if _, err := os.Stat(initFilePath); err == nil {
		fmt.Println("Application already initialized.")
		return
	}

	// Step 1: GitHub CLI setup
	if err := setupGitHubCLI(); err != nil {
		fmt.Printf("Failed to setup GitHub CLI: %v\n", err)
		return
	}

	// Step 2: SSH Key setup
	if err := setupSSHKeys(); err != nil {
		fmt.Printf("Failed to setup SSH keys: %v\n", err)
		return
	}

	// Step 3: Docker setup with GitHub
	if err := setupDockerWithGitHub(); err != nil {
		fmt.Printf("Failed to setup Docker with GitHub: %v\n", err)
		return
	}

	// Create a file to mark the app as initialized
	ioutil.WriteFile(initFilePath, []byte("initialized"), 0644)
}

// executeCmd executes the given command and handles errors
func executeCmd(cmd *exec.Cmd) error {
	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("Error while executing command: %v", err)
	}
	fmt.Println("Command executed successfully.")
	return nil
}

// setupGitHubCLI prompts the user for GitHub credentials and configures the GitHub CLI
func setupGitHubCLI() error {
	reader := bufio.NewReader(os.Stdin)

	// Prompt for username
	fmt.Print("Enter your GitHub username: ")
	username, _ := reader.ReadString('\n')

	// Prompt for token
	fmt.Print("Enter your GitHub token: ")
	token, _ := reader.ReadString('\n')

	// Run GitHub CLI command to configure
	cmd := exec.Command("gh", "auth", "login", "--with-token", token)
	return executeCmd(cmd)
}

// setupSSHKeys prompts the user to set up or provide SSH keys
func setupSSHKeys() error {
	reader := bufio.NewReader(os.Stdin)

	// Prompt for SSH key path
	fmt.Print("Enter the path to your SSH key: ")
	sshKeyPath, _ := reader.ReadString('\n')

	// Store SSH key path for future use (in a file or environment variable)
	// Logic here

	return nil
}

// setupDockerWithGitHub prompts for GitHub credentials to set up Docker with GitHub Container Registry
func setupDockerWithGitHub() error {
	reader := bufio.NewReader(os.Stdin)

	// Prompt for GitHub username
	fmt.Print("Enter your GitHub username for Docker: ")
	username, _ := reader.ReadString('\n')

	// Prompt for GitHub token
	fmt.Print("Enter your GitHub token for Docker: ")
	token, _ := reader.ReadString('\n')

	// Logic to configure Docker with GitHub credentials
	cmd := exec.Command("docker", "login", "ghcr.io", "-u", username, "-p", token)
	return executeCmd(cmd)
}

func main() {
	// Check if first-time launch
	InitializeApp()

	// Continue with the rest of the CLI app logic
}
