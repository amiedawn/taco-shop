import gql from "graphql-tag";

export const QUERY_ALL_ITEMS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;