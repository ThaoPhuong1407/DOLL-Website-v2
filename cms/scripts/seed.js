/* eslint-disable no-console */
const path = require("path");
const { createStrapi } = require("@strapi/strapi");

const distDir = path.join(__dirname, "..", "dist");

function loadSeedData() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const seedModule = require(path.join(distDir, "src", "data", "seeds"));
    const {
      newsSeedData = [],
      projectSeedData = [],
      solutionSeedData = [],
    } = seedModule;
    return { newsSeedData, projectSeedData, solutionSeedData };
  } catch (error) {
    console.error(
      "Unable to load compiled seed data from dist/. Run `npm run build` first.",
      error,
    );
    process.exit(1);
  }
}

async function clearCollection(strapi, uid) {
  try {
    const existing = await strapi.entityService.findMany(uid, {
      filters: {},
      fields: ["id"],
      publicationState: "preview",
      limit: -1,
    });

    let count = 0;
    for (const entry of existing) {
      if (!entry.id) continue;
      await strapi.entityService.delete(uid, entry.id);
      count += 1;
    }

    console.log(`Cleared ${uid} (${count} removed)`);
  } catch (error) {
    console.warn(`Unable to clear ${uid} before seeding`, error);
  }
}

async function upsertCollection(strapi, uid, entries, uniqueField) {
  for (const entry of entries) {
    if (!entry[uniqueField]) {
      console.warn(
        `Skipping ${uid} entry because it is missing the unique field ${uniqueField}`,
        entry,
      );
      continue;
    }

    const existing = await strapi.entityService.findMany(uid, {
      filters: { [uniqueField]: entry[uniqueField] },
      fields: ["id"],
      publicationState: "preview",
    });

    const data = { ...entry };
    if (!data.publishedAt) {
      data.publishedAt = data.publishDate ?? new Date().toISOString();
    }

    if (existing.length > 0) {
      await strapi.entityService.update(uid, existing[0].id, { data });
      console.log(`Updated ${uid} (${entry[uniqueField]})`);
    } else {
      await strapi.entityService.create(uid, { data });
      console.log(`Created ${uid} (${entry[uniqueField]})`);
    }
  }
}

async function seed() {
  const seedData = loadSeedData();
  const app = await createStrapi({
    distDir,
  });

  await app.load();

  await clearCollection(app, "api::news-item.news-item");
  await upsertCollection(
    app,
    "api::news-item.news-item",
    seedData.newsSeedData,
    "slug",
  );
  await clearCollection(app, "api::project.project");
  await upsertCollection(
    app,
    "api::project.project",
    seedData.projectSeedData,
    "slug",
  );
  await clearCollection(app, "api::solution.solution");
  await upsertCollection(
    app,
    "api::solution.solution",
    seedData.solutionSeedData,
    "slug",
  );

  await app.destroy();
  console.log("Seeding completed.");
}

seed().catch((error) => {
  console.error("Seeding failed", error);
  if (error?.details) {
    console.error("Validation details:", JSON.stringify(error.details, null, 2));
  }
  process.exit(1);
});
