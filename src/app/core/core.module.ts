import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [ClickedOutsideDirective, HeaderComponent, FooterComponent, SidebarComponent, SplashScreenComponent],
    imports: [CommonModule, TranslateModule, FormsModule, AppRoutingModule],
    exports: [ClickedOutsideDirective, HeaderComponent, FooterComponent, SidebarComponent, SplashScreenComponent]
    // providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }]
})
export class CoreModule {}
