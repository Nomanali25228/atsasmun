import 'dotenv/config';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import { getEarlyBirdEmailHtml } from '../src/app/lib/earlyBirdTemplate.js';

const uri = 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'info@atsasmun.com',
        pass: 'Abiman0786@'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Helper for delay between sends to avoid SMTP rate limiting
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('atsasmun');

        console.log('=== STARTING BULK EARLY BIRD DISCOUNT EMAIL SEND ===\n');

        const istUsers = await db.collection('registrations_istanbul').find({}).toArray();
        const notifUsers = await db.collection('notifications').find({}).toArray();

        // De-duplicate by lowercase email
        const delegatesMap = new Map();

        for (const u of [...istUsers, ...notifUsers]) {
            const rawEmail = (u.Email || u.email || '').trim().toLowerCase();
            if (!rawEmail || !rawEmail.includes('@') || rawEmail.includes('gmial')) {
                // skip completely invalid/malformed emails
                continue;
            }

            const existing = delegatesMap.get(rawEmail);
            if (!existing) {
                delegatesMap.set(rawEmail, u);
            } else {
                // If existing has no customerId or less complete data, replace with better one
                if ((!existing.customerId || !existing.customerId.startsWith('cus_')) && (u.customerId && u.customerId.startsWith('cus_'))) {
                    delegatesMap.set(rawEmail, { ...existing, ...u });
                }
            }
        }

        const totalDelegates = delegatesMap.size;
        console.log(`Total unique delegates to receive email: ${totalDelegates}\n`);

        let count = 0;
        let successCount = 0;
        let failCount = 0;
        const failedList = [];

        for (const [email, user] of delegatesMap.entries()) {
            count++;
            const fullName = `${user.FirstName || user.firstname || ''} ${user.LastName || user.lastname || ''}`.trim() || user.FirstName || 'Delegate';
            const customerId = user.customerId || '';
            const userId = user.id || user.Idname || '1';
            const isGroup = user.RegistrationType === 'group' || user.type === 'group';

            console.log(`[${count}/${totalDelegates}] Processing: ${fullName} <${email}> | CustomerId: ${customerId} | UserId: ${userId}`);

            const html = getEarlyBirdEmailHtml({
                name: fullName,
                customerId: customerId,
                id: userId,
                isGroup: isGroup,
                deadline: '2nd October, 2026'
            });

            const mailOptions = {
                from: '"Atsas MUN" <info@atsasmun.com>',
                to: email,
                subject: 'ATSAS MUN Istanbul: Early Bird Discount Offer (Deadline: 2nd October)',
                html: html
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`   ✓ SENT successfully! Message ID: ${info.messageId}`);
                successCount++;

                // Mark in DB collections
                await db.collection('registrations_istanbul').updateMany(
                    { Email: { $regex: new RegExp(`^${email}$`, 'i') } },
                    { 
                        $set: { 
                            earlyBirdSent: true, 
                            earlyBirdSentAt: new Date().toISOString(),
                            earlyBirdCustomerIdSent: customerId
                        } 
                    }
                );

                await db.collection('notifications').updateMany(
                    { Email: { $regex: new RegExp(`^${email}$`, 'i') } },
                    { 
                        $set: { 
                            earlyBirdSent: true, 
                            earlyBirdSentAt: new Date().toISOString(),
                            earlyBirdCustomerIdSent: customerId
                        } 
                    }
                );

            } catch (sendErr) {
                console.error(`   ✗ FAILED to send to ${email}: ${sendErr.message}`);
                failCount++;
                failedList.push({ email, name: fullName, error: sendErr.message });
            }

            // Sleep 2.5 seconds between emails to respect SMTP throughput
            if (count < totalDelegates) {
                await sleep(2500);
            }
        }

        console.log('\n====================================================');
        console.log('🎉 BULK EARLY BIRD EMAIL BROADCAST COMPLETE');
        console.log(`   Total Processed: ${count}`);
        console.log(`   Successful: ${successCount}`);
        console.log(`   Failed: ${failCount}`);
        console.log('====================================================');

        if (failedList.length > 0) {
            console.log('\nFailed Recipients:');
            console.log(failedList);
        }

    } catch (err) {
        console.error('Fatal bulk sending error:', err);
    } finally {
        await client.close();
    }
}

main();
