import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class ResizeCommand extends DecoupledEditor.Command {

  editor: any;
  isEnabled: boolean;

  constructor(editor) {
    super(editor);
  }

  execute(options) {
    const model = this.editor.model;
    const viewElement = model.document.selection.getSelectedElement();

    model.change(writer => {
      if (options.width) {
        writer.setAttribute(
          'width',
          options.width,
          viewElement
        )
      }

      if (options.height) {
        writer.setAttribute(
          'height',
          options.height,
          viewElement
        )
      }

    });

    this.refresh();
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'echarts');

    this.isEnabled = allowedIn !== null;
  }
}