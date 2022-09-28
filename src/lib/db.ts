import { createClient } from '@supabase/supabase-js'
import {setupSupabaseHelpers} from "@supabase/auth-helpers-sveltekit"
import { env } from "$env/dynamic/public"
import { dev } from "$app/environment"

type Topping = 'Schoko' | 'Schoko+Banane' | 'Zimt+Zucker' | 'Apfelmus';

export type TOrder = {
  nr: number;
  type: `Crepes`;
  done: boolean;
  topping: Topping;
  extraWish: string
};

export const supabaseClient = createClient(
  env.PUBLIC_SUPABASE_URL,
  env.PUBLIC_SUPABASE_KEY,
  {
    persistSession: false,
    autoRefreshToken: false
  }
)

setupSupabaseHelpers({
  supabaseClient,
  cookieOptions: {
    secure: !dev
  }
})

// const userStore = writable(supabase.auth.user())

// supabase.auth.onAuthStateChange((event, session) => {
//   if (event == 'SIGNED_IN' && session) {
//     userStore.set(session.user)
//   } else if (event == 'SIGNED_OUT') {
//     userStore.set(null)
//   }
// })
// const location = import.meta.env.VITE_PUBLIC_SUPABASE_LOCATION
// const orderTableName = `orders-${location}`

// const db = {
//   get user() {
//     return userStore
//   },
//   signUp(email: string, password: string) {
//     return supabase.auth.signUp({ email, password })
//   },
//   signIn(email: string) {
//     return supabase.auth.signIn({ email })
//   },
//   signOut() {
//     return supabase.auth.signOut()
//   },
//   orders: {
//     async getAll() {
//       const { body } = await supabase
//         .from(orderTableName)
//         .select('*')
//         .order('nr')
//       return body as TOrder[]
//     },
//     async get() {
//       const { body } = await supabase
//         .from(orderTableName)
//         .select('*')
//         .order('nr')
//         .eq('done', false)
//       return body
//     },
//     async stats() {
//       const { body } = await supabase
//         .from(orderTableName)
//         .select('*')
//         .order('nr')
//       return body as TOrder[]
//     },
//     async create(order: TOrder) {
//       const { body } = await supabase
//         .from(orderTableName)
//         .insert(order)

//       return body?.[0]
//     },

//     async finishOrder(order: TOrder) {
//       const { body } = await supabase
//         .from(orderTableName)
//         .update({ done: true })
//         .match({ nr: order.nr })

//       return body?.[0]
//     }
//   }
// }

// export const orders = writable<TOrder[]>([])

// supabase.from(orderTableName).on("INSERT", (payload) => {
//   orders.update(val => {
//     return [...val, payload.new]
//   })
// }).subscribe()


// export default db