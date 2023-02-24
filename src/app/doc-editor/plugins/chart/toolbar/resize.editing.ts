import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ResizeCommand } from './resize.command';

export class ResizeEditing extends DecoupledEditor.Plugin {

  editor: any;

  init() {
    const editor = this.editor;
    const dimensions = ['width', 'height'];

    for (let key in dimensions) {
      let downcastConverter = this._modelToViewConverter(dimensions[key]);

      editor.editing.downcastDispatcher.on(`attribute:${dimensions[key]}:echarts`, downcastConverter);
      editor.data.downcastDispatcher.on(`attribute:${dimensions[key]}:echarts`, downcastConverter);

    }

    editor.commands.add('chartResize', new ResizeCommand(editor));
  }

  _modelToViewConverter(dimension) {
    return (evt, data, conversionApi) => {
      if (!conversionApi.consumable.consume(data.item, evt.name)) {
        return;
      }

      const viewWriter = conversionApi.writer;
      const section = conversionApi.mapper.toViewElement(data.item);

      const chartWrapper = [...section.getChildren()]
        .find(element => element.hasClass('chart-wrapper'));

      const chartResize = this.editor.config.get('handleList').chartResize;

      if (data.attributeNewValue !== null) {
        const resizeUnit = data.attributeNewValue.indexOf('%') === -1 && data.attributeNewValue.indexOf('px') === -1 ? 'px' : '';
        viewWriter.setStyle(dimension, data.attributeNewValue + resizeUnit, section);
        // viewWriter.setStyle(dimension, data.attributeNewValue + resizeUnit, chartWrapper);

        chartResize('test', dimension, data.attributeNewValue + resizeUnit, chartWrapper);
      } else {
        viewWriter.removeStyle(dimension, section);
        // viewWriter.removeStyle(dimension, chartWrapper);
      }
    }
  }
}