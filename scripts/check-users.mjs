import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('atsasmun');

    console.log('=== ANALYZING ALL REGISTRATIONS FOR EARLY BIRD SEND ===\n');

    const istCol = db.collection('registrations_istanbul');
    const notifCol = db.collection('notifications');

    const istUsers = await istCol.find({}).toArray();
    const notifUsers = await notifCol.find({}).toArray();

    console.log(`registrations_istanbul: ${istUsers.length} records`);
    console.log(`notifications: ${notifUsers.length} records`);

    // Map by email to avoid duplicates
    const emailMap = new Map();

    for (const u of [...istUsers, ...notifUsers]) {
        const rawEmail = (u.Email || u.email || '').trim().toLowerCase();
        if (!rawEmail || !rawEmail.includes('@')) continue;

        const existing = emailMap.get(rawEmail);
        if (!existing) {
            emailMap.set(rawEmail, u);
        } else {
            // Merge or take the one with customerId if existing doesn't have it
            if (!existing.customerId && u.customerId) {
                emailMap.set(rawEmail, { ...existing, ...u });
            }
        }
    }

    console.log(`Total unique valid emails: ${emailMap.size}\n`);

    let withCustId = 0;
    let withoutCustId = 0;
    const missingCustIdEmails = [];

    emailMap.forEach((user, email) => {
        if (user.customerId && user.customerId.startsWith('cus_')) {
            withCustId++;
        } else {
            withoutCustId++;
            missingCustIdEmails.push({ email, name: `${user.FirstName || ''} ${user.LastName || ''}`.trim() });
        }
    });

    console.log(`With Stripe customerId: ${withCustId}`);
    console.log(`Without Stripe customerId: ${withoutCustId}`);

    if (missingCustIdEmails.length > 0) {
        console.log('\nSamples without customerId:', missingCustIdEmails.slice(0, 10));
    }

    await client.close();
}

run();
