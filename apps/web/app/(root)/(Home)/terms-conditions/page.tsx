import React from "react";

const TermsConditions = () => {
  return (
    <section className="relative z-0 flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)] text-gray-700">
      {/* Subtle noise background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/image/noise.png')",
          backgroundSize: "128px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-28 sm:py-36 lg:py-44">
        <h1 className="text-heading text-4xl font-bold mb-6">Terms & Conditions for Smritya</h1>
        <p className="text-base text-gray-600 mb-10">
          <strong>Last Updated:</strong> (Add Date)
        </p>

        <div className="space-y-10">
          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-lg leading-relaxed">
              Welcome to <strong>Smritya</strong>. Smritya is a tuition fee tracking platform
              for teachers operating in India. By creating an account or using Smritya,
              you agree to these Terms & Conditions. If you do not agree, please do not
              use the service.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">2. Eligibility</h2>
            <p className="text-lg leading-relaxed">
              You must be at least <strong>18 years old</strong> to use Smritya.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">3. Account Registration</h2>
            <p className="text-lg leading-relaxed">
              Users can register using <strong>Email/Password</strong> or <strong>Google Login</strong>.
              You are responsible for maintaining the security of your account.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">4. Service Description</h2>
            <p className="text-lg leading-relaxed">
              Smritya allows teachers to manage students, track fees, send reminders, and
              accept payments. We may add, modify, or remove features at any time.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">5. Payments and Subscription</h2>
            <ul className="list-disc list-inside text-lg leading-relaxed">
              <li>Payments are processed through <strong>Razorpay</strong>.</li>
              <li>Subscription fees are billed on the selected billing cycle.</li>
              <li>
                Refunds may be issued only under exceptional cases at Smritya’s sole
                discretion.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">6. Acceptable Use</h2>
            <p className="text-lg leading-relaxed">
              You agree <strong>not to misuse</strong> the platform. Prohibited actions include
              fraud, unauthorized access, and sharing harmful content.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">7. Intellectual Property Rights</h2>
            <p className="text-lg leading-relaxed">
              All trademarks, code, design, logos, and other platform content belong to
              Smritya.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">8. Data Security and Availability</h2>
            <p className="text-lg leading-relaxed">
              Smritya does not guarantee <strong>100% uptime</strong> and is not responsible for
              any data loss.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">9. Termination</h2>
            <p className="text-lg leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these
              terms.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">10. Limitation of Liability</h2>
            <p className="text-lg leading-relaxed">
              Smritya is not liable for any financial, data, or reputation loss resulting
              from use of the service.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">11. Governing Law</h2>
            <p className="text-lg leading-relaxed">These terms are governed by <strong>Indian Law</strong>.</p>
          </div>

          <div>
            <h2 className="text-heading text-2xl font-semibold mb-3">12. Contact</h2>
            <p className="text-lg leading-relaxed">
              For support or legal inquiries, email us at{" "}
              <a href="mailto:support@smritya.in" className="text-primary hover:underline">
                support@smritya.in
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
