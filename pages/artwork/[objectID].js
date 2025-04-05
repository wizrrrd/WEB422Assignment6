import { useRouter } from 'next/router';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkDetailPage() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <div className="mt-4">
      {objectID && <ArtworkCardDetail objectID={objectID} />}
    </div>
  );
}
