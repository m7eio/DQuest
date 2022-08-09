/* eslint-disable */
// @ts-nocheck

import Quill from 'quill';

import LoadingImage from './blots/image';
/**
 *@description 观察者模式 全局监听富文本编辑器
 */
export const QuillWatch = {
  watcher: {}, // 登记编辑器信息
  active: null, // 当前触发的编辑器
  on: function (imageExtendId, ImageExtend) {
    // 登记注册使用了ImageEXtend的编辑器
    if (!this.watcher[imageExtendId]) {
      this.watcher[imageExtendId] = ImageExtend;
    }
  },
  emit: function (activeId, type = 1) {
    // 事件发射触发
    this.active = this.watcher[activeId];
    if (type === 1) {
      imgHandler();
    }
  },
};

/**
 * @description 图片功能拓展： 增加上传 拖动 复制
 */
export class ImageExtend {
  public quill: Quill;

  public id: number;

  public config: { [key: string]: any };

  public file: File;

  public imgURL: string;

  public cursorIndex: number;
  /**
   * @param quill {Quill}富文本实例
   * @param config {Object} options
   * config  keys: action, headers, editForm start end error  size response
   */
  constructor(quill: Quill, config = {}) {
    this.id = Math.random();
    this.quill = quill;
    // @ts-ignore
    this.quill.id = this.id;
    this.config = config;
    this.imgURL = ''; // 图片地址
    quill.root.addEventListener('paste', this.pasteHandle.bind(this), false);
    quill.root.addEventListener('drop', this.dropHandle.bind(this), false);
    quill.root.addEventListener(
      'dropover',
      function (e) {
        e.preventDefault();
      },
      false,
    );
    this.cursorIndex = 0;
    QuillWatch.on(this.id, this);

    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler('image', () => {
      // @ts-ignore
      QuillWatch.emit(this.quill.id);
    });
  }

  /**
   * @description 检验图片大小是否超出限制
   */
  checkPicSize() {
    let self = this;
    if (self.config.size && self.file.size >= self.config.size * 1024 * 1024) {
      if (self.config.sizeError) {
        self.config.sizeError();
      }
      return false;
    }
    return true;
  }

