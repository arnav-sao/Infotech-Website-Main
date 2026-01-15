import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, IndianRupee, Building2, Star, Trophy } from "lucide-react";
import type { Placement, PlacementCompany, PlacementHighlight } from "@/lib/types";

const Placements = () => {
  const { data: placements, isLoading: loadingPlacements } = useQuery({
    queryKey: ["placements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("placements")
        .select("*")
        .order("year", { ascending: false });
      if (error) throw error;
      return data as Placement[];
    },
  });

  const { data: companies, isLoading: loadingCompanies } = useQuery({
    queryKey: ["placement_companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("placement_companies")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as PlacementCompany[];
    },
  });

  const { data: highlights, isLoading: loadingHighlights } = useQuery({
    queryKey: ["placement_highlights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("placement_highlights")
        .select("*")
        .order("package", { ascending: false });
      if (error) throw error;
      return data as PlacementHighlight[];
    },
  });

  const latestPlacement = placements?.[0];

  const categoryColors: Record<string, string> = {
    "IT Services": "bg-blue-100 text-blue-800",
    "Product Company": "bg-purple-100 text-purple-800",
    Consulting: "bg-green-100 text-green-800",
    Startup: "bg-orange-100 text-orange-800",
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">Placements</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our students are placed in top companies with competitive packages
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {loadingPlacements ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                    <Skeleton className="h-8 w-20 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      {latestPlacement?.placement_percentage}%
                    </p>
                    <p className="text-sm text-muted-foreground">Placement Rate 2024</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <IndianRupee className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      ₹{latestPlacement?.highest_package} LPA
                    </p>
                    <p className="text-sm text-muted-foreground">Highest Package</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                      <IndianRupee className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      ₹{latestPlacement?.average_package} LPA
                    </p>
                    <p className="text-sm text-muted-foreground">Average Package</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                      {latestPlacement?.total_placed}+
                    </p>
                    <p className="text-sm text-muted-foreground">Students Placed</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="recruiters" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="recruiters">Top Recruiters</TabsTrigger>
              <TabsTrigger value="highlights">Top Placements</TabsTrigger>
              <TabsTrigger value="trends">Year-wise Trends</TabsTrigger>
            </TabsList>

            {/* Recruiters Tab */}
            <TabsContent value="recruiters">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingCompanies ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="border-0 shadow-md">
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  companies?.map((company) => (
                    <Card
                      key={company.id}
                      className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={`text-xs ${categoryColors[company.category] || "bg-gray-100 text-gray-800"}`}
                            >
                              {company.category}
                            </Badge>
                            {company.package_range && (
                              <span className="text-xs text-muted-foreground">
                                {company.package_range}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Highlights Tab */}
            <TabsContent value="highlights">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingHighlights ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                        <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  highlights?.map((highlight, index) => (
                    <Card
                      key={highlight.id}
                      className={`border-0 shadow-md hover:shadow-lg transition-all ${index === 0 ? "ring-2 ring-yellow-400" : ""}`}
                    >
                      <CardContent className="p-6 text-center relative">
                        {index === 0 && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="bg-yellow-400 text-yellow-900">
                              <Trophy className="w-3 h-3 mr-1" /> Top Placement
                            </Badge>
                          </div>
                        )}
                        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 mt-2">
                          <Star className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {highlight.student_name}
                        </h3>
                        <p className="text-primary font-medium">{highlight.company}</p>
                        <p className="text-2xl font-bold text-foreground mt-2">
                          ₹{highlight.package} LPA
                        </p>
                        <p className="text-sm text-muted-foreground">Batch {highlight.year}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Year-wise Placement Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-semibold">Year</th>
                          <th className="text-center p-4 font-semibold">Students Placed</th>
                          <th className="text-center p-4 font-semibold">Highest Package</th>
                          <th className="text-center p-4 font-semibold">Average Package</th>
                          <th className="text-center p-4 font-semibold">Placement %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {placements?.map((p) => (
                          <tr key={p.id} className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">{p.year}</td>
                            <td className="p-4 text-center">{p.total_placed}</td>
                            <td className="p-4 text-center">₹{p.highest_package} LPA</td>
                            <td className="p-4 text-center">₹{p.average_package} LPA</td>
                            <td className="p-4 text-center">
                              <Badge className="bg-green-100 text-green-800">
                                {p.placement_percentage}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Placements;