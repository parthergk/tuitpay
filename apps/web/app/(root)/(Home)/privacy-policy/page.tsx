import React from "react";

const PrivacyPolicy = () => {
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
        <h1 className="text-heading text-3xl sm:text-4xl md:text-5xl mb-6">Privacy Policy for Smritya</h1>
        <p className="text-base text-gray-600 mb-10">
          <strong>Last Updated:</strong> (Add Date)
        </p>

        <div className="space-y-10">
          <div>
            <h2 className="text-heading text-2xl mb-3">1. Information We Collect</h2>
            <ul className="list-disc list-inside text-base leading-relaxed">
              <li>Name and email address</li>
              <li>Login details (Email/Password or Google Login)</li>
              <li>Student and fee records</li>
              <li>Payment details via Razorpay</li>
              <li>Device/IP data for security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-heading text-2xl  mb-3">2. How We Use Information</h2>
            <ul className="list-disc list-inside text-base leading-relaxed">
              <li>Create and manage user accounts</li>
              <li>Provide app functionality and support</li>
              <li>Send alerts, reminders, and notifications</li>
              <li>Improve app performance and reliability</li>
            </ul>
          </div>

          <div>
            <h2 className="text-heading text-2xl  mb-3">3. Payment Processing</h2>
            <p className="text-base leading-relaxed">
              Payments are handled by <strong>Razorpay</strong>. Smritya does not store or
              access sensitive card or bank information. All payment data is processed
              securely through Razorpay’s infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl mb-3">4. Cookies and Tracking</h2>
            <p className="text-base leading-relaxed">
              Smritya uses cookies to maintain login sessions and enhance user experience.
              Cookies are small text files stored on your device to help us recognize you.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl  mb-3">5. Data Security</h2>
            <p className="text-base leading-relaxed">
              We prioritize the security of user data by using encryption and secure
              storage methods wherever possible. However, no online service can guarantee
              100% security.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl mb-3">6. Data Sharing</h2>
            <p className="text-base leading-relaxed">
              Smritya does <strong>not sell or share</strong> personal data with advertisers.
              Limited data may be shared only with trusted partners for:
            </p>
            <ul className="list-disc list-inside text-base leading-relaxed">
              <li>Payment processing (Razorpay)</li>
              <li>Error monitoring and analytics</li>
            </ul>
          </div>

          <div>
            <h2 className="text-heading text-2xl mb-3">7. User Rights</h2>
            <p className="text-base leading-relaxed">
              Users have the right to request data updates or deletion. To exercise these
              rights, please contact our support team.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl mb-3">8. Children’s Privacy</h2>
            <p className="text-base leading-relaxed">
              Smritya is not intended for users under the age of 13. We do not knowingly
              collect personal data from children.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl mb-3">9. Changes to This Policy</h2>
            <p className="text-base leading-relaxed">
              We may update this Privacy Policy from time to time. Continued use of Smritya
              after changes implies acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-2xl mb-3">10. Contact</h2>
            <p className="text-base leading-relaxed">
              For privacy concerns, email us at{" "}
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

export default PrivacyPolicy;
