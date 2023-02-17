import PostFeed from "@/components/PostFeed";
import UserProfile from "@/components/UserProfile";
import { query, collection, where, getDocs, limit, orderBy, getFirestore } from 'firebase/firestore';
import { getUserWithUsername, postToJSON } from "@/lib/firebase";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query: urlQuery }: { query: any }) => {
    const { username } = urlQuery;
    // Custom helper func
    const userDoc = await getUserWithUsername(username);
    if (!userDoc) {
        return {
          notFound: true,
        };
      }
    // JSON serializable data
    let user = null;
    let posts = null;
  
    if (userDoc) {
      user = userDoc.data();
  
      const postsQuery = query(
        collection(getFirestore(), userDoc.ref.path, 'posts'),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  
      console.log('how many times is this called?');
  console.log("1",posts)
    }

    return {
        props: { user, posts }, // will be passed to the page component as props
    };
  }
  export default function UserProfilePage({ user, posts }: { user: any, posts: any[] }): JSX.Element {
    return (
      <main>
        <UserProfile user={user} />
        <PostFeed posts={posts} />
      </main>
    );
  }
