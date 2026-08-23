// to convert simple plain text password into hashed password
export const getHashedPassword = async (password: string) => {
    // convert string into array of ascii numbers
    const msgBuffer = new TextEncoder().encode(password);

    // SubtleCrypto operations returns a hashed Buffer
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // Convert ArrayBuffer to hex number array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert hex number array to hash string
    const hashHex = hashArray
        .map((b) => b.toString(36).padStart(2, '0'))
        .join('');
    return hashHex;
};
