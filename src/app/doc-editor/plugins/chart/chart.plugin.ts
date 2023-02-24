import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ChartEditing } from './chart.editing';
import { ChartUI } from './chart.ui';
import { ChartResizePlugin } from './toolbar';

export class ChartPlugin extends DecoupledEditor.Plugin {
  
  static get requires() {
    return [ChartEditing, ChartUI, ChartResizePlugin];
  }
}