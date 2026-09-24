import { NextResponse } from 'next/server';
import { processEightHourReminders } from '@/app/lib/cronService';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const secretParam = url.searchParams.get('secret');

        // Verify secret if CRON_SECRET is set in environment
        if (process.env.CRON_SECRET) {
            const authorized = 
                authHeader === `Bearer ${process.env.CRON_SECRET}` || 
                secretParam === process.env.CRON_SECRET;
            
            // If secret is configured and not matched, block unauthorized calls
            if (!authorized && authHeader) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }

        const result = await processEightHourReminders();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in cron reminders route:', error);
        return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
    }
}

export async function POST(request) {
    return GET(request);
}
