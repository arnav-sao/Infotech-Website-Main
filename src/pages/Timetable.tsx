import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import type { Timetable as TimetableType } from "@/lib/types";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = [
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:15 - 12:15",
  "12:15 - 1:15",
];

const subjectColors: Record<string, string> = {
  IE: "bg-blue-100 text-blue-800 border-blue-200",
  DMGT: "bg-purple-100 text-purple-800 border-purple-200",
  DBMS: "bg-green-100 text-green-800 border-green-200",
  OE: "bg-orange-100 text-orange-800 border-orange-200",
  OS: "bg-red-100 text-red-800 border-red-200",
  HVPS: "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Aptitude & Reasoning": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Sports: "bg-pink-100 text-pink-800 border-pink-200",
  "OOPS Lab": "bg-indigo-100 text-indigo-800 border-indigo-200",
  Library: "bg-gray-100 text-gray-800 border-gray-200",
};

const Timetable = () => {
  const { data: timetable, isLoading } = useQuery({
    queryKey: ["timetable"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timetable")
        .select("*")
        .eq("semester", 4)
        .order("time_slot");
      if (error) throw error;
      return data as TimetableType[];
    },
  });

  const getSubject = (day: string, slot: number) => {
    return timetable?.find((t) => t.day === day && t.time_slot === slot)?.subject || "-";
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Class <span className="text-gradient">Timetable</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semester IV - Academic Session 2025-26 (Even Semester)
            </p>
          </div>

          {/* Timetable Card */}
          <Card className="border-0 shadow-lg max-w-6xl mx-auto">
            <CardHeader className="gradient-primary text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Weekly Schedule - B.Tech IT (Semester IV)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6">
                  <Skeleton className="h-96 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-4 text-left font-semibold text-foreground border-b">Day</th>
                        {timeSlots.map((slot, i) => (
                          <th key={i} className="p-4 text-center font-semibold text-foreground border-b min-w-[120px]">
                            <div className="text-xs text-muted-foreground mb-1">Period {i + 1}</div>
                            {slot}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => (
                        <tr key={day} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                          <td className="p-4 font-medium text-foreground">{day}</td>
                          {[1, 2, 3, 4].map((slot) => {
                            const subject = getSubject(day, slot);
                            const colorClass = subjectColors[subject] || "bg-gray-50 text-gray-600 border-gray-200";
                            return (
                              <td key={slot} className="p-3 text-center">
                                <span className={`inline-block px-3 py-2 rounded-lg text-sm font-medium border ${colorClass}`}>
                                  {subject}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subject Legend */}
          <div className="mt-8 max-w-4xl mx-auto">
            <h3 className="font-semibold text-foreground mb-4 text-center">Subject Abbreviations</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { code: "IE", name: "Innovation & Entrepreneurship" },
                { code: "DMGT", name: "Discrete Mathematics & Graph Theory" },
                { code: "DBMS", name: "Database Management Systems" },
                { code: "OE", name: "Open Elective" },
                { code: "OS", name: "Operating Systems" },
                { code: "HVPS", name: "Human Values & Professional Skills" },
              ].map((subject) => (
                <div
                  key={subject.code}
                  className={`px-3 py-1.5 rounded-lg text-xs border ${subjectColors[subject.code]}`}
                >
                  <span className="font-semibold">{subject.code}</span>: {subject.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Timetable;