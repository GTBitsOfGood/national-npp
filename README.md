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
