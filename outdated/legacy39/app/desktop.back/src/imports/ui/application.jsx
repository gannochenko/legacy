import React from 'react';
import Application from '../lib/base/application/application.jsx';
import DefaultLayout from './component/application-layout/default';

import HomePage from './page/home';
import NotFoundPage from './page/404';
import ForbiddenPage from './page/403';
import LoginPage from './page/login';
import TaskRunnerPage from './page/task-runner';

import EntityMap from '../startup/client/entity-map.js';
import SecurityProvider from '../lib/util/security/provider.js';

export default class AdminApplication extends Application
{
    static useAccounts()
    {
        return true;
    }

    static getHomePageController()
    {
        return HomePage;
    }

    static get404PageController()
    {
        return NotFoundPage;
    }

    static getDefaultApplicationLayoutController()
    {
        return DefaultLayout;
    }

    static get403PageController()
    {
        return ForbiddenPage;
    }

    static getLoginPageController()
    {
        return LoginPage;
    }

    static getRouteMap()
    {
        const routes = super.getRouteMap();

        this.attachEntityRoutes(routes);

        routes['task-runner'] = {
            path: '/task-runner',
            controller: TaskRunnerPage,
            params: {
                security: this.getDefaultPageSecurityPolicy(),
            },
        };

        return routes;
    }

    static getDefaultPageSecurityPolicy()
    {
        return SecurityProvider.getAdminOnlyPolicy();
    }

    ///////////////////////////////////////////////////

    static attachEntityRoutes(routes)
    {
        return EntityMap.forEach((item) => {
            if (_.isObjectNotEmpty(item.route))
            {
                const params = {
                    security: this.getDefaultPageSecurityPolicy(),
                };
                if (item.route.list)
                {
                    params.listPath = item.route.list.path;
                }
                if (item.route.detail)
                {
                    params.detailPath = item.route.detail.path;
                }

                _.forEach(item.route, (path, key) => {
                    routes[item.entity.getUniqueCode()+'_'+key] = {
                        path: this.transformPath(path.path),
                        controller: path.controller,
                        params,
                    };
                });
            }
        });
    }

    /**
     * todo: get rid of this crap
     * @param path
     * @returns {string}
     */
    static transformPath(path)
    {
        if (_.isStringNotEmpty(path))
        {
            return path.replace('#ID#/', ':id');
        }

        return '';
    }
}
