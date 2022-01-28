declare const APP_VERSION: string;
declare const BASE_URL: string;

declare module 'virtual:pwa-register' {
	export type RegisterSWOptions = {
		immediate?: boolean;
		onNeedRefresh?: () => void;
		onOfflineReady?: () => void;
		onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
		onRegisterError?: (error: any) => void;
	};

	export function registerSW(options?: RegisterSWOptions): void;
}
