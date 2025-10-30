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
                This Privacy Notice for Ethio Quiz, describes how and why we
                might access, collect, store, use, and/or share your personal
                information when you use our services.
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  Visit our website at{' '}
                  <a
                    href="https://ethioquiz.com.et"
                    className="text-indigo-600 hover:underline"
                  >
                    https://ethioquiz.com.et
                  </a>{' '}
                  or any website of ours that links to this Privacy Notice.
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
            {/* Section 1 */}
            <section id="what-we-collect" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                1. WHAT INFORMATION DO WE COLLECT?
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Information You Disclose to Us
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    We collect personal information that you voluntarily provide
                    to us when you register on the Services, express an interest
                    in obtaining information about us or our products and
                    services, when you participate in activities on the
                    Services, or otherwise when you contact us.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">
                    Personal Information Provided by You
                  </h4>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    The personal information that we collect depends on the
                    context of your interactions with us and the Services, the
                    choices you make, and the products and features you use. The
                    personal information we collect may include the following:
                  </p>
                  <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600">
                    <li>
                      <strong>Identifiers:</strong> Full name, email address,
                      username, and other similar contact data
                    </li>
                    <li>
                      <strong>Authentication Data:</strong> Passwords, password
                      hints, and similar security information used for
                      authentication
                    </li>
                    <li>
                      <strong>Profile Information:</strong> Profile images,
                      academic institution, course preferences, and learning
                      progress
                    </li>
                    <li>
                      <strong>Academic Data:</strong> Quiz results, performance
                      metrics, learning patterns, and study preferences
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">
                    Sensitive Information
                  </h4>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    We do not process sensitive information. All personal data
                    collected is limited to what is necessary for providing and
                    improving our educational services.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">
                    Information Automatically Collected
                  </h4>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    We automatically collect certain information when you visit,
                    use, or navigate the Services. This information does not
                    reveal your specific identity but may include device and
                    usage information, such as your IP address, browser and
                    device characteristics, operating system, language
                    preferences, referring URLs, device name, country, location,
                    and other technical information.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="how-we-process" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                2. HOW DO WE PROCESS YOUR INFORMATION?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> We process your information to
                    provide, improve, and administer our Services, communicate
                    with you, for security and fraud prevention, and to comply
                    with law.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    We process your personal information for a variety of
                    reasons, depending on how you interact with our Services,
                    including:
                  </p>
                  <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                    <li>
                      <strong>Service Delivery:</strong> To facilitate account
                      creation and authentication, manage user accounts, and
                      deliver personalized educational content and quiz
                      experiences.
                    </li>
                    <li>
                      <strong>Performance Analytics:</strong> To analyze
                      learning patterns, track academic progress, and provide
                      performance insights to enhance educational outcomes.
                    </li>
                    <li>
                      <strong>Communication:</strong> To send administrative
                      information, service updates, security alerts, and support
                      messages.
                    </li>
                    <li>
                      <strong>Security & Fraud Prevention:</strong> To protect
                      our Services and users, monitor and prevent fraudulent
                      activities, and maintain platform integrity.
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> To comply with
                      applicable laws, legal requests, and regulatory
                      requirements.
                    </li>
                    <li>
                      <strong>Service Improvement:</strong> To develop new
                      features, improve existing services, and conduct research
                      to enhance the educational experience.
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="font-semibold text-gray-800">
                    Legal Bases for Processing
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    We process your personal information only when we have a
                    valid legal basis to do so, including: your consent,
                    contractual necessity, legitimate interests, and legal
                    compliance obligations.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="share-with-whom" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> We may share information in
                    specific situations described in this section and/or with
                    specific third parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Categories of Third Parties
                  </h3>
                  <ul className="mt-4 ml-6 list-disc space-y-4 text-gray-600">
                    <li>
                      <strong>Service Providers:</strong> We may share your data
                      with third-party vendors, service providers, contractors,
                      or agents who perform services for us or on our behalf and
                      require access to such information to do that work.
                    </li>
                    <li>
                      <strong>Educational Institutions:</strong> With your
                      explicit consent, we may share academic performance data
                      with your educational institution for academic assessment
                      and progress tracking purposes.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> We may share or
                      transfer your information in connection with, or during
                      negotiations of, any merger, sale of company assets,
                      financing, or acquisition of all or a portion of our
                      business to another company.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> We may disclose your
                      information where we are legally required to do so in
                      order to comply with applicable law, governmental
                      requests, judicial proceedings, court orders, or legal
                      process.
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h4 className="font-semibold text-gray-800">
                    Data Sharing Limitations
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    We do not sell your personal information to third parties.
                    All data sharing is conducted under strict contractual
                    agreements that ensure the protection and confidentiality of
                    your information.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="cookies" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> We may use cookies and similar
                    tracking technologies to access and store information for
                    essential functionality and service improvement.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    We use cookies and similar tracking technologies (like web
                    beacons and pixels) to collect and store personal
                    information. Specific information about how we use such
                    technologies and how you can refuse certain cookies is set
                    out in our Cookie Notice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Types of Tracking Technologies We Use
                  </h3>
                  <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                    <li>
                      <strong>Essential Cookies:</strong> Required for the basic
                      functionality of our Services, including authentication,
                      security, and account management.
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> Help us understand
                      how users interact with our Services, enabling us to
                      improve functionality and user experience.
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Allow us to analyze
                      site usage and track learning progress and engagement
                      metrics.
                    </li>
                    <li>
                      <strong>Session Cookies:</strong> Temporary cookies that
                      expire when you close your browser, used to maintain your
                      login state and preferences.
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="font-semibold text-gray-800">
                    Your Cookie Choices
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Most web browsers are set to accept cookies by default. You
                    can usually choose to set your browser to remove or reject
                    browser cookies. Please note that if you choose to remove or
                    reject cookies, this could affect the availability and
                    functionality of our Services.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="social-logins" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> If you choose to register or log
                    in to our Services using a social media account, we may have
                    access to certain information about you.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    Our Services offer you the ability to register and log in
                    using your third-party social media account details (like
                    Google or Facebook). Where you choose to do this, we will
                    receive certain profile information about you from your
                    social media provider.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Information We May Receive
                  </h3>
                  <ul className="mt-4 ml-6 list-disc space-y-2 text-gray-600">
                    <li>Your name, email address, and profile picture</li>
                    <li>
                      Your social media user ID and public profile information
                    </li>
                    <li>
                      Other information you have made public on your social
                      media profile
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-600">
                    We will use the information we receive only for the purposes
                    described in this Privacy Notice. Note that your
                    relationship with any third-party social media provider is
                    governed by their privacy policies and terms of service.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="retention" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                6. HOW LONG DO WE KEEP YOUR INFORMATION?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> We keep your information for as
                    long as necessary to fulfill the purposes outlined in this
                    Privacy Notice, unless otherwise required by law.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this Privacy
                    Notice, unless a longer retention period is required or
                    permitted by law (such as tax, accounting, or other legal
                    requirements).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Retention Periods by Data Category
                  </h3>
                  <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                    <li>
                      <strong>Account Information:</strong> Retained for the
                      duration of your account activity plus 2 years of
                      inactivity
                    </li>
                    <li>
                      <strong>Academic Performance Data:</strong> Retained for 5
                      years to support educational continuity and progress
                      tracking
                    </li>
                    <li>
                      <strong>Communication Data:</strong> Retained for 3 years
                      from the date of last communication
                    </li>
                    <li>
                      <strong>Technical & Log Data:</strong> Retained for 1 year
                      for security and operational purposes
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-600">
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete or
                    anonymize such information, or, if this is not possible, we
                    will securely store your personal information and isolate it
                    from any further processing until deletion is possible.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="security" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                7. HOW DO WE KEEP YOUR INFORMATION SAFE?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> We aim to protect your personal
                    information through a system of organizational and technical
                    security measures.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    We have implemented appropriate and reasonable technical and
                    organizational security measures designed to protect the
                    security of any personal information we process. However,
                    despite our safeguards and efforts to secure your
                    information, no electronic transmission over the Internet or
                    information storage technology can be guaranteed to be 100%
                    secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Security Measures Implemented
                  </h3>
                  <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                    <li>
                      <strong>Encryption:</strong> Data encryption in transit
                      (TLS 1.2+) and at rest using industry-standard AES-256
                      encryption
                    </li>
                    <li>
                      <strong>Access Controls:</strong> Role-based access
                      control and principle of least privilege for all system
                      access
                    </li>
                    <li>
                      <strong>Network Security:</strong> Firewall protection,
                      intrusion detection systems, and regular security
                      monitoring
                    </li>
                    <li>
                      <strong>Authentication:</strong> Secure password policies
                      and optional multi-factor authentication
                    </li>
                    <li>
                      <strong>Regular Audits:</strong> Security assessments,
                      vulnerability scanning, and penetration testing
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="font-semibold text-gray-800">
                    Your Responsibility
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for any activities that occur
                    under your account. We urge you to use strong, unique
                    passwords and to avoid sharing your login information with
                    others.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="rights" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                8. WHAT ARE YOUR PRIVACY RIGHTS?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> Depending on your location, you
                    may have rights regarding your personal information,
                    including access, correction, and deletion.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    In some regions (like the EEA, UK, and California), you have
                    certain rights under applicable data protection laws. These
                    may include the right to:
                  </p>
                  <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                    <li>
                      Request access and obtain a copy of your personal
                      information
                    </li>
                    <li>
                      Request rectification or erasure of your personal
                      information
                    </li>
                    <li>
                      Restrict the processing of your personal information
                    </li>
                    <li>Data portability rights</li>
                    <li>
                      Opt-out of marketing communications and certain data
                      processing
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Regional Privacy Rights
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="rounded border border-gray-200 p-4">
                      <h4 className="font-medium text-gray-800">
                        GDPR (EEA & UK)
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        Right to access, rectification, erasure, restriction,
                        data portability, and objection to processing based on
                        legitimate interests.
                      </p>
                    </div>
                    <div className="rounded border border-gray-200 p-4">
                      <h4 className="font-medium text-gray-800">
                        CCPA/CPRA (California)
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        Right to know, delete, correct, and opt-out of
                        sale/sharing of personal information, and limit use of
                        sensitive personal information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="font-semibold text-gray-800">
                    Exercising Your Rights
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    To exercise any of these rights, please contact us using the
                    details provided in Section 11. We will respond to your
                    request within 30 days and may need to verify your identity
                    before processing your request.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="dnt" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                9. CONTROLS FOR DO-NOT-TRACK FEATURES
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> Most web browsers and some mobile
                    operating systems include a Do-Not-Track ("DNT") feature or
                    setting you can activate.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    DNT is a preference you can set in your web browser to
                    inform websites that you do not want to be tracked. At this
                    stage, no uniform technology standard for recognizing and
                    implementing DNT signals has been finalized. As such, we do
                    not currently respond to DNT browser signals or any other
                    mechanism that automatically communicates your choice not to
                    be tracked online.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm text-gray-600">
                    We continue to monitor developments around DNT browser
                    technology and will update this policy accordingly if a
                    standard for responding to DNT signals is adopted.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="updates" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                10. DO WE MAKE UPDATES TO THIS NOTICE?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> Yes, we will update this notice
                    as necessary to stay compliant with relevant laws and
                    reflect changes in our practices.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    We may update this Privacy Notice from time to time. The
                    updated version will be indicated by an updated "Revised"
                    date at the top of this Privacy Notice. If we make material
                    changes to this Privacy Notice, we may notify you either by
                    prominently posting a notice of such changes or by directly
                    sending you a notification.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="font-semibold text-gray-800">
                    Change Notification
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    We encourage you to review this Privacy Notice frequently to
                    be informed of how we are protecting your information. Your
                    continued use of our Services after any modification to this
                    Privacy Notice will constitute your acceptance of such
                    modification.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 11 */}
            <section id="contact" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> If you have questions or comments
                    about this notice, you may contact us using the details
                    below.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700">Email</h4>
                      <a
                        href="mailto:support@ethioquiz.com.et"
                        className="text-indigo-600 hover:underline"
                      >
                        support@ethioquiz.com.et
                      </a>
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
                  <p className="text-sm text-gray-600">
                    We typically respond to privacy-related inquiries within 3-5
                    business days. For complex requests or data subject rights
                    exercises, we will acknowledge receipt within 3 business
                    days and provide a substantive response within 30 days as
                    required by applicable law.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            {/* <section id="review" data-section className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900">
                12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                FROM YOU?
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-gray-700 italic">
                    <strong>In Short:</strong> You can review, update, or delete
                    your personal information through your account settings or
                    by contacting us directly.
                  </p>
                </div>

                <div>
                  <p className="leading-relaxed text-gray-600">
                    Based on the applicable laws of your country, you may have
                    the right to request access to the personal information we
                    collect from you, change that information, or delete it in
                    certain circumstances.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Self-Service Options
                  </h3>
                  <ul className="mt-4 ml-6 list-disc space-y-3 text-gray-600">
                    <li>
                      <strong>Account Settings:</strong> Update your profile
                      information, email preferences, and privacy settings
                      directly through your account dashboard
                    </li>
                    <li>
                      <strong>Data Export:</strong> Download your personal data
                      and learning progress reports from your account settings
                    </li>
                    <li>
                      <strong>Account Deletion:</strong> Request permanent
                      deletion of your account and associated data through the
                      account settings or by contacting us
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="font-semibold text-gray-800">
                    Verification Process
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    To protect your privacy and security, we will take
                    reasonable steps to verify your identity before granting
                    access or making changes to your personal information. This
                    may include confirming details about your account or recent
                    activities.
                  </p>
                </div>
              </div>
            </section> */}
          </article>

          {/* Footer links */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <a
              className="text-sm text-gray-600 hover:underline"
              href="#what-we-collect"
            >
              Back to top
            </a>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ethio Quiz. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
