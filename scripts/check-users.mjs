import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('atsasmun');

    console.log('=== CHECKING ACCEPTANCE EMAIL STATUS ACROSS ALL COLLECTIONS ===\n');

    const collections = [
        'registrations_istanbul',
        'registrations_dubai',
        'registrations_azerbaijan',
        'registrations_usa',
        'registrations_saudi',
        'registrations_uk',
        'notifications'
    ];

    let grandTotal = 0;
    let grandSent = 0;
    let grandUnsent = 0;
    const allUnsentUsers = [];

    for (const colName of collections) {
        const col = db.collection(colName);
        const count = await col.countDocuments();
        if (count === 0) continue;

        grandTotal += count;

        const sent = await col.countDocuments({
            $or: [
                { acceptanceLetterSent: true },
                { secondEmailSent: true }
            ]
        });
        grandSent += sent;

        const unsent = await col.find({
            $and: [
                { acceptanceLetterSent: { $ne: true } },
                { secondEmailSent: { $ne: true } }
            ]
        }).toArray();

        grandUnsent += unsent.length;

        console.log(`📁 Collection: ${colName}`);
        console.log(`   Total Registrations: ${count}`);
        console.log(`   Acceptance Email Sent: ${sent}`);
        console.log(`   Acceptance Email NOT Sent: ${unsent.length}\n`);

        if (unsent.length > 0) {
            unsent.forEach(u => {
                allUnsentUsers.push({
                    collection: colName,
                    id: u.id || u.Idname || u._id,
                    name: `${u.FirstName || u.firstname || ''} ${u.LastName || u.lastname || ''}`.trim() || 'N/A',
                    email: u.Email || u.email || 'N/A',
                    customerId: u.customerId || 'N/A',
                    destination: u.Destination || u.destination || colName.replace('registrations_', ''),
                    createdAt: u.createdAt || u.date || 'N/A'
                });
            });
        }
    }

    console.log('====================================================');
    console.log(`📊 GRAND SUMMARY:`);
    console.log(`   Total Users Across All Collections: ${grandTotal}`);
    console.log(`   Total Acceptance Sent: ${grandSent}`);
    console.log(`   Total Acceptance NOT Sent: ${grandUnsent}`);
    console.log('====================================================\n');

    if (allUnsentUsers.length > 0) {
        console.log(`📋 DETAILS OF USERS WHO HAVE NOT RECEIVED ACCEPTANCE LETTER (${allUnsentUsers.length}):\n`);
        allUnsentUsers.forEach((user, idx) => {
            console.log(`${idx + 1}. [${user.destination.toUpperCase()}] ${user.name}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Customer ID: ${user.customerId}`);
            console.log(`   User ID: ${user.id}`);
            console.log(`   Registered: ${user.createdAt}`);
            console.log('----------------------------------------------------');
        });
    } else {
        console.log('🎉 All registered users have already been sent the acceptance letter!');
    }

    await client.close();
}

run();
