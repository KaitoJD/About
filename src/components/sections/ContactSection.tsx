import ContactCard from '@/components/ui/ContactCard';
import { professionalContacts, personalContacts } from '@/data/contacts';

interface ContactSectionProps {
  onCopyDiscord: () => Promise<void>;
}

export default function ContactSection({ onCopyDiscord }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 transition-all duration-1000 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Let&apos;s Connect
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8" />
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ready to collaborate on your next project, discuss opportunities, or just have a chat? Find me on these platforms!
          </p>
        </div>

        {/* Professional Contact */}
        <div className="mb-16 transition-all duration-1000 ease-out delay-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="8" width="16" height="12" rx="2" ry="2" strokeWidth="2" />
              <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" />
              <line x1="12" y1="14" x2="12" y2="14" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Professional Contact
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {professionalContacts.map((card) => (
              <ContactCard key={card.title} card={card} />
            ))}
          </div>
        </div>

        {/* Personal & Gaming */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Personal &amp; Gaming
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {personalContacts.map((card) => (
              <ContactCard
                key={card.title}
                card={card}
                onCopy={card.action.type === 'copy' ? onCopyDiscord : undefined}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-8 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Start a Project?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always excited to work on innovative projects and help bring ideas to life.
            Let&apos;s discuss how we can collaborate!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact.nguyensynguyen@gmail.com"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Me an Email
            </a>
            <a
              href="https://linkedin.com/in/nguyensynguyen"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Let&apos;s Chat on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
