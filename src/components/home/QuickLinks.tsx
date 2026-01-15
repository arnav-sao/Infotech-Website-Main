import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Trophy, 
  CalendarDays, 
  ClipboardCheck, 
  FileText, 
  Briefcase,
  MessageSquare 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  { name: "Faculty", path: "/faculty", icon: Users, color: "bg-blue-500" },
  { name: "Timetable", path: "/timetable", icon: Calendar, color: "bg-purple-500" },
  { name: "Placements", path: "/placements", icon: Briefcase, color: "bg-green-500" },
  { name: "Achievements", path: "/achievements", icon: Trophy, color: "bg-yellow-500" },
  { name: "Events", path: "/events", icon: CalendarDays, color: "bg-pink-500" },
  { name: "Attendance", path: "/attendance", icon: ClipboardCheck, color: "bg-cyan-500" },
  { name: "Results", path: "/results", icon: FileText, color: "bg-orange-500" },
  { name: "Contact", path: "/contact", icon: MessageSquare, color: "bg-indigo-500" },
];

export function QuickLinks() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick <span className="text-gradient">Access</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navigate to different sections of our department website
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-3`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{link.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}