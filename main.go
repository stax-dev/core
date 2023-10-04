// This is the CLI for Stax. It makes using git, ssh, and other cli tools easier by providing aliases and shortcuts for the most common commands.

package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// Get the current working directory
const cwd, _ = os.Getwd()
const home = os.Getenv("HOME")

// Here are the list of commands that Stax supports

// git commands
// add => git add .
// commit <message> => git commit -m "<message>"
// push => git push origin && git push sgs
// pull => git pull origin && git pull sgs
// status => git status
// checkout <branch> => git checkout <branch>
// branch <branch> => git checkout -b <branch>
// merge <branch> => git merge <branch>
// stash => git stash

// ssh commands
// ssh host => ssh <host>
// ssh-add => ssh-add ~/.ssh/id_rsa
// ssh-copy-id <host> => ssh-copy-id <host>

// docker commands
// d up => docker-compose up -d
// d down => docker-compose down
// d ps => docker ps -a
// d logs => docker-compose logs -f
// d exec <container> <command> => docker exec -it <container> <command>
// d stop <container> => docker stop <container>
// d rm <container> => docker rm <container>
// d rmi <image> => docker rmi <image>
// d images => docker images
// d pull <image> => docker pull <image>
// d build <image> => docker build -t <image> .
// d run <image> => docker run -itd <image>
// d run <image> <command> => docker run -itd <image> <command>
// d run <image> <command> <args> => docker run -itd <image> <command> <args>

// github-cli commands
// gh pr => gh pr list
// gh pr <number> => gh pr view <number>
// gh pr checkout <number> => gh pr checkout <number>
// gh pr merge <number> => gh pr merge <number>
// gh pr close <number> => gh pr close <number>
// gh pr create <branch> => gh pr create -b <branch>
// gh pr create <branch> <title> => gh pr create -b <branch> -t <title>
// gh pr create <branch> <title> <body> => gh pr create -b <branch> -t <title> -b <body>
// gh issue => gh issue list
// gh issue <number> => gh issue view <number>
// gh issue close <number> => gh issue close <number>

// AI commands (OpenAI)
// ai "<prompt>" => curl
