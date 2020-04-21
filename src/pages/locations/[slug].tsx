import { GetServerSideProps } from "next";
import { assert } from "../../lib/utils";

export default () => null;

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  if (res) {
    res.writeHead(301, {
      Location: `/neighbourhoods/${assert(params).slug}`,
    });
    res.end();
  }

  return { props: {} };
};
