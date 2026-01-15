import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-sm">TGPCET</p>
                <p className="text-xs opacity-70">Department of IT</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Tulsiramji Gaikwad-Patil College of Engineering & Technology, Nagpur.
              NAAC A+ Accredited, Autonomous Institution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/faculty" className="hover:opacity-100 transition-opacity">Faculty</Link></li>
              <li><Link to="/timetable" className="hover:opacity-100 transition-opacity">Timetable</Link></li>
              <li><Link to="/placements" className="hover:opacity-100 transition-opacity">Placements</Link></li>
              <li><Link to="/achievements" className="hover:opacity-100 transition-opacity">Achievements</Link></li>
              <li><Link to="/events" className="hover:opacity-100 transition-opacity">Events</Link></li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="font-semibold mb-4">Academics</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/attendance" className="hover:opacity-100 transition-opacity">Attendance</Link></li>
              <li><Link to="/results" className="hover:opacity-100 transition-opacity">Results</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mohgaon, Wardha Road, Nagpur, Maharashtra 441108</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 9766085909</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hod.it@tgpcet.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-70">
          <p>© 2025 Department of Information Technology, TGPCET. All rights reserved.</p>
          <p className="mt-1">Affiliated to Rashtrasant Tukadoji Maharaj Nagpur University</p>
        </div>
      </div>
    </footer>
  );
}