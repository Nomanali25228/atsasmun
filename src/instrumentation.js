export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { processEightHourReminders } = await import('./app/lib/cronService');

        console.log('[Scheduler] Background 8-hour acceptance letter worker initialized.');

        // Initial check 15 seconds after server start
        setTimeout(() => {
            processEightHourReminders().catch(err => console.error('[Scheduler Initial Run Error]:', err));
        }, 15000);

        // Run check periodically every 15 minutes
        setInterval(() => {
            processEightHourReminders().catch(err => console.error('[Scheduler Periodic Run Error]:', err));
        }, 15 * 60 * 1000);
    }
}
