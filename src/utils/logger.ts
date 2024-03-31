import pino, { LoggerOptions } from 'pino';
import dayjs from 'dayjs';

// Define logger options
const options: LoggerOptions = {
  base: {
    pid: false, // Exclude process ID from logs
  },
  timestamp: () => `,"time":"${dayjs().format()}"`, // Include custom timestamp using dayjs
};

// Create logger instance
const log = pino(options);

// Export logger instance
export default log;
