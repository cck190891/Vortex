import { appDataDir, dataDir, localDataDir, resourceDir, appCacheDir, appConfigDir, cacheDir, homeDir } from '@tauri-apps/api/path';

import { signal, effect } from '@preact/signals'


const appDataDirPath = signal();
const localDataDirPath = signal();
const dataDirPath = signal();
const resourceDirPath = signal();
const appCacheDirPath = signal();
const appConfigDirPath = signal();
const cacheDirPath = signal();
const homeDirPath = signal();
(async () => {
    // resourceDirPath.value = await resourceDir();
    // appDataDirPath.value = await appDataDir();
    localDataDirPath.value = await localDataDir();
    // dataDirPath.value = await dataDir();

    // appCacheDirPath.value = await appCacheDir();
    // appConfigDirPath.value = await appConfigDir();
    // cacheDirPath.value = await cacheDir();
    // homeDirPath.value = await homeDir();

    // console.log('appDataDirPath', appDataDirPath);
    // console.log('localDataDirPath', localDataDirPath);
    // console.log('dataDirPath', dataDirPath);
    // console.log('resourceDirPath', resourceDirPath);

    // console.log('appCacheDirPath', appCacheDirPath);
    // console.log('appConfigDirPath', appConfigDirPath);
    // console.log('cacheDirPath', cacheDirPath);
    // console.log('homeDirPath', homeDirPath);

})();

async function getPaths() {
    const localDataDirPath = await localDataDir();

    return localDataDirPath;
}
export { getPaths }
export { appDataDirPath, localDataDirPath, dataDirPath, resourceDirPath }
