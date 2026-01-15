import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Award, TrendingUp, BookOpen } from "lucide-react";
import type { Result } from "@/lib/types";

const Results = () => {
  const { data: results, isLoading } = useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .eq("semester", 4)
        .order("subject");
      if (error) throw error;
      return data as Result[];
    },
  });

  const totalMarks = results?.reduce((sum, r) => sum + r.marks, 0) || 0;
  const totalMaxMarks = results?.reduce((sum, r) => sum + r.max_marks, 0) || 0;
  const percentage = totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(1) : 0;

  const getGrade = (marks: number, maxMarks: number) => {
    const pct = (marks / maxMarks) * 100;
    if (pct >= 90) return { grade: "A+", color: "bg-green-100 text-green-800" };
    if (pct >= 80) return { grade: "A", color: "bg-green-100 text-green-700" };
    if (pct >= 70) return { grade: "B+", color: "bg-blue-100 text-blue-800" };
    if (pct >= 60) return { grade: "B", color: "bg-blue-100 text-blue-700" };
    if (pct >= 50) return { grade: "C", color: "bg-yellow-100 text-yellow-800" };
    if (pct >= 40) return { grade: "D", color: "bg-orange-100 text-orange-800" };
    return { grade: "F", color: "bg-red-100 text-red-800" };
  };

  const getOverallGrade = () => {
    const pct = Number(percentage);
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "B+";
    if (pct >= 60) return "B";
    if (pct >= 50) return "C";
    if (pct >= 40) return "D";
    return "F";
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">Results</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semester IV - Academic Performance Overview
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{results?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{totalMarks}</p>
                <p className="text-sm text-muted-foreground">Total Marks</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{percentage}%</p>
                <p className="text-sm text-muted-foreground">Percentage</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{getOverallGrade()}</p>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card className="border-0 shadow-lg max-w-4xl mx-auto">
            <CardHeader className="gradient-primary text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Subject-wise Results - Semester IV
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6">
                  <Skeleton className="h-64 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-4 text-left font-semibold text-foreground">Subject</th>
                        <th className="p-4 text-center font-semibold text-foreground">Marks Obtained</th>
                        <th className="p-4 text-center font-semibold text-foreground">Max Marks</th>
                        <th className="p-4 text-center font-semibold text-foreground">Percentage</th>
                        <th className="p-4 text-center font-semibold text-foreground">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results?.map((result) => {
                        const pct = ((result.marks / result.max_marks) * 100).toFixed(1);
                        const { grade, color } = getGrade(result.marks, result.max_marks);
                        return (
                          <tr
                            key={result.id}
                            className="border-b hover:bg-muted/50 transition-colors"
                          >
                            <td className="p-4 font-medium text-foreground">
                              {result.subject}
                            </td>
                            <td className="p-4 text-center">{result.marks}</td>
                            <td className="p-4 text-center text-muted-foreground">
                              {result.max_marks}
                            </td>
                            <td className="p-4 text-center font-medium">{pct}%</td>
                            <td className="p-4 text-center">
                              <Badge className={color}>{grade}</Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted font-semibold">
                        <td className="p-4">Total</td>
                        <td className="p-4 text-center">{totalMarks}</td>
                        <td className="p-4 text-center">{totalMaxMarks}</td>
                        <td className="p-4 text-center">{percentage}%</td>
                        <td className="p-4 text-center">
                          <Badge className="bg-primary text-primary-foreground">
                            {getOverallGrade()}
                          </Badge>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              📌 Results are provisional and subject to verification
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Results;