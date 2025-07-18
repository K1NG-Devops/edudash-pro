'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  const userRole = session.user?.role;

  // Mock data - replace with actual data from your backend
  const dashboardData = {
    STUDENT: {
      stats: [
        { title: 'Active Courses', value: '5', icon: BookOpen, color: 'text-blue-600' },
        { title: 'Completed Assignments', value: '12', icon: CheckCircle, color: 'text-green-600' },
        { title: 'Pending Tasks', value: '3', icon: AlertCircle, color: 'text-yellow-600' },
        { title: 'Progress', value: '78%', icon: TrendingUp, color: 'text-purple-600' },
      ],
      recentActivities: [
        { title: 'Mathematics Assignment', type: 'assignment', status: 'completed', date: '2 hours ago' },
        { title: 'Science Quiz', type: 'quiz', status: 'pending', date: 'Due tomorrow' },
        { title: 'English Essay', type: 'assignment', status: 'in-progress', date: 'Started yesterday' },
      ],
    },
    TEACHER: {
      stats: [
        { title: 'Classes', value: '3', icon: Users, color: 'text-blue-600' },
        { title: 'Students', value: '45', icon: Users, color: 'text-green-600' },
        { title: 'Assignments to Grade', value: '8', icon: FileText, color: 'text-yellow-600' },
        { title: 'Lessons This Week', value: '12', icon: Calendar, color: 'text-purple-600' },
      ],
      recentActivities: [
        { title: 'Math Class - Grade 10', type: 'class', status: 'completed', date: '1 hour ago' },
        { title: 'Science Quiz Grading', type: 'grading', status: 'pending', date: 'Due today' },
        { title: 'Parent Meeting', type: 'meeting', status: 'scheduled', date: 'Tomorrow 2 PM' },
      ],
    },
    PARENT: {
      stats: [
        { title: 'Children', value: '2', icon: Users, color: 'text-blue-600' },
        { title: 'Notifications', value: '5', icon: AlertCircle, color: 'text-yellow-600' },
        { title: 'Meetings Scheduled', value: '1', icon: Calendar, color: 'text-green-600' },
        { title: 'Average Progress', value: '85%', icon: TrendingUp, color: 'text-purple-600' },
      ],
      recentActivities: [
        { title: 'John\\'s Math Assignment', type: 'assignment', status: 'completed', date: '3 hours ago' },
        { title: 'Sarah\\'s Science Project', type: 'project', status: 'in-progress', date: 'Due next week' },
        { title: 'Parent-Teacher Meeting', type: 'meeting', status: 'scheduled', date: 'Friday 3 PM' },
      ],
    },
    ADMIN: {
      stats: [
        { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
        { title: 'Active Teachers', value: '89', icon: Users, color: 'text-green-600' },
        { title: 'System Alerts', value: '3', icon: AlertCircle, color: 'text-yellow-600' },
        { title: 'Server Uptime', value: '99.9%', icon: TrendingUp, color: 'text-purple-600' },
      ],
      recentActivities: [
        { title: 'User Registration Spike', type: 'system', status: 'info', date: '30 minutes ago' },
        { title: 'Database Backup', type: 'system', status: 'completed', date: '2 hours ago' },
        { title: 'Security Update', type: 'system', status: 'pending', date: 'Scheduled for tonight' },
      ],
    },
  };

  const currentData = dashboardData[userRole as keyof typeof dashboardData] || dashboardData.STUDENT;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session.user?.name}!
          </h1>
          <p className="text-blue-100">
            {userRole === 'STUDENT' && 'Ready to continue your learning journey?'}
            {userRole === 'TEACHER' && 'Your students are waiting for your guidance.'}
            {userRole === 'PARENT' && 'Stay updated with your children\\'s progress.'}
            {userRole === 'ADMIN' && 'Manage your educational platform effectively.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentData.stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.date}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userRole === 'STUDENT' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View All Courses
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Submit Assignment
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Schedule
                    </Button>
                  </>
                )}
                {userRole === 'TEACHER' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      View Students
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Assignment
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Plan Lesson
                    </Button>
                  </>
                )}
                {userRole === 'PARENT' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      View Children
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Progress
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </>
                )}
                {userRole === 'ADMIN' && (
                  <>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      System Status
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
