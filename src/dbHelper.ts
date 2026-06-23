import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import {
  defaultServices,
  defaultTestimonials,
  defaultPricingTable,
  defaultLegalPages,
  defaultHomepageContent,
} from "./defaultData";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Structured Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- UTILITY DATA HELPERS ---

export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    throw new Error("Firebase is not configured. Falling back to local data.");
  }
  try {
    const qSnapshot = await getDocs(collection(db, collectionName));
    const items: T[] = [];
    qSnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as T);
    });
    return items;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, collectionName);
  }
}

export async function createDocument(collectionName: string, docId: string, data: any): Promise<void> {
  try {
    await setDoc(doc(db, collectionName, docId), data);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `${collectionName}/${docId}`);
  }
}

export async function updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `${collectionName}/${docId}`);
  }
}

export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `${collectionName}/${docId}`);
  }
}

// --- AUTOMATIC SEEDING PATTERN ---

import { defaultGallery } from "./defaultData";

export async function seedDatabaseIfNeeded(): Promise<void> {
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    throw new Error("Firebase is not configured. Skipping seeding.");
  }
  try {
    // Check services
    const servicesSnap = await getDocs(collection(db, "services"));
    if (servicesSnap.empty || servicesSnap.size < 15) {
      console.log("Seeding default services into Firestore...");
      // Clean and overwrite with premium 20 services
      for (const service of defaultServices) {
        await setDoc(doc(db, "services", service.id), service);
      }
    }

    // Check testimonials
    const testimonialsSnap = await getDocs(collection(db, "testimonials"));
    if (testimonialsSnap.empty) {
      console.log("Seeding default testimonials into Firestore...");
      for (const test of defaultTestimonials) {
        await setDoc(doc(db, "testimonials", test.id), test);
      }
    }

    // Check pricing list
    const pricingSnap = await getDocs(collection(db, "pricing"));
    if (pricingSnap.empty || pricingSnap.size < 10) {
      console.log("Seeding default pricing entries into Firestore...");
      for (const price of defaultPricingTable) {
        await setDoc(doc(db, "pricing", price.id), price);
      }
    }

    // Check gallery
    const gallerySnap = await getDocs(collection(db, "gallery"));
    if (gallerySnap.empty) {
      console.log("Seeding default workshop gallery into Firestore...");
      for (const item of defaultGallery) {
        await setDoc(doc(db, "gallery", item.id), item);
      }
    }

    // Check legal papers
    const legalSnap = await getDocs(collection(db, "legal_pages"));
    if (legalSnap.empty) {
      console.log("Seeding default legal policies into Firestore...");
      for (const page of defaultLegalPages) {
        await setDoc(doc(db, "legal_pages", page.id), page);
      }
    }

    // Check homepage configurator
    const homepageSnap = await getDocs(collection(db, "homepage"));
    if (homepageSnap.empty) {
      console.log("Seeding default homepage metrics...");
      await setDoc(doc(db, "homepage", "hero"), defaultHomepageContent);
    }
  } catch (error) {
    console.error("Optional auto-seeding encountered Firestore security locks. Relying on local memory fallback state.", error);
    throw error;
  }
}
