'use strict';
import { error, defaultModules } from '@pnotify/core';
import * as PNotifyCountdown from '@pnotify/countdown';
import '@pnotify/countdown/dist/PNotifyCountdown.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export { noResults };

function noResults() {
  error({
    maxTextHeight: null,
    title: 'Something went wrong!',
    text: 'Enter the correct movie name and try again',
    delay: 2000,
    modules: new Map([...defaultModules, [PNotifyCountdown, {}]]),
  });
}
