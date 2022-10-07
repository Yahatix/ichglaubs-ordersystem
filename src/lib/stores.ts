import { writable } from 'svelte/store';
import type { TOrder } from "$lib/db";


export const currentOrder = writable<TOrder[]>([]);