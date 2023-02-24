import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class InsertChartCommand extends DecoupledEditor.Command {

  editor: any;
  isEnabled: boolean;

  constructor(editor) {
    super(editor);
  }

  execute(options) {
    this.editor.model.change(writer => {
      this.editor.model.insertContent(writer.createElement('echarts', options));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'echarts');

    this.isEnabled = allowedIn !== null;
  }
}
