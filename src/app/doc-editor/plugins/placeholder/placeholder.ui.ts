import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class PlaceholderUI extends DecoupledEditor.Plugin {

  editor: any;

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('placeholder', () => {
      const button = new DecoupledEditor.ButtonView();

      button.label = '插入变量';
      button.tooltip = true;
      button.withText = true;

      button.on('execute', () => {
        const txt = ' {{text}} ';

        editor.model.change(writer => {
          editor.model.insertContent(
            writer.createText(txt, { placeholder: '' })
          );
        });
      });

      return button;
    });
  }
}
