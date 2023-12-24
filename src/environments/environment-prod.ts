import { IEnvironment } from "./environment-interface";

class Environment implements IEnvironment {
  production = true;
  apiUrl = 'https://api.artforge.polliakov.site';
  jwtAllowedDomains = ['api.artforge.polliakov.site'];
}

export const environment: IEnvironment = new Environment();
