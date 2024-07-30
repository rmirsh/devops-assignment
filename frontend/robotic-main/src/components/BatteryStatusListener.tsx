import React, { useEffect, ReactNode } from 'react';

interface CustomBatteryManager {
  level: number;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
}

interface BatteryStatusListenerProps {
  children: ReactNode;
}

const BatteryStatusListener: React.FC<BatteryStatusListenerProps> = ({ children }) => {
  useEffect(() => {
    const checkBatteryStatus = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as Navigator & { getBattery?: () => Promise<CustomBatteryManager> }).getBattery?.();
          if (battery) {
            const batteryLevel = battery.level * 100;
            if (batteryLevel < 20) {
              disableAnimations();
            }
          }
        } catch (error) {
          console.error('Error fetching battery status:', error);
        }
      }
    };
    const disableAnimations = () => {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(styleElement);
    };
    checkBatteryStatus();
    if ('getBattery' in navigator) {
      (navigator as Navigator & { getBattery?: () => Promise<CustomBatteryManager> }).getBattery?.().then(battery => {
        battery?.addEventListener('levelchange', checkBatteryStatus);
      });
    }
    return () => {
      if ('getBattery' in navigator) {
        (navigator as Navigator & { getBattery?: () => Promise<CustomBatteryManager> }).getBattery?.().then(battery => {
          battery?.removeEventListener('levelchange', checkBatteryStatus);
        });
      }
    };
  }, []);

  return <>{children}</>;
};

export default BatteryStatusListener;




