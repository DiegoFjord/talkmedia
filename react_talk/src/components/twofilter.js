import supabase from '../../config/supabaseClient'

export default async function double() {
    let { data: posts, error } = await supabase
  .from('posts')
  .select('*')
  .eq('tags', '2',)
  .eq('id', '3',)
console.log(posts)
console.log(error)
}

