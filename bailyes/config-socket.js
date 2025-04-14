import pino from 'pino';
import { Browsers, isJidBroadcast, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'

export default function configSocket(state, versaoWaWeb) {
    return {
        printQRInTerminal: true,
        emitOwnEvents: true,
        auth: state,
        browser: Browsers.ubuntu("Opera"),
        version: versaoWaWeb,
        logger: pino({ level: "silent" }),
        shouldIgnoreJid: jid => isJidBroadcast(jid) || jid?.endsWith('@newsletter')
    }
}