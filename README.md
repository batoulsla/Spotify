# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
**# Spotify
This is a complete guide to test the project:
**Step 1: Prerequisites**
- Ensure you have Node.js and npm installed. If not, you can download and install them from the official website: [Node.js Downloads](https://nodejs.org/en/download/).

**Step 2: Download the Code**
- Download the project by clicking on the "Code" button and selecting "Download ZIP" from this [GitHub repository link](your-git-link).

**Step 3: Install Dependencies**
- Open a terminal or command prompt in the project directory.
- Install project dependencies by running the following command:

  npm install
  

**Step 4: Spotify Developer Account**
- Ensure you have a Spotify Developer account. If not, you can sign up for one at [Spotify for Developers](https://developer.spotify.com/).

**Step 5: Spotify API Setup**
- Create a Spotify API application in the Spotify Developer Dashboard and name it "Spotify."
- In the Spotify Developer Dashboard, create an application to obtain a client ID and client secret.

**Step 6: Environment Variables**
- Open the `.env` file in the project directory.
- Replace the Spotify-related environment variables with your values:
  - Set `REACT_APP_SPOTIFY_CLIENT_ID` to your Spotify client ID.
  - Set `REACT_APP_SPOTIFY_CLIENT_SECRET` to your Spotify client secret.
  - Set `REACT_APP_SPOTIFY_REDIRECT_URI` to the desired redirect URI (e.g., `http://localhost:3000/search`).

**Step 7: Run the Development Server**
- Start the development server with the following command:
  npm start
  

- This will launch the project in a development environment, and the development server should automatically open a web browser with the project.

**Step 8: Spotify Integration**
- In the project, navigate to the Spotify integration parts (e.g., the "Login" button).
- Click the "Login" button to test the Spotify authentication flow.
- You will be redirected to the Spotify login page.

**Step 12: Access Token Usage**
- Ensure that the access token is visible in the URL when you navigate to the "search" or "album" pages; otherwise, the application will not work.

By following these steps, you should be able to successfully set up and run the React project with Spotify integration.**
