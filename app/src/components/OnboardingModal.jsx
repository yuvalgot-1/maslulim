export default function OnboardingModal({ onDismiss, onOpenTerms }) {
  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <span className="onboarding-title">ברוכים הבאים ל־מיטיבי לסת 👋</span>
        <ul className="onboarding-list">
          <li>כאן תמצאו מסלולי טיול שלמים — מהטבע ועד לארוחה, לא רק נקודה על המפה.</li>
          <li>חפשו לפי אזור, קטגוריה או חיפוש חופשי.</li>
          <li>לחצו ♡ כדי לשמור מסלול למסך "שמורים" — השמירות נשמרות במכשיר הזה בלבד.</li>
        </ul>
        <span style={{ fontSize: 12.5, color: 'var(--text-faint)', textAlign: 'center' }}>
          בלחיצה על "מסכימ/ה, בואו נתחיל" אתם מאשרים שקראתם ומסכימים ל
          <span className="link-action" onClick={onOpenTerms}>תנאי השימוש</span>.
          ללא הסכמה לא ניתן להשתמש באתר.
        </span>
        <div className="publish-btn" style={{ background: 'var(--bg-header)' }} onClick={onDismiss}>
          מסכימ/ה, בואו נתחיל
        </div>
      </div>
    </div>
  );
}
