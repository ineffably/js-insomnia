import 'babel-polyfill';
import games from './games';

// quick hack to add global state to peek if bundle loaded
global.__APP_LOADED__ = true;

games.game01.start();