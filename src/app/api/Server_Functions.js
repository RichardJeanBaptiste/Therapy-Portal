import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword(x) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(x.password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

async function comparePassword(passAttempt, hash){
    try {
        const result = await bcrypt.compare(passAttempt, hash);
        return result;
    } catch (error) {
        return error;
    } 
}


module.exports = { hashPassword, comparePassword };