import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class PlaceholderEditing extends DecoupledEditor.Plugin {

  editor: any;

  init() {
    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.extend('$text', {
      allowAttributes: ['placeholder']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('downcast').attributeToElement({
      model: 'placeholder',

      view: (modelElement, { writer: viewWriter }) => {
        return viewWriter.createAttributeElement('span', {
          style: 'color: red;'
        });
      }
    });
  }
}