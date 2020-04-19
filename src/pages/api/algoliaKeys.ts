import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../lib/backend";
import { mapValues } from "lodash-es";
import { Sites } from "../../lib/sites";
import { assert } from "../../lib/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const keys = mapValues(
    Sites,
    (site) => $backend.$algolia.generateSecuredApiKey("556f6fc163ed52a4034f05ab9f402515", { filters: `site:${site.webflowID}` }) // "secured" search key locked to a site. Note that the key in the string there is not sensitive, it's just the global search key
  );
  res.status(200).json({ success: true, keys });
};
