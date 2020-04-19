import { NextApiRequest, NextApiResponse } from "next";
import { $backend } from "../../lib/backend";
import { values, isUndefined } from "lodash-es";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await $backend.prepare();

    const stats = {
      allTotal: 0,
      publishedTotal: 0,
      draftTotal: 0,
      archivedTotal: 0,
      publishedByLocationCounts: values($backend.locations).reduce((agg, location) => {
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
