/**
 * Desktop Notifications utility using the Browser Notifications API.
 * Provides safe permission requesting, fallbacks, Web Audio API chimes,
 * and background notification dispatch for official correspondence and alerts.
 */

export interface DesktopNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  onClick?: () => void;
  silent?: boolean;
}

/**
 * Check if the browser environment supports the Notifications API
 */
export function isDesktopNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current notification permission state
 */
export function getDesktopNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isDesktopNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Synthesizes a clean, pleasant administrative notification chime using Web Audio API.
 * Does not require external audio files and works reliably.
 */
export function playNotificationChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // First tone (G5 - ~784 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(783.99, now);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Second harmonic tone (C6 - ~1046 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1046.5, now + 0.12);
    gain2.gain.setValueAtTime(0.001, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.25, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.52);

    // Auto-close audio context to prevent leaking
    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
    }, 800);
  } catch {
    // Audio context may be restricted before user gesture
  }
}

/**
 * Request notification permission from the user
 */
export async function requestDesktopNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isDesktopNotificationSupported()) {
    return 'unsupported';
  }

  try {
    // Support both promise-based and callback-based browsers
    let permission: NotificationPermission;
    if (typeof Notification.requestPermission().then === 'function') {
      permission = await Notification.requestPermission();
    } else {
      permission = await new Promise<NotificationPermission>((resolve) => {
        Notification.requestPermission((result) => resolve(result));
      });
    }
    return permission;
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return Notification.permission;
  }
}

/**
 * Send a native desktop notification to the user's OS / browser tray
 */
export function sendDesktopNotification(options: DesktopNotificationOptions): boolean {
  if (!isDesktopNotificationSupported()) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  try {
    if (!options.silent) {
      playNotificationChime();
    }

    const defaultIcon = 'https://api.iconify.design/lucide:shield-check.svg?color=%23f59e0b';

    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || defaultIcon,
      badge: options.badge || defaultIcon,
      tag: options.tag || `rdf-notif-${Date.now()}`,
      dir: 'rtl',
      lang: 'ar',
      data: options.data
    });

    notification.onclick = (e) => {
      e.preventDefault();
      try {
        window.focus();
      } catch {}
      if (options.onClick) {
        options.onClick();
      }
      notification.close();
    };

    // Auto-close after 8 seconds
    setTimeout(() => {
      try {
        notification.close();
      } catch {}
    }, 8000);

    return true;
  } catch (err) {
    console.warn('Failed to dispatch desktop notification:', err);
    return false;
  }
}
