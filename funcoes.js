export const setGroupToAdminsOnly = async (c, groupId, state) => {
    let setting = state ? "announcement" : "not_announcement"
    // let setting = state ? "locked" : "unlocked"
    return await c.groupSettingUpdate(groupId, setting)
}

export const sendText = async (c, chatId, text) => {
    // await updatePresence(c, chatId, "composing")
    await delayAleatorio(400, 1000)
    await c.sendMessage(chatId, { text, linkPreview: null })
}

export const delayAleatorio = (minDelayMs, maxDelayMs) => {
    return new Promise((resolve, reject) => {
        let delayAleatorioMs = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs
        setTimeout(async () => {
            resolve()
        }, delayAleatorioMs)
    })
}