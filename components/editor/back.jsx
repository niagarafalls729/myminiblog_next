import { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { forwardRef, useImperativeHandle } from 'react';
import { saveBlob } from '../../api/baseGet';

const BasicEditor = forwardRef(({ onTextChange, style }, ref) => {
  const [text, setText] = useState('');
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef(null);
  
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const handleChange = value => {
    setText(value);
    onTextChange(value);
  };
  
  const containerStyle = {
    ...style,
  };
  
  // useImperativeHandle을 사용하여 외부에서 호출 가능한 메서드를 정의
  useImperativeHandle(ref, () => ({
    text,
  }));

  // 마운트 상태
  useEffect(() => {
    setMounted(true);
  }, []);

  // 이미지 붙여넣기 처리
  useEffect(() => {
    if (quillRef.current && mounted) {
      const editor = quillRef.current.getEditor();

      const handlePaste = async e => {
        console.log('handlePaste 실행됨 (back.jsx)');
        e.preventDefault();
        e.stopPropagation();
        
        const items = e.clipboardData.items;
        let hasImage = false;

        for (let i = 0; i < items.length; i++) {
          console.log('item type:', items[i].type);
          if (items[i].type.indexOf('image') !== -1) {
            hasImage = true;
            console.log('이미지 발견! (back.jsx)');

            const file = items[i].getAsFile();
            console.log('붙여넣기된 이미지 (back.jsx):', file);

            if (file) {
              const formData = new FormData();
              formData.append('img', file);

              try {
                const result = await saveBlob('/img', formData);
                console.log('붙여넣기 성공 (back.jsx):', result.url);
                const IMG_URL = result.url;

                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', IMG_URL);
              } catch (error) {
                console.log('붙여넣기 실패 (back.jsx):', error);
              }
            }
            break;
          }
        }
        
        // 이미지가 없으면 텍스트만 허용
        if (!hasImage) {
          const textData = e.clipboardData.getData('text/plain');
          if (textData) {
            const range = editor.getSelection();
            editor.insertText(range.index, textData);
          }
        }
      };

      // document 레벨에서 이벤트 리스너 추가
      document.addEventListener('paste', handlePaste, true);

      return () => {
        document.removeEventListener('paste', handlePaste, true);
      };
    }
  }, [mounted, quillRef.current]);

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        style={containerStyle}
        placeholder="내용을 입력해주세여!"
        value={text}
        modules={{
          toolbar: [
            [{ header: '1' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
          ],
        }}
        onChange={handleChange}
      />{' '}
      {text}
    </>
  );
});

export default BasicEditor;
