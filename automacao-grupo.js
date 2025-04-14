// import { delayAleatorio } from '../lib/util.js'
/*
import { setGroupToAdminsOnly, delayAleatorio, sendText } from './funcoes.js'
import schedule from 'node-schedule'
import moment from "moment-timezone"
moment.tz.setDefault('America/Sao_Paulo');


export const automacaoGrupos = async (c, idGrupo) => {
    // const job = schedule.scheduleJob('* * * * *', function () {
    //     console.log('Executando tarefa a cada minuto:', new Date());
    //     // Coloque aqui o código da sua tarefa
    // });
    // Tarefa para as 22h
    // console.log(new Date())
    const job22h = schedule.scheduleJob({
        timezone: "America/Sao_Paulo",
        rule: '00 23 * * *'
    }, async () => {
        // Sua tarefa aqui
        try {
            let estadoNovo = true
            await delayAleatorio(400, 3000);
            await setGroupToAdminsOnly(c, idGrupo[0], estadoNovo);
            await delayAleatorio(400, 3000)
            await setGroupToAdminsOnly(c, idGrupo[1], estadoNovo);
            await delayAleatorio(400, 3000)
            await sendText(c, idGrupo[0], "Grupo fechado automaticamente. Bom descanso a todos!");
            await delayAleatorio(400, 3000)
            await sendText(c, idGrupo[1], "Grupo fechado automaticamente. Bom descanso a todos!");
            console.log("GRUPOS FECHADO AUTOMATICAMENTE")
        } catch (err) {
            console.log("AUTOMAÇÃO GRUPOS: " + err);
            return
        }
    });

    // Tarefa para as 6h30
    const job6h30 = schedule.scheduleJob({
        timezone: "America/Sao_Paulo",
        rule: '00 10 * * *'
    }, async () => {
        try {
            let estadoNovo = false
            await delayAleatorio(400, 3000);
            await setGroupToAdminsOnly(c, idGrupo[0], estadoNovo);
            await delayAleatorio(400, 3000);
            await setGroupToAdminsOnly(c, idGrupo[1], estadoNovo);
            await delayAleatorio(400, 3000);
            await sendText(c, idGrupo[0], "Grupo aberto automaticamente!");
            await delayAleatorio(400, 3000);
            await sendText(c, idGrupo[1], "Grupo aberto automaticamente!");
            console.log("GRUPOS ABERTO AUTOMATICAMENTE")
        } catch (err) {
            console.log("AUTOMAÇÃO GRUPOS: " + err)
            return
        }
    });
}


*/