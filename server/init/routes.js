/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const devicesController = controllers && controllers.devices;
const historyController = controllers && controllers.history;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/sessions', usersController.login);
    app.post('/users', usersController.signUp);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  }else {
    console.warn(unsupportedMessage('topics routes'));
  }

  if(devicesController) {
    app.get('/devices', devicesController.all);
    app.get('/device/:id', devicesController.get);
    app.post('/device/:id', devicesController.add);
    app.put('/device/:id', devicesController.update);
    app.delete('/device/:id', devicesController.remove);
    app.delete('/removeAllDevices', devicesController.removeAll);
    app.put('/reset', devicesController.resetBooking);
  }

  if(historyController) {
    app.get('/history', historyController.all);
    app.post('/history', historyController.add);
    app.delete('/clearhistory', historyController.removeAll);

  }
};
