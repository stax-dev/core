<!-- Path: README.md -->

# sds-api
The API Wiki for the SDS

## Getting Started

```bash
make build # Build the API binary
make run # Run the API binary
```

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

## API Documentation

### Authentication

#### Login

##### Request

```
POST /auth/login
```

##### Body

```json
{
  "username": "username",
  "password": "password"
}
```

##### Validations

- `username` - Required
- `password` - Required

#### Register

##### Request

```
POST /auth/register
```

##### Body

```json
{
  "username": "username",
  "password": "password",
  "email": "email"
}
```

##### Validations

- `username` - Required
- `password` - Required
- `email` - Required

### Users

#### Get User

##### Request

```
GET /users/:id
```

##### Validations

- `id` - Required

#### Get Users

##### Request

```
GET /users
```

#### Create User

##### Request

```
POST /users
```

##### Body

```json
{
  "username": "username",
  "password": "password",
  "email": "email"
}
```

##### Validations

- `username` - Required
- `password` - Required
- `email` - Required

#### Update User

##### Request

```
PUT /users/:id
```

##### Body

```json
{
  "username": "username",
  "password": "password",
  "email": "email"
}
```

##### Validations

- `id` - Required
- `username` - Required
- `password` - Required
- `email` - Required

#### Delete User

##### Request

```
DELETE /users/:id
```

##### Validations

- `id` - Required