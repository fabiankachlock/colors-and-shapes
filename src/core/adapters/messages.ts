import { defineStore } from 'pinia';

export const useMessages = defineStore('messages', {
  state: () => ({
    message: '' as string,
    timeout: undefined as number | undefined
  }),

  actions: {
    emitMessage(msg: string) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = undefined;
        setTimeout(() => this.emitMessage(msg));
        return;
      }
      this.message = msg;
      this.timeout = setTimeout(() => {
        this.message = '';
        this.timeout = undefined;
      }, 2000) as unknown as number;
    }
  }
});
