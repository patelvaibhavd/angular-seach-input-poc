import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, UtilsService } from './services';
import { StoriesService } from './services/stories.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    UtilsService,
    StoriesService
  ]
})
export class CoreModule { }
