import { register } from '@tauri-apps/plugin-global-shortcut';

await register('CommandOrControl+Shift+C', () => {
    console.log('Shortcut triggered');
});