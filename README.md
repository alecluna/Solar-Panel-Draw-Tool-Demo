## Before Diving in, make sure you are comfortable using React, the Google Maps API and AWS Lambda, and to double check with Richard or Channelle for the Google docs containing all of the passwords/info



### Welcome, if you are reading this then you are probably going to make some changes/maintenence to this app. Here is some gotchas that I hope can help you ou in the future.

### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

`npm start` or `yarn start` to spin up the project locally.

### NOTE: You will need to export some environment variables in order for Google Maps and AWS Lambda to work.

• Install dotenv using `npm install dotenv`
• Add a `.env` file to the project directory and paste this:
```
REACT_APP_GOOGLE_API_KEY = 'AIzaSyDiLjsh0me5JKKcmK7IJNd3dcQKtxzEh0o'
REACT_APP_AWS_LAMBDA_KEY = '8w6FZxhnlkxN0EV7Y1pUa28Kz896LFt9sSubbx79'
```
• Make sure to restart the app so CRA can read the .env vars!

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `npm run eject` This command allows you to look at the webpack config (You probably don't need to do this unless you are adding a new custom loader or a plugin is broken)

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However I understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Frontend Info: 
I've decided to use class components and traditional lifecycle components instead of hooks for this app. If you would like you can try to refactor this app to use hooks and functional compoennts.

• All of the apps state is encapsulated in the `Container` component, and calls the child components upon state change, here's a rough diagram:

```             
                Container 
                /       \
      MapComponents    Loan/Popup Modals
                            \
                        Graph.js inside Popup
```

• Map component is using a wrapper for React, here is the documentation: https://github.com/tomchentw/react-google-maps

• `AveragePowerBill.js` is being used in the left hand panel and is using Formik and Yup as form/object validation before being sent to AWS lambda: https://jaredpalmer.com/formik/ & https://github.com/jquense/yup

• The data visulation is using Chart.js, they have amazing documentation on their website: https://www.chartjs.org/

### AWS (Backend) Info:

• I decided to build out an API for our backend to handle the nitty gritty calculations, view that here: https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions

• `calculateSystemSize.js` is called as a Lambda and deployed through an AWS API Gateway. This allows for quick deployments. *Note*: whenver you make a change to AWS lambda, go to the API Gateway -> then go to the `Actions` dropdown and click `Deploy API` otherwise the changes to the Lambda will not propogate. 

• The other Lambda queries the Mailchimp API in order to add a new subscriber to an emailing list



  



