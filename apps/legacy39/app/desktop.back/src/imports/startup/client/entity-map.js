/**
 * This file will be auto-generated
 */

import EntityMap from '../../lib/util/entity-map/entity-map.js';

// entity-import-begin
import File from '../../api/file/entity/entity.client.js';
import User from '../../api/user/entity/entity.client.js';
import UserGroup from '../../api/user.group/entity/entity.client.js';
import RegistryObject from '../../api/registry.object/entity/entity.client.js';
// entity-import-end

// page-controller-import-begin
import FileListPage from '../../ui/page/file-list/index.jsx';
import FileDetailPage from '../../ui/page/file-detail/index.jsx';
import UserListPage from '../../ui/page/user-list/index.jsx';
import UserDetailPage from '../../ui/page/user-detail/index.jsx';
import UserGroupListPage from '../../ui/page/user.group-list/index.jsx';
import UserGroupDetailPage from '../../ui/page/user.group-detail/index.jsx';
import RegistryObjectListPage from '../../ui/page/registry.object-list/index.jsx';
import RegistryObjectDetailPage from '../../ui/page/registry.object-detail/index.jsx';
// page-controller-import-end

class AdminEntityMap extends EntityMap
{
    constructor()
    {
        super([
            // route-declaration-begin
            {
                route: {
                    list: {
                        path: '/entity/registry-object/',
                        controller: RegistryObjectListPage,
                    },
                    detail: {
                        path: '/entity/registry-object/#ID#/',
                        controller: RegistryObjectDetailPage,
                    },
                },
                entity: RegistryObject,
            },
            {
                route: {
                    list: {
                        path: '/entity/file/',
                        controller: FileListPage,
                    },
                    detail: {
                        path: '/entity/file/#ID#/',
                        controller: FileDetailPage,
                    },
                },
                entity: File,
            },
            {
                route: {
                    list: {
                        path: '/entity/user/',
                        controller: UserListPage,
                    },
                    detail: {
                        path: '/entity/user/#ID#/',
                        controller: UserDetailPage,
                    },
                },
                entity: User,
            },
            {
                route: {
                    list: {
                        path: '/entity/user.group/',
                        controller: UserGroupListPage,
                    },
                    detail: {
                        path: '/entity/user.group/#ID#/',
                        controller: UserGroupDetailPage,
                    },
                },
                entity: UserGroup,
            },
            // route-declaration-end
        ]);
    }
}

export default new AdminEntityMap();
