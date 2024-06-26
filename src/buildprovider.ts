import buildGraphQLProvider, {
  buildQuery as buildQueryFactory,
} from "ra-data-graphql-simple";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import nookies from "nookies";
import { IntrospectionResult } from "ra-data-graphql";
import { gql } from "@apollo/client";

const myBuildQuery =
  (introspection: IntrospectionResult) =>
  (fetchType: string, resource: string, params: any) => {
    const builtQuery = buildQueryFactory(introspection)(
      fetchType,
      resource,
      params
    );

    if (resource === "Teacher" && fetchType === "GET") {
      return {
        ...builtQuery,
        query: gql`
          query AllTeachers {
            allTeachers {
              _id
              email
              username
              isAccountActivated
            }
          }
        `,
      };
    }
    if (resource === "allPayments" && fetchType === "GET") {
      return {
        ...builtQuery,
        query: gql`
          query AllPayments {
            allPayments {
              url
            }
          }
        `,
      };
    }

    return builtQuery;
  };

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_ROOT_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const auth = nookies.get()["auth"];
  // return the headers to the context so httpLink can read them
  if (auth) {
    const user = JSON.parse(auth);

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${user?.data.teacher_login?.token}`,
      },
    };
  }

  return {
    headers: {
      ...headers,
      authorization: "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const buildProvider = () =>
  buildGraphQLProvider({
    client,
    // buildQuery: myBuildQuery,
  });

export default buildProvider;
