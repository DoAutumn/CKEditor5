import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { PlaceholderEditing } from './placeholder.editing';
import { PlaceholderUI } from './placeholder.ui';

export class PlaceholderPlugin extends DecoupledEditor.Plugin {
  static get requires() {
    return [PlaceholderEditing, PlaceholderUI];
  }
}