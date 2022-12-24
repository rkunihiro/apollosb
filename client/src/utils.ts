export async function sleep(sec = 1) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, sec * 1000);
    });
}
