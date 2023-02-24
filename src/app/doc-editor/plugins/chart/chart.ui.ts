import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class ChartUI extends DecoupledEditor.Plugin {

  editor: any;

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('chart', () => {
      const command = editor.commands.get('insertChart');

      const button = new DecoupledEditor.ButtonView();

      button.label = '插入图表';
      button.tooltip = true;
      button.withText = true;

      button.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      button.on('execute', () => {
        editor.execute('insertChart', { id: 'test', width: '100%', height: '300px' });
      });

      return button;
    });
  }
}
