'use client';

import { useState, useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';
import { saveBlob } from '../../api/baseGet';

// react-quill-new 동적 import
const ReactQuill = dynamic(
  () => import('react-quill-new').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <p>에디터 로딩 중...</p>,
  }
);

import 'react-quill-new/dist/quill.snow.css';

const BasicEditor = forwardRef(({ style, value }, parent_ref) => {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState('');
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setText(value);
  };

  // 외부에서 접근 가능한 메서드 등록
  useImperativeHandle(parent_ref, () => ({
    text,
    getContents: () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        return editor.root.innerHTML;
      }
      return text;
    },
  }));

  const containerStyle = { ...style };

  // 초기 값 설정
  useEffect(() => {
    if (value !== text) {
      setText(value);
    }
  }, [value]);

  // 마운트 상태
  useEffect(() => {
    setMounted(true);
  }, []);

  // 붙여넣기 이벤트 (PC 전용)
  useEffect(() => {
    if (quillRef.current && mounted && !/Mobi|Android/i.test(navigator.userAgent)) {
      const editor = quillRef.current.getEditor();

      const handlePaste = async (e) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            e.preventDefault();
            const file = items[i].getAsFile();
            const formData = new FormData();
            formData.append('img', file);

            try {
              const result = await saveBlob('/img', formData);
              const IMG_URL = result.url;
              const range = editor.getSelection();
              editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
              console.log('붙여넣기 실패:', error);
            }
            break;
          }
        }
      };

      editor.root.addEventListener('paste', handlePaste, true);
      return () => {
        editor.root.removeEventListener('paste', handlePaste, true);
      };
    }
  }, [mounted]);

  // 이미지 업로드 핸들러
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('capture', 'environment'); // 모바일 카메라 접근
    input.style.display = 'none';
    document.body.appendChild(input);

    const handleFileChange = async () => {
      const file = input.files[0];
      if (!file) {
        document.body.removeChild(input);
        return;
      }

      const formData = new FormData();
      formData.append('img', file);

      try {
        const result = await saveBlob('/img', formData);
        const IMG_URL = result.url;

        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', IMG_URL);
          editor.setSelection(range.index + 1);
        }
      } catch (error) {
        console.log('이미지 업로드 실패:', error);
      } finally {
        document.body.removeChild(input);
        input.removeEventListener('change', handleFileChange);
      }
    };

    input.addEventListener('change', handleFileChange);
    input.click(); // 동기 실행 (모바일에서 제스처 인식)
  };

  // Quill 모듈 설정
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];

  if (!mounted) {
    return <div>에디터 로딩 중...</div>;
  }

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        style={containerStyle}
        theme="snow"
        placeholder="내용을 입력해주세요!"
        value={text}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
});

BasicEditor.displayName = 'BasicEditor';
export default BasicEditor;
