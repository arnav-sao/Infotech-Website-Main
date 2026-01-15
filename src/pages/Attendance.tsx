import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCheck, TrendingUp, AlertTriangle } from "lucide-react";
import type { Attendance as AttendanceType } from "@/lib/types";

const Attendance = () => {
  const { data: attendance, isLoading } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attendance")
        .select("*")
        .eq("semester", 4)
        .order("subject");
      if (error) throw error;
      return data as AttendanceType[];
    },
  });

  const averageAttendance =
    attendance && attendance.length > 0
      ? (attendance.reduce((sum, a) => sum + Number(a.attendance_percentage), 0) /
          attendance.length).toFixed(1)
      : 0;

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 85) return { text: "Excellent", color: "text-green-600 bg-green-100" };
    if (percentage >= 75) return { text: "Good", color: "text-yellow-600 bg-yellow-100" };
    return { text: "Low", color: "text-red-600 bg-red-100" };
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">Attendance</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semester IV - Subject-wise attendance overview
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <ClipboardCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{averageAttendance}%</p>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">
                  {attendance?.filter((a) => Number(a.attendance_percentage) >= 75).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Subjects ≥ 75%</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">
                  {attendance?.filter((a) => Number(a.attendance_percentage) < 75).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Subjects Below 75%</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Table */}
          <Card className="border-0 shadow-lg max-w-4xl mx-auto">
            <CardHeader className="gradient-primary text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                Subject-wise Attendance - Semester IV
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-4 flex-1" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y">
                  {attendance?.map((subject) => {
                    const percentage = Number(subject.attendance_percentage);
                    const status = getStatusBadge(percentage);
                    return (
                      <div
                        key={subject.id}
                        className="p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {subject.subject}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex-1">
                              <Progress
                                value={percentage}
                                className="h-3"
                              />
                            </div>
                            <div className="flex items-center gap-2 w-24 justify-end">
                              <span className="font-semibold text-foreground">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${status.color}`}
                            >
                              {status.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              ⚠️ Minimum 75% attendance is required for examination eligibility
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Attendance;