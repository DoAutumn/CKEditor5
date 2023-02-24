import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export class ResizeUI extends DecoupledEditor.Plugin {

  editor: any;

  init() {
    const widthDimension = {
      name: 'width',
      label: 'Width'
    };
    this._createInput(widthDimension);

    const heightDimension = {
      name: 'height',
      label: 'Height'
    }
    this._createInput(heightDimension);
  }

  _createInput(dimension) {
    const editor = this.editor;
    const componentName = `ChartResize:${dimension.name}`;

    editor.ui.componentFactory.add(componentName, locale => {
      const command = editor.commands.get('chartResize');
      const input = new DecoupledEditor.InputTextView(locale);

      input.set({
        placeholder: dimension.name,
      });

      input.extendTemplate({
        attributes: {
          class: [
            'resize'
          ]
        }
      });

      // input.bind('value').to(command, (value) => {
      //   return value ? value[dimension.name] : null;
      // });

      const handleInput = () => {
        this._validateInput(input, dimension.name);
        if (input.hasError) {
          return input;
        }

        editor.execute('chartResize', {
          [dimension.name]: input.element.value
        })
      }

      // 防抖处理
      const handleDebounce = this._handleDebounce(1000, handleInput)

      input.on('input', () => {
        handleDebounce();
      });

      return input;
    });
  }

  _validateInput(view, dimension) {
    view.set('errorText', null);
    view.set('hasError', false);

    const value = view.element.value.replace('%', '').replace('px', '');

    if (isNaN(value)) {
      view.set('errorText', 'Input must be numeric');
      view.set('hasError', true);
    }

    if (value < 10) {
      view.set('errorText', `Minimum ${dimension.name} size must be more than 10px`);
      view.set('hasError', true);
    }
    return view;
  }

  _handleDebounce(delay, callback) {
    let timer = null;

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        callback();
      }, delay);
    }
  }
}
