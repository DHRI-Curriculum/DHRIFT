import Link from 'next/link';
import { ALIGNED_WORKSHOP_BRANCH } from '../../../utils/github';

export default function LinkDirective({ children, workshop, page, instUser, instRepo }) {
  const href = `/v2?user=DHRI-Curriculum&repo=workshops&file=${workshop}&branch=${ALIGNED_WORKSHOP_BRANCH}${
    instUser && instRepo ? `&instUser=${instUser}&instRepo=${instRepo}` : ''
  }${page ? `&page=${page}` : ''}`;

  return (
    <Link href={href} prefetch={false}>
      {children}
    </Link>
  );
}
