import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PrimaryButton from '@/components/common/button/primary-button';
import ReactQuill from '@/components/react-quill';
import { notification } from '@/components/common/notification/index';
import CloseIcon from '@/icons/CloseIcon';

type editSubmitProps = {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  onIconClose?: () => void;
};

function EditSubmit({ visible, onClose, loading, onSubmit, onIconClose }: editSubmitProps) {
  const editorRef = useRef<any>(null);

  const onSubmitHandler = () => {
    if (!editorRef.current) return;
    onSubmit(editorRef.current.root.innerHTML);
  };

  return (
    <Transition
      show={visible}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed z-[2000] inset-0 overflow-y-auto flex items-center justify-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-lg" />
        <div className="relative flex-vertical z-[2000] w-[700px] bg-[#f3f0e9] rounded-3xl mb-12 pb-14 pt-8 px-16">
          <div onClick={onIconClose} className="absolute right-10 top-10 w-4 h-4 cursor-pointer">
            <CloseIcon />
          </div>
          <h2 className="text-xl font-semibold mb-6">Your Submission</h2>
          <ReactQuill
            id="quest-submit"
            forwardRef={editorRef}
            className="w-full h-[500px] bg-white "
            theme="snow"
            modules={{
              ImageExtend: {
                // 可选参数 是否显示上传进度和提示语
                // Optional parameters. Whether to display upload progress and prompt
                loading: true,
                // 图片参数名
                // Picture parameter name
                name: 'file',
                // 可选参数 图片大小，单位为M，1M = 1024kb
                // Optional parameters. Image size, Unit is M
                size: 100,
                // 服务器地址, 如果action为空，则采用base64插入图片
                // Server address, if action is empty, use base64 to insert picture
                action: 'https://api.particle.network/ipfs/upload',
                // 可选 可上传的图片格式
                // Optional, uploadable image format
                accept: 'image/jpg, image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
                // response 为一个函数用来获取服务器返回的具体图片地址
                // response is a function to get the specific image address returned by the server
                // 例如服务器返回 {code: 200; data:{ url: 'baidu.com'}}
                // For example, the server returns {code: 200; data:{ url: 'baidu.com'}}
                // 则 return res.data.url
                response: (res: any) => {
                  return res.url;
                },
                // 可选参数 设置请求头部
                // Optional parameter. Set request header
                headers: (xhr: any) => {
                  const username = 'e7c467ee-426e-42fd-ae54-c574b5515068';
                  const password = 's1O5gddRKVNXlx5W1l0kjy7XWIkD1zzlf6uRAwxu';
                  const token = btoa(`${username}:${password}`);
                  xhr.setRequestHeader('Authorization', `Basic ${token}`);
                },
                // 图片超过大小的回调
                // Callback when the image exceeds the size
                sizeError: () => {
                  alert('Limit 100M');
                },
                error: (err: any) => {
                  console.error('upload error', err);
                  notification.error(err.message);
                },
              },
              syntax: true,
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, 4, 5, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  ['image', 'video', 'link', 'code-block'],
                ],
              },
            }}
          />

          <PrimaryButton
            className="mt-4"
            text="Submit"
            loadingText="Submit"
            loading={loading}
            onClick={() => {
              onSubmitHandler();
            }}
          />
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditSubmit;
