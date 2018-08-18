import { NOT_FOUND, OK } from 'http-status-codes';
import * as Router from 'koa-router';
import { userService } from '../../services';
import { setResponse } from '../utils';
import { SettingsModel } from '../../models';

async function getSettings(userId: string) {
    return SettingsModel.find({ userId }).exec();
}

export const getSettingsRoute = async (ctx: Router.IRouterContext) => {
    const userId = ctx.state.user!._id;
    const user = await userService.getUserById(userId);
    if (user === null) {
        ctx.status = NOT_FOUND;
        return;
    }
    const settings = await getSettings(userId);
    setResponse(ctx, OK, settings);
};
