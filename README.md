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

---

## Using Git Properly

### Versioning

This project uses [Semantic Versioning](https://semver.org/). This means that the version number will be in the following format:

```
MAJOR.MINOR.PATCH
```

#### Major

The major version number is incremented when a backwards incompatible change is made.

#### Minor

The minor version number is incremented when a backwards compatible change is made.

#### Patch

The patch version number is incremented when a backwards compatible bug fix is made.

All version numbers start at `0.0.0`.

Another way to think about this is:

```
VERSION.FEATURE.BUGFIX
```

Where `VERSION` is the major version number, `FEATURE` is the minor version number, and `BUGFIX` is the patch version number. Every time a new feature is added, the `FEATURE` number is incremented. Every time a bug is fixed, the `BUGFIX` number is incremented. Every time a backwards incompatible change is made, the `VERSION` number is incremented, and the `FEATURE` and `BUGFIX` numbers are reset to `0`.

### Branches

- `master` - The main branch. This is the branch that is deployed to production.
- `dev` - The development branch. This is the branch that is deployed to the development environment.
- `feature/<feature-name>` - A feature branch. This is a branch that is used to develop a new feature. Once the feature is complete, it is merged into `dev`.
- `bugfix/<bugfix-name>` - A bugfix branch. This is a branch that is used to fix a bug. Once the bug is fixed, it is merged into `dev`.

#### Creating a Branch

```bash
git checkout -b <branch-name>
```

#### Switching Branches

```bash
git checkout <branch-name>
```

#### Merging Branches

```bash
git checkout <branch-to-merge-into>
git merge <branch-to-merge>
```

#### Deleting Branches

```bash
git branch -d <branch-name>
```

### Commit Messages

Commit messages should be in the following format:

```
<VERSION> <type>(<scope>): <subject>
```

You can use the following command to create a commit message:

```bash
git commit -m "<VERSION> <type>(<scope>): <subject>"
```

Otherwise, you can use the following command to create a commit message:

```bash
git commit
```

This will open up your default text editor. You can then write your commit message in the following format:

```
<VERSION> <type>(<scope>): <subject>

<body>

<footer>
```

#### Example

```
1.6.0 feat(api): add user authentication

Add user authentication to the API.
```

#### Type

The type of the commit message. This can be one of the following:

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor` - A code change that neither fixes a bug nor adds a feature
- `perf` - A code change that improves performance
- `test` - Adding missing tests
- `chore` - Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope

The scope of the commit message. This can be anything specifying the place of the commit change. For example `README.md` or `api`.

#### Subject

The subject of the commit message. This should be a short description of the change.

### Pull Requests

Pull requests should be in the following format:

```
<VERSION> <type>(<scope>): <subject>
```

You can use the following command to create a pull request:

```bash
git pull-request -m "<VERSION> <type>(<scope>): <subject>"
```

#### Type

The type of the pull request. This can be one of the following:

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor` - A code change that neither fixes a bug nor adds a feature
- `perf` - A code change that improves performance
- `test` - Adding missing tests
- `chore` - Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope

The scope of the pull request. This can be anything specifying the place of the pull request change. For example `README.md` or `api`.

#### Subject

The subject of the pull request. This should be a short description of the change.