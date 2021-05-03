function getDatabaseURL(){
    if(process.env.DATABASE_URL){
        return process.env.DATABASE_URL
    }else if(process.env.DB_USER){
        let {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env
        return `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
    }else{
        throw new Error("Variables db no definidas")
    }
}
function inEmulator(){
    if(process.env.FUNCTIONS_EMULATOR){
        return true
    }
    return false
}

module.exports = {getDatabaseURL , inEmulator}