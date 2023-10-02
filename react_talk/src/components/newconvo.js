import supabase from '../../config/supabaseClient'

export async function newconvo(identity){
    const { data:datas, error } = await supabase
    .from('conversations')
    .insert([
    {type: 'public' },
    ])
    .select()
    console.log(datas)
    datas.map(data => (console.log(data.id)))
    const dog = datas.map(user => user.id)
    console.log(error)
    console.log(dog[0])


    
    const { data:ppl, error: errortwo } = await supabase
        .from('participants')
        .insert({user_id:identity,'conversation_id': dog[0]})
        .select()
    console.log(ppl)

    console.log(errortwo)

}