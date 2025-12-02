import Link from 'next/link';

export default function LinkDirective({ children, workshop, page, instUser, instRepo }) {
  const href = `/v2?user=DHRI-Curriculum&repo=workshops&file=${workshop}&branch=v2${
    instUser && instRepo ? `&instUser=${instUser}&instRepo=${instRepo}` : ''
  }${page ? `&page=${page}` : ''}`;

  return (
    <Link href={href}>
      {children}
    </Link>
  );
}
