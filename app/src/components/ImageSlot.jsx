import { useRef, useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageSlot({ id, placeholder, className, height }) {
  const [src, setSrc] = useLocalStorageState('img:' + id, null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await fileToDataUrl(file);
    setSrc(dataUrl);
  }

  return (
    <div
      className={`image-slot ${dragOver ? 'image-slot--drag' : ''} ${className || ''}`}
      style={height ? { height } : undefined}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {src ? (
        <img src={src} alt="" className="image-slot__img" />
      ) : (
        <div className="image-slot__placeholder">
          <span className="image-slot__icon">＋</span>
          <span className="image-slot__hint">{placeholder}</span>
        </div>
      )}
    </div>
  );
}
