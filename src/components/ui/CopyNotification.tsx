import { NOTIFICATION_DISPLAY_DURATION } from '@/data/personal';

interface CopyNotificationProps {
  show: boolean;
  isVisible: boolean;
}

export default function CopyNotification({ show, isVisible }: CopyNotificationProps) {
  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-[10000] transition-all duration-500 ease-in-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-[-100px] opacity-0 scale-95'
      }`}
    >
      <div
        className={`bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 ${
          isVisible ? 'shadow-2xl hover:shadow-emerald-500/25' : 'shadow-sm'
        }`}
      >
        <div className={`transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-75'}`}>
          <svg className="w-5 h-5 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className={`font-medium transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-70'}`}>
          Discord username copied to clipboard!
        </span>
        {/* Progress bar */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-emerald-400 rounded-b-lg transition-all ease-linear duration-[${NOTIFICATION_DISPLAY_DURATION}ms] ${
            show ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </div>
  );
}
