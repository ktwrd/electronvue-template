import type { BrowserWindow } from 'electron'
declare global
{
    var electronMainWindow: BrowserWindow|undefined
    var debugMode: boolean
}
