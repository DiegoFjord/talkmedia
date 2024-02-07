import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

//console.log(process.env.REACT_APP_ANON_KEY)


async function fetchDataAndConsole(animal) {
  try {
    const { data, error } = await supabase
      .from('connect') // Replace 'your_table_name' with the actual table name
      .update({ name: animal })
      .eq('id', 8)

    if (error) {
      console.error('Error updating offer:', error);
    } else {
      console.log('Offer updated successfully:', data);
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }

}

 export{fetchDataAndConsole, supabase}