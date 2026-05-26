import Download from '../Download';

export default function DownloadDirective({ files, allUploads }) {
  return <Download files={files} allUploads={allUploads} />;
}
