import '@babel/polyfill';
import 'reflect-metadata';

import Application from './lib/application';

Application.make().then(app => app.launch());
