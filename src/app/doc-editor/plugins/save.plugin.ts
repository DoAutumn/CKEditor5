import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class SavePlugin extends DecoupledEditor.Plugin {

  editor: any;

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('save', locale => {

      const button = new DecoupledEditor.ButtonView(locale);

      button.label = '保存';
      button.tooltip = true;
      button.withText = true;

      button.on('execute', () => {

        const save = editor.config.get('handleList').handleSave;
        typeof save === 'function' && save(editor.data.get());

      });

      return button;
    });
  }
}