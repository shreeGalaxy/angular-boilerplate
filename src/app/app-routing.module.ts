import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AfterLoginGuard } from './core/guards/after-login.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [AfterLoginGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then((x) => x.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((x) => x.HomeModule)
    },
    {
        path: 'about-us',
        loadComponent: () => import('./modules/public/components/about/about.component').then((x) => x.AboutComponent)
    },
    {
        path: 'contact-us',
        loadComponent: () =>
            import('./modules/public/components/contact-us/contact-us.component').then((x) => x.ContactUsComponent)
    },
    {
        path: '**',
        loadComponent: () =>
            import('./modules/public/components/not-found/not-found.component').then((x) => x.NotFoundComponent)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
