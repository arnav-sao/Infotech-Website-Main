import { Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function VisionMission() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Vision & Mission</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Committed to excellence in technical education and producing industry-ready professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
              To emerge as a learning hub and center of excellence in the domain of Information Technology.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <ul className="text-muted-foreground leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  To impart quality technical education through effective teaching learning process.                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  To provide a platform to address societal issues as well as challenges faced by IT industries.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  To foster a culture of research and impart innovative and entrepreneurial skills in the field of IT.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  To ensure overall development of students and staff by inculcating knowledge and professional ethics as a part of lifelong learning.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}