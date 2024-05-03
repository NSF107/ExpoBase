import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "default_value";
const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "default_value";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}), // See https://github.com/supabase/supabase-js/issues/786, for more info
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});
