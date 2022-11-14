import type { BrowserWindow } from 'electron'
declare global {
    namespace NodeJS {
        interface Global {
            electronMainWindow: BrowserWindow|null
            debugMode: boolean
        }
    }
}
export {}