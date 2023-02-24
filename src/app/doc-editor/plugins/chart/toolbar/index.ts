import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ResizeCommand } from './resize.command';
import { ResizeEditing } from './resize.editing';
import { ResizeUI } from './resize.ui';

export class ChartResizePlugin extends DecoupledEditor.Plugin {

  editor: any;

  static get requires() {
    return [DecoupledEditor.WidgetToolbarRepository, ResizeCommand, ResizeEditing, ResizeUI];
  }

  static get pluginName() {
    return 'ChartResize';
  }

  afterInit() {
    const editor = this.editor;
    const widgetToolbarRepository = editor.plugins.get(DecoupledEditor.WidgetToolbarRepository);

    widgetToolbarRepository.register('ChartResize', {
      items: ['ChartResize:width', 'ChartResize:height'],
      getRelatedElement: getSelectedChartWidget,
    });
  }
}

function getSelectedChartWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement && isChartWidget(viewElement)) {
    return viewElement;
  }

  return null;
}

function isChartWidget(viewElement) {
  return (
    !!viewElement && viewElement.getCustomProperty('isChart') &&
    DecoupledEditor.isWidget(viewElement)
  );
}