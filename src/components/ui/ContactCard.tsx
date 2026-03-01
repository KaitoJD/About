import type { ContactCardData } from '@/types';

interface ContactCardProps {
  card: ContactCardData;
  onCopy?: () => void;
}

export default function ContactCard({ card, onCopy }: ContactCardProps) {
  const { title, description, iconBgColor, iconColor, iconSvg, iconFill, action } = card;

  return (
    <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center group hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 flex flex-col">
      <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <svg className={`w-8 h-8 ${iconColor}`} fill={iconFill ? 'currentColor' : 'none'} stroke={iconFill ? 'none' : 'currentColor'} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconFill ? undefined : 2} d={iconSvg} />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm flex-grow">{description}</p>

      {action.type === 'link' ? (
        <a
          href={action.href}
          target={action.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={action.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className={`inline-flex items-center justify-center w-full ${action.buttonColor} hover:scale-105 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 h-12`}
        >
          <svg className="w-5 h-5 mr-2" fill={action.buttonFill ? 'currentColor' : 'none'} stroke={action.buttonFill ? 'none' : 'currentColor'} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={action.buttonFill ? undefined : 2} d={action.buttonSvg} />
          </svg>
          {action.label}
        </a>
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-mono bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 px-3 py-2 rounded">
            {action.username}
          </p>
          <button
            onClick={onCopy}
            className={`inline-flex items-center justify-center w-full ${action.buttonColor} hover:scale-105 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 h-12`}
          >
            <svg className="w-5 h-5 mr-2" fill={action.buttonFill ? 'currentColor' : 'none'} stroke={action.buttonFill ? 'none' : 'currentColor'} viewBox="0 0 24 24">
              <path d={action.buttonSvg} />
            </svg>
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
}
