import { EventEmitter } from 'eventemitter3';

export const EventTypes = {
    REFRESH: 'REFRESH',
};
const event = new EventEmitter();
export default event;
