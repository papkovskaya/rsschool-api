import * as TelegramBot from 'node-telegram-bot-api';
import { SettingsModel, EventModel } from './models';

let bot: any;

export function startBot() {
    const token = '658542356:AAGSjcIQWN0yZMIUjW8cvG_yxTcx_ohmlwg';
    bot = new TelegramBot(token, { polling: true });
    bot.onText(/\/start/, (msg: any) => {
        const chId = msg.chat.id;
        SettingsModel.create({
            userId: '',
            // tslint:disable-next-line:object-literal-sort-keys
            chatId: chId,
            // tslint:disable-next-line:object-literal-sort-keys
            actionEvents: false,
            timeEvents: false,
            timeToSleep: {
                timeStart: '',
                timeToEnd: '',
            },
        });
        bot.sendMessage(chId, '/1 - all\n/2 - onlyFromSchedule\n/3 - onlyFromActions\n');
    });
    bot.onText(/\/1/, async (msg: any) => {
        const chId = msg.chat.id;
        const settings = await SettingsModel.find();
        settings.forEach(elem => {
            if (elem.chatId === chId) {
                elem.timeEvents = true;
                elem.actionEvents = true;
            }
        });
        // settings.save();
        sendMessages(chId);
        bot.sendMessage(chId, 'You will get all notifications');
    });
    bot.onText(/\/2/, async (msg: any) => {
        const chId = msg.chat.id;
        const settings = await SettingsModel.find();
        settings.forEach(elem => {
            if (elem.chatId === chId) {
                elem.timeEvents = true;
            }
        });
        // settings.save();
        bot.sendMessage(chId, 'You will get notifications only from schedule');
    });
    bot.onText(/\/3/, async (msg: any) => {
        const chId = msg.chat.id;
        const settings = await SettingsModel.find();
        settings.forEach(elem => {
            if (elem.chatId === chId) {
                elem.actionEvents = true;
            }
        });
        // settings.save();
        bot.sendMessage(chId, 'You will get notification only from actions\n');
    });
    setTimeout(getInfoFromSchedule, 4320000);
}

export async function getInfoFromSchedule() {
    const events = await EventModel.find();
    const dataToSend = getInfoByTime(events);
    sendMessages(dataToSend);
}

function getInfoByTime(events: any) {
    const today = new Date();
    const dd = today.getDate();
    const eventsToSend = events.array.filter((element: any) => {
        element.startDateTime === dd + 1;
    });
    return eventsToSend;
}

async function sendMessages(dataToSend: any) {
    const settings = await SettingsModel.find();
    settings.forEach(elem => {
        if (elem.timeEvents) {
            sendToElem(elem.chatId, dataToSend.eventsToSend.startDateTime, dataToSend.eventsToSend.taskType);
        }
    });
    return dataToSend;
}

function sendToElem(chatId: string, start: number, task: string) {
    bot.sendMessage(chatId, 'You will have ' + task + ' at ' + start + ' time');
}
