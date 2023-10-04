package docker

import (
	"fmt"
	"os/exec"
)

// BuildImage builds a Docker image
func BuildImage(dockerfilePath string, imageName string) error {
	cmd := exec.Command("docker", "build", "-t", imageName, dockerfilePath)
	return executeCmd(cmd)
}

// RunContainer runs a Docker container from an image
func RunContainer(imageName string, containerName string) error {
	cmd := exec.Command("docker", "run", "--name", containerName, imageName)
	return executeCmd(cmd)
}

// StopContainer stops a running Docker container
func StopContainer(containerName string) error {
	cmd := exec.Command("docker", "stop", containerName)
	return executeCmd(cmd)
}

// RemoveContainer removes a stopped Docker container
func RemoveContainer(containerName string) error {
	cmd := exec.Command("docker", "rm", containerName)
	return executeCmd(cmd)
}

// ListContainers lists all running Docker containers
func ListContainers() error {
	cmd := exec.Command("docker", "ps")
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
