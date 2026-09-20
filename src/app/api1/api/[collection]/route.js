import { NextResponse } from "next/server";
import { collections, checkExistingRegistration } from "@/app/lib/db";

// Map Strapi API names to our collections
const apiToCollection = {
  firstnames: "istanbul",
  secondenames: "dubai",
  thirdnames: "azerbaijan",
  fournames: "usa",
  fivenames: "saudi",
  fivthnames: "uk",
};

// POST - Create registration (replaces Strapi)
export async function POST(request, { params }) {
  try {
    const { collection: collectionName } = await params;

    // Handle notifications separately
    if (collectionName === "notifications") {
      const body = await request.json();
      const record = await collections.notifications.create(body.data || body);
      return NextResponse.json({
        data: { id: record.id, ...record },
        meta: {},
      });
    }

    // Handle blog-posts
    if (collectionName === "blog-posts") {
      const body = await request.json();
      const record = await collections.blogs.create(body.data || body);
      return NextResponse.json({
        data: { id: record.id, ...record },
        meta: {},
      });
    }

    // Handle Author / categories
    if (collectionName === "Author") {
      const allAuthors = await collections.authors.getAll();
      return NextResponse.json({
        data: allAuthors,
        meta: {},
      });
    }

    const destination = apiToCollection[collectionName];
    if (!destination) {
      return NextResponse.json(
        { error: { message: "Invalid collection" } },
        { status: 400 }
      );
    }

    const body = await request.json();
    const registrationData = body.data || body;

    // Check duplicate email or phone number
    const email = registrationData.Email || registrationData.email;
    const phone = registrationData.PhoneNumber || registrationData.phone || registrationData.number;
    const dupCheck = await checkExistingRegistration(email, phone, destination);
    if (dupCheck.exists) {
      console.warn(`Duplicate registration rejected for ${destination}: ${dupCheck.field} (${dupCheck.message})`);
      return NextResponse.json(
        { error: { message: dupCheck.message, field: dupCheck.field } },
        { status: 400 }
      );
    }

    console.log(`Creating registration in collection: ${destination}`, registrationData);
    const record = await collections[destination].create(registrationData);
    console.log(`Successfully created record with ID: ${record.id}`);

    return NextResponse.json({
      data: { id: record.id, ...record },
      meta: {},
    });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { error: { message: error.message || "Server error" } },
      { status: 500 }
    );
  }
}

// GET - Fetch records (replaces Strapi)
export async function GET(request, { params }) {
  try {
    const { collection: collectionName } = await params;

    // Handle blog-posts with populate
    if (collectionName === "blog-posts") {
      const { searchParams } = new URL(request.url);
      const page = parseInt(
        searchParams.get("pagination[page]") || "1"
      );
      const pageSize = parseInt(
        searchParams.get("pagination[pageSize]") || "3"
      );
      const searchFilter = searchParams.get("filters[title][$containsi]") || "";
      const slugFilter = searchParams.get("filters[slug]") || "";

      if (slugFilter) {
        const allBlogs = await collections.blogs.getAll();
        const blog = allBlogs.find((b) => b.slug === slugFilter);
        return NextResponse.json({
          data: blog ? [{ id: blog.id, ...blog, cover: blog.coverUrl ? { url: blog.coverUrl } : null }] : [],
          meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: blog ? 1 : 0 } },
        });
      }

      const result = await collections.blogs.getPaginated(
        page,
        pageSize,
        searchFilter
      );

      // Map to Strapi format
      const mappedData = result.data.map((blog) => ({
        id: blog.id,
        ...blog,
        cover: blog.coverUrl ? { url: blog.coverUrl } : null,
      }));

      return NextResponse.json({
        data: mappedData,
        meta: { pagination: result.pagination },
      });
    }

    // Handle Author
    if (collectionName === "Author") {
      const allAuthors = await collections.authors.getAll();
      return NextResponse.json({
        data: allAuthors,
        meta: {},
      });
    }

    // Handle registrations (firstnames, secondenames, etc.)
    const destination = apiToCollection[collectionName];
    if (destination) {
      const { searchParams } = new URL(request.url);
      const idStr = searchParams.get("filters[userid][$eq]") || searchParams.get("filters[id][$eq]");
      const id = parseInt(idStr);

      const allRecords = await collections[destination].getAll();
      console.log(`Total records in ${destination}: ${allRecords.length}`);
      
      if (idStr) {
          // Search by our custom ID (userid) or local increment ID
          const record = allRecords.find(r => 
              (r.userid && String(r.userid) === idStr) || 
              (r.id && String(r.id) === idStr) ||
              (r.customerId && String(r.customerId) === idStr)
          );
          if (record) {
              console.log("Match found!", record.id);
          } else {
              console.log("No match found for ID in DB:", idStr);
          }
          return NextResponse.json({
            data: record ? [record] : [],
            meta: {},
          });
      }

      return NextResponse.json({
        data: allRecords,
        meta: {},
      });
    }

    return NextResponse.json({
      data: [],
      meta: {},
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { error: { message: error.message || "Server error" } },
      { status: 500 }
    );
  }
}
