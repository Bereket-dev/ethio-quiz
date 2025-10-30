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
                Here's a brief overview of our Terms. Please read the full text
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
          {/* Section 1: Agreement to Terms */}
          <section id="agreement" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              1. AGREEMENT TO OUR TERMS
            </h2>
            <div className="mt-6 space-y-4">
              <p className="leading-relaxed text-gray-600">
                <strong>Legal Contract Formation:</strong> These Terms
                constitute a legally binding agreement between you and Ethio
                Quiz. By accessing, registering for, or using our Services, you
                acknowledge that you have read, understood, and agree to be
                bound by all provisions contained herein.
              </p>
              <p className="leading-relaxed text-gray-600">
                <strong>Capacity to Contract:</strong> You represent and warrant
                that you possess the legal capacity and authority to enter into
                this Agreement. If you are accessing our Services on behalf of
                an educational institution or organization, you represent that
                you have the authority to bind such entity to these Terms.
              </p>
              <p className="leading-relaxed text-gray-600">
                <strong>Supplemental Terms:</strong> Certain features of our
                Services may be subject to additional guidelines, terms, or
                rules, which will be posted in connection with such features.
                All supplemental terms are incorporated by reference into these
                Terms.
              </p>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Legal Effect:</strong> Your use of our Services
                  constitutes acceptance of these Terms. If you do not agree to
                  these Terms, you must immediately cease all use of our
                  Services. Continued use following any modifications
                  constitutes acceptance of the revised Terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Our Services */}
          <section id="services" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              2. OUR SERVICES
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Service Description
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Ethio Quiz provides an educational technology platform
                  designed to facilitate quiz-based learning for university
                  students. Our Services include, but are not limited to:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600">
                  <li>Interactive quiz creation and participation tools</li>
                  <li>Academic performance tracking and analytics</li>
                  <li>Educational content delivery and management</li>
                  <li>Progress monitoring and reporting features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Service Modifications and Availability
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Modification Rights:</strong> We reserve the right to
                  modify, suspend, or discontinue any aspect of our Services at
                  any time, including the availability of any feature, database,
                  or content. We may also impose limits on certain features or
                  restrict access to parts or all of our Services without notice
                  or liability.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>No Guarantee of Availability:</strong> While we strive
                  to maintain Service availability, we do not guarantee
                  uninterrupted, secure, or error-free operation. Services may
                  be unavailable due to maintenance, updates, or circumstances
                  beyond our reasonable control.
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Educational Purpose Disclaimer:</strong> Our Services
                  are provided for educational purposes only. We do not
                  guarantee academic outcomes, exam results, or specific
                  educational achievements. Users are solely responsible for
                  their academic performance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: User Accounts */}
          <section id="user-accounts" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              3. USER ACCOUNTS
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Registration
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Eligibility Requirements:</strong> To access certain
                  features, you must register for an account. You must be at
                  least 13 years of age to use our Services. If you are under
                  18, you represent that you have obtained parental or guardian
                  consent to use our Services.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Registration Accuracy:</strong> You agree to provide
                  accurate, current, and complete information during the
                  registration process and to update such information to
                  maintain its accuracy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Security and Responsibility
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Security Obligations:</strong> You are responsible for
                  maintaining the confidentiality of your account credentials
                  and for all activities that occur under your account. You
                  agree to immediately notify us of any unauthorized use of your
                  account or any other security breaches.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Prohibited Transfers:</strong> You may not transfer,
                  assign, or share your account with any third party. Accounts
                  are personal to the registered user and may not be used by
                  multiple individuals.
                </p>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Liability for Unauthorized Use:</strong> You
                  acknowledge and agree that we are not liable for any loss or
                  damage arising from your failure to comply with account
                  security obligations. You may be held liable for losses
                  incurred by us or another party due to someone else using your
                  account.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Prohibited Activities */}
          <section id="prohibited" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              4. PROHIBITED ACTIVITIES
            </h2>
            <div className="mt-6 space-y-6">
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-gray-700 italic">
                  <strong>Legal Compliance:</strong> You may not use our
                  Services for any illegal or unauthorized purpose, nor may you
                  violate any laws in your jurisdiction while using our
                  Services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Specific Prohibitions
                </h3>
                <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                  <li>
                    <strong>Academic Integrity Violations:</strong> Using our
                    Services to engage in academic dishonesty, including but not
                    limited to cheating, plagiarism, or unauthorized
                    collaboration during academic assessments
                  </li>
                  <li>
                    <strong>Intellectual Property Infringement:</strong>{' '}
                    Violating any copyright, trademark, patent, trade secret, or
                    other intellectual property rights
                  </li>
                  <li>
                    <strong>Security Breaches:</strong> Attempting to breach
                    security measures, introducing malware, or engaging in any
                    activity that could disrupt, damage, or impair our Services
                  </li>
                  <li>
                    <strong>Unauthorized Access:</strong> Accessing or
                    attempting to access any systems, networks, or data not
                    intended for your use
                  </li>
                  <li>
                    <strong>Harassment and Abuse:</strong> Engaging in
                    harassment, bullying, defamation, or any form of abusive
                    behavior toward other users
                  </li>
                  <li>
                    <strong>Commercial Use:</strong> Using our Services for any
                    commercial purpose without our express written consent
                  </li>
                  <li>
                    <strong>Data Mining:</strong> Scraping, harvesting, or
                    extracting data from our Services through automated means
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h4 className="font-semibold text-gray-800">
                  Enforcement Rights
                </h4>
                <p className="mt-2 text-sm text-gray-700">
                  We reserve the right to investigate and prosecute violations
                  of these prohibitions to the fullest extent of the law. We may
                  involve and cooperate with law enforcement authorities in
                  prosecuting users who violate these Terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Intellectual Property Rights */}
          <section id="intellectual" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              5. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Our Intellectual Property
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Ownership Rights:</strong> All content, features, and
                  functionality available through our Services, including but
                  not limited to text, graphics, logos, images, software, and
                  the compilation thereof, are the exclusive property of Ethio
                  Quiz and our licensors and are protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Limited License:</strong> Subject to your compliance
                  with these Terms, we grant you a limited, non-exclusive,
                  non-transferable, non-sublicensable license to access and use
                  our Services for personal, non-commercial educational
                  purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  User Content
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>User-Generated Content:</strong> You retain ownership
                  of any content you create, upload, or submit through our
                  Services. By submitting User Content, you grant us a
                  worldwide, royalty-free, sublicensable license to use,
                  reproduce, modify, and display such content for the purpose of
                  providing and improving our Services.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Representations and Warranties:</strong> You represent
                  and warrant that you own or have the necessary rights to all
                  User Content you submit and that such content does not
                  infringe any third-party rights.
                </p>
              </div>

              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="font-semibold text-gray-800">
                  Copyright Policy
                </h4>
                <p className="mt-2 text-sm text-gray-700">
                  We respect intellectual property rights and comply with the
                  Digital Millennium Copyright Act (DMCA). If you believe your
                  copyright has been infringed, please contact us with a
                  detailed notice containing the information specified in our
                  Copyright Policy.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Termination */}
          <section id="termination" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">6. TERMINATION</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Termination by You
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  You may terminate your account at any time by following the
                  account deletion procedures in your account settings or by
                  contacting us. Termination of your account will result in the
                  deactivation or deletion of your account and access to it.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Termination by Us
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We may suspend or terminate your access to our Services
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach these
                  Terms. Upon termination, your right to use our Services will
                  cease immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Effect of Termination
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  All provisions of these Terms which by their nature should
                  survive termination shall survive, including without
                  limitation ownership provisions, warranty disclaimers,
                  indemnity, and limitations of liability.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h4 className="font-semibold text-gray-800">Data Retention</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Following termination, we may retain your information as
                  necessary to comply with legal obligations, resolve disputes,
                  and enforce our agreements. For details on data retention,
                  please refer to our Privacy Policy.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Disclaimer */}
          <section id="disclaimer" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">7. DISCLAIMER</h2>
            <div className="mt-6 space-y-6">
              <div className="rounded-lg bg-yellow-50 p-4">
                <p className="text-gray-700 italic">
                  <strong>No Warranties:</strong> OUR SERVICES ARE PROVIDED "AS
                  IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Specific Disclaimers
                </h3>
                <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                  <li>
                    <strong>Educational Outcomes:</strong> We do not warrant
                    that use of our Services will result in specific academic
                    achievements, exam success, or educational outcomes
                  </li>
                  <li>
                    <strong>Content Accuracy:</strong> While we strive for
                    accuracy, we do not warrant that any educational content,
                    quiz materials, or other information provided through our
                    Services is complete, reliable, current, or error-free
                  </li>
                  <li>
                    <strong>Service Continuity:</strong> We do not guarantee
                    uninterrupted or error-free operation of our Services
                  </li>
                  <li>
                    <strong>Third-Party Content:</strong> We are not responsible
                    for any third-party content, services, or websites accessed
                    through our Services
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Jurisdictional Limitations:</strong> Some
                  jurisdictions do not allow the exclusion of certain
                  warranties, so some of the above exclusions may not apply to
                  you. To the extent we may not disclaim any warranty as a
                  matter of applicable law, the scope and duration of such
                  warranty will be the minimum permitted under such law.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section id="liability" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              8. LIMITATION OF LIABILITY
            </h2>
            <div className="mt-6 space-y-6">
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-gray-700 italic">
                  <strong>Cap on Liability:</strong> TO THE MAXIMUM EXTENT
                  PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ETHIO QUIZ, ITS
                  DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Scope of Limitation
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  Our total cumulative liability to you for all claims arising
                  from or related to these Terms or your use of our Services
                  shall not exceed the greater of (a) the amount you have paid
                  to us for use of our Services in the twelve (12) months
                  preceding the event giving rise to the claim, or (b) one
                  hundred United States dollars (USD $100).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Exclusions and Limitations
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  This limitation of liability applies to all claims, whether
                  based on warranty, contract, tort, or any other legal theory,
                  and whether or not we have been informed of the possibility of
                  such damage.
                </p>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Essential Basis:</strong> You acknowledge and agree
                  that the limitations of liability set forth in this Section
                  are an essential basis of the bargain between you and us and
                  that we would not provide the Services to you without such
                  limitations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Governing Law */}
          <section id="governing-law" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              9. GOVERNING LAW
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Choice of Law
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  These Terms and any action related thereto will be governed by
                  the laws of the Federal Democratic Republic of Ethiopia
                  without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Dispute Resolution
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Informal Resolution:</strong> The parties shall first
                  attempt to resolve any dispute, claim, or controversy arising
                  out of or relating to these Terms through informal
                  negotiations between the parties.
                </p>
                <p className="mt-2 leading-relaxed text-gray-600">
                  <strong>Mediation and Arbitration:</strong> If the dispute
                  cannot be resolved through informal negotiations, the parties
                  agree to submit the dispute to mediation in Addis Ababa,
                  Ethiopia. If mediation fails, the dispute shall be finally
                  settled by arbitration in accordance with the Ethiopian
                  Arbitration Rules.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h4 className="font-semibold text-gray-800">Jurisdiction</h4>
                <p className="mt-2 text-sm text-gray-600">
                  The parties hereby submit to the exclusive jurisdiction of the
                  courts located in Addis Ababa, Ethiopia for any legal
                  proceedings related to these Terms or the Services, except
                  that we may seek injunctive or other equitable relief in any
                  court of competent jurisdiction to protect our intellectual
                  property rights.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Changes to Terms */}
          <section id="updates" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              10. CHANGES TO THESE TERMS
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Modification Rights
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Acceptance of Changes
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  By continuing to access or use our Services after any
                  revisions become effective, you agree to be bound by the
                  revised Terms. If you do not agree to the new terms, you are
                  no longer authorized to use our Services and must cease all
                  use.
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="font-semibold text-gray-800">
                  Notification Methods
                </h4>
                <p className="mt-2 text-sm text-gray-700">
                  We may provide notice of changes through our Services, by
                  sending an email to the address associated with your account,
                  or through other reasonable means. It is your responsibility
                  to provide us with your current email address and to review
                  these Terms periodically for changes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: Contact Information */}
          <section id="contact" data-section className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900">
              11. CONTACT INFORMATION
            </h2>
            <div className="mt-6 space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  How to Contact Us
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Email Address</h4>
                    <a
                      href="mailto:legal@ethioquiz.com.et"
                      className="text-indigo-600 hover:underline"
                    >
                      legal@ethioquiz.com.et
                    </a>
                    <p className="mt-1 text-sm text-gray-600">
                      For legal notices, copyright claims, and formal
                      communications
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">
                      General Support
                    </h4>
                    <a
                      href="mailto:support@ethioquiz.com.et"
                      className="text-indigo-600 hover:underline"
                    >
                      support@ethioquiz.com.et
                    </a>
                    <p className="mt-1 text-sm text-gray-600">
                      For general questions, technical support, and account
                      assistance
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Website</h4>
                    <a
                      href="https://ethioquiz.com.et"
                      className="text-indigo-600 hover:underline"
                    >
                      https://ethioquiz.com.et
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      Ethio Quiz
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="font-semibold text-gray-800">
                  Notice Requirements
                </h4>
                <p className="mt-2 text-sm text-gray-700">
                  When contacting us regarding legal matters, please include:
                  (1) your full name and contact information, (2) a detailed
                  description of your inquiry or concern, (3) your account
                  username (if applicable), and (4) any relevant supporting
                  documentation.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Footer links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <a
            className="text-sm text-gray-600 hover:underline"
            href="#agreement"
          >
            Back to top
          </a>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ethio Quiz. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
