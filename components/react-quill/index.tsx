/* eslint-disable */
import React, { HTMLAttributes, MutableRefObject } from 'react';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import Quill, { QuillOptionsStatic } from 'quill';

import 'highlight.js/styles/github.css';
import 'quill/dist/quill.snow.css';

const ReactQuill1 = dynamic<
  QuillOptionsStatic & HTMLAttributes<HTMLElement> & { forwardRef: MutableRefObject<Quill> }
>(
  async () => {
    // @ts-ignore
    window.hljs = window.hljs || hljs;

    hljs.highlightAll();
    const { default: Quill } = await import('quill');
    const { ImageExtend: ImageUploader } = await import('./modules/image-upload/index');

    Quill.register('modules/ImageExtend', ImageUploader);

    return ({ id, className, forwardRef, ...props }) => {
      const editorRef = React.useRef<any>(null);
      const containerRef = React.useRef<any>(null);
      // We can now initialize Quill with something like this:

      React.useEffect(() => {
        const editor = new Quill(containerRef.current, props as any);
        editorRef.current = editor;
        forwardRef.current = editor;

        return () => {};
      }, []);

      // @ts-ignore
      return <div id={id} className={className} ref={containerRef}></div>;
    };
  },
  {
    ssr: false,
    loading: () => <div className="my-2 text-center">Loading Editor...</div>,
  },
);

export default ReactQuill1;
