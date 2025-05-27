import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { User, Trash2, RotateCcw } from 'lucide-react';
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
  }, []);
  const updateSetting = (key: keyof AppSettings, value: any) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    saveSettings(newSettings);
    if (key === 'weekStart') {
      toast({
        title: `Week starts on ${value === 'sunday' ? 'Sunday' : 'Monday'}`,
        description: "Calendar view will update accordingly"
      });
    }
  };
  const handleResetApp = () => {
    resetAllData();
    setIsResetDialogOpen(false);
    const defaultSettings: AppSettings = {
      darkMode: false,
      defaultView: 'dashboard',
      weekStart: 'monday'
    };
    setSettings(defaultSettings);
    toast({
      title: "App reset successfully",
      description: "All data has been cleared"
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return <Layout>
      <div className="max-w-2xl mx-auto space-y-6 bg-transparent">
        {/* Header */}
        <div className="bg-transparent">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2e2e2e]">Settings</h1>
          <p className="text-[#6b7280]">Customize your productivity experience</p>
        </div>

        {/* Profile Section */}
        <div className="card-bg rounded-lg p-6 space-y-4 border border-[#e5e7eb]">
          <div className="flex items-center gap-2 mb-4 bg-transparent">
            <User className="w-5 h-5 text-[#f97316]" />
            <h2 className="text-lg font-semibold text-[#2e2e2e]">Profile</h2>
          </div>
          
          <div className="flex items-center gap-4 bg-transparent">
            <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">U</span>
            </div>
            <div className="bg-transparent">
              <h3 className="font-medium text-[#2e2e2e]">Local User</h3>
              <p className="text-sm text-[#6b7280]">Data stored locally on this device</p>
            </div>
          </div>
        </div>

        {/* Productivity Section */}
        <div className="card-bg rounded-lg p-6 space-y-4 border border-[#e5e7eb]">
          <div className="flex items-center gap-2 mb-4 bg-transparent">
            <RotateCcw className="w-5 h-5 text-[#f97316]" />
            <h2 className="text-lg font-semibold text-[#2e2e2e]">Productivity</h2>
          </div>
          
          <div className="space-y-4 bg-transparent">
            <div className="flex items-center justify-between bg-transparent">
              <div className="bg-transparent">
                <label className="text-sm font-medium text-[#2e2e2e]">Week Start</label>
                <p className="text-xs text-[#6b7280]">First day of the week in calendar</p>
              </div>
              <Select value={settings.weekStart} onValueChange={(value: 'sunday' | 'monday') => updateSetting('weekStart', value)}>
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
        <div className="card-bg rounded-lg p-6 space-y-4 border border-[#e5e7eb]">
          <div className="flex items-center gap-2 mb-4 bg-transparent">
            <Trash2 className="w-5 h-5 text-[#f97316]" />
            <h2 className="text-lg font-semibold text-[#2e2e2e]">Data Management</h2>
          </div>
          
          <div className="space-y-3 bg-transparent">
            <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full bg-[#fa812e] text-white hover:bg-[#fefbea] hover:text-black hover:border hover:border-[#eae8e1] border-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset App
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
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
                  <Button variant="destructive" onClick={handleResetApp} className="bg-[#fa812e] text-white hover:bg-[#fefbea] hover:text-black hover:border hover:border-black border-transparent">
                    Reset Everything
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#6b7280] py-4 bg-transparent">
          <p>Focus v1.0.0 • Made by Abdullah Zeeshan</p>
        </div>
      </div>
    </Layout>;
};
export default Settings;