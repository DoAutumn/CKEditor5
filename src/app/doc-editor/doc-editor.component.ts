import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js';
import { ChartPlugin } from './plugins/chart/chart.plugin';
import { PlaceholderPlugin } from './plugins/placeholder/placeholder.plugin';
import { SavePlugin } from './plugins/save.plugin';
import { UploadPlugin } from './plugins/upload.plugin';
import * as echarts from 'echarts';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.less']
})
export class DocEditorComponent implements OnInit, AfterViewInit {

  content = '<p><img src="uploads/bg.jpeg" alt=""></p><h2 style="text-align:center;"><span class="text-big">数据治理综合报告</span></h2><p style="text-align:center;">&nbsp;</p><p style="text-align:center;">时间范围：<span style="color:red;">{{text1}}</span></p><p style="text-align:center;">生成时间：<span style="color:red;">{{text2}}</span></p><p style="text-align:center;">报告范围：全部 &nbsp; &nbsp;&nbsp;</p><div class="page-break" style="page-break-after:always;"><span style="display:none;">&nbsp;</span></div><h2><span style="color:hsl(210,75%,60%);">&nbsp; &nbsp; 一、数据总览</span></h2><h4>&nbsp; &nbsp; &nbsp; 报告期间，共接收<span style="color:red;"> {{text3}} </span>个日志源、<span style="color:red;"> {{text4}} </span>个设备类型的数据，共<span style="color:red;">{{text5}} </span>条，已存储<span style="color:red;"> {{text6}} </span>天，服务器存储空间总量<span style="color:red;"> {{text7}} </span>，已使用<span style="color:red;"> {{text8}} </span>。</h4><h2><span style="color:hsl(210,75%,60%);">&nbsp; &nbsp; 二、事件详情</span></h2><ol><li><span style="color:hsl(0,0%,0%);"><strong>数据接入分析</strong></span></li></ol><p><span style="color:hsl(0,0%,0%);"><strong>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong>在报告期间，共接入</span><span style="color:red;"> {{text9}} </span><span style="color:hsl(0,0%,0%);">个日志源，产生事件最多的是</span><span style="color:red;"> {{text10}} </span><span style="color:hsl(0,0%,0%);">。</span></p><p style="text-align:center;"><span class="text-small" style="color:hsl(0,0%,0%);">图 1 日志源接入数据 TOP10</span></p><ol start="2"><li><strong>事件分析</strong></li></ol><p><strong>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong>在报告期间，共<span style="color:red;"> {{text11}} </span>个 IP 对<span style="color:red;"> {{text12}} </span>个资产进行访问，产生了<span style="color:red;"> {{text13}} </span>种类型的<span style="color:red;"> {{text14}} </span>条事件，其中严重级别的事件<span style="color:red;"> {{text15}} </span>条，高等级的事件<span style="color:red;"> {{text16}} </span>条，中等级的事件<span style="color:red;"> {{text17}} </span>条。</p><figure class="table"><table><tbody><tr><td><span class="text-small">时间</span></td><td><span class="text-small">源IP</span></td><td><span class="text-small">目的IP</span></td><td><span class="text-small">事件类型</span></td><td><span class="text-small">事件名称</span></td><td><span class="text-small">严重等级</span></td><td><span class="text-small">事件详情</span></td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p style="text-align:center;"><span class="text-small">表 1 事件详情</span></p>';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    DecoupledEditor
      .create(document.querySelector('#editor-content') as HTMLElement, {
        language: 'zh-cn',
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
            'pageBreak',
            '|',
            'placeholder',
            'chart',
            '|',
            'save',
          ]
        },
        removePlugins: ['Markdown', 'Minimap'],
        // minimap: {
        //   container: document.querySelector('.minimap-container')
        // },
        extraPlugins: [UploadPlugin, SavePlugin, PlaceholderPlugin, ChartPlugin],
        handleList: {
          chartRenderer: (id: string, domElement: HTMLElement) => this.chartRenderer(id, domElement),
          chartResize: (id: string, dimension: string, value: string) => this.chartResize(id, dimension, value),
          handleSave: (data: string) => this.handleSave(data)
        }
      })
      .then(editor => {

        const toolbarContainer = document.querySelector('#toolbar-container');

        toolbarContainer.appendChild(editor.ui.view.toolbar.element);

        editor.data.set(this.content);

        (window as any).editor = editor;

      })
      .catch(err => {
        console.error(err);
      });
  }

  chartRenderer(id: string, domElement: HTMLElement) {
    setTimeout(() => {
      const myChart = echarts.init(domElement);
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });

      (window as any).echarts = (window as any).echarts || {};
      (window as any).echarts[id] = myChart;
    });
  }

  chartResize(id: string, dimension: string, value: string) {
    if (!(window as any).echarts || !(window as any).echarts[id]) return;
    const size = {};
    size[dimension] = value.indexOf('%') !== -1 ? 'auto' : value;
    setTimeout(() => {
      (window as any).echarts[id].resize(size);
    });
  }

  handleSave(data: string) {
    this.http.post('/upload/content', data).subscribe(res => {
      console.log(res, 'res');
    });
  }
}