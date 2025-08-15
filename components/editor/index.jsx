'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

// react-quill-new를 동적으로 import
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

  const handleChange = value => {
    setText(value);
  };

  // useImperativeHandle을 사용하여 외부에서 호출 가능한 메서드를 정의
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

  const containerStyle = {
    ...style,
  };

  useEffect(() => {
    if (value !== text) {
      setText(value);
    }
  }, [value]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 이미지 붙여넣기 처리
  useEffect(() => {
    if (quillRef.current && mounted) {
      const editor = quillRef.current.getEditor();

      const handlePaste = async e => {
        const items = e.clipboardData.items;
        let hasImage = false;

        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            hasImage = true;
            e.preventDefault();
            e.stopPropagation();

            const file = items[i].getAsFile();
            console.log('붙여넣기된 이미지:', file);

            if (file) {
              const formData = new FormData();
              formData.append('img', file);

              try {
                const result = await axios.post(
                  'http://127.0.0.1:4000/img',
                  formData
                );
                console.log('붙여넣기 성공:', result.data.url);
                const IMG_URL = result.data.url;

                const range = editor.getSelection();
                editor.insertEmbed(range, 'image', IMG_URL);
              } catch (error) {
                console.log('붙여넣기 실패:', error);
              }
            }
            break;
          }
        }
      };

      // 에디터에 paste 이벤트 리스너 추가
      editor.root.addEventListener('paste', handlePaste, true);

      return () => {
        editor.root.removeEventListener('paste', handlePaste, true);
      };
    }
  }, [mounted, quillRef.current]);

  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    // input.setAttribute('capture', 'environment'); // 모바일에서 카메라 접근 허용
    input.style.display = 'none'; // 숨김 처리
    document.body.appendChild(input); // DOM에 추가
    
    // input에 변화가 생긴다면 = 이미지를 선택
    const handleFileChange = async () => {
      console.log('온체인지');
      const file = input.files[0];
      console.log('ddd', file);
      
      if (!file) {
        document.body.removeChild(input);
        return;
      }
      
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append('img', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.post('http://127.0.0.1:4000/img', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;

        // 이미지 태그를 에디터에 써주기
        if (quillRef.current) {
          const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
          // 현재 에디터 커서 위치값을 가져온다
          const range = editor.getSelection();
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range, 'image', IMG_URL);
        }
      } catch (error) {
        console.log('실패했어요ㅠ', error);
      } finally {
        // 정리 작업
        document.body.removeChild(input);
        input.removeEventListener('change', handleFileChange);
      }
    };
    
    input.addEventListener('change', handleFileChange);
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
  };

  // Quill 에디터에서 사용하고싶은 모듈들을 설정한다.
  // useMemo를 사용해 modules를 만들지 않는다면 매 렌더링 마다 modules가 다시 생성된다.
  // 그렇게 되면 addrange() the given range isn't in document 에러가 발생한다.
  // -> 에디터 내에 글이 쓰여지는 위치를 찾지 못하는듯
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  // 위에서 설정한 모듈들 foramts을 설정한다
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
