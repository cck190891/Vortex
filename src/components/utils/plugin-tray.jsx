
import { TrayIcon } from '@tauri-apps/api/tray';
import { platform } from '@tauri-apps/plugin-os';
(async () => {
    const platformName = await platform();

    if (platformName == 'windows') {
        const tray = await TrayIcon.new({
            tooltip: 'awesome tray tooltip'
        });
    }
})();