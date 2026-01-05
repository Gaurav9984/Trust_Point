// services/mfApi.js

const BASE_URL = "https://api.mfapi.in/mf";

/**
 * Fetch all schemes list
 */
export async function fetchAllSchemes(limit = 500) {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch all schemes");
    const data = await res.json();
    return data.slice(0, limit); // Limit results to avoid heavy payload
  } catch (error) {
    console.error("Error fetching all schemes:", error);
    return [];
  }
}

/**
 * Fetch NAV data for a specific scheme by code
 */
export async function fetchSchemeData(schemeCode) {
  if (!schemeCode) return null;

  try {
    const res = await fetch(`${BASE_URL}/${schemeCode}`);
    if (!res.ok) throw new Error("Failed to fetch scheme data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching MF data for scheme ${schemeCode}:`, error);
    return null;
  }
}
