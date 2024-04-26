import { Window } from '@tauri-apps/api/window';
const mainWindow = Window.getByLabel('main');
console.log('mainWindow:', mainWindow)

import { Webview } from '@tauri-apps/api/webview';
const mainWebview = Webview.getByLabel('main');
console.log('mainWindow:', mainWebview)

