import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './core/interceptors/fake-backend.interceptor';
import { translateBrowserLoaderFactory } from './shared/translate-load-for-ssr/translate-browser.loader';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        CoreModule,
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateBrowserLoaderFactory,
                deps: [HttpClient, TransferState]
            }
        })
    ],
    providers: [fakeBackendProvider],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
// Loader for translation files (i.e. en.json)
export function createTranslateLoader(http: HttpClient): object {
    return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}