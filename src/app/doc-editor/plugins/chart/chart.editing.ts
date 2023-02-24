import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { InsertChartCommand } from './chart.command';

export class ChartEditing extends DecoupledEditor.Plugin {
  
  static get requires() {
    return [DecoupledEditor.Widget];
  }

  editor: any;

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertChart', new InsertChartCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('echarts', {
      isObject: true,

      allowWhere: '$block',

      allowAttributes: ['id', 'width', 'height']
    });
  }

  _defineConverters() {
    const editor = this.editor;
    const conversion = editor.conversion;
    const renderChart = editor.config.get('handleList').chartRenderer;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'section',
        classes: 'chart'
      },
      model: (viewElement, { writer: modelWriter }) => {
        return modelWriter.createElement('echarts', {
          id: viewElement.getAttribute('data-id')
        });
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'echarts',
      view: (modelElement, { writer: viewWriter }) => {
        return viewWriter.createEmptyElement('section', {
          class: 'chart',
          'data-id': modelElement.getAttribute('id'),
          width: modelElement.getAttribute('width'),
          height: modelElement.getAttribute('height')
        });
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'echarts',
      view: (modelElement, { writer: viewWriter }) => {
        const id = modelElement.getAttribute('id');
        const width = modelElement.getAttribute('width');
        const height = modelElement.getAttribute('height');

        const section = viewWriter.createContainerElement('section', {
          class: 'chart',
          'data-id': id
        });

        viewWriter.setCustomProperty('isChart', true, section);

        const reactWrapper = viewWriter.createRawElement('div', {
          class: 'chart-wrapper',
          style: `width: ${width}; height: ${height}`
        }, function (domElement) {
          renderChart(id, domElement);
        });

        viewWriter.insert(viewWriter.createPositionAt(section, 0), reactWrapper);

        return DecoupledEditor.toWidget(section, viewWriter, { label: 'chart preview widget' });
      }
    });
  }
}
