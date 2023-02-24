import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocEditorComponent } from "./doc-editor.component";



@NgModule({
  declarations: [
    DocEditorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: DocEditorComponent }])
  ]
})
export class DocEditorModule { }
