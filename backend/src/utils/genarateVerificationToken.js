export const genarateVerificationToken = () => {
    const token = Math.floor(100000 + Math.random() * 900000); // 6-digit integer
    return token;
}