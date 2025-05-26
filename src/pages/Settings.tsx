
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Moon, Sun, User, Trash2, RotateCcw } from 'lucide-react';
import { loadSettings, saveSettings, resetAllData, AppSettings } from '@/utils/localStorage';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    defaultView: 'dashboard',
    weekStart: 'monday'
  });
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  useEffect(() => {
    const savedSettings = loadSettings();
    setSettings(savedSettings);
    
    // Apply dark mode
    if (savedSettings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const updateSetting = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);

    // Handle dark mode toggle
    if (key === 'darkMode') {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      toast({
        title: `${value ? 'Dark' : 'Light'} mode enabled`,
        description: "Your preference has been saved",
      });
    }

    // Handle week start change
    if (key === 'weekStart') {
      toast({
        title: `Week starts on ${value === 'sunday' ? 'Sunday' : 'Monday'}`,
        description: "Calendar view will update accordingly",
      });
    }
  };

  const handleResetApp = () => {
    resetAllData();
    setIsResetDialogOpen(false);
    
    // Reset settings to default
    const defaultSettings: AppSettings = {
      darkMode: false,
      defaultView: 'dashboard',
      weekStart: 'monday'
    };
    setSettings(defaultSettings);
    document.documentElement.classList.remove('dark');
    
    toast({
      title: "App reset successfully",
      description: "All data has been cleared",
    });
    
    // Refresh the page to reset all state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

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
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">U</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Local User</h3>
              <p className="text-sm text-muted-foreground">Data stored locally on this device</p>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            {settings.darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
            <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Dark Mode</label>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch 
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSetting('darkMode', checked)}
              />
            </div>
          </div>
        </div>

        {/* Productivity Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Productivity</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">Week Start</label>
                <p className="text-xs text-muted-foreground">First day of the week in calendar</p>
              </div>
              <Select 
                value={settings.weekStart} 
                onValueChange={(value: 'sunday' | 'monday') => updateSetting('weekStart', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Data Management</h2>
          </div>
          
          <div className="space-y-3">
            <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset App
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset Application</DialogTitle>
                  <DialogDescription>
                    This will permanently delete all your tasks, calendar events, and settings. 
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleResetApp}>
                    Reset Everything
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
