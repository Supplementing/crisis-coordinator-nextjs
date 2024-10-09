// this file contains the actions to store and fetch data for the map from supabase
import supabase from "@/app/utils/supabase";

export interface Post {
  contactInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  title: string;
  coordinates: object;
  description: string;
  status: string;
  severity: string;
  posted_by: any;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  items_needed: string[];
  readable_address: string;
}

export async function getAllPosts() {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    console.error(error);
  }
  return data;
}

export async function createPost(post: Post) {
  const formattedPost = {
    coordinates: post.coordinates,
    description: post.description,
    status: post.status,
    severity: post.severity,
    posted_by: post.posted_by,
    contact_name: post.contactInfo.firstName + " " + post.contactInfo.lastName,
    contact_phone: post.contactInfo.phoneNumber,
    contact_email: post.contactInfo.email,
  };
  const { data, error } = await supabase.from("posts").insert(formattedPost);
  if (error) {
    console.error(error);
  }
  return data;
}
