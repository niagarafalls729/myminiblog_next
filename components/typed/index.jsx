'use client'

import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Typed from 'typed.js';

function index({ setText }) {
    const el = useRef(null);

    useEffect(() => {
        const options = {
            strings: setText,
            typeSpeed: 90,
            backSpeed: 80,
            loop: true, // 루프 설정
            loopCount: Infinity, // 무한 루프
        };

        const typed = new Typed(el.current, options);
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <div className="App">
            <span ref={el} />
        </div>
    );
}
export default index;
