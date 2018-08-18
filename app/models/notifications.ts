// DeferredNotifications — required for notifications to survive server restart
import { Document, Schema, model } from 'mongoose';

export interface ISettings {
    userId: string;
    chatId: string;
    actionEvents: boolean;
    timeEvents: boolean;
    timeToSleep: {
        timeStart: string;
        timeToEnd: string;
    };
}

export interface ISettingsModel extends Document, ISettings {
    _id: string;
}

const SettingsSchema: Schema = new Schema({
    userId: String,
    // tslint:disable-next-line:object-literal-sort-keys
    chatId: String,
    // tslint:disable-next-line:object-literal-sort-keys
    actionEvents: Boolean,
    timeEvents: Boolean,
    timeToSleep: {
        timeStart: String,
        timeToEnd: String,
    },
});

export const SettingsModelName = 'Settings';
export const SettingsModel = model<ISettingsModel>(SettingsModelName, SettingsSchema);
