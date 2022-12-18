import { EventEmitter } from 'eventemitter3';

export const EventTypes = {
    REFRESH: 'REFRESH',
    DELETE: 'DELETE',
};
const event = new EventEmitter();
export default event;
