import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CarrerComponent } from './components/carrer/carrer.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { YourNextComponent } from './components/your-next/your-next.component';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';

@NgModule({
    declarations: [DashboardComponent, CarrerComponent, KnowledgeComponent, EditProfileComponent, YourNextComponent],
    imports: [CommonModule, DashboardRoutingModule, TranslateModule, ReactiveFormsModule, FormsModule],
    providers: [DashboardService]
})
export class DashboardModule {}
