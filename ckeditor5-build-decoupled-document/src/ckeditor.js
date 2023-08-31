/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Minimap from '@ckeditor/ckeditor5-minimap/src/minimap';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';



import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import WidgetResize from '@ckeditor/ckeditor5-widget/src/widgetresize';
import { isWidget, toWidget, toWidgetEditable, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';
import WidgetToolbarRepository from '@ckeditor/ckeditor5-widget/src/widgettoolbarrepository';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { Observer } from '@ckeditor/ckeditor5-engine/src/index';


export default class DecoupledEditor extends DecoupledEditorBase { }

DecoupledEditor.Plugin = Plugin;
DecoupledEditor.Command = Command;
DecoupledEditor.ButtonView = ButtonView;
DecoupledEditor.InputTextView = InputTextView;
DecoupledEditor.addListToDropdown = addListToDropdown;
DecoupledEditor.createDropdown = createDropdown;
DecoupledEditor.Model = Model;
DecoupledEditor.Widget = Widget;
DecoupledEditor.WidgetResize = WidgetResize;
DecoupledEditor.isWidget = isWidget;
DecoupledEditor.toWidget = toWidget;
DecoupledEditor.toWidgetEditable = toWidgetEditable;
DecoupledEditor.viewToModelPositionOutsideModelElement = viewToModelPositionOutsideModelElement;
DecoupledEditor.WidgetToolbarRepository = WidgetToolbarRepository;
DecoupledEditor.Collection = Collection;
DecoupledEditor.Observer = Observer;

// Plugins to include in the build.
DecoupledEditor.builtinPlugins = [
  Essentials,
  Alignment,
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
  UploadAdapter,
  Autoformat,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  BlockQuote,
  CKBox,
  CKFinder,
  CloudServices,
  EasyImage,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Minimap,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  Table,
  TableToolbar,
  TextTransformation
];

// Editor configuration.
DecoupledEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'fontfamily',
      'fontsize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'outdent',
      'indent',
      '|',
      'link',
      'blockquote',
      'uploadImage',
      'insertTable',
      'mediaEmbed',
      '|',
      'undo',
      'redo',
      '|',
      'pageBreak'
    ]
  },
  image: {
    resizeUnit: 'px',
    toolbar: [
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'toggleImageCaption',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};
