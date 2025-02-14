import SimpleNodeLogger from 'simple-node-logger';
import config from '#config.js';

const logger = SimpleNodeLogger.createSimpleLogger(config.logger);
export default logger;
