import * as http from 'http';

import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import NodeCache from 'node-cache';

import { AuthConfig } from 'framework/auth/auth.config';
import { AuthService } from 'framework/auth/auth.service';
import { AuthHelper } from 'framework/auth/helpers/auth.helper';
import { CacheService } from 'framework/cache/cache.service';
import { ExtendedRequest } from 'framework/extensions/extendedRequest';
import { TokenHelper } from 'helpers/token.helper';

import { setupRoutes } from 'routing';

const environment = process.env.NODE_ENV;

//TODO: this works in swarmcheck API, check how
dotenv.config({ path: path.join(__dirname,'../.env.local') });
dotenv.config({ path: path.join(__dirname,`${environment === 'development' ? '../.env.local' : '../.env'}`) });

const app = express();
const cache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
export const cacheService = new CacheService(cache);
const authConfig = new AuthConfig();
const tokenHelper = new TokenHelper(cacheService);
const authHelper = new AuthHelper(authConfig, tokenHelper);
const authService = new AuthService(authHelper);

app.set('port', process.env.PORT || 3001);

app.use(cors());
app.use(fileUpload());

app.all('*', async (req: ExtendedRequest, res, next) => {
  if (process.env.USE_AUTH === 'true') await authService.validateTokenIfPresent(req);
  else await authService.authTestUser(req);
  next();
});

//Mongo config
mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', error => {
  // eslint-disable-next-line no-console
  console.error.bind(console, 'MongoDB connection error:' + error);
});

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json({
  limit: '100mb'
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
setupRoutes(app);


const httpServer = http.createServer(app);

httpServer.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('API listening on port ' + app.get('port'));
});

