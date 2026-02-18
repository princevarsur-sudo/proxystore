import { createClient } from "@supabase/supabase-js";

const supabaseUrl ="https://oohtwxxblvjtqbaajmcf.supabase.co";
const supabaseKey ="sb_publishable_5VXcb2UnhMjJteyaapPuqw_8VuaVbNl";

export const supabase = createClient(supabaseUrl, supabaseKey);
