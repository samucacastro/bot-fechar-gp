//REQUERINDO MODULOS
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from '@whiskeysockets/baileys';
import fs from "fs";
import { automacaoGrupos } from './automacao-grupo.js'
import qrcode from 'qrcode';
import configSocket from './bailyes/config-socket.js';
import express from 'express';
const app = express();
let qrCode = ' ';
app.get("/qr", (req, res) => {
    return res.send(`
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
    <section class="conteiner">
        <div id="qrcode-2"></div>
        <div id="conectado"></div>
    </section>
<script>
    let qrcodeContainer2 = document.getElementById("qrcode-2");
    const conectado = document.getElementById("conectado");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const qrCodeSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    const estaLogado = '${qrCode}' === 'undefined' ? '<img class="conectado" src="https://cdn-icons-png.flaticon.com/512/190/190411.png"/>' : "";
    qrcodeContainer2.innerHTML = "";
    qrcodeContainer2.innerHTML += estaLogado;
    let website = '${qrCode}' === 'undefined' ? '' : '${qrCode}'; 
    new QRCode(qrcodeContainer2, {
        text: website,
        width: (qrCodeSize - 40),
        height: (qrCodeSize - 40),
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
</script>
<style type="text/css">
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .conteiner{
        width: 100%;
        height: 100%;
        background-color: seagreen;
    }

    #qrcode-2{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100% !important;
        height: 100%;
    }

    .conectado{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

</style>`)
})
async function connectionLogic() {
    const { state, saveCreds } = await useMultiFileAuthState("sessao");
    const { version } = await fetchLatestBaileysVersion()
    const sock = makeWASocket(configSocket(state, version));
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update || {};
        qrCode = qr;
        console.log(qr)
        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectionLogic();
            }
        }
        sock.ev.on("creds.update", saveCreds);
    });

    /*
    * INICIO DA LOGICA
    */
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        // const messageType = Object.keys(m.message)[0];
        // console.log(messageType + " de: " + m.message)
        // console.log(m)
    });

    await automacaoGrupos(sock, ['120363169144052088@g.us', '5511963296699-1618489968@g.us']);
    // await automacaoGrupos(sock, ['120363230240489611@g.us', '120363029210654926@g.us']);
    // ['120363169144052088@g.us', '5511963296699-1618489968@g.us']
    sock.ev.on("creds.update", saveCreds);
}

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log("Conexão ativa na porta: " + port));

connectionLogic();