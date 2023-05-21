import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ScrollingModule
  ],
  declarations: [FolderPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FolderPageModule { }
