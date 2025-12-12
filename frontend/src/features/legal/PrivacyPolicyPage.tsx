import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Radial gradient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(76, 111, 255, 0.15), transparent 50%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Title */}
          <h1 className="text-4xl font-heading font-bold text-text-main mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-text-muted">
            <p className="text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">1. Introduction</h2>
              <p>
                MentorPath AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">2. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Email address, name, and company name when you sign up for our program, newsletter, or submit an application.</li>
                <li><strong>Professional Information:</strong> Your role, experience level, and interests in GenAI when you complete our forms.</li>
                <li><strong>Communications:</strong> Any messages or feedback you send to us.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our mentoring services</li>
                <li>Send you updates about our programs and relevant GenAI content</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to improve our website and services</li>
                <li>Send marketing communications (you can opt out at any time)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">4. Analytics and Tracking</h2>
              <p>
                We use Meta (Facebook) Pixel and similar analytics tools to understand how visitors interact with our website. These tools may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pages visited and time spent on site</li>
                <li>Actions taken (such as form submissions)</li>
                <li>Device and browser information</li>
                <li>IP address and approximate location</li>
              </ul>
              <p>
                This data helps us improve our marketing efforts and provide more relevant content. You can opt out of tracking by adjusting your browser settings or using ad-blocking tools.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">5. Data Storage and Security</h2>
              <p>
                Your data is stored securely using industry-standard encryption and security practices. We use trusted third-party services (such as Supabase) to store your information. We retain your data only as long as necessary to provide our services or as required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">6. Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in operating our website and services</li>
                <li>Analytics partners to help us understand website usage</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us at the email address below.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">8. Cookies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze site traffic, and for marketing purposes. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-heading font-semibold text-text-main">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-text-main">
                Email: privacy@mentorpathai.com
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pb-12 text-center text-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} MentorPath AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
