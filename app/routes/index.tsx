import { Link } from "remix"

export default function Index() {
  return (
    <div>
      <Link to="/posts">Posts</Link>
    </div>
  );
}
