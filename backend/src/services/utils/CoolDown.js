module.exports = {
    CoolDown(tempo_espera) {
        const atual = new Date();
        const espera = new Date(tempo_espera);
        const total = atual.getTime() - espera.getTime();

        if (total > 2628000000) {
            return true;
        }
        return false;
    }
}