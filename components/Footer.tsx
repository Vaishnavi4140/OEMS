export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <svg 
                  className="w-6 h-6 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Vivek<span className="text-yellow-300">Test</span>
              </span>
            </div>
            <p className="text-white/80 text-sm">
              Your trusted platform for online MCQ examinations.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-yellow-300">📞</span> Contact
            </h4>
            <div className="space-y-2">
              <p className="text-white/80 text-sm flex items-center gap-2">
                <span>✉️</span> support@vivektest.example
              </p>
              <p className="text-white/80 text-sm flex items-center gap-2">
                <span>📱</span> +1 555 123 4567
              </p>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-yellow-300">ℹ️</span> About
            </h4>
            <p className="text-white/80 text-sm">
              VivekTest is a modern MCQ exam system inspired by platforms like SpeedExam and Exam.net.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-yellow-300">🔗</span> Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/teacher/dashboard" className="text-white/80 text-sm hover:text-yellow-300 transition flex items-center gap-1">
                  → Teacher Dashboard
                </a>
              </li>
              <li>
                <a href="/student/take" className="text-white/80 text-sm hover:text-yellow-300 transition flex items-center gap-1">
                  → Take Quiz
                </a>
              </li>
              <li>
                <a href="/signup" className="text-white/80 text-sm hover:text-yellow-300 transition flex items-center gap-1">
                  → Sign Up
                </a>
              </li>
              <li>
                <a href="/login" className="text-white/80 text-sm hover:text-yellow-300 transition flex items-center gap-1">
                  → Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center">
              © {new Date().getFullYear()} VivekTest — Demo Online Examination System
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-yellow-300 transition text-sm">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-yellow-300 transition text-sm">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-yellow-300 transition text-sm">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
