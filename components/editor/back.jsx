import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { forwardRef, useImperativeHandle } from 'react'; // forwardRef와 useImperativeHandle를 한 번만 import

const BasicEditor = forwardRef(({ onTextChange, style }, ref) => {
  const [text, setText] = useState('');
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

  return (
    <>
      <ReactQuill
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
