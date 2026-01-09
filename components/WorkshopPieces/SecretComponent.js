import React, { useState } from 'react';

export default function SecretComponent(props) {
  const [show, setShow] = useState(false);
  const children = props.text;

  return (
    <div className={`secret ${show ? 'secret--revealed' : ''}`}>
      <button
        onClick={() => setShow(!show)}
        className="secret-toggle"
        aria-expanded={show}
      >
        <span className="secret-icon">
          <svg viewBox="0 0 24 24" className="secret-eye">
            {show ? (
              <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </>
            ) : (
              <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </>
            )}
          </svg>
        </span>
        <span className="secret-text">{show ? 'Hide Answer' : 'Reveal Answer'}</span>
        <span className="secret-chevron">
          <svg viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      <div className="secret-content">
        <div className="secret-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
