import { redirect } from 'next/navigation'

/**
 * Home page - redirects to default institute
 */
export default function HomePage() {
  redirect('/inst?instUser=dhri-curriculum&instRepo=dhrift-site-template')
}
