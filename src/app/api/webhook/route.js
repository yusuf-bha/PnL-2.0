import { Webhook } from 'svix'
import { headers } from 'next/headers'
import db from '@/lib/db.js'
 
export async function POST(req) {
 
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp"); 
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);
 
  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt;
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  // test to see if the db is syncing and all the methods on the db class are working as they should
  if (eventType === "user.created") {
    const email = evt.data.email_addresses[0].email_address;
    const user = db.createUser(id, email);
  } else if (eventType === "user.deleted") {
    const deletedUser = db.deleteUser(id); 
  }

  return new Response('', { status: 201 })
}
 