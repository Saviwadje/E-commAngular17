import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding() ), provideClientHydration(), provideHttpClient(), 
    FontAwesomeModule, NgbCarouselModule ]
};
