# Juno - [![Codacy Badge](https://app.codacy.com/project/badge/Grade/8cf13c07c4294ab9acad70f593c88259)](https://www.codacy.com/gh/Elysium-Labs-EU/juno-core/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Elysium-Labs-EU/juno-core&utm_campaign=Badge_Grade) [![CodeQL](https://github.com/Elysium-Labs-EU/react-gmail-core/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Elysium-Labs-EU/react-gmail-core/actions/workflows/codeql-analysis.yml) [![CircleCI](https://circleci.com/gh/Elysium-Labs-EU/juno-core/tree/main.svg?style=svg)](https://circleci.com/gh/Elysium-Labs-EU/juno-core/tree/main) [![Maintainability](https://api.codeclimate.com/v1/badges/c56ab6903c629b68bd70/maintainability)](https://codeclimate.com/github/Elysium-Labs-EU/juno-core/maintainability) [![slack](https://img.shields.io/badge/slack-brigade-brightgreen.svg?logo=slack)](https://join.slack.com/t/slack-pfs5354/shared_invite/zt-1dnnwr9wn-njkaaxES_sUWywV2~JANjg)

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
6.  Add `VITE_GOOGLE_CLIENT_ID` to the `.env` file - the value is the client id from your frontend Google Credentials. Read here how to setup Google Credentials: https://developers.google.com/workspace/guides/create-credentials. The credential version is `Web application`.
7.  For the Google Web Application credentials you created on step 6, as the `Authorised JavaScript origins` set `http://localhost` and `http://localhost:3000`. This is done via the Google Cloud Console, by clicking on the credentials' name under Credentials > OAuth 2.0 Client IDs , and enter the form.
8.  Run the app via `yarn start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Thank you for using Juno 😎 . With the help of its contributors, your experience with email will be as good as possible 🚀.

Looking for a first issue to tackle?

- Issues tagged with `good first issue` are a good place to start.
- Or contact me via Discord: `Dhr_RT#5882`

Contributing guidelines

- When encountering a bug, create a Github issue with the bug label in the active project. Be as specific as possible.
- To suggest a new feature, create a Github issue with the enhancement label in the active project.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Roadmap

For the Roadmap of this project please check [this](https://github.com/Elysium-Labs-EU/juno-core/projects/1).
The current focus is to stabilize the app and adding some core mail features, such as forwarding, cc/bcc options.
