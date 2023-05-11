import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { environment as env } from 'src/environments/environment';

function getJwt() {
  return localStorage.getItem(AppJwtModule.lsJwtAccess);
}

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwt,
        allowedDomains: env.jwtAllowedDomains
      }
    })
  ],
  exports: [JwtModule]
})
export class AppJwtModule {
  static lsJwtAccess = 'jwt_access';
}
