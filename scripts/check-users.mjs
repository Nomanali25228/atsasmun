import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://salmanlsbu_db_user:atsasmun1947@cluster0.b7sexda.mongodb.net/atsasmun?retryWrites=true&w=majority&appName=Cluster0';

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('atsasmun');
    const emails = ['abdulmannanhasni699@gmail.com', 'butt60902@gmail.com'];
    for (const em of emails) {
        console.log(`=== CHECKING FOR: ${em} ===`);
        const reg = await db.collection('registrations_istanbul').find({ Email: new RegExp(em, 'i') }).toArray();
        console.log('registrations_istanbul:', JSON.stringify(reg, null, 2));
        const notif = await db.collection('notifications').find({ Email: new RegExp(em, 'i') }).toArray();
        console.log('notifications:', JSON.stringify(notif, null, 2));
    }
    await client.close();
}

run();
