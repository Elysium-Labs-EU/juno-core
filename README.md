# Juno - [![Codacy Badge](https://app.codacy.com/project/badge/Grade/8cf13c07c4294ab9acad70f593c88259)](https://www.codacy.com/gh/Elysium-Labs-EU/juno-core/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Elysium-Labs-EU/juno-core&utm_campaign=Badge_Grade) [![CodeQL](https://github.com/Elysium-Labs-EU/react-gmail-core/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Elysium-Labs-EU/react-gmail-core/actions/workflows/codeql-analysis.yml) [![CircleCI](https://circleci.com/gh/Elysium-Labs-EU/juno-core/tree/main.svg?style=svg)](https://circleci.com/gh/Elysium-Labs-EU/juno-core/tree/main) [![Maintainability](https://api.codeclimate.com/v1/badges/c56ab6903c629b68bd70/maintainability)](https://codeclimate.com/github/Elysium-Labs-EU/juno-core/maintainability) [![discord](https://img.shields.io/badge/Discord-Community-blueviolet)](https://discord.gg/peRDGMn9xa) [![Juno Core](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/g45j5p&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/g45j5p/runs)


Juno is an Open Source React based Gmail application.

- A minimalistic design for less cognitive load, so you can use your brain for the needed work.
- Go through your emails with minimal clicks.
- Keep clear track of your to-do emails and new emails.

## Getting Started

1.  Download the code to your local machine
2.  Run `yarn` to install all packages
3.  Create a file called `.env` in the root of the project
4.  Set up the backend server via the steps [here](https://github.com/Elysium-Labs-EU/juno-backend-service/blob/main/README.md)
5.  Add `VITE_BACKEND_URL=YOUR_BACKEND_URL` to the `.env` file - the current default is `http://localhost:5001`
6.  All the other values given as an example in `.env.example` are optional.
7.  Run the app via `yarn start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Thank you for using Juno 😎 . With the help of its contributors, your experience with email will be as good as possible 🚀.

Looking for a first issue to tackle?

- Issues tagged with `good first issue` are a good place to start.
- Or contact me via [Discord](https://discord.gg/773bDh4X)

Contributing guidelines

- When encountering a bug, create a Github issue with the bug label in the active project. Be as specific as possible.
- To suggest a new feature, create a Github issue with the enhancement label in the active project.

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