  /**
   * @description 粘贴
   * @param e
   */
  pasteHandle(e) {
    let clipboard = e.clipboardData || window.clipboardData;
    QuillWatch.emit(this.quill.id, 0);

    // IE 11 is .files other browsers are .items
    if (clipboard && (clipboard.items || clipboard.files)) {
      let items = clipboard.items || clipboard.files;
      const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png|svg|webp)$/i;

      for (let i = 0; i < items.length; i++) {
        if (IMAGE_MIME_REGEX.test(items[i].type)) {
          let file = items[i].getAsFile ? items[i].getAsFile() : items[i];

          if (file) {
            // this.range = this.quill.getSelection();
            e.preventDefault();
            self.file = file;
            setTimeout(() => {
              //   this.range = this.quill.getSelection();
              this.uploadImg();
            }, 0);
          }
        }
      }
    }
  }

  /**
   * 拖拽
   * @param e
   */
  dropHandle(e) {
    QuillWatch.emit(this.quill.id, 0);
    const self = this;
    e.preventDefault();
    // 如果图片限制大小
    if (!self.checkPicSize()) {
      return;
    }
    self.file = e.dataTransfer.files[0]; // 获取到第一个上传的文件对象

    self.readFileAsDataURL(self.file, (e) => {
      self.insertBase64Image(e.target.result);
    });
    if (this.config.action) {
      self.uploadImg();
    } else {
      self.toBase64();
    }
  }

  /**
   * @description 将图片转为base4
   */
  toBase64() {
    const self = this;

    self.readFileAsDataURL(self.file, () => {
      self.imgURL = e.target.result;
      self.insertImg();
    });
  }

  readFileAsDataURL(file: File, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e);
    };
    reader.readAsDataURL(file);
  }

  /**
   * @description 上传图片到服务器
   */
  uploadImg() {
    const self = this;
    let quillLoading = self.quillLoading;
    let config = self.config;
    // 构造表单
    let formData = new FormData();
    formData.append(config.name, self.file);
    // 自定义修改表单
    if (config.editForm) {
      config.editForm(formData);
    }
    // 创建ajax请求
    let xhr = new XMLHttpRequest();
    xhr.open('post', config.action, true);
    // 如果有设置请求头
    if (config.headers) {
      config.headers(xhr);
    }
    if (config.change) {
      config.change(xhr, formData);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          //success
          let res = JSON.parse(xhr.responseText);
          self.imgURL = config.response(res);
          QuillWatch.active.uploadSuccess();
          // self.insertImg();
          self.insertToEditor(self.imgURL);
          if (self.config.success) {
            self.config.success();
          }
        } else {
          //error
          if (self.config.error) {
            self.removeBase64Image();
            self.config.error();
          }
          QuillWatch.active.uploadError();
        }
      }
    };
    // 开始上传数据
    xhr.upload.onloadstart = function (e) {
      QuillWatch.active.uploading();
      // let length = (self.quill.getSelection() || {}).index || self.quill.getLength()
      // self.quill.insertText(length, '[uploading...]', { 'color': 'red'}, true)
      if (config.start) {
        config.start();
      }
    };
    // 上传过程
    xhr.upload.onprogress = function (e) {
      let complete = (((e.loaded / e.total) * 100) | 0) + '%';
      QuillWatch.active.progress(complete);
    };
    // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
    xhr.upload.onerror = function (e) {
      QuillWatch.active.uploadError();
      if (config.error) {
        config.error();
      }
    };
    // 上传数据完成（成功或者失败）时会触发
    xhr.upload.onloadend = function (e) {
      if (config.end) {
        config.end();
      }
    };
    xhr.send(formData);
  }

  insertToEditor(url) {
    // Delete the placeholder image
    this.quill.deleteText(QuillWatch.active.cursorIndex, 3, 'user');
    // Insert the server saved image
    this.quill.insertEmbed(QuillWatch.active.cursorIndex, 'image', `${url}`, 'user');

    QuillWatch.active.cursorIndex++;
    this.quill.setSelection(QuillWatch.active.cursorIndex, 'user');
  }

  insertBase64Image(url) {
    this.quill.insertEmbed(QuillWatch.active.cursorIndex, LoadingImage.blotName, `${url}`, 'user');
  }

  removeBase64Image() {
    this.quill.deleteText(QuillWatch.active.cursorIndex, 3, 'user');
  }

  /**
   * @description 往富文本编辑器插入图片
   */
  insertImg() {
    const self = QuillWatch.active;
    self.quill.insertEmbed(QuillWatch.active.cursorIndex, 'image', self.imgURL);
    self.quill.update();
    self.quill.setSelection(self.cursorIndex + 1);
  }

  /**
   * @description 显示上传的进度
   */
  progress(pro) {
    pro = '[' + 'uploading' + pro + ']';
    QuillWatch.active.quill.root.innerHTML = QuillWatch.active.quill.root.innerHTML.replace(
      /\[uploading.*?\]/,
      pro,
    );
  }

  /**
   * 开始上传
   */
  uploading() {
    let length = QuillWatch.active.quill.getSelection(true).index;
    QuillWatch.active.cursorIndex = length;
    QuillWatch.active.quill.insertText(
      QuillWatch.active.cursorIndex,
      '[uploading...]',
      { color: 'red' },
      true,
    );
  }

  /**
   * 上传失败
   */
  uploadError() {
    QuillWatch.active.quill.root.innerHTML = QuillWatch.active.quill.root.innerHTML.replace(
      /\[uploading.*?\]/,
      '[upload error]',
    );
  }

  uploadSuccess() {
    QuillWatch.active.quill.root.innerHTML = QuillWatch.active.quill.root.innerHTML.replace(
      /\[uploading.*?\]/,
      '',
    );
  }
}

/**
 * @description 点击图片上传
 */
export function imgHandler() {
  let fileInput = document.querySelector('.quill-image-input');
  if (fileInput === null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.classList.add('quill-image-input');
    fileInput.style.display = 'none';
    // 监听选择文件
    fileInput.addEventListener('change', function () {
      let self = QuillWatch.active;
      self.file = fileInput.files[0];
      fileInput.value = '';
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', self.config.accept);
      // 如果图片限制大小
      if (!self.checkPicSize()) {
        return;
      }

      self.readFileAsDataURL(self.file, (e) => {
        self.insertBase64Image(e.target.result);
      });

      if (self.config.action) {
        self.uploadImg();
      } else {
        self.toBase64();
      }
    });
    document.body.appendChild(fileInput);
  }
  fileInput.click();
}

export function imgHandlerBack() {
  let fileInput = document.querySelector('.quill-image-input');
  if (fileInput === null) {
    fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.classList.add('quill-image-input');
    fileInput.style.display = 'none';
    // 监听选择文件
    fileInput.addEventListener('change', function () {
      let self = QuillWatch.active;
      self.file = fileInput.files[0];
      fileInput.value = '';
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', self.config.accept);
      // 如果图片限制大小
      if (!self.checkPicSize()) {
        return;
      }
      if (self.config.action) {
        self.uploadImg();
      } else {
        self.toBase64();
      }
    });
    document.body.appendChild(fileInput);
  }
  fileInput.click();
}

/**
 *@description 全部工具栏
 */
export const container = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video'],
];
