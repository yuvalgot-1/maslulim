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
        <div className="publish-btn" style={{ background: 'var(--bg-header)' }} onClick={onDismiss}>
          הבנתי, בואו נתחיל
        </div>
        <span className="link-action" style={{ textAlign: 'center' }} onClick={onOpenTerms}>
          תנאי שימוש
        </span>
      </div>
    </div>
  );
}
