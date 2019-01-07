import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { ModalsModule } from '../modals/modals.module';
import { MindsFormsModule } from '../forms/forms.module';

import { HowManyHoursComponent } from './howmanyhours.component';

const routes: Routes = [
  { path: 'howmanyhours', component: HowManyHoursComponent }
];

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes),
    NgFormsModule,
    ReactiveFormsModule,
    CommonModule,
    LegacyModule,
    ModalsModule,
    MindsFormsModule,
  ],
  declarations: [
    HowManyHoursComponent
  ],
  entryComponents: [
    HowManyHoursComponent
  ]
})

export class HowManyHoursModule {
}
