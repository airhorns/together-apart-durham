import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../../lib/backend";
import { values, mapValues, isUndefined } from "lodash-es";
import { Sites } from "../../../lib/sites";

export const algoliaKeys = async (req: NextApiRequest, res: NextApiResponse) => {
  const keys = mapValues(
    Sites,
    (site) => $backend.$algolia.generateSecuredApiKey("556f6fc163ed52a4034f05ab9f402515", { filters: `site:${site.webflowID}` }) // "secured" search key locked to a site. Note that the key in the string there is not sensitive, it's just the global search key
  );
  res.status(200).json({ success: true, keys });
};

export const stats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await $backend.prepare();

    const stats = {
      allTotal: 0,
      publishedTotal: 0,
      draftTotal: 0,
      archivedTotal: 0,
      publishedByLocationCounts: values($backend.allLocations).reduce((agg, location) => {
        agg[location.name] = 0;
        return agg;
      }, {} as Record<string, number>),
      publishedByCategoryCounts: values($backend.categories).reduce((agg, category) => {
        agg[category.name] = 0;
        return agg;
      }, {} as Record<string, number>),
      totalBySite: {} as Record<string, number>,
    };

    await $backend.paginatedItems(async (page) => {
      stats.allTotal += page.items.length;
      const published = page.items.filter($backend.readyForPublish);
      stats.publishedTotal += published.length;
      stats.draftTotal += page.items.filter((item) => item["_draft"] && !item["_archived"]).length;
      stats.archivedTotal += page.items.filter((item) => item["_archived"]).length;

      published.forEach((item) => {
        let location, category;
        if ((location = $backend.locationNameForItem(item))) {
          stats.publishedByLocationCounts[location] += 1;
        }
        if ((category = $backend.categoryNameForItem(item))) {
          stats.publishedByCategoryCounts[category] += 1;
        }
      });

      page.items.forEach((item) => {
        if (isUndefined(stats.totalBySite[item.site])) stats.totalBySite[item.site] = 0;
        stats.totalBySite[item.site] += 1;
      });
    });

    res.status(200).json({ success: true, stats });
  } catch (e) {
    console.log(e.message);
    res.status(422).json({ success: false });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  switch (req.query.tool) {
    case "stats": {
      handler = stats;
      break;
    }
    case "algoliaKeys": {
      handler = algoliaKeys;
      break;
    }
    default: {
      return res.status(404).json({ message: "tool not found" });
    }
  }

  return await handler(req, res);
};
