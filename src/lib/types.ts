export interface Faculty {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  date_of_joining: string;
  photo_url: string | null;
  created_at: string;
}

export interface Timetable {
  id: string;
  semester: number;
  day: string;
  time_slot: number;
  subject: string;
  created_at: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  type: 'student' | 'faculty';
  title: string;
  year: number;
  description: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  name: string;
  event_date: string;
  description: string;
  external_link: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Query {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  semester: number;
  subject: string;
  attendance_percentage: number;
  created_at: string;
}

export interface Result {
  id: string;
  semester: number;
  subject: string;
  marks: number;
  max_marks: number;
  created_at: string;
}

export interface Placement {
  id: string;
  year: number;
  total_placed: number;
  highest_package: number;
  average_package: number;
  placement_percentage: number;
  created_at: string;
}

export interface PlacementCompany {
  id: string;
  name: string;
  logo_url: string | null;
  category: string;
  package_range: string | null;
  created_at: string;
}

export interface PlacementHighlight {
  id: string;
  student_name: string;
  company: string;
  package: number;
  year: number;
  photo_url: string | null;
  created_at: string;
}