import * as Router from 'koa-router';
// import { getProfileRoute, patchProfileRoute } from './profile';
// import { getFeedRoute } from './feed';
import { getSettingsRoute } from './settings';

export function notificationsRouter() {
    const router = new Router({ prefix: '/notifications' });
    router.get('/settings', getSettingsRoute);
    return router;
}
