import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerComponent } from './components/carrer/carrer.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { YourNextComponent } from './components/your-next/your-next.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'your-next',
                component: YourNextComponent
            },
            {
                path: 'editprofile',
                component: EditProfileComponent
            },
            {
                path: 'careers',
                component: CarrerComponent
            },
            {
                path: 'knowledge',
                component: KnowledgeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
