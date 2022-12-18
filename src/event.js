import { EventEmitter } from 'eventemitter3';

export const EventTypes = {
    REFRESH: 'REFRESH',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
};
const event = new EventEmitter();
export default event;
