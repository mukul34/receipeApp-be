import util from 'util';
import { info, error, devLog, warn } from './logger.js';

const infoLogger = (component, apiMethod, data, message = '') => {
    try {
        let logObj = {
            component,
            apiMethod,
            data,
            message,
        };
        info(logObj);
    } catch (err) {
        console.log('error in InfoLogger', err);
    }
};

const errorLogger = (component, apiMethod, data, message = '') => {
    try {
        if (typeof (data) === 'object') {
            data = util.format(data);
        }
        let logObj = {
            component,
            apiMethod,
            data,
            message,
        };
        error(logObj);
    } catch (err) {
        console.log('error in errorLogger', err);
    }
};

const devLogger = (component, apiMethod, data, message = '') => {
    try {
        let logObj = {
            component,
            apiMethod,
            data,
            message,
        };
        devLog(logObj);
    } catch (err) {
        console.log('error in devLogger', err);
    }
};

const warnLogger = (component, apiMethod, data, message = '') => {
    try {
        let logObj = {
            component,
            apiMethod,
            data,
            message,
        };
        warn(logObj);
    } catch (err) {
        console.log('error in warnLogger', err);
    }
};

export { infoLogger, errorLogger, devLogger, warnLogger };
