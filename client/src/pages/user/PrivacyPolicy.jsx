import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function PrivacyPolicy() {
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
    { id: 'what-we-collect', title: '1. WHAT INFORMATION DO WE COLLECT?' },
    { id: 'how-we-process', title: '2. HOW DO WE PROCESS YOUR INFORMATION?' },
    {
      id: 'share-with-whom',
      title: '3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?',
    },
    {
      id: 'cookies',
      title: '4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?',
    },
    { id: 'social-logins', title: '5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?' },
    { id: 'retention', title: '6. HOW LONG DO WE KEEP YOUR INFORMATION?' },
    { id: 'security', title: '7. HOW DO WE KEEP YOUR INFORMATION SAFE?' },
    { id: 'rights', title: '8. WHAT ARE YOUR PRIVACY RIGHTS?' },
    { id: 'dnt', title: '9. CONTROLS FOR DO-NOT-TRACK FEATURES' },
    { id: 'updates', title: '10. DO WE MAKE UPDATES TO THIS NOTICE?' },
    { id: 'contact', title: '11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' },
    {
      id: 'review',
      title:
        '12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?',
    },
  ]

  return (
    <>
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
              PRIVACY POLICY
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Last updated October 29, 2025
            </p>
          </header>

          {/* Intro + Summary */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="space-y-4 md:col-span-3">
              <p className="leading-relaxed text-gray-700">
                This Privacy Notice for Ethio Quiz ("we," "us," or "our"),
                describes how and why we might access, collect, store, use,
                and/or share ("process") your personal information when you use
                our services ("Services").
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  Visit our website at https://ethioquiz.com.et or any website
                  of ours that links to this Privacy Notice.
                </li>
                <li>
                  Use Quizzes. This platform can be used to help university
                  students excel through quiz-based learning.
                </li>
                <li>
                  Engage with us in other related ways, including sales,
                  marketing, or events.
                </li>
              </ul>
              <p className="text-gray-700">
                Questions or concerns? Reading this Privacy Notice will help you
                understand your privacy rights and choices. If you still have
                any questions, please contact us at{' '}
                <a
                  className="text-indigo-600 hover:underline"
                  href="mailto:support@ethioquiz.com.et"
                >
                  support@ethioquiz.com.et
                </a>
                .
              </p>

              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">
                  SUMMARY OF KEY POINTS
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  A short summary of the most important parts of this notice.
                  Use the table of contents to jump to any section for details.
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
                  <li>What information we collect.</li>
                  <li>How we process and share your data.</li>
                  <li>Your privacy rights and controls.</li>
                  <li>How to contact us and request data updates.</li>
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
                <h2 className="text-xl font-bold md:text-2xl">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  This section explains "{section.title.toLowerCase()}" in
                  detail.
                </p>
              </section>
            ))}
          </article>

          {/* Footer links */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <a
              className="text-sm text-gray-600 hover:underline"
              href="#summary"
            >
              Back to top
            </a>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Ethio Quiz. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
