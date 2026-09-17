import { useState } from 'react';
import ImageSlot from './ImageSlot.jsx';
import { AREAS, CATEGORIES } from '../data/routes.js';

const EMPTY_STOP = { name: '', cat: 'nature', spend: '', travel: '', hours: '', note: '' };

export default function BuilderScreen({ draft, onTitleChange, onAreaChange, onAddStop, onRemoveStop, onPublish, justPublished }) {
  const [newStop, setNewStop] = useState(EMPTY_STOP);

  const progress = draft.stops.length < 2
    ? 'הוסיפו לפחות שתי תחנות כדי לפרסם'
    : 'אפשר לפרסם – ' + draft.stops.length + ' תחנות במסלול';

  function submitStop() {
    if (!newStop.name.trim()) return;
    onAddStop({
      name: newStop.name.trim(),
      cat: newStop.cat,
      spend: newStop.spend || 'לא צוין',
      travel: newStop.travel,
      hours: newStop.hours,
      note: newStop.note,
    });
    setNewStop(EMPTY_STOP);
  }

  const canPublish = draft.stops.length >= 2;

  return (
    <div className="builder">
      <div className="builder__heading">
        <span className="builder__title">מסלול חדש</span>
        <span className="builder__progress">{progress}</span>
      </div>

      <div className="builder-card">
        <div className="field">
          <span className="field__label">שם המסלול</span>
          <input
            value={draft.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="למשל: אגם, קפה ושקיעה"
            dir="rtl"
          />
        </div>
        <div className="field">
          <span className="field__label">אזור</span>
          <div className="chips-wrap">
            {AREAS.map((a) => (
              <div
                key={a}
                className={'small-chip' + (draft.area === a ? ' small-chip--active' : '')}
                onClick={() => onAreaChange(a)}
              >
                {a}
              </div>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="field__label">תמונת שער</span>
          <div className="cover-slot">
            <ImageSlot id="draft-cover" placeholder="גררו תמונה מהטיול" />
          </div>
        </div>
      </div>

      <div className="stops-section">
        <span className="stops-section__title">תחנות ({draft.stops.length})</span>

        {draft.stops.map((d, i) => (
          <div className="draft-stop" key={i}>
            <div className="draft-stop__num">{i + 1}</div>
            <div className="draft-stop__info">
              <span className="draft-stop__name">{d.name}</span>
              <span className="draft-stop__meta">
                {[CATEGORIES[d.cat].label, d.spend, d.travel].filter(Boolean).join(' · ')}
              </span>
            </div>
            <button className="draft-stop__remove" onClick={() => onRemoveStop(i)}>×</button>
          </div>
        ))}

        <div className="add-stop">
          <span className="add-stop__title">הוספת תחנה</span>
          <input
            value={newStop.name}
            onChange={(e) => setNewStop((s) => ({ ...s, name: e.target.value }))}
            placeholder="שם המקום"
            dir="rtl"
          />
          <div className="chips-wrap">
            {Object.keys(CATEGORIES).map((k) => (
              <div
                key={k}
                className={'small-chip' + (newStop.cat === k ? ' small-chip--active' : '')}
                onClick={() => setNewStop((s) => ({ ...s, cat: k }))}
              >
                {CATEGORIES[k].label}
              </div>
            ))}
          </div>
          <div className="add-stop__row">
            <input
              value={newStop.spend}
              onChange={(e) => setNewStop((s) => ({ ...s, spend: e.target.value }))}
              placeholder="זמן בתחנה"
              dir="rtl"
            />
            <input
              value={newStop.travel}
              onChange={(e) => setNewStop((s) => ({ ...s, travel: e.target.value }))}
              placeholder="נסיעה לתחנה הבאה"
              dir="rtl"
            />
          </div>
          <input
            value={newStop.hours}
            onChange={(e) => setNewStop((s) => ({ ...s, hours: e.target.value }))}
            placeholder="שעות פתיחה"
            dir="rtl"
          />
          <textarea
            value={newStop.note}
            onChange={(e) => setNewStop((s) => ({ ...s, note: e.target.value }))}
            placeholder="הערה שלכם – למה כדאי לעצור פה?"
            dir="rtl"
            rows={2}
          />
          <div className="add-stop__submit" onClick={submitStop}>הוספה למסלול</div>
        </div>
      </div>

      <div
        className="publish-btn"
        style={{ background: canPublish ? 'var(--bg-header)' : 'var(--text-inactive)' }}
        onClick={onPublish}
      >
        {justPublished ? 'פורסם ✓' : 'פרסום המסלול'}
      </div>
    </div>
  );
}
