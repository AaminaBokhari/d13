import { cleanEnv, str, port, email, url } from 'envalid';

const validateEnv = () => {
  return cleanEnv(process.env, {
    MONGO_URI: str(),
    JWT_SECRET: str(),
    PORT: port(),
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    EMAIL_FROM: email(),
    EMAIL_HOST: str(),
    EMAIL_PORT: port(),
    EMAIL_USERNAME: str(),
    EMAIL_PASSWORD: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
  });
};

export default validateEnv;