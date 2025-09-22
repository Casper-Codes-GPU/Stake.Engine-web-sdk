import { userSettings } from './app/utils/userSettings';
import { engine } from './app/getEngine';

// Import useful utilities from the Web SDK
import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
import { randomInteger } from 'utils-shared/random';

// Note: You can add more imports as needed from the Web SDK packages
// Check the packages folder to see what's available

/**
 * Web SDK Integration Layer
 * This provides a bridge between the PixiJS creation template and useful Web SDK utilities
 */
export class WebSDKIntegration {
  // Utility functions from utils-shared
  static utils = {
    waitForResolve,
    waitForTimeout,
    randomInteger,
  };

  // Enhanced user settings with Web SDK utilities
  static userSettings = {
    ...userSettings,
    // Add any custom settings integrations here
  };

  // Engine utilities
  static getEngine() {
    return engine();
  }

  static getApp() {
    return engine(); // CreationEngine extends Application
  }

  static getStage() {
    return engine()?.stage;
  }

  static getRenderer() {
    return engine()?.renderer;
  }

  // Viewport utilities
  static getViewportSize() {
    const app = this.getApp();
    return {
      width: app?.screen?.width || window.innerWidth,
      height: app?.screen?.height || window.innerHeight,
    };
  }

  // Add responsive design helpers
  static isPortrait() {
    const { width, height } = this.getViewportSize();
    return height > width;
  }

  static isLandscape() {
    return !this.isPortrait();
  }

  // Get scale factor for responsive design
  static getScaleFactor() {
    const { width, height } = this.getViewportSize();
    const baseWidth = 1920;
    const baseHeight = 1080;
    
    return Math.min(width / baseWidth, height / baseHeight);
  }
}

// Create a singleton instance
export const webSDK = new WebSDKIntegration();

// Export utilities for easy access
export const { utils, userSettings: enhancedUserSettings } = WebSDKIntegration;