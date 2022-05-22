import dotenv from 'dotenv';
dotenv.config();

const getEnvOrDefault = (envName: string, defaultValue?: string) => {
  if (process.env[envName]) {
    return process.env[envName];
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw new Error(`${envName} is missing`);
  }
};

export interface IConfigSchema {
  port: number;
  resultService: {
    url: string;
  };
  database: {
    mongo: {
      uri: string;
      retryAttempts: number;
      retryDelay: number;
      connectTimeoutMS: number;
    };
  };
}

export default (): IConfigSchema => {
  const config = {
    port: +getEnvOrDefault('PORT', '8080'),
    resultService: {
      url: getEnvOrDefault('result_SERVICE_URL', 'http://localhost:5000'),
    },
    database: {
      mongo: {
        uri: getEnvOrDefault('SERVICE_MONGODB_URL'),
        retryAttempts: +getEnvOrDefault(
          'SERVICE_MONGODB_CONNECTION_RETRY_ATTEMPTS',
          '3',
        ),
        retryDelay: +getEnvOrDefault(
          'SERVICE_MONGODB_CONNECTION_RETRY_DELAY',
          '1000',
        ),
        connectTimeoutMS: +getEnvOrDefault(
          'SERVICE_MONGODB_CONNECTION_TIMEOUT_MS',
          '30000',
        ),
      },
    },
  };

  return config;
};
