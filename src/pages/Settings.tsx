
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell, Moon, Sun, Globe, User, Shield, Download } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your productivity experience</p>
        </div>

        {/* Profile Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">JD</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">John Doe</h3>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>

        {/* Appearance Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Theme</label>
                <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
              </div>
              <Select defaultValue="light">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Compact Mode</label>
                <p className="text-xs text-muted-foreground">Use smaller cards and spacing</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Animations</label>
                <p className="text-xs text-muted-foreground">Enable smooth transitions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Task Reminders</label>
                <p className="text-xs text-muted-foreground">Get notified about upcoming tasks</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Goal Milestones</label>
                <p className="text-xs text-muted-foreground">Celebrate your progress</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Calendar Events</label>
                <p className="text-xs text-muted-foreground">Upcoming events and deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Email Notifications</label>
                <p className="text-xs text-muted-foreground">Receive digest emails</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Productivity Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Productivity</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Default View</label>
                <p className="text-xs text-muted-foreground">Your preferred starting page</p>
              </div>
              <Select defaultValue="dashboard">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="tasks">Tasks</SelectItem>
                  <SelectItem value="goals">Goals</SelectItem>
                  <SelectItem value="calendar">Calendar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Week Start</label>
                <p className="text-xs text-muted-foreground">First day of the week</p>
              </div>
              <Select defaultValue="monday">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Auto-archive Completed</label>
                <p className="text-xs text-muted-foreground">Move completed tasks after 7 days</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Focus Mode</label>
                <p className="text-xs text-muted-foreground">Hide completed tasks during work hours</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Data & Privacy</h2>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Import Data
            </Button>
            
            <Separator />
            
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>Focus v1.0.0 • Made with ❤️ for productivity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
