import type { PageLoad } from './$types';
import { withAuth } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = withAuth(async ({ getSupabaseClient, session }) => {
    if (!session.user) {
        throw redirect(303, '/');
    }

    return {
        user: session.user
    };
});
