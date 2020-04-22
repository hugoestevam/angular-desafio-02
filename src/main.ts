import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import 'zone.js/dist/zone'; 
import 'core-js/es/reflect';

platformBrowserDynamic().bootstrapModule(AppModule);
