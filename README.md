# National Nonprofit Portal

## Stack
* React.js: Front-end
* Chakra UI: React components
* Next.js: Page/API routing and pre-rendering
* MongoDB: Permanently storing data
* Auth0: User authentication
* eslint: Automatically identifying and fixing code errors
* prettier: Enforcing common coding style

## Development

1. Clone this project to your computer
2. Navigate to this project in your terminal
3. Run `npm install` to retrieve dependencies
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
