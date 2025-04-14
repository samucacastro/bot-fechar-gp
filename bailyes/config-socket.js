import pino from 'pino';
import { isJidBroadcast, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'

export default function configSocket(state, versaoWaWeb) {
    return {
        printQRInTerminal: true,
        emitOwnEvents: false,
        auth: state,
        version: versaoWaWeb,
        logger: pino({ level: "silent" }),
        shouldIgnoreJid: jid => isJidBroadcast(jid) || jid?.endsWith('@newsletter')
    }
}