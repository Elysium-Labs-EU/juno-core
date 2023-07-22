# Juno - [![Codacy Badge](https://app.codacy.com/project/badge/Grade/8cf13c07c4294ab9acad70f593c88259)](https://www.codacy.com/gh/Elysium-Labs-EU/juno-core/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Elysium-Labs-EU/juno-core&utm_campaign=Badge_Grade) [![CodeQL](https://github.com/Elysium-Labs-EU/react-gmail-core/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Elysium-Labs-EU/react-gmail-core/actions/workflows/codeql-analysis.yml) [![CircleCI](https://circleci.com/gh/Elysium-Labs-EU/juno-core/tree/main.svg?style=svg)](https://circleci.com/gh/Elysium-Labs-EU/juno-core/tree/main) [![Maintainability](https://api.codeclimate.com/v1/badges/c56ab6903c629b68bd70/maintainability)](https://codeclimate.com/github/Elysium-Labs-EU/juno-core/maintainability) [![discord](https://img.shields.io/badge/Discord-Community-blueviolet)](https://discord.gg/peRDGMn9xa) [![Juno Core](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/g45j5p&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/g45j5p/runs) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://www.chromatic.com/library?appId=62586cc5c8e270003a13772f)

Upgrade your inbox game with Juno - the free, open-source Gmail app built with React.

- Sleek, minimal design reduces cognitive overload
- Effortlessly breeze through your emails with minimal clicks
- Keep track of to-do emails and new messages like a pro
- Free and open-source
- Built with React

## Docs

https://docs.elysiumlabs.io/docs/juno/development/

## Getting Started

There are two ways to get started. With installer or without installer.

### With installer
1. Make a copy of the juno-core repository on your own account
2. In the folder where you copied the repository, run the command `npx create-juno-dev-env`
3. To use the cloud backend, ask to be added to the Google Test users on [Discord](https://discord.gg/peRDGMn9xa). If you want to run it locally, follow the instructions [here](https://github.com/Elysium-Labs-EU/juno-backend-service/blob/main/README.md)

### Without installer

1. Download the code for Juno and run yarn to install all necessary packages
2. Create a file named `.env` in the root of the project
3. If you want to run the backend on your local machine, follow the steps [here](https://github.com/Elysium-Labs-EU/juno-backend-service/blob/main/README.md) or skip to the next step.
4. Add `VITE_BACKEND_URL=YOUR_BACKEND_URL` to the `.env` file. If you want to use our hosted cloud backend, set `VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND=true` and `VITE_BACKEND_URL=https://juno-api.elysiumlabs.io`. And request to be added to the Google Test users via Discord
5. Run the app using `yarn dev`. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Contributing

Thank you for using Juno 😎 . With the help of its contributors, your experience with email will be as good as possible 🚀.

Looking for a first issue to tackle?

- Issues tagged with `good first issue` are a good place to start.
- Or contact me via [Discord](https://discord.gg/peRDGMn9xa)

Contributing guidelines

- When encountering a bug, create a Github issue with the bug label in the active project. Be as specific as possible.
- To suggest a new feature, create a Github issue with the enhancement label in the active project.
- Please do not stack features/chores/refactors/enhancements in one PR. Describe your feature/implementation in the PR. If you're unsure its useful or if it is a major change, please open an issue first and get feedback.
- Follow eslint provided
- Comment your code
- Write Clean code

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Your system should run on the development `dev` branch to be in sync with the latest development changes.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Roadmap

For the Roadmap of this project please check [this](https://github.com/Elysium-Labs-EU/juno-core/projects/1).
The current focus is to stabilize the app and adding some core mail features, such as composing with attachments.
