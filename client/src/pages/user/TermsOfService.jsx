import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TermsOfService() {
  const [active, setActive] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('[data-section]'))
    function onScroll() {
      const offset = 200
      const current = headings
        .map((h) => ({ id: h.id, top: h.getBoundingClientRect().top }))
        .filter((h) => h.top <= offset)
        .pop()
      setActive(current ? current.id : headings[0]?.id || '')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sections = [
    { id: 'agreement', title: '1. AGREEMENT TO OUR TERMS' },
    { id: 'services', title: '2. OUR SERVICES' },
    { id: 'user-accounts', title: '3. USER ACCOUNTS' },
    { id: 'prohibited', title: '4. PROHIBITED ACTIVITIES' },
    { id: 'intellectual', title: '5. INTELLECTUAL PROPERTY RIGHTS' },
    { id: 'termination', title: '6. TERMINATION' },
    { id: 'disclaimer', title: '7. DISCLAIMER' },
    { id: 'liability', title: '8. LIMITATION OF LIABILITY' },
    { id: 'governing-law', title: '9. GOVERNING LAW' },
    { id: 'updates', title: '10. CHANGES TO THESE TERMS' },
    { id: 'contact', title: '11. CONTACT INFORMATION' },
  ]

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-6xl p-8">
        {/* Back to Home */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600"
        >
          ← Back to Home
        </button>

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            TERMS OF SERVICE
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated October 29, 2025
          </p>
        </header>

        {/* Intro + Summary */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="space-y-4 md:col-span-3">
            <p className="leading-relaxed text-gray-700">
              Welcome to <strong>Ethio Quiz</strong>. These Terms of Service
              ("Terms") govern your use of our website, platform, and services
              ("Services"). By accessing or using our Services, you agree to be
              bound by these Terms.
            </p>

            <p className="text-gray-700">
              Please read these Terms carefully. If you do not agree with them,
              you must not use our Services.
            </p>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">
                SUMMARY OF KEY POINTS
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Here’s a brief overview of our Terms. Please read the full text
                below for more details.
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>You must be at least 13 years old to use Ethio Quiz.</li>
                <li>
                  Do not use our Services for unlawful or abusive purposes.
                </li>
                <li>
                  We may modify or terminate services at any time, with or
                  without notice.
                </li>
                <li>
                  Your continued use of the Services means you accept these
                  changes.
                </li>
              </ul>
            </div>
          </div>

          {/* Table of Contents */}
          <aside className="hidden md:col-span-1 md:block">
            <div className="sticky top-24 rounded-lg border bg-white p-4 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-800">
                TABLE OF CONTENTS
              </h4>
              <nav className="mt-3 flex flex-col space-y-2 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block truncate hover:underline ${
                      active === s.id
                        ? 'font-medium text-indigo-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </section>

        {/* Full content */}
        <article className="mt-10 space-y-12 text-gray-800">
          {sections.map((section) => (
            <section key={section.id} id={section.id} data-section>
              <h2 className="text-xl font-bold md:text-2xl">{section.title}</h2>
              <p className="mt-2 leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. This
                section provides detailed explanation about "
                {section.title.toLowerCase()}".
              </p>
            </section>
          ))}
        </article>

        {/* Footer links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <a className="text-sm text-gray-600 hover:underline" href="#top">
            Back to top
          </a>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Ethio Quiz. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
