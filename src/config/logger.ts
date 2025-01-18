import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json } = format;

// Criação do logger
const logger: Logger = createLogger({
  level: 'info', // Níveis: error, warn, info, http, verbose, debug, silly
  format: combine(
    timestamp(),
    json() // Salva logs no formato JSON
  ),
  transports: [
    // Salva logs em arquivos rotativos
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Retém logs por 14 dias
    }),
    // Salva apenas erros em outro arquivo
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});

// Exporta o logger para uso em toda a aplicação
export default logger;
