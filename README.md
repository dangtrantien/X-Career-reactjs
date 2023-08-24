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

## Link Deploy

This project was deploy here: [https://berry-react.onrender.com](https://berry-react.onrender.com)

### This project has following structures:

```
public
  ├─ favicon.svg
  └─ index.html
src
  ├─ asset
  │   │─ images
  │   │   │─ auth
  │   │   │   │─ auth-blue-card.svg
  │   │   │   │─ auth-pattern-dark.svg
  │   │   │   │─ auth-pattern.svg
  │   │   │   │─ auth-purple-card.svg
  │   │   │   │─ auth-signup-blue-card.svg
  │   │   │   └─ auth-signup-white-card.svg
  │   │   │─ icons
  │   │   │   │─ earning.svg
  │   │   │   └─ social-google.svg
  │   │   │─ users
  │   │   │   └─ user-round.svg
  │   │   │─ illustration_404.svg
  │   │   │─ logo-dark.svg
  │   │   │─ logo-white.svg
  │   │   └─ logo.svg
  │   └─ scss
  │       │─ _themes-vars.module_.scss
  │       └─ style.scss
  ├─ layout
  │   │─ MainLayout
  │   │   │─ Header
  │   │   │   │─ NotificationSection
  │   │   │   │   │─ index.js
  │   │   │   │   └─ NotificationList.js
  │   │   │   │─ ProfileSection
  │   │   │   │   └─ index.js
  │   │   │   │─ SearchSection
  │   │   │   │   └─ index.js
  │   │   │   └─ index.js
  │   │   │─ LogoSection
  │   │   │   └─ index.js
  │   │   │─ Sidebar
  │   │   │   └─ MenuList
  │   │   │       │─ NavBoard
  │   │   │       │   │─ Item.js
  │   │   │       │   └─ List.js
  │   │   │       │─ NavDashboard
  │   │   │       │   │─ Item.js
  │   │   │       │   └─ List.js
  │   │   │       │─ NavWorkSpace
  │   │   │       │   │─ Item.js
  │   │   │       │   └─ List.js
  │   │   │       └─ index.js
  │   │   └─ index.js
  │   │─ MinimalLayout
  │   │   └─ index.js
  │   └─ NavigationScroll.js
  │─ routes
  │   │─ AuthenticationRoutes.js
  │   │─ BoardRoutes.js
  │   │─ ErrorRoutes.js
  │   │─ index.js
  │   │─ MainRoutes.js
  │   │─ UserRoutes.js
  │   └─ WorkSpaceRoutes.js
  │─ services
  │   │─ baseAPI.js
  │   │─ BoardAPI.js
  │   │─ CommentAPI.js
  │   │─ TaskAPI.js
  │   │─ UploadAPI.js
  │   │─ UserAPI.js
  │   └─ WorkSpaceAPI.js
  │─ store
  │   │─ actions.js
  │   │─ constant.js
  │   │─ customizationReducer.js
  │   │─ index.js
  │   └─ reducer.js
  │─ themes
  │   │─ compStyleOverride.js
  │   │─ index.js
  │   │─ palette.js
  │   └─ typography.js
  │─ ui-component
  │   │─ cards
  │   │   └─ MainCard.js
  │   │─ extended
  │   │   │─ AnimateButton.js
  │   │   │─ AutocompleteBtn.js
  │   │   │─ Avatar.js
  │   │   │─ Breadcrumbs.js
  │   │   │─ DialogForm.js
  │   │   │─ InputFileButton.js
  │   │   └─ Transitions.js
  │   │─ MenuButton
  │   │   │─ CalendarBtn.js
  │   │   │─ CreateBtn.js
  │   │   │─ FilterBtn.js
  │   │   │─ MoveTaskBtn.js
  │   │   └─ NavListBtn.js
  │   │─ BackgroundLetterAvatar.js
  │   │─ Loadable.js
  │   │─ Loader.js
  │   └─ Logo.js
  │─ utils
  │   │─ endcodeFileBase64.js
  │   │─ password-strength.js
  │   │─ requireAuth.js
  │   └─ validateDateFormat.js
  │─ views
  │   │─ authentication
  │   │   │─ auth-forms
  │   │   │   │─ AuthChangePassword.js
  │   │   │   │─ AuthLogin.js
  │   │   │   └─ AuthRegister.js
  │   │   │─ pages
  │   │   │   │─ Login.js
  │   │   │   └─ Register.js
  │   │   │─ AuthCardWrapper.js
  │   │   └─ AuthWrapper1.js
  │   │─ board
  │   │   │─ task
  │   │   │   │─ comment
  │   │   │   │   │─ CommentForm.js
  │   │   │   │   └─ Input.js
  │   │   │   │─ FileUpload.js
  │   │   │   │─ Item.js
  │   │   │   │─ List.js
  │   │   │   └─ TaskForm.js
  │   │   │─ BoardForm.js
  │   │   └─ Detail.js
  │   │─ dashboard
  │   │   │─ BoardList.js
  │   │   └─ index.js
  │   │─ user
  │   │   │─ ChangePassword.js
  │   │   │─ EditProfile.js
  │   │   │─ PersonalInfomation.js
  │   │   │─ Profile.js
  │   │   └─ Work.js
  │   │─ workspace
  │   │   │─ Detail.js
  │   │   └─ WorkSpaceForm.js
  │   └─ ErrorPage.js
  │─ App.js
  │─ config.js
  └─ index.js
.eslintrc
.gitignore
icon-list.html
package-lock.json
package.json
yarn.lock
```

- public: Folder contains root HTML for the Website.
- src: Folder contains main code for building the Website:
  - images: Folder contains image and icon using in the Website.
  - scss: Folder contains file for styling the Website.
  - Header: Folder contains file to create header of the Website.
  - LogoSection: Folder contains file to create logo of the Website.
  - Sidebar: Folder contains file to create sidebar of the Website.
  - MainLayout/index.js: File contains code to display main layout of the Website.
  - MinimalLayout/index.js: File contains code to display login/register layout.
  - NavigationScroll.js: File contains code to scroll to top when visiting a page.
  - routes: Folder contains file to create router path for the Website.
  - services: Folder contains file to connect to server API.
  - store: Folder contains file to storing data for the Website.
  - themes: Folder contains file to styling theme for the Website.
  - MainCard.js: File contains code to create card container.
  - AnimateButton.js & AutocompleteBtn.js: File contains code to create custom button.
  - Avatar.js: File contains code to create custom avatar.
  - Breadcrumbs.js: File contains code to create custom breadcrumb.
  - DialogForm.js: File contains code to create custom dialog form.
  - InputFileButton.js: File contains code to create custom file upload button.
  - Transitions.js: File contains code to create custom css transition.
  - CalendarBtn.js: File contains code to create custom calendar button.
  - CreateBtn.js: File contains code to create custom create button.
  - FilterBtn.js: File contains code to create custom filter button.
  - MoveTaskBtn.js: File contains code to create custom move-task button.
  - NavListBtn.js: File contains code to create custom change page button.
  - BackgroundLetterAvatar.js: File contains code to create custom image.
  - Loadable.js & Loader.js: File contains code to create loading status before display a page.
  - Logo.js: File contains code to create custom logo.
  - endcodeFileBase64.js: File contains code to display image from base64 string.
  - password-strength.js: File contains code to calculate the security level of the password.
  - requireAuth.js: File contains code to check authentication.
  - validateDateFormat.js: File contains code to check date format.
  - views/authentication: Folder contains file to display Login/Register page.
  - views/board: Folder contains file to display board page.
  - views/dashboard: Folder contains file to display Dashboard page.
  - views/user: Folder contains file to display User Profile page.
  - views/workspace: Folder contains file to display Workspace page.
  - ErrorPage.js: File contains code to display the 404 page.
  - App.js & index.js: File contains code to display the Website.
- .gitignore: File contains code to ignore some folder when pushing project on Github.
- package.json & package-lock.json: File contains libraries code for building the Website.
