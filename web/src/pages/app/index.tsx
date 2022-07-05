import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useMeQuery } from '../../graphql/generated/graphql';
import { getServerPageGetProducts, ssrGetProducts } from '../../graphql/generated/page';
import { withApollo } from '../../libs/apollo/withApollo';



export function Home(props) {
  const { user } = useUser();

const { data: me } = useMeQuery();

  return(
    <div className="text-violet-500">
      <h1>Home</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>

      <pre>{JSON.stringify(props.data, null, 2)}</pre>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>

  )
}

export default withApollo(
  ssrGetProducts.withPage()(Home)
)