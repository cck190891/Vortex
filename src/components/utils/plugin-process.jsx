import { relaunch, exit } from '@tauri-apps/plugin-process';

const relaunch_ = async () => { await relaunch(); }
const exit_ = async () => { await exit(0); }

export { relaunch_, exit_ }