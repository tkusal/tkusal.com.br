import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDirectory = fileURLToPath(new URL("../", import.meta.url));
const maximumPosts = 6;
const jsonPath = path.join(rootDirectory, "assets", "data", "posts.json");
const sitemapPath = path.join(rootDirectory, "sitemap.xml");
const pages = [
    {
        path: path.join(rootDirectory, "index.html"),
        locale: "pt-BR",
        linkLabel: "Ler artigo",
        postLanguage: null,
        feedUrl: "https://rookieops.dev/rss.xml",
        jsonKey: "pt",
        fallbackDescription: "Leia o artigo completo no RookieOps.",
        assetPrefix: "assets"
    },
    {
        path: path.join(rootDirectory, "en", "index.html"),
        locale: "en-US",
        linkLabel: "Read article",
        postLanguage: null,
        feedUrl: "https://rookieops.dev/rss_en.xml",
        jsonKey: "en",
        fallbackDescription: "Read the full article on RookieOps.",
        assetPrefix: "../assets"
    }
];

function unwrapCdata(value = "") {
    return value
        .replace(/^\s*<!\[CDATA\[/i, "")
        .replace(/\]\]>\s*$/i, "")
        .trim();
}

function decodeEntities(value = "") {
    const namedEntities = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        nbsp: " ",
        quot: "\""
    };

    return value
        .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
        .replace(/&([a-z]+);/gi, (entity, name) => namedEntities[name.toLowerCase()] ?? entity);
}

function stripHtml(value = "") {
    return decodeEntities(unwrapCdata(value))
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function extractTag(block, tagName) {
    const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = block.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"));
    return match ? unwrapCdata(match[1]) : "";
}

function extractLink(block) {
    const rssLink = stripHtml(extractTag(block, "link"));
    if (rssLink) return rssLink;

    const atomLink = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
    return atomLink ? decodeEntities(atomLink[1]) : "";
}

function truncate(value, maximumLength = 180) {
    if (value.length <= maximumLength) return value;
    return `${value.slice(0, maximumLength).replace(/\s+\S*$/, "")}…`;
}

function parseFeed(xml, fallbackDescription) {
    const rssItems = xml.match(/<item\b[\s\S]*?<\/item>/gi);
    const atomEntries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi);
    const entries = rssItems ?? atomEntries ?? [];

    return entries
        .map((entry) => {
            const title = stripHtml(extractTag(entry, "title"));
            const link = extractLink(entry);
            const publishedValue =
                stripHtml(extractTag(entry, "pubDate")) ||
                stripHtml(extractTag(entry, "published")) ||
                stripHtml(extractTag(entry, "updated"));
            const descriptionValue =
                extractTag(entry, "description") ||
                extractTag(entry, "content:encoded") ||
                extractTag(entry, "summary") ||
                extractTag(entry, "content");
            const parsedDate = new Date(publishedValue);

            if (!title || !link || Number.isNaN(parsedDate.getTime())) return null;

            return {
                title,
                link,
                publishedAt: parsedDate.toISOString(),
                description: truncate(stripHtml(descriptionValue) || fallbackDescription)
            };
        })
        .filter(Boolean)
        .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
        .slice(0, maximumPosts);
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}

function formatPostCard(post, locale, linkLabel, postLanguage, assetPrefix) {
    const formattedDate = new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(post.publishedAt));
    const linkAccessibleLabel = `${linkLabel}: ${post.title}`;
    const languageAttribute = postLanguage ? ` lang="${escapeHtml(postLanguage)}"` : "";

    return [
        "                    <article class=\"post-card\">",
        "                        <div>",
        `                            <p class="post-date">${escapeHtml(formattedDate)}</p>`,
        `                            <h3 class="post-title"${languageAttribute}>${escapeHtml(post.title)}</h3>`,
        `                            <p class="post-desc"${languageAttribute}>${escapeHtml(post.description)}</p>`,
        "                        </div>",
        `                        <a href="${escapeHtml(post.link)}" class="post-link" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(linkAccessibleLabel)}">`,
        `                            ${escapeHtml(linkLabel)}`,
        `                            <img src="${assetPrefix}/vendor/boxicons/bx-right-arrow-alt.svg" alt="" width="20" height="20" aria-hidden="true">`,
        "                        </a>",
        "                    </article>"
    ].join("\n");
}

async function updatePage(page, posts) {
    const html = await readFile(page.path, "utf8");
    const postsPattern = /\s*<template data-posts-boundary="start"><\/template>[\s\S]*?<template data-posts-boundary="end"><\/template>/;

    if (!postsPattern.test(html)) {
        throw new Error(`Post markers were not found in ${page.path}`);
    }

    const cards = posts
        .map((post) => formatPostCard(post, page.locale, page.linkLabel, page.postLanguage, page.assetPrefix))
        .join("\n");
    const replacement = [
        "                    <template data-posts-boundary=\"start\"></template>",
        cards,
        "                    <template data-posts-boundary=\"end\"></template>"
    ].join("\n");
    const updatedHtml = html.replace(postsPattern, `\n${replacement}`);

    if (updatedHtml === html) {
        return false;
    }

    await writeFile(page.path, updatedHtml, "utf8");
    return true;
}

async function updateSitemapLastModified(date) {
    const sitemap = await readFile(sitemapPath, "utf8");
    const updatedSitemap = sitemap.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${date}</lastmod>`);

    if (updatedSitemap !== sitemap) {
        await writeFile(sitemapPath, updatedSitemap, "utf8");
    }
}

async function fetchFeed(url, fallbackDescription) {
    const response = await fetch(url, {
        headers: {
            "User-Agent": "tkusal.com.br static feed updater"
        },
        signal: AbortSignal.timeout(20_000)
    });

    if (!response.ok) {
        throw new Error(`Feed request failed for ${url} with HTTP ${response.status}`);
    }

    const posts = parseFeed(await response.text(), fallbackDescription);
    if (posts.length === 0) {
        throw new Error(`The feed at ${url} did not contain valid posts.`);
    }
    return posts;
}

async function main() {
    let existingData = {};
    try {
        existingData = JSON.parse(await readFile(jsonPath, "utf8"));
        if (Array.isArray(existingData.posts)) {
            existingData.posts = { pt: existingData.posts, en: [] };
        }
    } catch {
        existingData = { posts: {} };
    }

    let anyPostsChanged = false;
    let pagesChanged = false;
    let totalPostsUpdated = 0;
    const newData = {
        updatedAt: new Date().toISOString(),
        posts: {}
    };

    for (const page of pages) {
        const posts = await fetchFeed(page.feedUrl, page.fallbackDescription);
        const existingPosts = existingData.posts?.[page.jsonKey] ?? [];
        
        const postsChanged = JSON.stringify(existingPosts) !== JSON.stringify(posts);
        if (postsChanged) {
            anyPostsChanged = true;
        }
        
        newData.posts[page.jsonKey] = posts;
        totalPostsUpdated += posts.length;
        
        pagesChanged = (await updatePage(page, posts)) || pagesChanged;
    }

    if (anyPostsChanged) {
        await writeFile(jsonPath, `${JSON.stringify(newData, null, 2)}\n`, "utf8");
        await updateSitemapLastModified(newData.updatedAt.slice(0, 10));
        console.log(`Updated ${totalPostsUpdated} RookieOps posts across feeds.`);
        return;
    }

    console.log(pagesChanged
        ? `Repaired the static cards for ${totalPostsUpdated} RookieOps posts.`
        : "RookieOps posts are already up to date.");
}

main().catch((error) => {
    console.error(`RookieOps update failed: ${error.message}`);
    process.exitCode = 1;
});
