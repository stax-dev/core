package ssh

import (
	"fmt"
	"io"
	"os"

	"golang.org/x/crypto/ssh"
)

// ConnectSSH establishes an SSH connection
func ConnectSSH(user, host string, port int, privateKeyPath string) (*ssh.Client, error) {
	privateKey, err := io.ReadFile(privateKeyPath)
	if err != nil {
		return nil, fmt.Errorf("unable to read private key: %v", err)
	}

	signer, err := ssh.ParsePrivateKey(privateKey)
	if err != nil {
		return nil, fmt.Errorf("unable to parse private key: %v", err)
	}

	config := &ssh.ClientConfig{
		User: user,
		Auth: []ssh.AuthMethod{
			ssh.PublicKeys(signer),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(), // Note: please secure this in production
	}

	client, err := ssh.Dial("tcp", fmt.Sprintf("%s:%d", host, port), config)
	if err != nil {
		return nil, fmt.Errorf("failed to dial: %v", err)
	}

	return client, nil
}

// ExecuteCommand runs a command on the SSH server
func ExecuteCommand(command string, client *ssh.Client) error {
	session, err := client.NewSession()
	if err != nil {
		return fmt.Errorf("failed to create session: %v", err)
	}
	defer session.Close()

	session.Stdout = os.Stdout
	session.Stderr = os.Stderr

	err = session.Run(command)
	if err != nil {
		return fmt.Errorf("failed to run command: %v", err)
	}

	return nil
}

// TransferFile securely copies a file to a remote host
func TransferFile(localFilePath, remoteFilePath string, client *ssh.Client) error {
	// Read the local file
	content, err := io.ReadFile(localFilePath)
	if err != nil {
		return fmt.Errorf("could not read local file: %v", err)
	}

	// Create a new session
	session, err := client.NewSession()
	if err != nil {
		return fmt.Errorf("failed to create session: %v", err)
	}
	defer session.Close()

	// Create the remote file
	remoteFile, err := session.StdoutPipe()
	if err != nil {
		return fmt.Errorf("could not create remote file: %v", err)
	}

	go func() {
		fmt.Fprint(remoteFile, content)
	}()

	// SCP the content to the remote file
	err = session.Run(fmt.Sprintf("cat > %s", remoteFilePath))
	if err != nil {
		return fmt.Errorf("failed to transfer file: %v", err)
	}

	return nil
}
