import { IEnvironment } from "./environment-interface";

class Environment implements IEnvironment {
  production = false;
  apiUrl = 'http://localhost:5002';
  jwtAllowedDomains = ['localhost:5002'];
}

export const environment: IEnvironment = new Environment();
