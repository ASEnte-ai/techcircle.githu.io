import React, { useEffect, useState } from 'react';
import { TabNotification } from '../types';
import { notificationTemplates } from '../data';
import { Bell, Flame, AlertCircle, MessageSquare, ShieldCheck, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationCenterProps {
  notifications: TabNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<TabNotification[]>>;
  onNavigateToNews?: (newsId: string) => void;
  onNavigateToDevice?: (deviceId: string) => void;
}

export default function NotificationCenter({
  notifications,
  setNotifications,
  onNavigateToNews,
  onNavigateToDevice,
}: NotificationCenterProps) {
  const [activeToast, setActiveToast] = useState<TabNotification | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Trigger a Toast when a new (unread) notification is added to the list
  useEffect(() => {
    const unread = notifications.filter((n) => !n.read);
    if (unread.length > 0) {
      // Set the most recent unread as toast if it is not already read or displayed
      const latest = unread[0];
      // Only Toast if it is relatively fresh (not seeded)
      if (latest.time === 'Just now') {
        setActiveToast(latest);
        // Play a crisp audio beep using standard web synthesis (to mimic push)
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
          
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.3);
        } catch (e) {
          // Fallback if audio context is blocked
        }

        // Dissolve Toast after 5 seconds
        const timer = setTimeout(() => {
          setActiveToast(null);
        }, 5500);
        return () => clearTimeout(timer);
      }
    }
  }, [notifications]);

  // Handle manual trigger for the user to experience push notifications
  const triggerManualNotification = () => {
    const randomIndex = Math.floor(Math.random() * notificationTemplates.length);
    const template = notificationTemplates[randomIndex];
    
    const newNotif: TabNotification = {
      id: `notif-manual-${Date.now()}`,
      title: template.title,
      body: template.body,
      time: 'Just now',
      type: template.type,
      read: false,
      linkToId: template.linkToId,
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Passive Simulation Timer: Add a new push notification every 35 seconds to feel like a real newsroom
  useEffect(() => {
    const interval = setInterval(() => {
      // 35% chance to drop a notification passively
      if (Math.random() > 0.6) {
        const randomIndex = Math.floor(Math.random() * notificationTemplates.length);
        const template = notificationTemplates[randomIndex];
        const newNotif: TabNotification = {
          id: `notif-auto-${Date.now()}`,
          title: template.title,
          body: template.body,
          time: 'Just now',
          type: template.type,
          read: false,
          linkToId: template.linkToId,
        };
        setNotifications((prev) => [newNotif, ...prev]);
      }
    }, 35000);

    return () => clearInterval(interval);
  }, [setNotifications]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotifClick = (notif: TabNotification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsOpen(false);
    setActiveToast(null);

    if (notif.linkToId) {
      if (notif.linkToId.startsWith('news-')) {
        if (onNavigateToNews) onNavigateToNews(notif.linkToId);
      } else {
        if (onNavigateToDevice) onNavigateToDevice(notif.linkToId);
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'leak': return <Flame className="h-4 w-4 text-orange-500" />;
      case 'alert': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'review': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default: return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'leak': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20';
      case 'alert': return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      case 'review': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
      default: return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
    }
  };

  return (
    <>
      {/* Simulation Trigger Banner on Dashboard Sidebar/Header */}
      <div className="relative" id="notification-bell-container">
        <button
          id="notif-bell-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white leading-none animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay back to close */}
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-brand-panel shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <h3 className="font-semibold text-slate-800 dark:text-white">Real-Time Newsroom Feed</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={markAllRead}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear Badge
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 dark:text-slate-500">
                      <p className="text-sm">No notifications yet.</p>
                      <p className="text-xs mt-1">Use "Simulate Leak" below to trigger some!</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotifClick(notif)}
                        className={`p-3 text-left transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-brand-card/40 relative ${
                          !notif.read ? 'bg-amber-50/30 dark:bg-amber-500/[0.02]' : ''
                        }`}
                      >
                        {!notif.read && (
                          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-red-500" />
                        )}
                        <div className="flex items-start gap-2.5">
                          <div className="mt-1">{getIcon(notif.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-bold tracking-wider uppercase">
                                {notif.type}
                              </span>
                              <span className="text-[10px] text-slate-400">{notif.time}</span>
                            </div>
                            <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">
                              {notif.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal line-clamp-2">
                              {notif.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Dashboard helper to test live push triggers */}
                <div className="p-3 bg-slate-50 dark:bg-brand-bg border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-normal">
                    This mimics high-fidelity web pushes. Try it now:
                  </p>
                  <button
                    onClick={triggerManualNotification}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-xs font-bold text-white rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Flame className="h-3.5 w-3.5" /> Simulate Real-time Leak!
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Toast Notification Alert Banner */}
      <div className="fixed bottom-4 right-4 z-[999] max-w-sm w-full px-4 md:px-0">
        <AnimatePresence>
          {activeToast && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 50, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="bg-slate-900/95 dark:bg-brand-panel/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-800/80 backdrop-blur-md relative"
              id="active-push-toast"
            >
              <button
                onClick={() => setActiveToast(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex gap-3">
                <div className="flex-shrink-0 p-2.5 bg-gradient-to-br from-red-500 to-amber-500 rounded-xl h-10 w-10 flex items-center justify-center animate-bounce">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-red-600 text-white px-1.5 py-0.5 rounded leading-none">
                      {activeToast.type} Drop
                    </span>
                    <span className="text-[10px] text-slate-400">Just Now</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 mt-1 pr-6 leading-tight">
                    {activeToast.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-snug">
                    {activeToast.body}
                  </p>
                  <button
                    onClick={() => handleNotifClick(activeToast)}
                    className="mt-2.5 text-xs font-semibold text-amber-400 hover:text-amber-300 underline flex items-center gap-1 cursor-pointer"
                  >
                    View spec sheet details &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
