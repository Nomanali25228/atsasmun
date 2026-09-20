import clientPromise from "./mongodb.js";
import { ObjectId } from "mongodb";

// MongoDB-based Database Utility
// Replaces the GitHub-based storage with real MongoDB collections

export class MongoDBDB {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async getCollection() {
    const client = await clientPromise;
    const db = client.db("atsasmun"); // Default DB name
    return db.collection(this.collectionName);
  }

  // Get all records
  async getAll() {
    const collection = await this.getCollection();
    const data = await collection.find({}).sort({ createdAt: -1 }).toArray();
    // Map _id to id for compatibility
    return data.map(item => ({ ...item, id: item.id || item._id.toString() }));
  }

  // Get a single record by ID
  async getById(id) {
    const collection = await this.getCollection();
    let query;
    try {
        // Try to query by MongoDB ObjectId first
        query = { _id: new ObjectId(id) };
    } catch (e) {
        // If not a valid ObjectId, try the numeric/string id field
        query = { id: isNaN(id) ? id : parseInt(id) };
    }
    const item = await collection.findOne(query);
    return item ? { ...item, id: item.id || item._id.toString() } : null;
  }

  // Create a new record
  async create(record) {
    const collection = await this.getCollection();
    const newRecord = {
      ...record,
      id: Date.now(), // Keep numeric ID for backward compatibility if needed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(newRecord);
    return { ...newRecord, _id: result.insertedId };
  }

  // Update a record
  async update(id, updates) {
    const collection = await this.getCollection();
    let query;
    try {
        query = { _id: new ObjectId(id) };
    } catch (e) {
        query = { id: isNaN(id) ? id : parseInt(id) };
    }

    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.findOneAndUpdate(
      query,
      { $set: updatedData },
      { returnDocument: 'after' }
    );

    if (!result) throw new Error("Record not found");
    return { ...result, id: result.id || result._id.toString() };
  }

  // Delete a record
  async delete(id) {
    const collection = await this.getCollection();
    let query;
    try {
        query = { _id: new ObjectId(id) };
    } catch (e) {
        query = { id: isNaN(id) ? id : parseInt(id) };
    }

    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) throw new Error("Record not found");
    return { success: true };
  }

  // Get records with pagination
  async getPaginated(page = 1, pageSize = 10, searchQuery = "") {
    const collection = await this.getCollection();
    
    let query = {};
    if (searchQuery) {
      // Simple text search implementation for MongoDB
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { title: { $regex: searchQuery, $options: 'i' } },
          { message: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }

    const total = await collection.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;

    const data = await collection.find(query)
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(pageSize)
      .toArray();

    const mappedData = data.map(item => ({ ...item, id: item.id || item._id.toString() }));

    return {
      data: mappedData,
      pagination: {
        page,
        pageSize,
        pageCount: totalPages,
        total,
      },
    };
  }
}

// Pre-defined collections using MongoDB
export const collections = {
  istanbul: new MongoDBDB("registrations_istanbul"),
  dubai: new MongoDBDB("registrations_dubai"),
  azerbaijan: new MongoDBDB("registrations_azerbaijan"),
  usa: new MongoDBDB("registrations_usa"),
  saudi: new MongoDBDB("registrations_saudi"),
  uk: new MongoDBDB("registrations_uk"),
  blogs: new MongoDBDB("blogs"),
  notifications: new MongoDBDB("notifications"),
  authors: new MongoDBDB("authors"),
};

export function getCollectionKeyFromDestination(destination) {
  if (!destination) return "istanbul";
  const d = String(destination).toLowerCase();
  if (d.includes("istanbul") || d.includes("turkey") || d === "firstnames") return "istanbul";
  if (d.includes("dubai") || d.includes("uae") || d === "secondenames") return "dubai";
  if (d.includes("baku") || d.includes("azerbaijan") || d === "thirdnames") return "azerbaijan";
  if (d.includes("new york") || d.includes("usa") || d === "fournames") return "usa";
  if (d.includes("riyadh") || d.includes("saudi") || d === "fivenames") return "saudi";
  if (d.includes("london") || d.includes("uk") || d === "fivthnames") return "uk";
  return "istanbul";
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Check if a registration with the given email or phone already exists
 * @param {string} email 
 * @param {string} phone 
 * @param {string} destination 
 * @returns {Promise<{exists: boolean, field?: string, message?: string}>}
 */
export async function checkExistingRegistration(email, phone, destination) {
  const trimmedEmail = (email || "").trim();
  const rawPhone = (phone || "").trim();
  const cleanDigits = rawPhone.replace(/\D/g, "");
  const last9 = cleanDigits.length >= 9 ? cleanDigits.slice(-9) : cleanDigits;

  if (!trimmedEmail && !cleanDigits) {
    return { exists: false };
  }

  const collectionKey = getCollectionKeyFromDestination(destination);
  const targetMongoDb = collections[collectionKey];
  if (!targetMongoDb) return { exists: false };

  const col = await targetMongoDb.getCollection();

  // 1. Check Email
  if (trimmedEmail) {
    const escapedEmail = escapeRegex(trimmedEmail);
    const existingUserByEmail = await col.findOne({
      $or: [
        { Email: { $regex: `^${escapedEmail}$`, $options: "i" } },
        { email: { $regex: `^${escapedEmail}$`, $options: "i" } }
      ]
    });

    if (existingUserByEmail) {
      return {
        exists: true,
        field: "email",
        message: "This email address is already registered. Each participant can only register once with an email."
      };
    }
  }

  // 2. Check Phone
  if (cleanDigits && cleanDigits.length >= 7) {
    const phoneQueries = [
      { PhoneNumber: rawPhone },
      { PhoneNumber: cleanDigits },
      { PhoneNumber: `+${cleanDigits}` },
      { phone: rawPhone },
      { phone: cleanDigits },
      { phone: `+${cleanDigits}` }
    ];

    if (last9 && last9.length >= 8) {
      phoneQueries.push({ PhoneNumber: { $regex: `${last9}$` } });
      phoneQueries.push({ phone: { $regex: `${last9}$` } });
    }

    const existingUserByPhone = await col.findOne({
      $or: phoneQueries
    });

    if (existingUserByPhone) {
      return {
        exists: true,
        field: "phone",
        message: "This phone number is already registered. Each participant can only register once with a phone number."
      };
    }
  }

  return { exists: false };
}

