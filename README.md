# Hello? Is this thing on?

**Hi there! 👋 This is something new. Let's have a look, shall we?**

This is the `stax-dev` mono-repo. It contains all the Stax codebases, including the Stax CLI, Stax API, Stax SDS Frontend, and Stax SDS Backend. It also contains the Stax documentation, and the Stax website.

## What is Stax?

Stax is a tech startup that aims to make it easier for people to create and manage their own websites. We're currently in the early stages of development, but we're working hard to make Stax a reality. We're recreating the entire developer experience from the ground up, and we're doing it in a way that's easy to use, and easy to understand. 

## What is a mono-repo?

A mono-repo is a repository that contains multiple projects. In this case, the `stax-dev` mono-repo contains all the Stax codebases. This means that no matter the project or the developer, everyone will be using this same repository. There are many benefits to this approach, including:
- **Easier to maintain** - Since all the code is in one place, it's easier to keep track of what's going on.
- **Reduced duplication** - Since all the code is in one place, it's easier to avoid duplicating code.
- **Checkout once, build once** - Since all the code is in one place, it's easier to checkout and build the code.
- **Universal Developer Access** - Since all the code is in one place, it's easier for developers to access the code they need, and look at other code they might be interested in.

It is important to note some caveats to this approach:
- **Harder to maintain** - Since all the code is in one place, it's harder to keep track of what's going on.
- **More confusing to start** - Since all the code is in one place, it's harder to get started.
- **Many people are not used to this approach** - Since most people are used to having separate repositories for each project, it takes some time to get used to this approach.


## What is the Stax CLI?

The Stax CLI is a command line interface for Stax. It allows you to create, manage, navigate, and deploy your Stax projects. It is written in Golang, and is available for Windows, Mac, and Linux. It is used as an alternative to using the Git CLI, Golang CLI, and other command line interfaces that we use at Stax.

## Where is my code then?

All the code is split into branches depending on their project. For example, the Stax CLI code is in the `stax-cli` branch, the Stax API code is in the `stax-api` branch, and so on. You can find the code for each project in their respective branches. They do not Merge into `master` like normal repositories, but instead get placed as a release once stable.