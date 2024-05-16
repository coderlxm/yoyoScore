import { defineStore } from "pinia";
import UAParser from 'ua-parser-js';
export const useSettingStore = defineStore('setting', {
  state: () => ({
    settingForm: {
      audio: '1',
      trigger: 1,
      vibrate: '1',
      vibMethod: '2',
      sort: '1',
      keyboard: true
    },
    primaryColor: '#f01654',
    darkTheme: 'light',
    btnOrder: {
      orderTop: 1,
      orderMedium: 3,
      orderBottom: 2
    },
    deviceType: '',
    systemOSType: '',
    isFullScreen: !!document.fullscreenElement
  }),
  actions: {
    updateFullScreenStatus() {
      this.isFullScreen = !!document.fullscreenElement;
    },
    setupFullScreenListener() {
      // 设置监听器，当全屏状态改变时更新状态
      document.addEventListener('fullscreenchange', this.updateFullScreenStatus);
    },
    removeFullScreenListener() {
      // 移除监听器
      document.removeEventListener('fullscreenchange', this.updateFullScreenStatus);
    },
    platformPre() {
      const parser = new UAParser();
      const result = parser.getResult();
      const device = result.device.type;
      const os = result.os
      if (os.name.toLowerCase() === 'ios') {
        this.systemOSType = 'ios'
      } else {
        this.systemOSType = ''
      }
      console.log(this.systemOSType);
      if (device === 'mobile' || device === 'tablet') {
        this.deviceType = 'mobile';
        this.settingForm.keyboard = false
      } else {
        this.deviceType = 'desktop';
        this.settingForm.keyboard = true
      }
    },
    changeBtnOrder() {
      const [top, medium, bottom] = Object.values(this.btnOrder)
      if (top == 1 && medium == 3 && bottom == 2) {
        this.btnOrder = {
          orderTop: 1,
          orderMedium: 2,
          orderBottom: 3
        }
      } else if (top == 1 && medium == 2 && bottom == 3) {
        this.btnOrder = {
          orderTop: 2,
          orderMedium: 1,
          orderBottom: 3
        }
      } else {
        this.btnOrder = {
          orderTop: 1,
          orderMedium: 3,
          orderBottom: 2
        }
      }
    }
  },
  persist: true
})