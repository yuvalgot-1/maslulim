import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const BUCKET = 'route-images';

function publicUrlFor(path) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export default function ImageSlot({ id, placeholder, className, height, editable, known, onUploaded }) {
  const skipLoad = known === false;
  const baseUrl = publicUrlFor(id);
  const [src, setSrc] = useState(baseUrl);
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(skipLoad);
  const [dragOver, setDragOver] = useState(false);
  const [tooLarge, setTooLarge] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setSrc(publicUrlFor(id));
    setLoaded(false);
    setBroken(skipLoad);
  }, [id, skipLoad]);

  async function handleFile(file) {
    if (!editable || !file || !file.type.startsWith('image/')) return;
    if (file.size > MAX_FILE_BYTES) {
      setTooLarge(true);
      return;
    }
    setTooLarge(false);
    setUploadError(false);
    setUploading(true);
    const { error } = await supabase.storage.from(BUCKET).upload(id, file, {
      upsert: true,
      contentType: file.type,
    });
    setUploading(false);
    if (error) {
      setUploadError(true);
      return;
    }
    setLoaded(false);
    setBroken(false);
    setSrc(baseUrl + '?v=' + Date.now());
    onUploaded?.();
  }

  const showImage = !broken;

  return (
    <div
      className={`image-slot ${dragOver ? 'image-slot--drag' : ''} ${className || ''}`}
      style={height ? { height } : undefined}
      onClick={() => editable && inputRef.current?.click()}
      onDragOver={(e) => { if (editable) { e.preventDefault(); setDragOver(true); } }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        if (!editable) return;
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
    >
      {editable && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      )}
      {showImage && (
        <img
          src={src}
          alt=""
          className="image-slot__img"
          style={{ display: loaded ? 'block' : 'none' }}
          onLoad={() => setLoaded(true)}
          onError={() => setBroken(true)}
        />
      )}
      {!loaded && (
        <div className="image-slot__placeholder">
          {editable && <span className="image-slot__icon">＋</span>}
          <span className="image-slot__hint">
            {tooLarge
              ? 'התמונה גדולה מדי לשמירה, נסו תמונה קטנה יותר'
              : uploadError
                ? 'ההעלאה נכשלה, נסו שוב'
                : uploading
                  ? 'מעלה תמונה...'
                  : (editable ? placeholder : '')}
          </span>
        </div>
      )}
    </div>
  );
}
