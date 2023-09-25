# National Nonprofit Portal

## Stack

- React.js: Front-end
- Chakra UI: React components
- Next.js: Page/API routing and pre-rendering
- MongoDB: Permanently storing data
- Next Auth: User authentication
- eslint: Automatically identifying and fixing code errors
- prettier: Enforcing common coding style

## Development

1. Clone this project to your computer
2. Navigate to this project in your terminal
### Use with Docker
3. Install docker and docker-compose

MacOS: [Docker Desktop for MacOS](https://docs.docker.com/desktop/install/mac-install/)

Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

Linux: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

4. Obtain your secrets -- **Linux or MacOS** (Skip if Windows); you will need to obtain a password from your Engineering Manager:

First, install **BitWarden CLI** and **fx** with `npm install -g @bitwarden/cli fx`

Or, if you're using Homebrew, run `brew install bitwarden-cli fx`

Now fetch the secrets from BitWarden with `yarn secrets:linux`

4. Obtain your secrets -- **Windows Machines** (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:

First, install **BitWarden CLI** and **fx** with npm with `npm install -g @bitwarden/cli fx`

Now fetch the secrets from BitWarden with `yarn secrets:login` and `yarn secrets:sync`

5. Run `docker-compose up --build` to run the dev environment

To run build or any other script specified in the package.json, provide the NODE_COMMAND environment variable before docker-compose like `NODE_COMMAND=build docker-compose up --build`

### Use without Docker

__Note__: You might want to remove the .babelrc file from your local directory to enable SWC, a faster compiler for Next.js than Babel. __This will break Docker__.

3. Run `npm ci` to retrieve dependencies
4. Run `npm run secrets` to sync secrets to `.env.local`
   - You will be asked for a password, ask your EM to send it to you
   - **Note:** Windows users will need to run `npm run secrets:login` and `npm run secrets:sync` instead
5. Run `npm run dev` to start the application

## Useful Commands

When you commit your code, both of the commands below are run automatically.

- `npm run lint`: Check for errors in your code
- `npm run format`: Fix code styling

## Additional Information

- Use `[NAME]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"
