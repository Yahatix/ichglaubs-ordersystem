import { createClient, type SupabaseRealtimePayload } from '@supabase/supabase-js'
import { writable } from 'svelte/store'

type Topping = 'Schoko' | 'Schoko+Banane' | 'Zimt+Zucker' | 'Apfelmus';
export type TOrder = {
  nr: number;
  type: `Crepes`;
  done: boolean;
  topping: Topping;
  extraWish: string
};

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_KEY
)

const userStore = writable(supabase.auth.user())

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN' && session) {
    userStore.set(session.user)
  } else if (event == 'SIGNED_OUT') {
    userStore.set(null)
  }
})

const db = {
  get user() {
    return userStore
  },
  signIn(email: string) {
    return supabase.auth.signIn({ email })
  },
  signOut() {
    return supabase.auth.signOut()
  },
  orders: {
    async get() {
      const { body } = await supabase
        .from("orders")
        .select('*')
        .order('nr')
        .eq('done', false)
      return body
    },
    async create(order: TOrder) {
      const { body } = await supabase
        .from('orders')
        .insert(order)

      return body?.[0]
    },

    async finishOrder(order: TOrder) {
      const { body } = await supabase
        .from('orders')
        .update({ done: true })
        .match({ nr: order.nr })

      return body?.[0]
    }
  }
}

export const orders = writable<TOrder[]>([])

supabase.from("orders").on("INSERT", (payload: SupabaseRealtimePayload<TOrder>) => {
  orders.update(val => {
    return [...val, payload.new]
  })
}).subscribe()


export default db