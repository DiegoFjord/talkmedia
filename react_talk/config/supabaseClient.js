import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://gukztedupozanptkrcss.supabase.co' //process.env.REACT_APP_SUPABASE_URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1a3p0ZWR1cG96YW5wdGtyY3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0NDQ5MjAsImV4cCI6MjAwNzAyMDkyMH0.spyQYD2luDU09LuVZZwvLlaSJM_XuZOmJZE83WLt3Hw' //process.env.REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase