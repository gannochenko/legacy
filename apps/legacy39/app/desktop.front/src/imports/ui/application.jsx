import React from 'react';

import HomePage from '../ui/page/home/index.jsx';
import NotFoundPage from './page/404/index.jsx';
import PrivacyPolicyPage from './page/privacy-policy/index.jsx';
import RegistryDetailPage from './page/registry-detail/index.jsx';
import ObjectListPage from './page/list/index.jsx';
import CheckerPage from './page/checker/index.jsx';
import MatcherPage from './page/matcher/index.jsx';
import LoginPage from './page/login/index.jsx';
import ForbiddenPage from './page/403/index.jsx';
import ThankYouPage from './page/thank-you/index.jsx';

import Application from '../lib/base/application/application.jsx';
import DefaultLayout from './component/application-layout/default/index.jsx';
import User from '../api/user/entity/entity.client.js';
import SecurityProvider from "../lib/util/security/provider";

export default class FrontApplication extends Application
{
    static useAccounts()
    {
        return true;
    }

    static getDefaultPageSecurityPolicy()
    {
        return {
            needAuthorized: false,
            // group: ['A', 'E', 'U'],
        };
    }

    static getHomePageController()
    {
        return ObjectListPage;
        // return HomePage;
    }

    static get404PageController()
    {
        return NotFoundPage;
    }

    static get403PageController()
    {
        return ForbiddenPage;
    }

    static getDefaultApplicationLayoutController()
    {
        return DefaultLayout;
    }

    static getLoginPageController()
    {
        return LoginPage;
    }

    static getRouteMap()
    {
        const routes = {};

        routes['privacy-policy'] = {
            path: '/privacy-policy',
            controller: PrivacyPolicyPage,
            params: {
                security: {
                    needAuthorized: false,
                },
            },
        };

        routes['registry-detail'] = {
            path: this.getRegistryObjectUrl(),
            controller: RegistryDetailPage,
        };

        routes['checker'] = {
            path: '/checker/:id',
            controller: CheckerPage,
            params: {
                security: {
                    needAuthorized: true,
                },
            },
        };

        routes['checker-root'] = {
            path: '/checker',
            controller: CheckerPage,
            params: {
                security: {
                    needAuthorized: true,
                },
            },
        };

        routes['matcher'] = {
            path: '/matcher/:id',
            controller: MatcherPage,
            params: {
                security: {
                    needAuthorized: true,
                },
            },
        };

        routes['matcher-root'] = {
            path: '/matcher',
            controller: MatcherPage,
            params: {
                security: {
                    needAuthorized: true,
                },
            },
        };

        routes['thank-you'] = {
            path: '/thank-you',
            controller: ThankYouPage,
            params: {
                security: {
                    needAuthorized: true,
                },
                layout: null,
            },
        };

        routes['my-objects'] = {
            path: '/my-objects',
            controller: HomePage,
            params: {
                security: {
                    needAuthorized: true,
                },
            },
        };

        // routes['home'] = {
        //     path: '/',
        //     controller: this.getHomePageController(),
        //     params: {
        //         security: this.getDefaultPageSecurityPolicy(),
        //     },
        // };

        routes['not-found'] = {
            path: '/404',
            controller: this.get404PageController(),
            params: {
                layout: null,
                security: SecurityProvider.getOpenGatePolicy(),
            },
        };

        if (this.useAccounts())
        {
            this.attachUserAccountRoutes(routes);
        }

        routes['home'] = {
            path: "/",
            controller: ObjectListPage,
        };

        routes['registry-list'] = {
            path: this.getRegistryUrl(),
            controller: ObjectListPage,
        };

        return routes;
    }

    static getRegistryUrl(params) {
        // return this.fillUrlTemplate('/registry/:view/', params);
        return this.fillUrlTemplate('/:view/', params);
    }

    static getRegistryObjectUrl(params) {
        if (_.isObjectNotEmpty(params) && !('section' in params)) {
            params.section = 'basic';
        }

        // return this.fillUrlTemplate('/registry/view/:id/:section/', params);
        return this.fillUrlTemplate('/view/:id/:section/', params);
    }

    static fillUrlTemplate(template, params) {
        if (_.isObjectNotEmpty(params)) {
            Object.keys(params).forEach((from) => {
               template = template.replace(`:${from}`, params[from]);
            });
        }

        return template;
    }

    getRegistryUrl(params) {
        return this.constructor.getRegistryUrl(params);
    }

    getRegistryObjectUrl(params) {
        return this.constructor.getRegistryObjectUrl(params);
    }

    maybeRouteToError()
    {
        if (this.useAccounts())
        {
            const code = this.state.accessCheckResult;

            if (code && code !== 200)
            {
                if (code === 401)
                {
                    FlowRouter.go('/login');
                }
                else
                {
                    if (code === 403) {
                        const user = User.get();

                        if (user && user.isPending()) {
                            FlowRouter.go('/thank-you');
                            return;
                        }
                    }

                    FlowRouter.go(`/${code}`);
                }
            }
        }
    }
}
