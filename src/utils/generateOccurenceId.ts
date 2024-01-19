
export function generateUUID(cep: string) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    let year = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return "#OCC"+cep+uuid.join('').toUpperCase()+year;
}